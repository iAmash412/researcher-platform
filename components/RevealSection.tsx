/**
 * RevealSection — IntersectionObserver-based scroll-reveal wrapper.
 * Adds the `visible` class to all children with `.reveal` when the
 * section enters the viewport. One-shot (disconnects after firing).
 *
 * Usage:
 *   <RevealSection>
 *     <h2 className="reveal reveal-d1">...</h2>
 *     <p  className="reveal reveal-d2">...</p>
 *   </RevealSection>
 */

'use client'

import { useEffect, useRef, type ReactNode } from 'react'

export default function RevealSection({
  children,
  className = '',
  style,
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  as?: 'div' | 'section'
}) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.querySelectorAll('.reveal').forEach((r) =>
            r.classList.add('visible'),
          )
          obs.disconnect()
        }
      },
      { threshold: 0.06 },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} className={className} style={style}>
      {children}
    </Tag>
  )
}
