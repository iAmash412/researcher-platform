/**
 * Layout for the researchers directory section — provides page-level metadata.
 */

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Researcher Directory | Researcher Platform',
  description:
    'Browse and search academic researchers by field, career stage, and impact. Filter by citations, h-index, and recent works.',
  openGraph: {
    title: 'Researcher Directory | Researcher Platform',
    description:
      'Browse and search academic researchers by field, career stage, and impact.',
    type: 'website',
  },
}

export default function ResearchersLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
