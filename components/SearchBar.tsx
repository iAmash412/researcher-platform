/**
 * Search bar with field and career stage filters.
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
  careerStages: string[]
}

export default function SearchBar({
  query,
  onQueryChange,
  fieldFilter,
  onFieldChange,
  stageFilter,
  onStageChange,
  fields,
  resultCount,
  careerStages,
}: SearchBarProps) {
  return (
    <div className="w-full" role="search" aria-label="Search researchers">
      <div className="relative mb-4">
        <Search
          size={16}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
          aria-hidden="true"
        />
        <label htmlFor="researcher-search" className="sr-only">
          Search researchers
        </label>
        <input
          id="researcher-search"
          type="search"
          placeholder="Search by name, field, or topic..."
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <select
          value={fieldFilter}
          onChange={(e) => onFieldChange(e.target.value)}
          aria-label="Filter by field"
          className="select-field bg-white border border-border rounded-lg px-3 py-2 text-[13px] text-foreground outline-none cursor-pointer hover:border-foreground/30 transition-colors w-full sm:w-auto"
        >
          <option value="">All Fields</option>
          {fields.map((f) => (
            <option key={f.slug} value={f.slug}>
              {f.name} ({f.researcher_count})
            </option>
          ))}
        </select>

        <select
          value={stageFilter}
          onChange={(e) => onStageChange(e.target.value)}
          aria-label="Filter by career stage"
          className="select-field bg-white border border-border rounded-lg px-3 py-2 text-[13px] text-foreground outline-none cursor-pointer hover:border-foreground/30 transition-colors w-full sm:w-auto"
        >
          <option value="">All Stages</option>
          {careerStages.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <span className="text-[12px] text-muted sm:ml-auto">
          {resultCount} result{resultCount !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  )
}
