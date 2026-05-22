/**
 * Landing page — hero, stats marquee, featured researchers, field grid.
 * Magnetto design language: rounded sections, dark/light alternation,
 * scroll-reveal animations, grain overlay, blue accent glow.
 */

import Link from 'next/link'
import { ArrowRight, Microscope, Users, BookOpen, Award } from 'lucide-react'
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

  // Top 6 researchers by citation count for featured grid
  const featured = researchers.slice(0, 6)

  // Stats for the marquee
  const statItems = [
    { label: 'Researchers', value: stats.totalResearchers.toString(), icon: Users },
    { label: 'Citations', value: formatNumber(stats.totalCitations), icon: BookOpen },
    { label: 'Fields', value: stats.totalFields.toString(), icon: Microscope },
    { label: 'Avg h-index', value: stats.avgHIndex.toString(), icon: Award },
  ]

  return (
    <>
      <Nav />
      <div id="scroll-progress" />

      {/* ═══════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-6 pt-24 pb-16 overflow-hidden">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.15) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Blue glow orb */}
        <div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15 pointer-events-none"
          style={{
            background:
              'radial-gradient(circle, var(--accent) 0%, transparent 70%)',
          }}
        />

        <div className="relative max-w-[800px] mx-auto text-center">
          <span className="section-num">The Directory</span>

          <h1 className="font-display italic text-5xl md:text-7xl lg:text-8xl text-foreground mt-4 mb-6 leading-[1.05] tracking-tight">
            Discover the minds
            <br />
            <span className="text-accent">shaping research</span>
          </h1>

          <p className="text-lg md:text-xl text-text-body max-w-[560px] mx-auto mb-10 leading-relaxed">
            The directory that makes academic researchers discoverable. Browse
            by institution, field, and impact.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/researchers" className="btn-accent no-underline">
              Explore Directory
              <ArrowRight size={16} />
            </Link>
            <Link href="/researchers" className="btn-outline no-underline">
              Search Researchers
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          STATS MARQUEE
      ═══════════════════════════════════════════ */}
      <section className="marquee-wrap border-y border-[rgba(0,0,0,0.06)] py-4">
        <div className="marquee-track">
          {[...Array(4)].map((_, rep) => (
            <div key={rep} className="flex items-center">
              {statItems.map((stat) => (
                <div
                  key={`${rep}-${stat.label}`}
                  className="flex items-center gap-3 px-10"
                >
                  <stat.icon size={16} className="text-accent" />
                  <span className="text-2xl font-bold text-foreground tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[12px] text-muted uppercase tracking-widest">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURED RESEARCHERS — Dark section
      ═══════════════════════════════════════════ */}
      <section className="px-4 md:px-6 py-6">
        <div className="section-card section-card-dark py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="flex items-end justify-between mb-12 flex-wrap gap-4">
              <div>
                <span className="section-num">01 — Featured</span>
                <h2 className="font-display italic text-3xl md:text-5xl text-[#efefef] mt-3">
                  Top researchers
                </h2>
                <p className="text-[15px] text-[rgba(255,255,255,0.4)] mt-3 max-w-[440px]">
                  The most-cited researchers from Brown University, ranked by
                  lifetime citation impact.
                </p>
              </div>
              <Link
                href="/researchers"
                className="btn-outline-dark no-underline"
              >
                View all
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featured.map((r) => (
                <ResearcherCard
                  key={r.id}
                  researcher={r}
                  variant="featured"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FIELDS — Light section
      ═══════════════════════════════════════════ */}
      <section className="px-4 md:px-6 py-6">
        <div className="section-card section-card-tinted py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12">
              <span className="section-num">02 — Fields</span>
              <h2 className="font-display italic text-3xl md:text-5xl text-foreground mt-3">
                Research fields
              </h2>
              <p className="text-[15px] text-text-body mt-3 max-w-[500px] mx-auto">
                Explore researchers across {fields.length} academic disciplines,
                from Physics to Neuroscience.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {fields.map((field) => (
                <Link
                  key={field.slug}
                  href={`/fields/${field.slug}`}
                  className="group flex items-center justify-between bg-surface rounded-2xl p-5 border border-[rgba(0,0,0,0.06)] hover:border-accent transition-all no-underline"
                >
                  <div>
                    <h3 className="text-[15px] font-semibold text-foreground group-hover:text-accent transition-colors">
                      {field.name}
                    </h3>
                    <p className="text-[12px] text-muted mt-1">
                      {field.researcher_count} researcher
                      {field.researcher_count !== 1 ? 's' : ''} ·{' '}
                      {formatNumber(field.total_citations)} citations
                    </p>
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-muted group-hover:text-accent transition-colors shrink-0"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA — Dark section
      ═══════════════════════════════════════════ */}
      <section className="px-4 md:px-6 py-6">
        <div className="section-card section-card-dark py-20 md:py-28 px-6 text-center">
          <div className="max-w-[600px] mx-auto">
            <span className="section-num">03 — Connect</span>
            <h2 className="font-display italic text-3xl md:text-5xl text-[#efefef] mt-4 mb-5">
              Research should be
              <br />
              <span className="text-accent">visible</span>
            </h2>
            <p className="text-[15px] text-[rgba(255,255,255,0.45)] mb-8 leading-relaxed">
              Academic research impacts every industry, policy decision, and
              innovation. The researchers behind it deserve to be found.
            </p>
            <Link href="/researchers" className="btn-accent no-underline">
              Explore the Directory
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
