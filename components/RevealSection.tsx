/**
 * Simple wrapper div — no animations.
 */

import type { ReactNode } from 'react'

export default function RevealSection({
  children,
  className = '',
  style,
}: {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  )
}
