/**
 * Landing page — hero, stats, featured researchers, fields.
 * Clean, minimal layout with lots of whitespace.
 */

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import Nav from '@/components/Nav'
import ResearcherCard from '@/components/ResearcherCard'
import Footer from '@/components/Footer'
import {
  getAllResearchers,
  getAllFields,
  getPlatformStats,
  formatNumber,
} from '@/lib/researchers'

export default function Home() {
  const researchers = getAllResearchers()
  const fields = getAllFields()
  const stats = getPlatformStats()
  const featured = researchers.slice(0, 6)

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />

      <main id="main">
        {/* ── Hero ── */}
        <section className="max-w-[1200px] mx-auto px-5 pt-16 pb-14 sm:pt-28 sm:pb-20">
          <p className="text-[12px] font-medium text-accent uppercase tracking-widest mb-4">
            Academic Directory
          </p>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15] mb-5 max-w-[600px]">
            Discover the minds shaping research
          </h1>
          <p className="text-[14px] sm:text-base text-text-secondary leading-relaxed max-w-[480px] mb-8">
            Browse researchers by institution, field, and impact.
            Built from the inside of the research world.
          </p>
          <div className="flex items-center gap-3">
            <Link href="/researchers" className="btn-primary">
              Explore directory
              <ArrowRight size={14} />
            </Link>
          </div>
        </section>

        {/* ── Stats ── */}
        <section className="border-y border-border">
          <div className="max-w-[1200px] mx-auto px-5 py-8 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            <div>
              <div className="stat-value">{stats.totalResearchers}</div>
              <div className="stat-label">Researchers</div>
            </div>
            <div>
              <div className="stat-value">{formatNumber(stats.totalCitations)}</div>
              <div className="stat-label">Citations</div>
            </div>
            <div>
              <div className="stat-value">{stats.totalFields}</div>
              <div className="stat-label">Fields</div>
            </div>
            <div>
              <div className="stat-value">{stats.avgHIndex}</div>
              <div className="stat-label">Avg h-index</div>
            </div>
          </div>
        </section>

        {/* ── Featured Researchers ── */}
        <section className="max-w-[1200px] mx-auto px-5 py-14 sm:py-20">
          <div className="flex items-end justify-between mb-8 gap-4">
            <div>
              <p className="text-[12px] font-medium text-accent uppercase tracking-widest mb-2">
                Featured
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight">
                Top researchers
              </h2>
            </div>
            <Link
              href="/researchers"
              className="text-[13px] text-muted hover:text-foreground transition-colors flex items-center gap-1 shrink-0"
            >
              View all <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {featured.map((r) => (
              <ResearcherCard key={r.id} researcher={r} />
            ))}
          </div>
        </section>

        {/* ── Fields ── */}
        <section className="bg-surface-alt border-y border-border">
          <div className="max-w-[1200px] mx-auto px-5 py-14 sm:py-20">
            <p className="text-[12px] font-medium text-accent uppercase tracking-widest mb-2">
              Browse
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-8">
              Research fields
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
              {fields.map((field) => (
                <Link
                  key={field.slug}
                  href={`/fields/${field.slug}`}
                  className="group flex items-center justify-between p-4 rounded-lg border border-transparent hover:border-border hover:bg-white transition-all"
                >
                  <div className="min-w-0">
                    <h3 className="text-[13px] sm:text-[14px] font-medium text-foreground group-hover:text-accent transition-colors truncate">
                      {field.name}
                    </h3>
                    <p className="text-[11px] sm:text-[12px] text-muted mt-0.5">
                      {field.researcher_count} researchers · {formatNumber(field.total_citations)} citations
                    </p>
                  </div>
                  <ArrowRight
                    size={14}
                    className="text-muted group-hover:text-accent transition-colors shrink-0 ml-3"
                  />
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="max-w-[1200px] mx-auto px-5 py-16 sm:py-24 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-4">
            Research should be visible
          </h2>
          <p className="text-[14px] sm:text-[15px] text-text-secondary max-w-[420px] mx-auto mb-8 leading-relaxed">
            Academic research impacts every industry and innovation.
            The researchers behind it deserve to be found.
          </p>
          <Link href="/researchers" className="btn-primary">
            Explore the directory
            <ArrowRight size={14} />
          </Link>
        </section>
      </main>

      <Footer />
    </>
  )
}
