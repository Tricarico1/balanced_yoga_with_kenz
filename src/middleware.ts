import { NextRequest, NextResponse } from 'next/server'

const CANVA_ORIGIN = 'https://balancedyogawithkenz.my.canva.site'

// Extract canva page path from Referer (e.g. "/blog-post-1" from
// "http://localhost:3000/api/canva-proxy?url=https://...canva.site/blog-post-1")
function canvaPagePath(req: NextRequest): string | null {
  const referer = req.headers.get('referer') || ''
  try {
    const url = new URL(referer)
    const canvaUrl = url.searchParams.get('url')
    if (canvaUrl) {
      const pagePath = new URL(canvaUrl).pathname // e.g. "/blog-post-1"
      return pagePath === '/' ? null : pagePath.replace(/\/$/, '')
    }
  } catch {
    // ignore malformed referer
  }
  return null
}

async function fetchAsset(path: string) {
  return fetch(`${CANVA_ORIGIN}${path}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    },
  })
}

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  try {
    let res = await fetchAsset(pathname)

    // If not found at root, try the page-prefixed path using the Referer
    if (!res.ok) {
      const pagePath = canvaPagePath(req)
      if (pagePath) {
        res = await fetchAsset(`${pagePath}${pathname}`)
      }
    }

    if (!res.ok) {
      return new NextResponse('Not found', { status: 404 })
    }

    const buffer = await res.arrayBuffer()
    return new NextResponse(buffer, {
      headers: {
        'Content-Type': res.headers.get('Content-Type') || 'application/octet-stream',
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    })
  } catch {
    return new NextResponse('Proxy error', { status: 500 })
  }
}

export const config = {
  matcher: ['/_assets/:path*'],
}
