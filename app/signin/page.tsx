'use client'
import Link from 'next/link'
import { Shield } from 'lucide-react'
import { SignIn } from '@clerk/nextjs'

const F = { fontFamily: "'Nunito', sans-serif" }

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-radial flex flex-col items-center justify-center px-4">
      <Link href="/" className="flex items-center gap-2 mb-10">
        <Shield className="w-6 h-6 text-[#14B8A6]" />
        <span className="text-white font-black text-lg" style={F}>HipaaRed <span className="text-[#14B8A6]">AI</span></span>
      </Link>
      <SignIn
        forceRedirectUrl="/dashboard"
        fallbackRedirectUrl="/dashboard"
        appearance={{
          elements: {
            rootBox: 'w-full max-w-md',
            card: 'bg-[#111827] border border-[#14B8A6]/25 rounded-2xl shadow-xl',
            headerTitle: 'text-white font-black',
            headerSubtitle: 'text-[#E9EEF5]/50',
            formFieldLabel: 'text-[#E9EEF5]/70 font-bold text-sm',
            formFieldInput: 'bg-[#080C14] border-[#1F2937] text-white rounded-lg',
            formButtonPrimary: 'bg-[#14B8A6] hover:bg-[#0f9e8e] font-bold rounded-lg',
            footerActionLink: 'text-[#14B8A6] font-bold',
          }
        }}
      />
      <p className="mt-6">
        <Link href="/" className="text-[#E9EEF5]/35 text-sm font-semibold hover:text-[#14B8A6] transition-colors" style={F}>Back to Home</Link>
      </p>
    </div>
  )
}
