import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VermelhoAI — AI Red Teaming Platform',
  description: 'Professional AI red teaming for developers. Test your AI model against 60+ adversarial probes. Find vulnerabilities before your users do.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}