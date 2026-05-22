/**
 * Search bar with field and career stage filters.
 * Magnetto-style input with focus glow and rounded corners.
 */

'use client'

import { Search } from 'lucide-react'
import type { Field } from '@/lib/researchers'

interface SearchBarProps {
  query: string
  onQueryChange: (q: string) => void
  fieldFilter: string
  onFieldChange: (f: string) => void
  stageFilter: string
  onStageChange: (s: string) => void
  fields: Field[]
  resultCount: number
}

const CAREER_STAGES = ['Distinguished', 'Established', 'Mid Career', 'Early Career']

export default function SearchBar({
  query,
  onQueryChange,
  fieldFilter,
  onFieldChange,
  stageFilter,
  onStageChange,
  fields,
  resultCount,
}: SearchBarProps) {
  return (
    <div className="w-full">
      {/* Search input */}
      <div className="relative mb-4">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
        />
        <input
          type="text"
          placeholder="Search by name, field, department, or topic..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="search-input"
        />
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Field filter */}
        <select
          value={fieldFilter}
          onChange={(e) => onFieldChange(e.target.value)}
          className="bg-surface border border-[rgba(0,0,0,0.1)] rounded-full px-4 py-2 text-[13px] text-foreground outline-none cursor-pointer hover:border-accent transition-colors appearance-none pr-8"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ba1a5' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center',
          }}
        >
          <option value="">All Fields</option>
          {fields.map((f) => (
            <option key={f.slug} value={f.slug}>
              {f.name} ({f.researcher_count})
            </option>
          ))}
        </select>

        {/* Career stage filter */}
        <select
          value={stageFilter}
          onChange={(e) => onStageChange(e.target.value)}
          className="bg-surface border border-[rgba(0,0,0,0.1)] rounded-full px-4 py-2 text-[13px] text-foreground outline-none cursor-pointer hover:border-accent transition-colors appearance-none pr-8"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239ba1a5' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 12px center',
          }}
        >
          <option value="">All Stages</option>
          {CAREER_STAGES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        {/* Result count */}
        <span className="text-[12px] text-muted ml-auto">
          {resultCount} researcher{resultCount !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  )
}
