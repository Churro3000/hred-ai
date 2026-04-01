'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Shield } from 'lucide-react'

const F = { fontFamily: "'Nunito', sans-serif" }

export default function SignIn() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error ?? 'Sign in failed.')
        setLoading(false)
        return
      }

      router.push('/dashboard')
    } catch {
      setError('Sign in failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-radial flex flex-col items-center justify-center px-4">
      <Link href="/" className="flex items-center gap-2 mb-10">
        <Shield className="w-6 h-6 text-[#14B8A6]" />
        <span className="text-white font-black text-lg" style={F}>HipaaRed <span className="text-[#14B8A6]">AI</span></span>
      </Link>
      <div className="card w-full max-w-md">
        <h1 className="text-2xl font-black text-white mb-1" style={F}>Welcome back</h1>
        <p className="text-[#E9EEF5]/45 text-sm mb-8 font-normal" style={F}>Sign in to your HipaaRed AI account.</p>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm text-[#E9EEF5]/65 mb-1.5 block font-bold" style={F}>Work email address</label>
            <input type="email" required
              className="w-full bg-[#080C14] border border-[#1F2937] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#14B8A6] transition-colors"
              style={F} placeholder="dr.smith@memorial-health.com"
              value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label className="text-sm text-[#E9EEF5]/65 mb-1.5 block font-bold" style={F}>Password</label>
            <input type="password" required
              className="w-full bg-[#080C14] border border-[#1F2937] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#14B8A6] transition-colors"
              style={F} placeholder="Your password"
              value={form.password} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div className="text-right">
            <Link href="#" className="text-[#14B8A6] text-sm font-bold hover:underline" style={F}>Forgot password?</Link>
          </div>
          {error && <p className="text-red-400 text-sm font-semibold" style={F}>{error}</p>}
          <button type="submit" disabled={loading}
            className="btn-teal w-full py-3.5 disabled:opacity-60">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <div className="mt-6 text-center space-y-2">
          <p className="text-[#E9EEF5]/45 text-sm font-semibold" style={F}>Need an account? <Link href="/signup" className="text-[#14B8A6] hover:underline">Get Started</Link></p>
          <p><Link href="/" className="text-[#E9EEF5]/35 text-sm font-semibold hover:text-[#14B8A6] transition-colors" style={F}>Back to Home</Link></p>
        </div>
      </div>
    </div>
  )
}
