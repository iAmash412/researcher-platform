/**
 * Researcher directory — search, filter, sort, card grid.
 */

'use client'

import { useState, useMemo } from 'react'
import Nav from '@/components/Nav'
import ResearcherCard from '@/components/ResearcherCard'
import SearchBar from '@/components/SearchBar'
import Footer from '@/components/Footer'
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
    return [...results].sort((a, b) => {
      switch (sortBy) {
        case 'h_index': return b.h_index - a.h_index
        case 'works': return b.works_count - a.works_count
        case 'recent': return b.recent_works_count - a.recent_works_count
        default: return b.citation_count - a.citation_count
      }
    })
  }, [query, fieldFilter, stageFilter, sortBy])

  const totalCitations = filtered.reduce((s, r) => s + r.citation_count, 0)

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <Nav />

      <main id="main" className="max-w-[1080px] mx-auto px-6 sm:px-8 pt-10 pb-16">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight mb-2">
            Researchers
          </h1>
          <p className="text-[13px] sm:text-[14px] text-text-secondary">
            {allResearchers.length} researchers across {fields.length} fields · {formatNumber(totalCitations)} total citations
          </p>
        </div>

        {/* Search + Filters */}
        <div className="mb-6">
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

        {/* Sort */}
        <div className="flex flex-wrap items-center gap-1.5 mb-6" role="group" aria-label="Sort options">
          <span className="text-[11px] text-muted uppercase tracking-wider mr-1">Sort</span>
          {([
            { key: 'citations', label: 'Citations' },
            { key: 'h_index', label: 'h-index' },
            { key: 'works', label: 'Works' },
            { key: 'recent', label: 'Recent' },
          ] as const).map((opt) => (
            <button
              key={opt.key}
              onClick={() => setSortBy(opt.key)}
              aria-pressed={sortBy === opt.key}
              className={`px-3 py-1 rounded-md text-[12px] font-medium border cursor-pointer transition-all ${
                sortBy === opt.key
                  ? 'bg-foreground text-white border-foreground'
                  : 'bg-transparent text-muted border-border hover:border-foreground/30'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <h2 className="sr-only">Search results</h2>
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((r) => (
              <ResearcherCard key={r.id} researcher={r} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-lg text-muted mb-1">No researchers found</p>
            <p className="text-[13px] text-text-secondary">Try adjusting your search or filters.</p>
          </div>
        )}
      </main>

      <Footer />
    </>
  )
}
