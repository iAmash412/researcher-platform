/**
 * Floating pill navigation bar — Magnetto style.
 * Glassmorphism effect with blur backdrop, rounded pill shape.
 * Scrolls to solid on page scroll. Body scroll lock on mobile menu.
 */

'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Search, Menu, X } from 'lucide-react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Body scroll lock when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const isDirectory = pathname === '/researchers' || pathname.startsWith('/researchers/')
  const isField = pathname.startsWith('/fields/')

  return (
    <>
      {/* Overlay behind mobile menu */}
      <div
        className={`nav-overlay md:hidden ${mobileOpen ? 'nav-overlay-visible' : ''}`}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />

      <nav
        className={`nav-pill fixed top-4 left-1/2 -translate-x-1/2 flex items-center justify-between px-4 sm:px-6 py-3 w-[94%] sm:w-[92%] max-w-[900px] ${
          scrolled ? 'nav-pill-scrolled' : ''
        }`}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link
          href="/"
          className="font-display italic text-xl tracking-tight text-foreground"
          aria-label="Researcher Platform home"
        >
          Researcher
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/researchers"
            className={`text-sm font-medium transition-colors ${
              isDirectory || isField
                ? 'text-foreground font-semibold'
                : 'text-text-body hover:text-foreground'
            }`}
            aria-current={isDirectory ? 'page' : undefined}
          >
            Directory
          </Link>
          <Link
            href="/researchers"
            className="flex items-center gap-2 text-sm font-medium text-text-body hover:text-foreground transition-colors"
          >
            <Search size={14} aria-hidden="true" />
            Search
          </Link>
          <Link href="/researchers" className="btn-accent text-sm !py-2.5 !px-5">
            Explore
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden bg-transparent border-none cursor-pointer text-foreground"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Mobile menu with transition */}
        <div
          className={`nav-mobile-menu absolute top-full left-0 right-0 mt-2 nav-pill p-4 flex flex-col gap-3 md:hidden ${
            mobileOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          }`}
          aria-hidden={!mobileOpen}
        >
          <Link
            href="/researchers"
            className={`text-sm font-medium transition-colors py-2 ${
              isDirectory ? 'text-foreground font-semibold' : 'text-text-body hover:text-foreground'
            }`}
            onClick={() => setMobileOpen(false)}
            aria-current={isDirectory ? 'page' : undefined}
          >
            Directory
          </Link>
          <Link
            href="/researchers"
            className="text-sm font-medium text-text-body hover:text-foreground transition-colors py-2"
            onClick={() => setMobileOpen(false)}
          >
            Search
          </Link>
          <Link
            href="/researchers"
            className="btn-accent text-sm !py-2.5 text-center"
            onClick={() => setMobileOpen(false)}
          >
            Explore
          </Link>
        </div>
      </nav>
    </>
  )
}
