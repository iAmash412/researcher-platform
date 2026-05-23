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
        <section className="max-w-[1200px] mx-auto px-6 pt-24 pb-20 sm:pt-36 sm:pb-28">
          <p className="text-[12px] font-medium text-accent uppercase tracking-widest mb-5">
            Academic Directory
          </p>
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-[1] mb-6 max-w-[600px]" style={{ letterSpacing: '-0.02em' }}>
            Discover the minds shaping research
          </h1>
          <p className="text-[14px] sm:text-base text-text-secondary leading-relaxed max-w-[480px] mb-10">
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
        <section className="bg-[#f7f8f9]">
          <div className="max-w-[1200px] mx-auto px-6 py-16 sm:py-20 grid grid-cols-2 sm:grid-cols-4 gap-10 sm:gap-14">
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
        <section className="max-w-[1200px] mx-auto px-6 py-20 sm:py-28">
          <div className="flex items-end justify-between mb-14 gap-4">
            <div>
              <p className="text-[12px] font-medium text-accent uppercase tracking-widest mb-3">
                Featured
              </p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight" style={{ letterSpacing: '-0.02em' }}>
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {featured.map((r) => (
              <ResearcherCard key={r.id} researcher={r} />
            ))}
          </div>
        </section>

        {/* ── Fields ── */}
        <section className="bg-[#f7f8f9]">
          <div className="max-w-[1200px] mx-auto px-6 py-20 sm:py-28">
            <p className="text-[12px] font-medium text-accent uppercase tracking-widest mb-3">
              Browse
            </p>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-12" style={{ letterSpacing: '-0.02em' }}>
              Research fields
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {fields.map((field) => (
                <Link
                  key={field.slug}
                  href={`/fields/${field.slug}`}
                  className="group flex items-center justify-between p-5 sm:p-6 rounded-2xl border border-transparent hover:bg-white transition-all duration-300"
                >
                  <div className="min-w-0">
                    <h3 className="text-[13px] sm:text-[14px] font-medium text-foreground group-hover:text-accent transition-colors truncate">
                      {field.name}
                    </h3>
                    <p className="text-[11px] sm:text-[12px] text-muted mt-1">
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
        <section className="max-w-[1200px] mx-auto px-6 py-24 sm:py-32 text-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight mb-5" style={{ letterSpacing: '-0.02em' }}>
            Research should be visible
          </h2>
          <p className="text-[14px] sm:text-[15px] text-text-secondary max-w-[420px] mx-auto mb-10 leading-relaxed">
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
