/**
 * Researcher profile card — rounded corners, hover lift, career badge.
 * Displays name, department, institution, h-index, citations, and topic pills.
 * Adapts the Magnetto venture-card pattern for academic profiles.
 */

import Link from 'next/link'
import { BookOpen, Quote, Award } from 'lucide-react'
import type { Researcher } from '@/lib/researchers'
import { formatNumber, getCareerBadgeClass } from '@/lib/researchers'

interface ResearcherCardProps {
  researcher: Researcher
  variant?: 'default' | 'compact' | 'featured'
}

export default function ResearcherCard({
  researcher,
  variant = 'default',
}: ResearcherCardProps) {
  const r = researcher

  if (variant === 'compact') {
    return (
      <Link
        href={`/researchers/${r.slug}`}
        className="researcher-card block bg-surface p-5 border border-[rgba(0,0,0,0.06)] no-underline"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="text-[15px] font-semibold text-foreground truncate">
              {r.name}
            </h3>
            <p className="text-[12px] text-text-body mt-0.5 truncate">
              {r.department}
            </p>
          </div>
          <span className={`badge shrink-0 ${getCareerBadgeClass(r.career_stage)}`}>
            {r.career_stage}
          </span>
        </div>
        <div className="flex items-center gap-4 mt-3 text-[12px] text-muted">
          <span className="flex items-center gap-1">
            <Award size={12} /> h-{r.h_index}
          </span>
          <span className="flex items-center gap-1">
            <Quote size={12} /> {formatNumber(r.citation_count)}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen size={12} /> {r.works_count}
          </span>
        </div>
      </Link>
    )
  }

  if (variant === 'featured') {
    return (
      <Link
        href={`/researchers/${r.slug}`}
        className="researcher-card block text-[#efefef] p-5 sm:p-8 no-underline"
        style={{
          background: '#161616',
          border: '1px solid rgba(0,153,255,0.12)',
        }}
      >
        <div className="flex items-start justify-between gap-3 mb-4">
          <span className={`badge ${getCareerBadgeClass(r.career_stage)}`}>
            {r.career_stage}
          </span>
          <span className="text-[11px] font-mono text-accent tracking-wider">
            h-{r.h_index}
          </span>
        </div>

        <h3 className="font-display italic text-2xl text-[#efefef] mb-1">
          {r.name}
        </h3>
        <p className="text-[13px] text-[rgba(255,255,255,0.5)] mb-1">
          {r.department}
        </p>
        <p className="text-[12px] text-[rgba(255,255,255,0.35)]">
          {r.institution}
        </p>

        <div className="flex items-center gap-5 mt-6 pt-4 border-t border-[rgba(255,255,255,0.07)]">
          <div>
            <div className="stat-value">{formatNumber(r.citation_count)}</div>
            <div className="stat-label text-[rgba(255,255,255,0.3)]">
              Citations
            </div>
          </div>
          <div>
            <div className="stat-value">{r.works_count}</div>
            <div className="stat-label text-[rgba(255,255,255,0.3)]">
              Works
            </div>
          </div>
          <div>
            <div className="stat-value">{r.recent_works_count}</div>
            <div className="stat-label text-[rgba(255,255,255,0.3)]">
              Recent
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-5">
          {r.topics.slice(0, 3).map((topic) => (
            <span key={topic} className="tag-pill">
              {topic}
            </span>
          ))}
        </div>
      </Link>
    )
  }

  // Default variant
  return (
    <Link
      href={`/researchers/${r.slug}`}
      className="researcher-card block bg-surface p-6 border border-[rgba(0,0,0,0.06)] no-underline"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <span className={`badge ${getCareerBadgeClass(r.career_stage)}`}>
          {r.career_stage}
        </span>
        <span className="text-[11px] font-mono text-accent tracking-wider">
          h-{r.h_index}
        </span>
      </div>

      <h3 className="text-[17px] font-semibold text-foreground mb-1">
        {r.name}
      </h3>
      <p className="text-[13px] text-text-body mb-0.5">{r.department}</p>
      <p className="text-[12px] text-muted">{r.institution}</p>

      <div className="flex items-center gap-5 mt-4 pt-3 border-t border-[rgba(0,0,0,0.06)]">
        <div className="flex items-center gap-1.5 text-[12px] text-muted">
          <Quote size={13} />
          <span className="font-semibold text-foreground">
            {formatNumber(r.citation_count)}
          </span>
          citations
        </div>
        <div className="flex items-center gap-1.5 text-[12px] text-muted">
          <BookOpen size={13} />
          <span className="font-semibold text-foreground">{r.works_count}</span>
          works
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mt-4">
        {r.topics.slice(0, 2).map((topic) => (
          <span key={topic} className="tag-pill tag-pill-light text-[10px]">
            {topic}
          </span>
        ))}
      </div>
    </Link>
  )
}
