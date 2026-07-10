import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Poetry Maker | Interactive Word Ripple Poetry',
  description: 'Create beautiful poetry through interactive word ripples. A classroom-friendly poetry creation tool.',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50">
        {children}
      </body>
    </html>
  )
}
