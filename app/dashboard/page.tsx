'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Shield, Plus, Download, Eye, ChevronDown, X, AlertTriangle, CheckCircle, Clock } from 'lucide-react'

const mockAudits = [
  { id: '1', date: '2025-11-12', system: 'Epic MyChart Chatbot', score: 78, status: 'High Risk' },
  { id: '2', date: '2025-11-08', system: 'Nuance DAX Scribe', score: 34, status: 'Low Risk' },
  { id: '3', date: '2025-10-30', system: 'Custom EHR GPT Wrapper', score: 61, status: 'Medium Risk' },
]

const riskColor = (s: string) => s === 'High Risk' ? 'text-red-400' : s === 'Medium Risk' ? 'text-yellow-400' : 'text-green-400'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState<{email:string,name:string}|null>(null)
  const [showBAA, setShowBAA] = useState(false)
  const [baaSigned, setBaaSigned] = useState(false)
  const [showNewAudit, setShowNewAudit] = useState(false)
  const [auditForm, setAuditForm] = useState({ url: '', apiKey: '', notes: '' })
  const [dropdownOpen, setDropdownOpen] = useState(false)

  useEffect(() => {
    const u = localStorage.getItem('hr_user')
    if (!u) { router.push('/signin'); return }
    setUser(JSON.parse(u))
  }, [router])

  const handleStartAudit = () => {
    if (!baaSigned) { setShowBAA(true) } else { setShowNewAudit(true) }
  }

  const handleSignBAA = () => { setBaaSigned(true); setShowBAA(false); setShowNewAudit(true) }

  const handleSubmitAudit = (e: React.FormEvent) => {
    e.preventDefault()
    router.push('/dashboard/report/1')
  }

  if (!user) return null

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <nav className="w-full border-b border-[#1F2937] bg-[#0B0D10]/90 backdrop-blur sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#14B8A6]" />
            <span className="font-bold text-white" style={{fontFamily:'Space Grotesk'}}>HipaaRed <span className="text-[#14B8A6]">AI</span></span>
          </Link>
          <div className="relative">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 text-[#E9EEF5] hover:text-white transition-colors">
              <div className="w-8 h-8 rounded-full bg-[#14B8A6]/20 border border-[#14B8A6]/40 flex items-center justify-center text-[#14B8A6] font-bold text-sm">
                {user.name[0]?.toUpperCase()}
              </div>
              <span className="text-sm hidden sm:block">{user.name}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 top-12 bg-[#1F2937] border border-[#374151] rounded-lg py-2 w-40 shadow-xl z-50">
                <button onClick={() => { localStorage.removeItem('hr_user'); router.push('/') }} className="w-full text-left px-4 py-2 text-sm text-[#E9EEF5]/70 hover:text-white hover:bg-[#374151] transition-colors">Sign Out</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <main className="max-w-[1280px] mx-auto px-6 py-10 w-full flex-1">
        {/* Welcome Banner */}
        <div className="card bg-gradient-to-r from-[#14B8A6]/10 to-transparent border-[#14B8A6]/40 mb-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-white" style={{fontFamily:'Space Grotesk'}}>Welcome back, {user.name}.</h1>
              <p className="text-[#E9EEF5]/60 mt-1">Ready to strengthen your AI compliance?</p>
            </div>
            <button onClick={handleStartAudit} className="btn-teal flex items-center gap-2 whitespace-nowrap">
              <Plus className="w-4 h-4" /> Start New Audit
            </button>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="flex items-start gap-3 bg-[#1F2937]/60 border border-yellow-500/20 rounded-lg p-4 mb-8">
          <AlertTriangle className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
          <p className="text-[#E9EEF5]/60 text-sm">
            <span className="text-yellow-400 font-medium">Free tier:</span> Synthetic data only. Real patient data permitted only after BAA is signed. All API keys and input data are auto-deleted after 24 hours. PDF reports are retained for download.
          </p>
        </div>

        {/* Past Audits */}
        <h2 className="text-xl font-bold text-white mb-4" style={{fontFamily:'Space Grotesk'}}>Past Audits</h2>
        <div className="card p-0 overflow-hidden mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#374151] text-[#E9EEF5]/50">
                <th className="text-left px-6 py-4 font-medium">Date</th>
                <th className="text-left px-6 py-4 font-medium">AI System</th>
                <th className="text-left px-6 py-4 font-medium">Risk Score</th>
                <th className="text-left px-6 py-4 font-medium">Status</th>
                <th className="text-left px-6 py-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockAudits.map((a, i) => (
                <tr key={a.id} className={`border-b border-[#374151]/50 hover:bg-[#374151]/20 transition-colors ${i === mockAudits.length-1 ? 'border-0' : ''}`}>
                  <td className="px-6 py-4 text-[#E9EEF5]/70">{a.date}</td>
                  <td className="px-6 py-4 text-white font-medium">{a.system}</td>
                  <td className="px-6 py-4">
                    <span className="font-bold text-white">{a.score}</span><span className="text-[#E9EEF5]/40">/100</span>
                  </td>
                  <td className={`px-6 py-4 font-medium ${riskColor(a.status)}`}>{a.status}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Link href={`/dashboard/report/${a.id}`}>
                        <button className="flex items-center gap-1 text-[#14B8A6] hover:underline text-xs font-medium">
                          <Eye className="w-3 h-3" /> View
                        </button>
                      </Link>
                      <button className="flex items-center gap-1 text-[#3B82F6] hover:underline text-xs font-medium">
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

      {/* BAA Modal */}
      {showBAA && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
          <div className="card max-w-lg w-full relative">
            <button onClick={() => setShowBAA(false)} className="absolute top-4 right-4 text-[#E9EEF5]/40 hover:text-white"><X className="w-5 h-5" /></button>
            <Shield className="w-8 h-8 text-[#14B8A6] mb-3" />
            <h2 className="text-xl font-bold text-white mb-2" style={{fontFamily:'Space Grotesk'}}>Business Associate Agreement</h2>
            <p className="text-[#E9EEF5]/60 text-sm mb-4">Before running audits with real patient data, you must sign a BAA as required by HIPAA 45 CFR §164.308.</p>
            <div className="bg-[#0B0D10] border border-[#374151] rounded-lg p-4 text-xs text-[#E9EEF5]/50 mb-6 h-40 overflow-y-auto leading-relaxed">
              This Business Associate Agreement ("BAA") is entered into between HipaaRed AI Inc. ("Business Associate") and the signing organization ("Covered Entity"). HipaaRed AI agrees to: (1) not use or disclose PHI except as permitted by this Agreement, (2) implement appropriate safeguards to prevent unauthorized use or disclosure, (3) report any breaches of PHI within 60 days, (4) ensure any subcontractors agree to the same restrictions, (5) make PHI available to the Secretary of HHS for audit purposes, (6) return or destroy all PHI upon termination. All data submitted is auto-deleted after 24 hours. PDF reports containing no PHI are retained. This agreement is effective upon electronic signature.
            </div>
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-5 h-5 text-[#14B8A6]" />
              <p className="text-sm text-[#E9EEF5]/70">By clicking below, you electronically sign this BAA on behalf of your organization.</p>
            </div>
            <button onClick={handleSignBAA} className="btn-teal w-full py-3">I Agree — Sign BAA Electronically</button>
          </div>
        </div>
      )}

      {/* New Audit Modal */}
      {showNewAudit && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center px-4">
          <div className="card max-w-lg w-full relative">
            <button onClick={() => setShowNewAudit(false)} className="absolute top-4 right-4 text-[#E9EEF5]/40 hover:text-white"><X className="w-5 h-5" /></button>
            <h2 className="text-xl font-bold text-white mb-1" style={{fontFamily:'Space Grotesk'}}>Start New Audit</h2>
            <p className="text-[#E9EEF5]/50 text-sm mb-6">Configure your medical AI endpoint for testing.</p>
            <form onSubmit={handleSubmitAudit} className="space-y-4">
              <div>
                <label className="text-sm text-[#E9EEF5]/70 mb-1 block">Medical AI Endpoint URL</label>
                <input required type="url" placeholder="https://your-ai-system.com/api/chat"
                  className="w-full bg-[#0B0D10] border border-[#1F2937] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#14B8A6] transition-colors"
                  value={auditForm.url} onChange={e => setAuditForm({...auditForm, url: e.target.value})} />
              </div>
              <div>
                <label className="text-sm text-[#E9EEF5]/70 mb-1 block">Temporary API Key</label>
                <input required type="password" placeholder="sk-••••••••••••••••"
                  className="w-full bg-[#0B0D10] border border-[#1F2937] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#14B8A6] transition-colors"
                  value={auditForm.apiKey} onChange={e => setAuditForm({...auditForm, apiKey: e.target.value})} />
                <div className="flex items-center gap-1 mt-1">
                  <Clock className="w-3 h-3 text-yellow-400" />
                  <p className="text-yellow-400 text-xs">Temporary only — auto-deleted after 24 hours.</p>
                </div>
              </div>
              <div>
                <label className="text-sm text-[#E9EEF5]/70 mb-1 block">Notes (optional)</label>
                <textarea placeholder="e.g. Epic MyChart patient portal chatbot"
                  className="w-full bg-[#0B0D10] border border-[#1F2937] rounded-lg px-4 py-3 text-white text-sm focus:outline-none focus:border-[#14B8A6] transition-colors resize-none h-20"
                  value={auditForm.notes} onChange={e => setAuditForm({...auditForm, notes: e.target.value})} />
              </div>
              <button type="submit" className="btn-teal w-full py-3">Launch Audit</button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
