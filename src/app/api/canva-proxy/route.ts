import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const targetUrl = req.nextUrl.searchParams.get('url')

  if (!targetUrl || !targetUrl.includes('.canva.site')) {
    return new NextResponse('Invalid URL', { status: 400 })
  }

  try {
    const res = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      return new NextResponse(`Upstream error: ${res.status}`, { status: 502 })
    }

    const html = await res.text()
    // canva.site HTML already has <base href="/"> so _assets/... paths resolve to /_assets/...
    // Our next.config.js rewrite proxies /_assets/* back to canva.site same-origin

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        // Cache 5 min — intentionally no X-Frame-Options so our iframe can load it
        'Cache-Control': 'public, max-age=300, s-maxage=300',
      },
    })
  } catch {
    return new NextResponse('Proxy error', { status: 500 })
  }
}
