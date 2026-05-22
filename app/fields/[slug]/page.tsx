/**
 * Field hub page — shows all researchers in a given field.
 * Magnetto-style dark header card + researcher grid.
 */

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Users, Quote } from 'lucide-react'
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
  return {
    title: `${field.name} Researchers | Researcher Platform`,
    description: `Browse ${field.researcher_count} researchers in ${field.name}. ${formatNumber(field.total_citations)} total citations.`,
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
      <Nav />

      <main className="pt-28 pb-16 px-4 md:px-6">
        <div className="max-w-[1200px] mx-auto">
          {/* Back link */}
          <Link
            href="/researchers"
            className="inline-flex items-center gap-2 text-[13px] text-text-body hover:text-accent transition-colors no-underline mb-8"
          >
            <ArrowLeft size={14} />
            Back to directory
          </Link>

          {/* Field header (dark card) */}
          <div className="section-card section-card-dark p-8 md:p-12 mb-8">
            <span className="section-num">Field</span>
            <h1 className="font-display italic text-3xl md:text-5xl text-[#efefef] mt-3 mb-4">
              {field.name}
            </h1>

            <div className="flex items-center gap-8 pt-4 border-t border-[rgba(255,255,255,0.07)]">
              <div className="flex items-center gap-2">
                <Users size={16} className="text-accent" />
                <span className="text-xl font-bold text-[#efefef]">
                  {field.researcher_count}
                </span>
                <span className="text-[12px] text-[rgba(255,255,255,0.35)] uppercase tracking-wider">
                  Researchers
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Quote size={16} className="text-accent" />
                <span className="text-xl font-bold text-[#efefef]">
                  {formatNumber(field.total_citations)}
                </span>
                <span className="text-[12px] text-[rgba(255,255,255,0.35)] uppercase tracking-wider">
                  Citations
                </span>
              </div>
            </div>
          </div>

          {/* Researcher grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {researchers.map((r) => (
              <ResearcherCard key={r.id} researcher={r} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
