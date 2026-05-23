/**
 * Minimal site footer.
 */

import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-[13px] font-semibold text-foreground">
            Researcher
          </Link>
          <nav className="flex items-center gap-4" aria-label="Footer navigation">
            <Link href="/researchers" className="text-[12px] text-muted hover:text-foreground transition-colors">
              Directory
            </Link>
          </nav>
        </div>
        <p className="text-[11px] text-muted">
          Data from{' '}
          <a
            href="https://openalex.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            OpenAlex
          </a>
        </p>
      </div>
    </footer>
  )
}
