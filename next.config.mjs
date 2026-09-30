/** @type {import('next').NextConfig} */
const nextConfig = {
  // app/global-not-found.tsx: one branded 404 for both the Hebrew and English layouts
  experimental: { globalNotFound: true },
  images: {
    unoptimized: true,
  },
  // Files read with fs at runtime must be bundled with the serverless functions
  outputFileTracingIncludes: {
    '/blog': ['./content/posts/**'],
    '/sitemap.xml': ['./content/posts/**'],
    '/llms.txt': ['./content/posts/**'],
  },
  // Old WordPress URLs -> new pages (permanent, so Google transfers rankings)
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      // Channel list page was removed
      { source: '/channels-list', destination: '/', permanent: true },
      { source: '/terms-and-conditions', destination: '/terms', permanent: true },
      { source: '/refund-and-cancellation-policy', destination: '/refund-policy', permanent: true },
      { source: '/installation-guide', destination: '/#installation', permanent: true },
      { source: '/reseller-progam', destination: '/#reseller', permanent: true },
      { source: '/about-us', destination: '/about', permanent: true },
      { source: '/contact-us', destination: '/', permanent: true },
      { source: '/shop', destination: '/#pricing', permanent: true },
      { source: '/cart', destination: '/#pricing', permanent: true },
      { source: '/checkout/:path*', destination: '/#pricing', permanent: true },
      { source: '/my-account/:path*', destination: '/#pricing', permanent: true },
      { source: '/product/:path*', destination: '/#pricing', permanent: true },
      { source: '/product-category/:path*', destination: '/#pricing', permanent: true },
      { source: '/category/:path*', destination: '/blog', permanent: true },
      { source: '/tag/:path*', destination: '/blog', permanent: true },
      { source: '/author/:path*', destination: '/blog', permanent: true },
      { source: '/feed', destination: '/blog', permanent: true },
      { source: '/sitemap_index.xml', destination: '/sitemap.xml', permanent: true },
      { source: '/:type(post|page|product|category)-sitemap:n(\\d*).xml', destination: '/sitemap.xml', permanent: true },
      { source: '/wp-content/uploads/:path*', destination: '/blog-media/:path*', permanent: true },
    ]
  },
}

export default nextConfig
