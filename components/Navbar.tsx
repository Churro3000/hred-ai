'use client'
import Link from 'next/link'
import { Shield } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="w-full border-b border-[#14B8A6]/10 bg-[#080C14]/95 backdrop-blur sticky top-0 z-50">
      <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 ml-1">
          <Shield className="w-6 h-6 text-[#14B8A6]" />
          <span style={{fontFamily:'Montserrat, sans-serif', fontWeight:800, fontSize:'1.15rem', letterSpacing:'-0.02em'}} className="text-white">
            HipaaRed <span className="text-[#14B8A6]">AI</span>
          </span>
        </Link>
        <div className="flex items-center gap-5 mr-1">
          <Link href="/signin" className="text-[#E9EEF5]/80 hover:text-white text-sm font-medium transition-colors" style={{fontFamily:'Montserrat'}}>Sign In</Link>
          <Link href="/signup">
            <button className="btn-teal text-sm px-5 py-2.5">Get Started</button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
