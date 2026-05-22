/**
 * Data layer for the researcher platform.
 * Loads researcher, institution, and field data from static JSON files.
 * All filtering, search, and sorting happens server-side.
 */

import researchersData from '@/data/researchers.json'
import institutionsData from '@/data/institutions.json'
import fieldsData from '@/data/fields.json'

// ── Types ────────────────────────────────────────────

export interface Researcher {
  id: string
  name: string
  slug: string
  institution: string
  institution_slug: string
  department: string
  field: string
  field_slug: string
  h_index: number
  citation_count: number
  works_count: number
  recent_works_count: number
  orcid: string | null
  profile_url: string | null
  career_stage: 'Early Career' | 'Mid Career' | 'Established' | 'Distinguished'
  country: string
  topics: string[]
  last_publication_year: number
}

export interface Institution {
  id: string
  name: string
  slug: string
  country: string
  city: string
  type: string
  researcher_count: number
  total_citations: number
  top_fields: string[]
}

export interface Field {
  name: string
  slug: string
  researcher_count: number
  total_citations: number
}

// ── Data Access ──────────────────────────────────────

export function getAllResearchers(): Researcher[] {
  return researchersData as Researcher[]
}

export function getResearcherBySlug(slug: string): Researcher | undefined {
  return (researchersData as Researcher[]).find((r) => r.slug === slug)
}

export function getAllInstitutions(): Institution[] {
  return institutionsData as Institution[]
}

export function getInstitutionBySlug(slug: string): Institution | undefined {
  return (institutionsData as Institution[]).find((i) => i.slug === slug)
}

export function getAllFields(): Field[] {
  return fieldsData as Field[]
}

export function getFieldBySlug(slug: string): Field | undefined {
  return (fieldsData as Field[]).find((f) => f.slug === slug)
}

// ── Filtering & Search ──────────────────────────────

export function searchResearchers(
  query: string,
  filters?: {
    field?: string
    institution?: string
    careerStage?: string
  }
): Researcher[] {
  let results = researchersData as Researcher[]

  if (query) {
    const q = query.toLowerCase()
    results = results.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.department.toLowerCase().includes(q) ||
        r.field.toLowerCase().includes(q) ||
        r.topics.some((t) => t.toLowerCase().includes(q))
    )
  }

  if (filters?.field) {
    results = results.filter((r) => r.field_slug === filters.field)
  }

  if (filters?.institution) {
    results = results.filter((r) => r.institution_slug === filters.institution)
  }

  if (filters?.careerStage) {
    results = results.filter((r) => r.career_stage === filters.careerStage)
  }

  return results
}

export function getResearchersByField(fieldSlug: string): Researcher[] {
  return (researchersData as Researcher[]).filter(
    (r) => r.field_slug === fieldSlug
  )
}

export function getResearchersByInstitution(
  institutionSlug: string
): Researcher[] {
  return (researchersData as Researcher[]).filter(
    (r) => r.institution_slug === institutionSlug
  )
}

// ── Stats ────────────────────────────────────────────

export function getPlatformStats() {
  const researchers = researchersData as Researcher[]
  const institutions = institutionsData as Institution[]
  const fields = fieldsData as Field[]

  return {
    totalResearchers: researchers.length,
    totalInstitutions: institutions.length,
    totalFields: fields.length,
    totalCitations: researchers.reduce((sum, r) => sum + r.citation_count, 0),
    avgHIndex: Math.round(
      researchers.reduce((sum, r) => sum + r.h_index, 0) / researchers.length
    ),
  }
}

// ── Formatting Utilities ─────────────────────────────

export function formatNumber(num: number): string {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`
  return num.toString()
}

export function getCareerBadgeClass(stage: string): string {
  switch (stage) {
    case 'Distinguished':
      return 'badge-distinguished'
    case 'Established':
      return 'badge-verified'
    case 'Mid Career':
      return 'badge-active'
    case 'Early Career':
      return 'badge-early'
    default:
      return 'badge-active'
  }
}
