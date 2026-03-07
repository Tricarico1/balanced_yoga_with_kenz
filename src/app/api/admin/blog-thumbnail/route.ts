import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

// Canva embeds image references in inline JSON as: "url":"_assets/media/xxx.png"
// Pick files with width around 800px (the smallest resolution variant) for thumbnails.
function extractImageUrl(html: string, canvaOrigin: string, canvaPath: string): string | null {
  // Match all JSON file entries: {"url":"_assets/media/xxx","urlDenied":false,"width":NNN,...}
  const fileEntryPattern = /\{"url":"(_assets\/media\/[^"]+)","urlDenied":false,"width":(\d+)/g
  let best: { url: string; width: number } | null = null

  let match: RegExpExecArray | null
  while ((match = fileEntryPattern.exec(html)) !== null) {
    const url = match[1]
    const width = parseInt(match[2], 10)
    // Prefer the smallest size >= 600px wide (good thumbnail quality, not huge)
    if (!best || (width >= 600 && width < best.width)) {
      best = { url, width }
    }
  }

  if (best) {
    // Construct page-prefixed path: /copy-of-copy-of-blog-post-1/_assets/media/xxx.png
    const assetPath = canvaPath + best.url
    return `/api/canva-asset?path=${encodeURIComponent(assetPath)}`
  }

  // Fallback: og:image meta tag
  const ogMatch = html.match(/<meta[^>]+property="og:image"[^>]+content="([^"]+)"/)
    ?? html.match(/<meta[^>]+content="([^"]+)"[^>]+property="og:image"/)
  if (ogMatch) return ogMatch[1]

  // Fallback: any _assets/media ref with a leading slash or full URL
  const directMatch = html.match(/"((?:https?:[^"]*)?_assets\/media\/[^"]+)"/)
  if (directMatch) {
    let src = directMatch[1]
    if (!src.startsWith('http')) src = canvaOrigin + (src.startsWith('/') ? '' : canvaPath) + src
    try {
      const u = new URL(src)
      return `/api/canva-asset?path=${encodeURIComponent(u.pathname)}`
    } catch { /* ignore */ }
  }

  return null
}

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')

  if (!url || !url.includes('.canva.site')) {
    return NextResponse.json({ error: 'Invalid URL' }, { status: 400 })
  }

  try {
    const res = await fetch(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      return NextResponse.json({ found: false, error: `Upstream ${res.status}` })
    }

    const html = await res.text()
    const parsed = new URL(url)
    const canvaOrigin = parsed.origin
    const canvaPath = parsed.pathname.endsWith('/') ? parsed.pathname : parsed.pathname + '/'

    const imageUrl = extractImageUrl(html, canvaOrigin, canvaPath)

    if (imageUrl) {
      return NextResponse.json({ found: true, imageUrl })
    }
    return NextResponse.json({ found: false })
  } catch {
    return NextResponse.json({ found: false, error: 'Fetch failed' })
  }
}
