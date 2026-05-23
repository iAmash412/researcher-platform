import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Researcher Platform — Discover Academic Researchers',
  description:
    'The directory that makes academic researchers discoverable. Browse researchers by institution, field, and impact.',
  keywords: [
    'researcher directory',
    'academic researchers',
    'research visibility',
    'h-index',
    'Brown University',
  ],
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
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased font-sans">{children}</body>
    </html>
  )
}
