import Link from 'next/link'
import { Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-[#1F2937] mt-16">
      <div className="max-w-[1280px] mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-[#14B8A6]" />
          <span className="font-bold text-white text-sm" style={{fontFamily:'Space Grotesk'}}>HipaaRed AI</span>
        </div>
        <div className="flex flex-wrap gap-6 text-sm text-[#E9EEF5]/60">
          <Link href="#" className="hover:text-[#14B8A6] transition-colors">Privacy Policy</Link>
          <Link href="#" className="hover:text-[#14B8A6] transition-colors">Terms of Service</Link>
          <Link href="#" className="hover:text-[#14B8A6] transition-colors">Contact</Link>
          <Link href="#" className="hover:text-[#14B8A6] transition-colors">LinkedIn</Link>
          <Link href="#" className="hover:text-[#14B8A6] transition-colors">X (Twitter)</Link>
        </div>
        <p className="text-xs text-[#E9EEF5]/40">© 2025 HipaaRed AI. All rights reserved.</p>
      </div>
    </footer>
  )
}
