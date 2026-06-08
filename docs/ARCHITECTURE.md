# Researcher Platform — Architecture Guide

> Written for a developer who has never seen this codebase.
> Update when: new route added, new data source integrated, new component added, data shape changes.

---

## What This Platform Does

A researcher visibility and discovery platform. Surfaces researchers' active profiles, institutions, fields, and publication metrics to enable connection and collaboration. Data is sourced from the OpenAlex academic database via a Python ingestion script.

**Current state:** Built (components and routes exist). Broken — buttons not working, content overflow issues, non-responsive. Scheduled for rescue rebuild under the [[Platform Build Standard — AI-Assisted Iterative Development]].

**Founder:** Salter — researcher ecosystem insider. Platform owned/operated by Salter.
**Builder:** Claudian (Arthur AI) — Phase 0 design note needed before rebuild.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Icons | Lucide React |
| Data source | OpenAlex API (academic researcher database) |
| Data pipeline | `fetch_openalex.py` — Python script, populates JSON files |
| Data storage | Static JSON files (`data/researchers.json`, `data/institutions.json`, `data/fields.json`) |
| Deployment | Not yet deployed |
| Auth | None (public directory) |
| Database | None (static data) |

---

## Folder Structure

```
researcher-platform/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout
│   ├── page.tsx                # Homepage — hero, stats, featured researchers, fields
│   ├── globals.css             # Global styles
│   ├── favicon.ico
│   ├── researchers/            # Researcher listing and profile pages
│   ├── fields/                 # Research field browser
│   ├── robots.ts               # robots.txt generation
│   └── sitemap.ts              # Sitemap generation
├── components/
│   ├── Nav.tsx                 # Navigation bar
│   ├── Footer.tsx              # Footer
│   ├── ResearcherCard.tsx      # Researcher profile card
│   ├── RevealSection.tsx       # Scroll-reveal section wrapper
│   ├── ScrollProgress.tsx      # Page scroll progress indicator
│   └── SearchBar.tsx           # Researcher search input
├── lib/
│   └── researchers.ts          # Data layer — loads JSON, filters, types (Researcher, Institution, Field)
├── data/                       # Static JSON data files
│   ├── researchers.json        # Researcher profiles from OpenAlex
│   ├── institutions.json       # Institution data
│   └── fields.json             # Research field taxonomy
├── public/
│   └── favicon.ico
├── fetch_openalex.py           # Python data ingestion from OpenAlex API
├── docs/
│   ├── FEATURES.md             # Feature register
│   └── ARCHITECTURE.md        # This file
├── CLAUDE.md                   # Claude Code context
├── AGENTS.md                   # Agent context
└── README.md                   # Quick start
```

---

## Data Model

```typescript
interface Researcher {
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
}
```

Data flows: OpenAlex API → `fetch_openalex.py` → `data/researchers.json` → `lib/researchers.ts` → page components.

---

## Page Routes

| Route | File | Purpose |
|---|---|---|
| `/` | `app/page.tsx` | Homepage: hero, platform stats, 6 featured researchers, field browser |
| `/researchers` | `app/researchers/` | Full researcher listing with search and filter |
| `/fields` | `app/fields/` | Research field taxonomy browser |

---

## Data Pipeline

The platform is static-data first. No real-time API calls on page load.

```
1. Run fetch_openalex.py
2. Script calls OpenAlex API — fetches researchers by institution, field, or query
3. Transforms to internal Researcher/Institution/Field schema
4. Writes to data/researchers.json, data/institutions.json, data/fields.json
5. Next.js reads JSON files at build time via lib/researchers.ts
6. Pages render with static data
```

To update data: run `python fetch_openalex.py`, then rebuild.

---

## Known Issues (as of 2026-05-26 — Rescue Rebuild Required)

This platform was built in a single session without a design spec, Sprint 0 scaffold, or component-by-component iteration. Known issues:

- **Broken buttons** — interactive elements have no onClick handlers or href values
- **Content overflow** — researcher cards overflow their containers on certain content lengths
- **Non-responsive** — no responsive breakpoint spec was given to Leo during build

**Resolution:** Full rescue rebuild following [[Platform Build Standard — AI-Assisted Iterative Development]]:
1. Phase 0: Write design note (vision brief + component inventory)
2. Sprint 0: Empty responsive skeleton at 3 breakpoints
3. Component sprints: one component per session with Leo Prompt Template
4. Bedivere Review before showing to Salter

---

## How to Run

```bash
npm install
npm run dev        # Development server at localhost:3000
npm run build      # Production build
npm run lint       # ESLint

# Update data
python fetch_openalex.py   # Requires Python 3 + OpenAlex API key in .env
```

---

*Architecture guide created: 2026-05-26 — documented during rescue rebuild planning*
