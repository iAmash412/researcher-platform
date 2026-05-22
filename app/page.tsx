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
import RevealSection from '@/components/RevealSection'
import ScrollProgress from '@/components/ScrollProgress'
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
      {/* Skip link for accessibility */}
      <a href="#main" className="skip-link">Skip to content</a>

      <Nav />
      <div id="scroll-progress" />
      <ScrollProgress />

      {/* ===================================================================
          HERO — dark section-card container (Salter pattern)
      =================================================================== */}
      <section style={{ padding: '0 12px 12px', paddingTop: '88px' }}>
        <div
          className="section-card section-card-dark"
          style={{
            minHeight: 'min(90vh, 800px)',
            padding: 'clamp(32px, 5vw, 80px) clamp(20px, 4vw, 80px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Grid background with mask-image fade */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)',
              backgroundSize: '72px 72px',
              maskImage:
                'radial-gradient(ellipse 90% 90% at 50% 50%, black, transparent)',
              WebkitMaskImage:
                'radial-gradient(ellipse 90% 90% at 50% 50%, black, transparent)',
            }}
          />

          {/* Blue glow orb */}
          <div
            style={{
              position: 'absolute',
              top: '30%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '600px',
              height: '600px',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(0,153,255,0.08) 0%, transparent 65%)',
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              position: 'relative',
              zIndex: 1,
              maxWidth: '800px',
              textAlign: 'center',
            }}
          >
            <span className="section-num">The Directory</span>

            <h1
              className="font-display italic"
              style={{
                fontSize: 'clamp(48px, 8vw, 96px)',
                color: '#efefef',
                marginTop: '16px',
                marginBottom: '24px',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                animation:
                  'heroSlide 1.4s cubic-bezier(0.16,1,0.3,1) 0.1s both',
              }}
            >
              Discover the minds
              <br />
              <span className="text-accent">shaping research</span>
            </h1>

            <p
              style={{
                fontSize: '16px',
                color: 'rgba(255,255,255,0.55)',
                maxWidth: '560px',
                margin: '0 auto 40px',
                lineHeight: 1.75,
                animation:
                  'revealUp 1s cubic-bezier(0.16,1,0.3,1) 0.55s both',
                opacity: 0,
              }}
            >
              The directory that makes academic researchers discoverable.
              Browse by institution, field, and impact.
            </p>

            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '16px',
                animation:
                  'revealUp 1s cubic-bezier(0.16,1,0.3,1) 0.8s both',
                opacity: 0,
              }}
            >
              <Link href="/researchers" className="btn-accent no-underline">
                Explore Directory
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/researchers"
                className="btn-outline-dark no-underline"
              >
                Search Researchers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================================
          STATS MARQUEE
      =================================================================== */}
      <section className="marquee-wrap border-y border-[rgba(0,0,0,0.06)] py-4" aria-label="Platform statistics">
        <div className="marquee-track" role="marquee" tabIndex={0}>
          {[...Array(4)].map((_, rep) => (
            <div key={rep} className="flex items-center">
              {statItems.map((stat) => (
                <div
                  key={`${rep}-${stat.label}`}
                  className="flex items-center gap-2 px-6 sm:gap-3 sm:px-10"
                >
                  <stat.icon size={16} className="text-accent" aria-hidden="true" />
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

      {/* ===================================================================
          FEATURED RESEARCHERS — Dark section with reveal
      =================================================================== */}
      <section id="main" className="px-4 md:px-6 py-6">
        <RevealSection className="section-card section-card-dark py-16 md:py-24 px-6 md:px-12" style={{ position: 'relative', overflow: 'hidden' }}>
          {/* Subtle grid inside dark section */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
              backgroundSize: '72px 72px',
              maskImage:
                'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)',
              WebkitMaskImage:
                'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)',
            }}
          />

          <div className="max-w-[1200px] mx-auto" style={{ position: 'relative', zIndex: 1 }}>
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span className="section-num reveal reveal-d1">01</span>
                  <span
                    className="reveal reveal-d1"
                    style={{
                      fontSize: '11px',
                      letterSpacing: '0.18em',
                      color: '#333',
                      textTransform: 'uppercase',
                      fontWeight: 600,
                    }}
                  >
                    Featured
                  </span>
                </div>
                <h2
                  className="reveal reveal-d2"
                  style={{
                    fontSize: 'clamp(32px, 4.5vw, 64px)',
                    fontWeight: 700,
                    letterSpacing: '-0.03em',
                    lineHeight: 0.95,
                    color: '#efefef',
                  }}
                >
                  Top researchers
                </h2>
                <p className="reveal reveal-d3" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.4)', marginTop: '12px', maxWidth: '440px' }}>
                  The most-cited researchers from Brown University, ranked by
                  lifetime citation impact.
                </p>
              </div>
              <Link
                href="/researchers"
                className="btn-outline-dark no-underline reveal reveal-d2"
              >
                View all
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featured.map((r, i) => (
                <div key={r.id} className={`reveal reveal-d${Math.min(i + 3, 6)}`}>
                  <ResearcherCard
                    researcher={r}
                    variant="featured"
                  />
                </div>
              ))}
            </div>
          </div>
        </RevealSection>
      </section>

      {/* ===================================================================
          FIELDS — Light section with reveal
      =================================================================== */}
      <section className="px-4 md:px-6 py-6">
        <RevealSection className="section-card section-card-tinted py-16 md:py-24 px-6 md:px-12">
          <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-12">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '12px' }}>
                <span className="section-num reveal reveal-d1">02</span>
                <span
                  className="reveal reveal-d1"
                  style={{
                    fontSize: '11px',
                    letterSpacing: '0.18em',
                    color: '#aaa8a0',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                  }}
                >
                  Fields
                </span>
              </div>
              <h2
                className="reveal reveal-d2"
                style={{
                  fontSize: 'clamp(32px, 4.5vw, 64px)',
                  fontWeight: 700,
                  letterSpacing: '-0.03em',
                  lineHeight: 0.95,
                  color: '#0a0a0a',
                }}
              >
                Research fields
              </h2>
              <p className="reveal reveal-d3" style={{ fontSize: '15px', color: 'var(--text-body)', marginTop: '12px', maxWidth: '500px', marginLeft: 'auto', marginRight: 'auto' }}>
                Explore researchers across {fields.length} academic disciplines,
                from Physics to Neuroscience.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {fields.map((field, i) => (
                <Link
                  key={field.slug}
                  href={`/fields/${field.slug}`}
                  className={`group flex items-center justify-between bg-surface rounded-2xl p-5 border border-[rgba(0,0,0,0.06)] hover:border-accent transition-all no-underline reveal reveal-d${Math.min(Math.floor(i / 3) + 3, 6)}`}
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
        </RevealSection>
      </section>

      {/* ===================================================================
          CTA — Dark section with reveal
      =================================================================== */}
      <section className="px-4 md:px-6 py-6">
        <RevealSection
          className="section-card section-card-dark py-20 md:py-28 px-6 text-center"
          style={{ position: 'relative', overflow: 'hidden' }}
        >
          {/* Blue glow centre */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '600px',
              height: '400px',
              background:
                'radial-gradient(ellipse, rgba(0,153,255,0.06) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          <div className="max-w-[600px] mx-auto" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px', marginBottom: '16px' }}>
              <span className="section-num reveal reveal-d1">03</span>
              <span
                className="reveal reveal-d1"
                style={{
                  fontSize: '11px',
                  letterSpacing: '0.18em',
                  color: '#333',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                Connect
              </span>
            </div>
            <h2
              className="reveal reveal-d2"
              style={{
                fontSize: 'clamp(32px, 5vw, 64px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 0.95,
                color: '#efefef',
                marginBottom: '20px',
              }}
            >
              Research should be
              <br />
              <span className="font-display italic text-accent">visible</span>
            </h2>
            <p className="reveal reveal-d3" style={{ fontSize: '15px', color: 'rgba(255,255,255,0.45)', marginBottom: '32px', lineHeight: 1.75 }}>
              Academic research impacts every industry, policy decision, and
              innovation. The researchers behind it deserve to be found.
            </p>
            <div className="reveal reveal-d4">
              <Link href="/researchers" className="btn-accent no-underline">
                Explore the Directory
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </RevealSection>
      </section>

      <Footer />
    </>
  )
}
