/**
 * Simple top navigation bar.
 */

'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Nav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const isDirectory = pathname.startsWith('/researchers') || pathname.startsWith('/fields')

  return (
    <nav className="sticky top-0 z-50 bg-white/60 backdrop-blur-xl border-b border-black/[0.06]">
      <div className="max-w-[1200px] mx-auto flex items-center justify-between h-16 px-6">
        <Link href="/" className="text-[15px] font-semibold tracking-tight">
          Researcher
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            href="/researchers"
            aria-current={isDirectory ? 'page' : undefined}
            className={`text-[13px] transition-colors ${
              isDirectory ? 'text-foreground font-medium' : 'text-muted hover:text-foreground'
            }`}
          >
            Directory
          </Link>
          <Link href="/researchers" className="btn-primary text-[12px] !py-2 !px-4">
            Explore
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden bg-transparent border-none cursor-pointer text-foreground min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
        >
          {open ? <X size={20} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-black/[0.06] px-6 py-4 bg-white/90 backdrop-blur-lg flex flex-col gap-2">
          <Link
            href="/researchers"
            className="text-[13px] py-2 text-foreground"
            onClick={() => setOpen(false)}
          >
            Directory
          </Link>
          <Link
            href="/researchers"
            className="btn-primary text-[12px] text-center mt-1"
            onClick={() => setOpen(false)}
          >
            Explore
          </Link>
        </div>
      )}
    </nav>
  )
}
