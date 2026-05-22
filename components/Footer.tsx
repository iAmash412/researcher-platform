/**
 * Site footer — minimal, Magnetto style.
 */

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="py-16 px-6 text-center">
      <div className="max-w-[900px] mx-auto">
        <Link
          href="/"
          className="font-display italic text-2xl text-foreground no-underline"
        >
          Researcher
        </Link>
        <p className="text-[13px] text-muted mt-3 mb-8">
          Making academic researchers discoverable.
          <br />
          Built from the inside of the research world.
        </p>

        <div className="flex justify-center gap-6 mb-8">
          <Link
            href="/researchers"
            className="text-[13px] text-text-body hover:text-accent transition-colors no-underline"
          >
            Directory
          </Link>
          <Link
            href="/researchers"
            className="text-[13px] text-text-body hover:text-accent transition-colors no-underline"
          >
            Search
          </Link>
        </div>

        <div className="pt-6 border-t border-[rgba(0,0,0,0.06)]">
          <p className="text-[11px] text-muted tracking-wider">
            Data sourced from{' '}
            <a
              href="https://openalex.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-light transition-colors no-underline"
            >
              OpenAlex
            </a>{' '}
            — an open catalog of the global research system.
          </p>
        </div>
      </div>
    </footer>
  )
}
