/**
 * Field hub page — all researchers in a given field.
 */

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Nav from '@/components/Nav'
import ResearcherCard from '@/components/ResearcherCard'
import Footer from '@/components/Footer'
import {
  getAllFields,
  getFieldBySlug,
  getResearchersByField,
  formatNumber,
} from '@/lib/researchers'

export function generateStaticParams() {
  return getAllFields().map((f) => ({ slug: f.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const field = getFieldBySlug(params.slug)
  if (!field) return { title: 'Field Not Found' }
  const title = `${field.name} Researchers | Researcher Platform`
  const description = `Browse ${field.researcher_count} researchers in ${field.name}. ${formatNumber(field.total_citations)} total citations.`
  return {
    title,
    description,
    openGraph: { title, description, type: 'website' as const },
  }
}

export default async function FieldPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const field = getFieldBySlug(slug)
  if (!field) notFound()

  const researchers = getResearchersByField(slug).sort(
    (a, b) => b.citation_count - a.citation_count
  )

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />

      <main id="main" className="max-w-[1200px] mx-auto px-6 pt-12 pb-20">
        {/* Back */}
        <Link
          href="/researchers"
          className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          Directory
        </Link>

        {/* Header */}
        <div className="mb-10">
          <p className="text-[12px] font-medium text-accent uppercase tracking-widest mb-3">
            Field
          </p>
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-4">
            {field.name}
          </h1>
          <div className="flex items-center gap-4 sm:gap-5 text-[12px] sm:text-[13px] text-text-secondary">
            <span><strong className="text-foreground">{field.researcher_count}</strong> researchers</span>
            <span><strong className="text-foreground">{formatNumber(field.total_citations)}</strong> citations</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {researchers.map((r) => (
            <ResearcherCard key={r.id} researcher={r} />
          ))}
        </div>
      </main>

      <Footer />
    </>
  )
}
