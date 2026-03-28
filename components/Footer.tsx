import Link from 'next/link'
import { Shield } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t border-[#14B8A6]/10 mt-16 bg-[#080C14]">
      <div className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-5 h-5 text-[#14B8A6]" />
              <span className="text-white font-black text-base" style={{fontFamily:"'Nunito', sans-serif"}}>HipaaRed <span className="text-[#14B8A6]">AI</span></span>
            </div>
            <p className="text-[#E9EEF5]/40 text-xs leading-relaxed" style={{fontFamily:"'Nunito', sans-serif"}}>
              Automated AI red teaming for HIPAA compliance. Built for hospitals, clinics, and health tech teams.
            </p>
          </div>

          <div>
            <h4 className="text-white text-sm font-black mb-4" style={{fontFamily:"'Nunito', sans-serif"}}>Legal</h4>
            <ul className="space-y-2.5">
              {['Privacy Policy', 'Terms of Service', 'BAA Template', 'Cookie Policy'].map(item => (
                <li key={item}>
                  <Link href="#" className="text-[#E9EEF5]/50 text-sm font-semibold hover:text-[#14B8A6] transition-colors" style={{fontFamily:"'Nunito', sans-serif"}}>{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-black mb-4" style={{fontFamily:"'Nunito', sans-serif"}}>Contact</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'hello@hipaared.ai', href: 'mailto:hello@hipaared.ai' },
                { label: 'Support', href: '#' },
                { label: 'Enterprise Inquiries', href: '#' },
              ].map(item => (
                <li key={item.label}>
                  <Link href={item.href} className="text-[#E9EEF5]/50 text-sm font-semibold hover:text-[#14B8A6] transition-colors" style={{fontFamily:"'Nunito', sans-serif"}}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white text-sm font-black mb-4" style={{fontFamily:"'Nunito', sans-serif"}}>Follow Us</h4>
            <div className="flex gap-3">
              <Link href="#" className="w-9 h-9 rounded-lg bg-[#111827] border border-[#14B8A6]/20 flex items-center justify-center hover:border-[#14B8A6] hover:bg-[#14B8A6]/10 transition-all group">
                <svg className="w-4 h-4 text-[#E9EEF5]/50 group-hover:text-[#14B8A6] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </Link>
              <Link href="#" className="w-9 h-9 rounded-lg bg-[#111827] border border-[#14B8A6]/20 flex items-center justify-center hover:border-[#14B8A6] hover:bg-[#14B8A6]/10 transition-all group">
                <svg className="w-4 h-4 text-[#E9EEF5]/50 group-hover:text-[#14B8A6] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.629 5.905-5.629zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-[#14B8A6]/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#E9EEF5]/30 text-xs font-semibold" style={{fontFamily:"'Nunito', sans-serif"}}>© 2025 HipaaRed AI Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
