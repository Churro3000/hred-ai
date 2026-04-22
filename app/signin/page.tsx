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

      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 bg-[#CC1A1A] rounded-lg flex items-center justify-center">
          <Shield className="w-4 h-4 text-white" />
        </div>
        <span className="font-black text-xl text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
          Vermelho<span className="text-[#CC1A1A]">AI</span>
        </span>
      </Link>

      {/* Card */}
      <div className="card w-full max-w-md">
        <h1 className="text-2xl font-black text-gray-900 mb-1" style={{ fontFamily: 'var(--font-display)' }}>
          Welcome back
        </h1>
        <p className="text-gray-500 text-sm mb-8">Sign in to your VermelhoAI account.</p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
              Email address
            </label>
            <input
              type="email"
              required
              placeholder="you@company.com"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-[#CC1A1A] transition-colors"
            />
          </div>
          <div>
            <label className="text-sm font-semibold text-gray-700 mb-1.5 block">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="Your password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-[#CC1A1A] transition-colors"
            />
          </div>

          {error && (
            <p className="text-[#CC1A1A] text-sm font-semibold">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-red w-full justify-center py-3.5 disabled:opacity-60"
          >
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          <p className="text-gray-500 text-sm">
            Need an account?{' '}
            <Link href="/signup" className="text-[#CC1A1A] font-semibold hover:underline">
              Get started free
            </Link>
          </p>
          <p>
            <Link href="/" className="text-gray-400 text-sm hover:text-gray-600 transition-colors">
              ← Back to home
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}