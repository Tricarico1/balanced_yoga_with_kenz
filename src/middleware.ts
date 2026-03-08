import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const CANVA_ORIGIN = 'https://balancedyogawithkenz.my.canva.site'

// ── Canva asset proxy ─────────────────────────────────────────────────────────

function canvaPagePath(req: NextRequest): string | null {
  const referer = req.headers.get('referer') || ''
  try {
    const url = new URL(referer)
    const canvaUrl = url.searchParams.get('url')
    if (canvaUrl) {
      const pagePath = new URL(canvaUrl).pathname
      return pagePath === '/' ? null : pagePath.replace(/\/$/, '')
    }
  } catch { /* ignore */ }
  return null
}

async function fetchAsset(path: string) {
  return fetch(`${CANVA_ORIGIN}${path}`, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    },
  })
}

async function handleAssetProxy(req: NextRequest) {
  const pathname = req.nextUrl.pathname
  try {
    let res = await fetchAsset(pathname)
    if (!res.ok) {
      const pagePath = canvaPagePath(req)
      if (pagePath) res = await fetchAsset(`${pagePath}${pathname}`)
    }
    if (!res.ok) return new NextResponse('Not found', { status: 404 })
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

// ── Auth middleware ───────────────────────────────────────────────────────────

async function handleAuth(req: NextRequest) {
  let response = NextResponse.next({ request: req })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return req.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => req.cookies.set(name, value))
          response = NextResponse.next({ request: req })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/login'
    redirectUrl.searchParams.set('next', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return response
}

// ── Router ────────────────────────────────────────────────────────────────────

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname

  if (pathname.startsWith('/_online')) {
    return new NextResponse('ok', { status: 200 })
  }

  if (pathname.startsWith('/_assets/')) {
    return handleAssetProxy(req)
  }

  if (pathname.startsWith('/classes')) {
    return handleAuth(req)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/_online', '/_assets/:path*', '/classes/:path*', '/classes'],
}
