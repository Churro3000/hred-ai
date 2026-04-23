'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Shield } from 'lucide-react'

export default function SignInPage() {
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
        setError(data.error || 'Sign in failed.')
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
    <div className="min-h-screen bg-[#F5F5F0] flex flex-col items-center justify-center px-4">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <Shield className="w-7 h-7 text-[#CC1A1A]" strokeWidth={2} />
        <span className="font-bold text-lg text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
          Vermelho<span className="text-[#CC1A1A]">AI</span>
        </span>
      </Link>

      <div className="card w-full max-w-md">
        <h1 className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
          Welcome back
        </h1>
        <p className="text-gray-500 text-sm mb-7">Sign in to your VermelhoAI account.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Email address</label>
            <input
              type="email"
              required
              placeholder="you@company.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-[#CC1A1A] transition-colors"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1.5 block">Password</label>
            <input
              type="password"
              required
              placeholder="Your password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-[#CC1A1A] transition-colors"
            />
          </div>
          {error && <p className="text-[#CC1A1A] text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="btn-red w-full justify-center py-3 disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-5 text-center space-y-2">
          <p className="text-gray-500 text-sm">
            Need an account?{' '}
            <Link href="/signup" className="text-[#CC1A1A] font-medium hover:underline">Get started free</Link>
          </p>
          <Link href="/" className="text-gray-400 text-sm hover:text-gray-600 transition-colors block">
            ← Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}