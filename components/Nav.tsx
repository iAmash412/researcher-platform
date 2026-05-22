/**
 * Floating pill navigation bar — Magnetto style.
 * Glassmorphism effect with blur backdrop, rounded pill shape.
 * Scrolls to solid on page scroll.
 */

'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Search, Menu, X } from 'lucide-react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`nav-pill fixed top-4 left-1/2 -translate-x-1/2 z-[10000] flex items-center justify-between px-6 py-3 w-[92%] max-w-[900px] ${
        scrolled ? 'nav-pill-scrolled' : ''
      }`}
    >
      {/* Logo */}
      <Link
        href="/"
        className="font-display italic text-xl tracking-tight text-foreground no-underline"
      >
        Researcher
      </Link>

      {/* Desktop links */}
      <div className="hidden md:flex items-center gap-6">
        <Link
          href="/researchers"
          className="text-sm font-medium text-text-body hover:text-foreground transition-colors no-underline"
        >
          Directory
        </Link>
        <Link
          href="/researchers"
          className="flex items-center gap-2 text-sm font-medium text-text-body hover:text-foreground transition-colors no-underline"
        >
          <Search size={14} />
          Search
        </Link>
        <Link href="/researchers" className="btn-accent text-sm !py-2.5 !px-5 no-underline">
          Explore
        </Link>
      </div>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden bg-transparent border-none cursor-pointer text-foreground"
        aria-label="Toggle menu"
      >
        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 nav-pill p-4 flex flex-col gap-3 md:hidden">
          <Link
            href="/researchers"
            className="text-sm font-medium text-text-body hover:text-foreground transition-colors no-underline py-2"
            onClick={() => setMobileOpen(false)}
          >
            Directory
          </Link>
          <Link
            href="/researchers"
            className="text-sm font-medium text-text-body hover:text-foreground transition-colors no-underline py-2"
            onClick={() => setMobileOpen(false)}
          >
            Search
          </Link>
          <Link
            href="/researchers"
            className="btn-accent text-sm !py-2.5 text-center no-underline"
            onClick={() => setMobileOpen(false)}
          >
            Explore
          </Link>
        </div>
      )}
    </nav>
  )
}
