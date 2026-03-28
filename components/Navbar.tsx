'use client'
import Link from 'next/link'
import { Shield } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="w-full border-b border-[#1F2937] bg-[#0B0D10]/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-[#14B8A6]/10 border border-[#14B8A6] rounded-lg flex items-center justify-center">
            <Shield className="w-5 h-5 text-[#14B8A6]" />
          </div>
          <span className="font-bold text-white text-lg" style={{fontFamily:'Space Grotesk, sans-serif'}}>HipaaRed <span className="text-[#14B8A6]">AI</span></span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/signin" className="text-[#E9EEF5] hover:text-white text-sm font-medium transition-colors">Sign In</Link>
          <Link href="/signup">
            <button className="btn-blue text-sm px-5 py-2">Get Started</button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
