'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Shield, Plus, Download, Eye, ChevronDown, X, AlertTriangle, CheckCircle, Clock, Loader2 } from 'lucide-react'

const F = { fontFamily: "'Nunito', sans-serif" }

const mockAudits = [
  { id: '1', date: '2025-11-12', system: 'Epic MyChart Chatbot', score: 78, status: 'High Risk' },
  { id: '2', date: '2025-11-08', system: 'Nuance DAX Scribe', score: 34, status: 'Low Risk' },
  { id: '3', date: '2025-10-30', system: 'Custom EHR GPT Wrapper', score: 61, status: 'Medium Risk' },
]

const riskColor = (s: string) =>
  s === 'High Risk' ? 'text-red-400' :
  s === 'Medium Risk' ? 'text-yellow-400' : 'text-green-400'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<{ email: string; name: string } | null>(null)
  const [loading, setLoading] = useState(true)
  const [showBAA, setShowBAA] = useState(false)
  const [baaSigned, setBaaSigned] = useState(false)
  const [showNewAudit, setShowNewAudit] = useState(false)
  const [auditForm, setAuditForm] = useState({ url: '', apiKey: '', notes: '' })
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isRunning, setIsRunning] = useState(false)
  const [auditError, setAuditError] = useState('')

  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => {
        if (!res.ok) { router.replace('/signin'); return null }
        return res.json()
      })
      .then(data => {
        if (data) {
          setUser(data)
          const baa = localStorage.getItem(`hr_baa_${data.email}`)
          if (baa) setBaaSigned(true)
        }
        setLoading(false)
      })
      .catch(() => { router.replace('/signin') })
  }, [router])

  const handleSignOut = async () => {
    await fetch('/api/auth/signout', { method: 'POST' })
    router.push('/')
  }

  const handleStartAudit = () => {
    if (!baaSigned) { setShowBAA(true) } else { setShowNewAudit(true) }
  }

  const handleSignBAA = () => {
    if (user) localStorage.setItem(`hr_baa_${user.email}`, 'true')
    setBaaSigned(true)
    setShowBAA(false)
    setShowNewAudit(true)
  }

  const handleSubmitAudit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsRunning(true)
    setAuditError('')
    try {
      const res = await fetch('/api/run-audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpointUrl: auditForm.url, apiKey: auditForm.apiKey }),
      })
      const data = await res.json()
      if (!res.ok) { setAuditError(data.error || 'Audit failed.'); setIsRunning(false); return }
      localStorage.setItem('hr_last_audit', JSON.stringify(data))
      setShowNewAudit(false)
      setIsRunning(false)
      router.push(`/dashboard/report/${data.auditId}`)
    } catch {
      setAuditError('Could not connect to audit engine. Please try again.')
      setIsRunning(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-radial flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-[#14B8A6] animate-spin" />
    </div>
  )

  if (!user) return null

  return (
    <div className="min-h-screen flex flex-col bg-radial">
      <nav className="w-full border-b border-[#14B8A6]/10 bg-[#080C14]/95 backdrop-blur sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#14B8A6]" />
            <span className="font-black text-white" style={F}>HipaaRed <span className="text-[#14B8A6]">AI</span></span>
          </Link>
          <div className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 text-[#E9EEF5] hover:text-white transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#14B8A6]/20 border border-[#14B8A6]/40 flex items-center justify-center text-[#14B8A6] font-black text-sm">
                {user.name[0]?.toUpperCase()}
              </div>
              <span className="text-sm hidden sm:block font-semibold" style={F}>{user.name}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-12 bg-[#111827] border border-[#374151] rounded-lg py-2 w-40 shadow-xl z-50">
                <button onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-sm text-[#E9EEF5]/70 hover:text-white hover:bg-[#374151] transition-colors font-semibold"
                  style={F}>Sign Out</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-[1280px] mx-auto px-6 py-10 w-full flex-1">
        <div className="card bg-gradient-to-r from-[#14B8A6]/10 to-transparent border-[#14B8A6]/40 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-black text-white" style={F}>Welcome back, {user.name}.</h1>
              <p className="text-[#E9EEF5]/60 mt-1 font-normal" style={F}>Ready to strengthen your AI compliance?</p>
            </div>
            <button onClick={handleStartAudit} className="btn-teal flex items-center gap-2 whitespace-nowrap">
              <Plus className="w-4 h-4" /> Start New Audit
            </button>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-[#111827]/60 border border-yellow-500/20 rounded-lg p-4 mb-8">
          <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
          <p className="text-[#E9EEF5]/60 text-sm font-normal" style={F}>
            <span className="text-yellow-400 font-bold">Synthetic data only.</span> All prompts use synthetic medical data. No real PHI is ever processed or stored. All input data auto-deletes after 24 hours. PDF reports are retained for download.
          </p>
        </div>

        <h2 className="text-xl font-black text-white mb-4" style={F}>Past Audits</h2>
        <div className="card p-0 overflow-hidden mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#374151] text-[#E9EEF5]/50">
                <th className="text-left px-6 py-4 font-bold" style={F}>Date</th>
                <th className="text-left px-6 py-4 font-bold" style={F}>AI System</th>
                <th className="text-left px-6 py-4 font-bold" style={F}>Risk Score</th>
                <th className="text-left px-6 py-4 font-bold" style={F}>Status</th>
                <th className="text-left px-6 py-4 font-bold" style={F}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockAudits.map((a, i) => (
                <tr key={a.id} className={`border-b border-[#374151]/50 hover:bg-[#374151]/20 transition-colors ${i === mockAudits.length - 1 ? 'border-0' : ''}`}>
                  <td className="px-6 py-4 text-[#E9EEF5]/70 font-semibold" style={F}>{a.date}</td>
                  <td className="px-6 py-4 text-white font-bold" style={F}>{a.system}</td>
                  <td className="px-6 py-4">
                    <span className="font-black text-white" style={F}>{a.score}</span>
                    <span className="text-[#E9EEF5]/40 font-semibold" style={F}>/100</span>
                  </td>
                  <td className={`px-6 py-4 font-bold ${riskColor(a.status)}`} style={F}>{a.status}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Link href={`/dashboard/report/${a.id}`}>
                        <button className="flex items-center gap-1 text-[#14B8A6] hover:underline text-xs font-bold" style={F}>
                          <Eye className="w-3 h-3" /> View
                        </button>
                      </Link>
                      <button className="flex items-center gap-1 text-[#3B82F6] hover:underline text-xs font-bold" style={F}>
                        <Download className="w-3 h-3" /> PDF
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>

      {showBAA && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
          <div className="card max-w-lg w-full relative">
            <button onClick={() => setShowBAA(false)} className="absolute top-4 right-4 text-[#E9EEF5]/40 hover:text-white"><X className="w-5 h-5" /></button>
            <Shield className="w-8 h-8 text-[#14B8A6] mb-3" />
            <h2 className="text-xl font-black text-white mb-2" style={F}>Business Associate Agreement</h2>
            <p className="text-[#E9EEF5]/60 text-sm mb-4 font-normal" style={F}>Before running audits, you must sign a BAA as required by HIPAA 45 CFR §164.308.</p>
            <div className="bg-[#080C14] border border-[#374151] rounded-lg p-4 text-xs text-[#E9EEF5]/50 mb-6 h-40 overflow-y-auto leading-relaxed font-normal" style={F}>
              This Business Associate Agreement is entered into between HipaaRed AI Inc. and the signing organization. HipaaRed AI agrees to: (1) not use or disclose PHI except as permitted, (2) implement appropriate safeguards, (3) report any breaches within 60 days, (4) ensure subcontractors agree to the same restrictions, (5) return or destroy all data upon termination. All testing uses synthetic data only. Input data auto-deletes after 24 hours. PDF reports containing no PHI are retained. This agreement is effective upon electronic signature.
            </div>
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-5 h-5 text-[#14B8A6]" />
              <p className="text-sm text-[#E9EEF5]/70 font-semibold" style={F}>By clicking below, you electronically sign this BAA on behalf of your organization.</p>
            </div>
            <button onClick={handleSignBAA} className="btn-teal w-full py-3">I Agree — Sign BAA Electronically</button>
          </div>
        </div>
      )}

      {showNewAudit && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
          <div className="card max-w-lg w-full relative">
            <button onClick={() => { setShowNewAudit(false); setAuditError('') }} className="absolute top-4 right-4 text-[#E9EEF5]/40 hover:text-white"><X className="w-5 h-5" /></button>
            <h2 className="text-xl font-black text-white mb-1" style={F}>Start New Audit</h2>
            <p className="text-[#E9EEF5]/50 text-sm mb-6 font-normal" style={F}>Enter your medical AI endpoint. All testing uses synthetic data only.</p>
            <form onSubmit={handleSubmitAudit} className="space-y-4">
              <div>
                <label className="text-sm text-[#E9EEF5]/70 mb-1 block font-bold" style={F}>Medical AI Endpoint URL</label>
                <input required type="url" placeholder="https://your-ai-system.com/api/chat"
                  className="w-full bg-[#080C14] border border-[#1F2937] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#14B8A6] transition-colors"
                  style={F} value={auditForm.url}
                  onChange={e => setAuditForm({ ...auditForm, url: e.target.value })} />
              </div>
              <div>
                <label className="text-sm text-[#E9EEF5]/70 mb-1 block font-bold" style={F}>Temporary API Key</label>
                <input required type="password" placeholder="Your temporary API key"
                  className="w-full bg-[#080C14] border border-[#1F2937] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#14B8A6] transition-colors"
                  style={F} value={auditForm.apiKey}
                  onChange={e => setAuditForm({ ...auditForm, apiKey: e.target.value })} />
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3 text-yellow-400" />
                  <p className="text-yellow-400 text-xs font-bold" style={F}>Auto-deleted after 24 hours.</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-[#E9EEF5]/70 mb-1 block font-bold" style={F}>Notes (optional)</label>
                <textarea placeholder="e.g. Epic MyChart patient portal chatbot"
                  className="w-full bg-[#080C14] border border-[#1F2937] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#14B8A6] transition-colors resize-none h-20"
                  style={F} value={auditForm.notes}
                  onChange={e => setAuditForm({ ...auditForm, notes: e.target.value })} />
              </div>
              {auditError && <p className="text-red-400 text-sm font-semibold" style={F}>{auditError}</p>}
              <button type="submit" disabled={isRunning} className="btn-teal w-full py-3 flex items-center justify-center gap-2 disabled:opacity-60">
                {isRunning ? <><Loader2 className="w-4 h-4 animate-spin" /> Running Audit...</> : 'Launch Audit'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
