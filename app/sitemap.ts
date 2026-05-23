/**
 * Dynamic sitemap for search engine discoverability.
 * Generates URLs for all researcher profiles and field pages.
 */

import { getAllResearchers, getAllFields } from '@/lib/researchers'
import type { MetadataRoute } from 'next'

const BASE_URL = 'https://researcher-platform-five.vercel.app'

export default function sitemap(): MetadataRoute.Sitemap {
  const researchers = getAllResearchers()
  const fields = getAllFields()

  const researcherUrls = researchers.map((r) => ({
    url: `${BASE_URL}/researchers/${r.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  const fieldUrls = fields.map((f) => ({
    url: `${BASE_URL}/fields/${f.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/researchers`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...fieldUrls,
    ...researcherUrls,
  ]
}
