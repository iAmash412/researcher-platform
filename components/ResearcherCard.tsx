/**
 * Researcher card — clean, minimal design.
 * Single variant with name, department, stats, and topics.
 */

import Link from 'next/link'
import type { Researcher } from '@/lib/researchers'
import { formatNumber, getCareerBadgeClass } from '@/lib/researchers'

export default function ResearcherCard({
  researcher,
}: {
  researcher: Researcher
}) {
  const r = researcher

  return (
    <Link
      href={`/researchers/${r.slug}`}
      className="card block p-6 sm:p-7 no-underline"
      aria-label={`${r.name}, ${r.department}`}
    >
      <div className="flex items-start justify-between gap-3 mb-6">
        <div className="min-w-0 flex-1">
          <h3 className="text-[14px] sm:text-[15px] font-semibold text-foreground truncate">
            {r.name}
          </h3>
          <p className="text-[11px] sm:text-[12px] text-text-secondary mt-1.5 truncate">
            {r.department}
          </p>
        </div>
        <span className={`badge shrink-0 ${getCareerBadgeClass(r.career_stage)}`}>
          {r.career_stage}
        </span>
      </div>

      <div className="flex items-center gap-4 sm:gap-5 text-[11px] sm:text-[12px] text-muted mb-6 flex-wrap">
        <span className="whitespace-nowrap">h-index <strong className="text-foreground">{r.h_index}</strong></span>
        <span className="whitespace-nowrap">{formatNumber(r.citation_count)} citations</span>
        <span className="whitespace-nowrap">{r.works_count} works</span>
      </div>

      {r.topics.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {r.topics.slice(0, 2).map((t) => (
            <span key={t} className="tag text-[11px]">{t}</span>
          ))}
        </div>
      )}
    </Link>
  )
}
