/**
 * ScrollProgress — drives the #scroll-progress bar at the top of the page.
 * Reads scroll position and updates the scaleX transform of the bar element.
 */

'use client'

import { useEffect } from 'react'

export default function ScrollProgress() {
  useEffect(() => {
    const bar = document.getElementById('scroll-progress') as HTMLElement | null
    const onScroll = () => {
      const sy = window.scrollY
      const total = document.body.scrollHeight - window.innerHeight
      if (bar) bar.style.transform = `scaleX(${total > 0 ? sy / total : 0})`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return null
}
