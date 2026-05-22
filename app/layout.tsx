import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Instrument_Serif } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const instrumentSerif = Instrument_Serif({
  subsets: ['latin'],
  weight: ['400'],
  style: ['normal', 'italic'],
  variable: '--font-instrument',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Researcher Platform — Discover Academic Researchers',
  description:
    'The directory that makes academic researchers discoverable. Browse researchers by institution, field, and impact. Built from the inside of the research world.',
  keywords: [
    'researcher directory',
    'academic researchers',
    'research visibility',
    'university researchers',
    'research collaboration',
    'h-index',
    'Brown University',
    'Ivy League research',
  ],
  authors: [{ name: 'Salter Arms' }],
  openGraph: {
    title: 'Researcher Platform — Discover Academic Researchers',
    description: 'The directory that makes academic researchers discoverable.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <body className="antialiased">{children}</body>
    </html>
  )
}
