/**
 * Robots.txt configuration for search engine crawling.
 */

import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://researcher-platform-five.vercel.app/sitemap.xml',
  }
}
