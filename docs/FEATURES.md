# Researcher Platform — Feature Register

> **Source of truth** for every feature in the Researcher Visibility & Connection Platform.
> Update the moment a feature ships — not at end of session.
> Format: `| ID | Feature | Status | Commit / PR | Date | Description |`

## Status Legend

| Badge | Meaning |
|---|---|
| ✅ Live | Shipped and working |
| ⚠️ Broken | Built but has known issues (see description) |
| 🔄 Rebuild | Scheduled for rescue rebuild |
| 📋 Planned | On the build plan |
| 💡 Backlog | Identified but not yet scheduled |

---

## Infrastructure

| ID | Feature | Status | Commit / PR | Date | Description |
|---|---|---|---|---|---|
| F-000 | Repo scaffold | ✅ Live | — | 2026-05 | Next.js App Router + TypeScript + Tailwind. CLAUDE.md, AGENTS.md, README.md present. No docs/ folder at time of build — created 2026-05-26. |
| F-001 | OpenAlex data pipeline | ✅ Live | — | 2026-05 | `fetch_openalex.py` — fetches researchers from OpenAlex API. Outputs to `data/researchers.json`, `institutions.json`, `fields.json`. |
| F-002 | Data layer | ✅ Live | — | 2026-05 | `lib/researchers.ts` — loads static JSON, provides typed Researcher/Institution/Field interfaces + filter/sort functions. |

---

## Pages & Navigation

| ID | Feature | Status | Commit / PR | Date | Description |
|---|---|---|---|---|---|
| F-010 | Homepage | ⚠️ Broken | — | 2026-05 | `app/page.tsx` — hero section, platform stats, 6 featured researchers, field browser. Layout issues. Scheduled for rebuild. |
| F-011 | Researcher listing | ⚠️ Broken | — | 2026-05 | `app/researchers/` — full researcher listing. Content overflow on cards. Non-responsive. |
| F-012 | Field browser | ⚠️ Broken | — | 2026-05 | `app/fields/` — research field taxonomy browser. Non-responsive. |
| F-013 | Navigation bar | 🔄 Rebuild | — | 2026-05 | `components/Nav.tsx` — site navigation. Broken on mobile. |
| F-014 | Footer | 🔄 Rebuild | — | 2026-05 | `components/Footer.tsx` — site footer. |
| F-015 | SEO — robots.txt + sitemap | ✅ Live | — | 2026-05 | `app/robots.ts` + `app/sitemap.ts` — auto-generated. |

---

## Components

| ID | Feature | Status | Commit / PR | Date | Description |
|---|---|---|---|---|---|
| F-020 | ResearcherCard | ⚠️ Broken | — | 2026-05 | `components/ResearcherCard.tsx` — researcher profile card. Content overflow on long names/bios. Buttons not working. Scheduled for rebuild with Leo Prompt Template. |
| F-021 | SearchBar | ⚠️ Broken | — | 2026-05 | `components/SearchBar.tsx` — researcher search input. No working search handler. |
| F-022 | RevealSection | ✅ Live | — | 2026-05 | `components/RevealSection.tsx` — scroll-reveal animation wrapper. |
| F-023 | ScrollProgress | ✅ Live | — | 2026-05 | `components/ScrollProgress.tsx` — page scroll progress indicator. |

---

## Planned Features (Post-Rebuild)

| ID | Feature | Status | Notes |
|---|---|---|---|
| F-030 | Researcher profiles — full pages | 📋 Planned | `/researchers/[slug]` — individual researcher profile page with all fields, topics, publications. |
| F-031 | Working search + filter | 📋 Planned | Real-time search by name, institution, field. Filter by career stage, country, h-index. |
| F-032 | Collaboration request | 📋 Planned | Contact/connect button on researcher profiles. Method TBD (email, form, external link). |
| F-033 | Admin dashboard | 📋 Planned | Institutional visibility dashboard for research admins. |
| F-034 | Privacy controls | 📋 Planned | Researcher opt-in/opt-out of visibility. Scooping protection for active projects. |
| F-035 | Researcher self-registration | 📋 Planned | Researchers claim/edit their own profiles. |

---

## Rescue Rebuild Plan

All ⚠️ Broken and 🔄 Rebuild items are being addressed through the [[Platform Build Standard — AI-Assisted Iterative Development]] rescue protocol:

**Phase 0 (next):** Write design note — vision brief (8 questions with Salter) + component inventory
**Sprint 0:** Empty responsive skeleton at 375px / 768px / 1440px
**Sprint 1:** Nav.tsx — rebuilt with Leo Prompt Template
**Sprint 2:** ResearcherCard — rebuilt with content constraints + responsive spec
**Sprint 3:** SearchBar — rebuilt with working handler + interactive states
**Sprint 4:** Homepage assembly
**Sprint 5:** Researcher listing page
**Sprint 6:** Field browser
**Bedivere Review** → share with Salter

---

*Feature register created: 2026-05-26 — retroactively documented from built (broken) platform*
