/**
 * Researcher directory — search + filter + card grid.
 * Client component for interactive filtering.
 */

'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import Nav from '@/components/Nav'
import ResearcherCard from '@/components/ResearcherCard'
import SearchBar from '@/components/SearchBar'
import Footer from '@/components/Footer'
import ScrollProgress from '@/components/ScrollProgress'
import {
  getAllResearchers,
  getAllFields,
  searchResearchers,
  formatNumber,
} from '@/lib/researchers'

export default function ResearchersPage() {
  const allResearchers = getAllResearchers()
  const fields = getAllFields()

  const [query, setQuery] = useState('')
  const [fieldFilter, setFieldFilter] = useState('')
  const [stageFilter, setStageFilter] = useState('')
  const [sortBy, setSortBy] = useState<'citations' | 'h_index' | 'works' | 'recent'>('citations')

  const filtered = useMemo(() => {
    const results = searchResearchers(query, {
      field: fieldFilter || undefined,
      careerStage: stageFilter || undefined,
    })

    // Sort
    return [...results].sort((a, b) => {
      switch (sortBy) {
        case 'h_index':
          return b.h_index - a.h_index
        case 'works':
          return b.works_count - a.works_count
        case 'recent':
          return b.recent_works_count - a.recent_works_count
        case 'citations':
        default:
          return b.citation_count - a.citation_count
      }
    })
  }, [query, fieldFilter, stageFilter, sortBy])

  const totalCitations = filtered.reduce((s, r) => s + r.citation_count, 0)

  // Reveal on mount for the header
  const headerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.reveal').forEach((r) => r.classList.add('visible'))
          obs.disconnect()
        }
      },
      { threshold: 0.06 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />
      <div id="scroll-progress" />
      <ScrollProgress />

      <main id="main" className="pt-28 pb-16 px-4 md:px-6">
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div ref={headerRef} className="mb-10">
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <span className="section-num reveal reveal-d1">Directory</span>
            </div>
            <h1
              className="reveal reveal-d2"
              style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                lineHeight: 0.95,
                color: 'var(--text)',
                marginBottom: '12px',
              }}
            >
              Researchers
            </h1>
            <p className="text-[15px] text-text-body max-w-[500px] reveal reveal-d3">
              {allResearchers.length} researchers across{' '}
              {fields.length} fields.{' '}
              {formatNumber(totalCitations)} total citations.
            </p>
          </div>

          {/* Search + filters */}
          <div className="mb-8">
            <SearchBar
              query={query}
              onQueryChange={setQuery}
              fieldFilter={fieldFilter}
              onFieldChange={setFieldFilter}
              stageFilter={stageFilter}
              onStageChange={setStageFilter}
              fields={fields}
              resultCount={filtered.length}
            />
          </div>

          {/* Sort bar */}
          <div className="flex flex-wrap items-center gap-2 mb-6" role="group" aria-label="Sort options">
            <span className="text-[12px] text-muted uppercase tracking-wider">
              Sort by
            </span>
            {(
              [
                { key: 'citations', label: 'Citations' },
                { key: 'h_index', label: 'h-index' },
                { key: 'works', label: 'Works' },
                { key: 'recent', label: 'Recent' },
              ] as const
            ).map((opt) => (
              <button
                key={opt.key}
                onClick={() => setSortBy(opt.key)}
                aria-pressed={sortBy === opt.key}
                className={`px-3 py-1.5 rounded-full text-[12px] font-medium border cursor-pointer transition-all ${
                  sortBy === opt.key
                    ? 'bg-accent text-white border-accent'
                    : 'bg-transparent text-text-body border-[rgba(0,0,0,0.1)] hover:border-accent hover:text-accent'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {/* Results grid */}
          <h2 className="sr-only">Search results</h2>
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filtered.map((r) => (
                <ResearcherCard key={r.id} researcher={r} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-xl text-muted mb-2">No researchers found</p>
              <p className="text-[14px] text-text-body">
                Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
