import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer2";

const nextConfig: NextConfig = {
  // We handle i18n routing manually with middleware
  // i18n: {
  //   locales: ['en', 'zh'],
  //   defaultLocale: 'en',
  //   localeDetection: true,
  // },
  // Enable trailing slash for better SEO
  trailingSlash: false,
  // Add headers for better SEO and performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          // Add hreflang headers for SEO
          {
            key: "Link",
            value:
              '<https://yoursite.com/en>; rel="alternate"; hreflang="en", <https://yoursite.com/zh>; rel="alternate"; hreflang="zh"',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/posts/:slug",
        destination: "/posts/:slug",
      },
    ];
  },
  async redirects() {
    return [];
  },
};

export default withContentlayer(nextConfig);
