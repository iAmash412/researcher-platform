/**
 * Individual researcher profile page.
 * Displays full details: stats, topics, career stage, recent work.
 * Server component with static generation from JSON data.
 */

import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  ArrowRight,
  Award,
  BookOpen,
  Building2,
  ExternalLink,
  Quote,
  Sparkles,
  Calendar,
} from 'lucide-react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import {
  getAllResearchers,
  getResearcherBySlug,
  getResearchersByField,
  formatNumber,
  getCareerBadgeClass,
} from '@/lib/researchers'

// Generate static paths for all researchers
export function generateStaticParams() {
  return getAllResearchers().map((r) => ({ slug: r.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const r = getResearcherBySlug(params.slug)
  if (!r) return { title: 'Researcher Not Found' }
  return {
    title: `${r.name} — ${r.institution} | Researcher Platform`,
    description: `${r.name}, ${r.department} at ${r.institution}. h-index: ${r.h_index}, ${formatNumber(r.citation_count)} citations. Research topics: ${r.topics.slice(0, 3).join(', ')}.`,
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

  // Related researchers in the same field (excluding current)
  const related = getResearchersByField(r.field_slug)
    .filter((rel) => rel.id !== r.id)
    .slice(0, 4)

  return (
    <>
      <Nav />

      <main className="pt-28 pb-16 px-4 md:px-6">
        <div className="max-w-[900px] mx-auto">
          {/* Back link */}
          <Link
            href="/researchers"
            className="inline-flex items-center gap-2 text-[13px] text-text-body hover:text-accent transition-colors no-underline mb-8"
          >
            <ArrowLeft size={14} />
            Back to directory
          </Link>

          {/* ── Header card (dark) ─────────────────── */}
          <div className="section-card section-card-dark p-8 md:p-12 mb-6">
            <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
              <span
                className={`badge ${getCareerBadgeClass(r.career_stage)}`}
              >
                {r.career_stage}
              </span>
              {r.orcid && (
                <a
                  href={`https://orcid.org/${r.orcid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-[12px] text-accent hover:text-accent-light transition-colors no-underline"
                >
                  ORCID
                  <ExternalLink size={11} />
                </a>
              )}
            </div>

            <h1 className="font-display italic text-4xl md:text-5xl text-[#efefef] mb-2">
              {r.name}
            </h1>

            <p className="text-[15px] text-[rgba(255,255,255,0.5)] mb-1">
              {r.department}
            </p>

            <div className="flex items-center gap-2 text-[13px] text-[rgba(255,255,255,0.35)]">
              <Building2 size={13} />
              <Link
                href={`/researchers?institution=${r.institution_slug}`}
                className="hover:text-accent transition-colors no-underline text-[rgba(255,255,255,0.35)]"
              >
                {r.institution}
              </Link>
              <span>·</span>
              <span>{r.country}</span>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 pt-6 border-t border-[rgba(255,255,255,0.07)]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Award size={14} className="text-accent" />
                  <span className="text-[11px] text-[rgba(255,255,255,0.35)] uppercase tracking-wider">
                    h-index
                  </span>
                </div>
                <div className="text-3xl font-bold text-[#efefef] tracking-tight">
                  {r.h_index}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Quote size={14} className="text-accent" />
                  <span className="text-[11px] text-[rgba(255,255,255,0.35)] uppercase tracking-wider">
                    Citations
                  </span>
                </div>
                <div className="text-3xl font-bold text-[#efefef] tracking-tight">
                  {formatNumber(r.citation_count)}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <BookOpen size={14} className="text-accent" />
                  <span className="text-[11px] text-[rgba(255,255,255,0.35)] uppercase tracking-wider">
                    Works
                  </span>
                </div>
                <div className="text-3xl font-bold text-[#efefef] tracking-tight">
                  {r.works_count}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Sparkles size={14} className="text-accent" />
                  <span className="text-[11px] text-[rgba(255,255,255,0.35)] uppercase tracking-wider">
                    Recent
                  </span>
                </div>
                <div className="text-3xl font-bold text-[#efefef] tracking-tight">
                  {r.recent_works_count}
                </div>
              </div>
            </div>
          </div>

          {/* ── Research topics (light) ────────────── */}
          <div className="section-card section-card-light p-8 md:p-10 mb-6 border border-[rgba(0,0,0,0.06)]">
            <h2 className="text-[13px] font-semibold text-muted uppercase tracking-wider mb-4">
              Research Topics
            </h2>
            <div className="flex flex-wrap gap-2">
              {r.topics.map((topic) => (
                <span
                  key={topic}
                  className="tag-pill tag-pill-light text-[13px] !py-2 !px-4"
                >
                  {topic}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-4 mt-6 pt-4 border-t border-[rgba(0,0,0,0.06)]">
              <div className="flex items-center gap-2 text-[13px] text-text-body">
                <Calendar size={14} className="text-muted" />
                Last published: {r.last_publication_year}
              </div>
              <Link
                href={`/fields/${r.field_slug}`}
                className="flex items-center gap-1.5 text-[13px] text-accent hover:text-accent-light transition-colors no-underline"
              >
                {r.field}
                <ArrowRight size={12} />
              </Link>
            </div>
          </div>

          {/* ── External links ────────────────────── */}
          {(r.orcid || r.profile_url) && (
            <div className="section-card section-card-tinted p-8 md:p-10 mb-6">
              <h2 className="text-[13px] font-semibold text-muted uppercase tracking-wider mb-4">
                External Profiles
              </h2>
              <div className="flex flex-wrap gap-3">
                {r.orcid && (
                  <a
                    href={`https://orcid.org/${r.orcid}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline no-underline !text-[13px]"
                  >
                    ORCID Profile
                    <ExternalLink size={13} />
                  </a>
                )}
                <a
                  href={`https://openalex.org/authors/${r.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline no-underline !text-[13px]"
                >
                  OpenAlex
                  <ExternalLink size={13} />
                </a>
                <a
                  href={`https://scholar.google.com/scholar?q=author:"${encodeURIComponent(r.name)}"+${encodeURIComponent(r.institution)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-outline no-underline !text-[13px]"
                >
                  Google Scholar
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          )}

          {/* ── Related researchers ────────────────── */}
          {related.length > 0 && (
            <div className="mt-12">
              <div className="flex items-end justify-between mb-6">
                <div>
                  <span className="section-num">More in {r.field}</span>
                  <h2 className="font-display italic text-2xl text-foreground mt-2">
                    Related researchers
                  </h2>
                </div>
                <Link
                  href={`/fields/${r.field_slug}`}
                  className="text-[13px] text-accent hover:text-accent-light transition-colors no-underline flex items-center gap-1"
                >
                  View all
                  <ArrowRight size={13} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {related.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/researchers/${rel.slug}`}
                    className="researcher-card flex items-center gap-4 bg-surface p-5 border border-[rgba(0,0,0,0.06)] no-underline"
                  >
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[15px] font-semibold text-foreground truncate">
                        {rel.name}
                      </h3>
                      <p className="text-[12px] text-text-body mt-0.5 truncate">
                        {rel.department}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[14px] font-bold text-foreground">
                        h-{rel.h_index}
                      </div>
                      <div className="text-[11px] text-muted">
                        {formatNumber(rel.citation_count)}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
