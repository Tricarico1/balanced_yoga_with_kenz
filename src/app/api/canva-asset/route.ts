import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get('path')

  if (!path || !path.includes('/_assets/')) {
    return new NextResponse('Invalid path', { status: 400 })
  }

  const canvaOrigin = 'https://balancedyogawithkenz.my.canva.site'

  try {
    const res = await fetch(`${canvaOrigin}${path}`, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      },
      cache: 'force-cache',
    })

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
