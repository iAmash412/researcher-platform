# Researcher Platform — Claude Code Context

## What This Project Is

Researcher visibility and discovery platform for Salter's venture.
Surfaces researcher profiles, institutions, and fields from the OpenAlex academic database.
Static data architecture — no auth, no real-time DB. Python ingestion script populates JSON files.

**Current state:** Built (May 2026) but broken — buttons not working, content overflow, non-responsive.
**Next action:** Rescue rebuild following the Platform Build Standard (Phase 0: design note first).

---

## Key Files

| File / Folder | What it does |
|---|---|
| `app/page.tsx` | Homepage — hero, stats, featured researchers, fields |
| `app/researchers/` | Researcher listing and individual profile pages |
| `app/fields/` | Research field taxonomy browser |
| `components/ResearcherCard.tsx` | Researcher profile card — broken, scheduled for rebuild |
| `components/SearchBar.tsx` | Search input — broken, no handler |
| `components/Nav.tsx` | Navigation bar — broken on mobile |
| `lib/researchers.ts` | Data layer — Researcher/Institution/Field types + filter functions |
| `data/researchers.json` | Static researcher data from OpenAlex |
| `data/institutions.json` | Institution data |
| `data/fields.json` | Research field taxonomy |
| `fetch_openalex.py` | Python data pipeline — fetches from OpenAlex API |
| `docs/FEATURES.md` | Feature register — every feature + status |
| `docs/ARCHITECTURE.md` | Full codebase guide |

---

## Rules

- **Mode Gate first** — Every coding session opens with: `[A]` Automated (Claude Code builds, Codex tests) or `[P]` Piloted (you code in Cursor, Claude Code orchestrates). One question before anything else.
- **Spec before code** — No feature is built without a design note and Leo Prompt Template first.
  This platform was built without a spec. Rescue rebuild starts with Phase 0 (design note with Salter).
- **One component per session** — Never build more than one component at a time.
- **Responsive first** — Every Leo prompt must include layout spec for 375px, 768px, 1440px.
- **No hardcoded secrets** — process.env.VARNAME only.
- **TypeScript must pass** — npx tsc --noEmit before any commit.
- **Ask before deploying** — No production deployment without explicit confirmation.
- **No auth** — Public directory. Do not add auth without Salter's decision.
- **Codex tests after each component** — Max 3 loops before surfacing a blocker.

---

## Tech Stack

Next.js (App Router) · TypeScript · Tailwind CSS · Lucide React · Static JSON data · OpenAlex API (Python ingestion)

---

## Commands

```bash
npm install         # Install dependencies
npm run dev         # Development server — localhost:3000
npm run build       # Production build
npm run lint        # ESLint
npx tsc --noEmit    # TypeScript check

# Update data
python fetch_openalex.py  # Requires Python 3 + API config in .env
```
