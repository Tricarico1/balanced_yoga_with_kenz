/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        // Proxy canva.site assets same-origin (bypasses CORS on crossorigin scripts)
        source: '/_assets/:path*',
        destination: 'https://balancedyogawithkenz.my.canva.site/_assets/:path*',
      },
      {
        // canva.site JS does history.pushState to the page slug, so assets also load
        // from /<slug>/_assets/*. Proxy those back to canva.site too.
        source: '/:prefix*/_assets/:path*',
        destination: 'https://balancedyogawithkenz.my.canva.site/_assets/:path*',
      },
    ]
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ext.same-assets.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "ugc.same-assets.com",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
