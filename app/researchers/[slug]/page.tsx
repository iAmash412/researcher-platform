/**
 * Individual researcher profile page — clean minimal layout.
 */

import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import {
  getAllResearchers,
  getResearcherBySlug,
  getResearchersByField,
  formatNumber,
  getCareerBadgeClass,
} from '@/lib/researchers'

export function generateStaticParams() {
  return getAllResearchers().map((r) => ({ slug: r.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const r = getResearcherBySlug(params.slug)
  if (!r) return { title: 'Researcher Not Found' }
  const title = `${r.name} — ${r.institution} | Researcher Platform`
  const description = `${r.name}, ${r.department} at ${r.institution}. h-index: ${r.h_index}, ${formatNumber(r.citation_count)} citations.`
  return {
    title,
    description,
    openGraph: { title, description, type: 'profile' as const },
  }
}

export default async function ResearcherProfile({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const r = getResearcherBySlug(slug)
  if (!r) notFound()

  const related = getResearchersByField(r.field_slug)
    .filter((rel) => rel.id !== r.id)
    .slice(0, 4)

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />

      <main id="main" className="max-w-[780px] mx-auto px-6 pt-12 pb-20">
        {/* Back */}
        <Link
          href="/researchers"
          className="inline-flex items-center gap-1.5 text-[13px] text-muted hover:text-foreground transition-colors mb-10"
        >
          <ArrowLeft size={14} />
          Directory
        </Link>

        {/* Header */}
        <div className="mb-8">
          <span className={`badge mb-3 ${getCareerBadgeClass(r.career_stage)}`}>
            {r.career_stage}
          </span>

          <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-1" style={{ letterSpacing: '-0.02em' }}>
            {r.name}
          </h1>
          <p className="text-[13px] sm:text-[14px] text-text-secondary">{r.department}</p>
          <p className="text-[12px] sm:text-[13px] text-muted mt-0.5">
            {r.institution} · {r.country}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-8 p-6 sm:p-8 rounded-[var(--radius-card)] bg-[#f7f8f9] mb-12">
          <div>
            <div className="stat-value">{r.h_index}</div>
            <div className="stat-label">h-index</div>
          </div>
          <div>
            <div className="stat-value">{formatNumber(r.citation_count)}</div>
            <div className="stat-label">Citations</div>
          </div>
          <div>
            <div className="stat-value">{r.works_count}</div>
            <div className="stat-label">Works</div>
          </div>
          <div>
            <div className="stat-value">{r.recent_works_count}</div>
            <div className="stat-label">Recent</div>
          </div>
        </div>

        {/* Topics */}
        <div className="mb-10">
          <h2 className="text-[12px] font-medium text-muted uppercase tracking-wider mb-4">
            Research Topics
          </h2>
          <div className="flex flex-wrap gap-2">
            {r.topics.map((t) => (
              <span key={t} className="tag">{t}</span>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-black/[0.06] text-[13px] text-text-secondary">
            <span>Last published: {r.last_publication_year}</span>
            <Link
              href={`/fields/${r.field_slug}`}
              className="text-accent hover:underline flex items-center gap-1"
            >
              {r.field} <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* External links */}
        <div className="mb-12">
          <h2 className="text-[12px] font-medium text-muted uppercase tracking-wider mb-4">
            Profiles
          </h2>
          <div className="flex flex-wrap gap-2.5">
            {r.orcid && (
              <a
                href={`https://orcid.org/${r.orcid}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary !text-[12px]"
              >
                ORCID <ExternalLink size={11} />
              </a>
            )}
            <a
              href={`https://openalex.org/authors/${r.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary !text-[12px]"
            >
              OpenAlex <ExternalLink size={11} />
            </a>
            <a
              href={`https://scholar.google.com/scholar?q=author:"${encodeURIComponent(r.name)}"+${encodeURIComponent(r.institution)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary !text-[12px]"
            >
              Google Scholar <ExternalLink size={11} />
            </a>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="border-t border-black/[0.06] pt-14">
            <div className="flex items-end justify-between mb-6">
              <h2 className="text-lg font-semibold tracking-tight">
                More in {r.field}
              </h2>
              <Link
                href={`/fields/${r.field_slug}`}
                className="text-[12px] text-muted hover:text-foreground transition-colors flex items-center gap-1"
              >
                View all <ArrowRight size={12} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {related.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/researchers/${rel.slug}`}
                  className="card flex items-center justify-between p-4 sm:p-5 no-underline gap-3"
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] sm:text-[14px] font-medium text-foreground truncate">{rel.name}</p>
                    <p className="text-[11px] sm:text-[12px] text-muted truncate">{rel.department}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-[12px] sm:text-[13px] font-semibold">h-{rel.h_index}</p>
                    <p className="text-[10px] sm:text-[11px] text-muted">{formatNumber(rel.citation_count)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}
