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

    // Extract the canva.site origin (e.g. https://balancedyogawithkenz.my.canva.site)
    const canvaOrigin = new URL(targetUrl).origin

    let html = await res.text()
    // Force <base href="/"> so relative _assets/... paths resolve to /_assets/...
    html = html.replace(/<base\s+href="[^"]*"\s*\/?>/i, '<base href="/">')
    // Remove crossorigin="anonymous" from all tags — canva.site doesn't return ACAO headers
    // when proxied, so the browser blocks CORS-gated resources. Removing it allows them to load.
    html = html.replace(/\s+crossorigin="anonymous"/gi, '')

    // Inject an asset-rewriting script before any other scripts.
    // Canva's JS constructs absolute image URLs using window.location.origin+pathname,
    // e.g. https://balancedyogawithkenz.my.canva.site/blog-post-1/_assets/media/xxx.png
    // We intercept img.src assignments and strip the canva origin so assets load via
    // our /_assets/* rewrite instead of going directly to canva.site (which breaks CORS).
    const assetPatchScript = `<script>
(function(){
  var ORIGIN = ${JSON.stringify(canvaOrigin)};
  function rw(url) {
    if (typeof url === 'string' && url.startsWith(ORIGIN)) {
      var path = url.slice(ORIGIN.length);
      var ai = path.indexOf('/_assets/');
      if (ai !== -1) return '/api/canva-asset?path=' + encodeURIComponent(path);
    }
    return url;
  }
  var d = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
  Object.defineProperty(HTMLImageElement.prototype, 'src', {
    set: function(v){ d.set.call(this, rw(v)); },
    get: function(){ return d.get.call(this); },
    configurable: true
  });
  var origSetAttr = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function(n, v){
    if (n.toLowerCase() === 'crossorigin') return; // prevent CORS blocking (React uses camelCase crossOrigin)
    origSetAttr.call(this, n, (n === 'src' && this instanceof HTMLImageElement) ? rw(v) : v);
  };
  // Also block property assignment (e.g. element.crossOrigin = 'anonymous')
  Object.defineProperty(HTMLElement.prototype, 'crossOrigin', {
    set: function(){},
    get: function(){ return null; },
    configurable: true
  });
})();
</script>`
    html = html.replace('<head>', '<head>' + assetPatchScript)

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
