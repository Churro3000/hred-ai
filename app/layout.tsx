import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'HipaaRed AI — Medical AI Red Teaming Platform',
  description: 'Automated AI red teaming for HIPAA compliance. Test medical AI for PHI leakage, jailbreaks, and data extraction.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-radial min-h-screen">{children}</body>
    </html>
  )
}
