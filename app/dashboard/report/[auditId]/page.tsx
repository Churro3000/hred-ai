'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Shield, Download, ArrowLeft, AlertTriangle, CheckCircle, XCircle, Loader2 } from 'lucide-react'

const F = { fontFamily: "'Nunito', sans-serif" }

interface AttackResult {
  id: string
  category: string
  prompt: string
  response: string
  vulnerable: boolean
  reason: string
}

interface AuditData {
  auditId: string
  timestamp: string
  riskScore: number
  riskLevel: string
  totalProbes: number
  vulnerabilitiesFound: number
  results: AttackResult[]
}

const categoryColor: Record<string, string> = {
  'PHI Leakage': 'text-red-400 bg-red-400/10 border-red-400/30',
  'Jailbreak': 'text-orange-400 bg-orange-400/10 border-orange-400/30',
  'Prompt Injection': 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  'Data Extraction': 'text-red-400 bg-red-400/10 border-red-400/30',
  'Multi-Turn Attack': 'text-purple-400 bg-purple-400/10 border-purple-400/30',
}

export default function ReportPage() {
  const [audit, setAudit] = useState<AuditData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const stored = localStorage.getItem('hr_last_audit')
    if (stored) setAudit(JSON.parse(stored))
    setLoading(false)
  }, [])

  if (loading) return (
    <div className="min-h-screen bg-radial flex items-center justify-center">
      <Loader2 className="w-8 h-8 text-[#14B8A6] animate-spin" />
    </div>
  )

  const score = audit?.riskScore ?? 78
  const riskLevel = audit?.riskLevel ?? 'High Risk'
  const gaugeColor = score >= 70 ? '#ef4444' : score >= 40 ? '#eab308' : '#22c55e'
  const results = audit?.results ?? []
  const vulnCount = audit?.vulnerabilitiesFound ?? 0
  const totalProbes = audit?.totalProbes ?? 0
  const passCount = totalProbes - vulnCount

  return (
    <div className="min-h-screen flex flex-col bg-radial">
      <nav className="w-full border-b border-[#14B8A6]/10 bg-[#080C14]/95 backdrop-blur sticky top-0 z-40">
        <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-[#14B8A6]" />
            <span className="font-black text-white" style={F}>HipaaRed <span className="text-[#14B8A6]">AI</span></span>
          </Link>
          <Link href="/dashboard">
            <button className="flex items-center gap-2 text-[#E9EEF5]/60 hover:text-white text-sm transition-colors font-bold" style={F}>
              <ArrowLeft className="w-4 h-4" /> Dashboard
            </button>
          </Link>
        </div>
      </nav>

      <main className="max-w-[1280px] mx-auto px-6 py-10 w-full flex-1">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div>
            <p className="text-[#E9EEF5]/50 text-sm mb-1 font-semibold" style={F}>
              Audit Report · {audit ? new Date(audit.timestamp).toLocaleDateString() : 'Sample'}
            </p>
            <h1 className="text-3xl font-black text-white" style={F}>HIPAA AI Security Audit</h1>
            <p className="text-[#E9EEF5]/50 text-sm mt-1 font-semibold" style={F}>
              HHS 2026 AI Compliance Evidence · ID: {audit?.auditId ?? 'HR-SAMPLE'}
            </p>
          </div>
          <button className="btn-teal flex items-center gap-2 text-sm py-2 px-4">
            <Download className="w-4 h-4" /> Download PDF
          </button>
        </div>

        <div className="card mb-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex flex-col items-center">
              <div className="relative w-36 h-36">
                <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
                  <circle cx="50" cy="50" r="42" fill="none" stroke="#1F2937" strokeWidth="10" />
                  <circle cx="50" cy="50" r="42" fill="none" stroke={gaugeColor} strokeWidth="10"
                    strokeDasharray={`${(score / 100) * 264} 264`} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-black text-white" style={F}>{score}</span>
                  <span className="text-xs text-[#E9EEF5]/50 font-semibold" style={F}>/100</span>
                </div>
              </div>
              <p className={`font-black mt-2 ${score >= 70 ? 'text-red-400' : score >= 40 ? 'text-yellow-400' : 'text-green-400'}`} style={F}>{riskLevel}</p>
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-black text-white mb-3" style={F}>Executive Summary</h2>
              <p className="text-[#E9EEF5]/60 text-sm leading-relaxed mb-4 font-normal" style={F}>
                HipaaRed AI completed <span className="text-white font-bold">{totalProbes} adversarial probes</span> against your medical AI system.
                {vulnCount > 0
                  ? <> <span className="text-red-400 font-bold">{vulnCount} potential vulnerabilities</span> were identified.</>
                  : <> <span className="text-green-400 font-bold">No vulnerabilities detected.</span></>
                }
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Vulnerabilities', val: String(vulnCount), color: vulnCount > 0 ? 'text-red-400' : 'text-green-400' },
                  { label: 'Probes Run', val: String(totalProbes), color: 'text-[#14B8A6]' },
                  { label: 'Passed', val: String(passCount), color: 'text-green-400' },
                ].map(s => (
                  <div key={s.label} className="bg-[#080C14] rounded-lg p-3 text-center">
                    <p className={`text-2xl font-black ${s.color}`} style={F}>{s.val}</p>
                    <p className="text-[#E9EEF5]/50 text-xs mt-1 font-semibold" style={F}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-black text-white mb-4" style={F}>Detailed Findings</h2>
        <div className="space-y-4 mb-8">
          {results.length > 0 ? results.map((r) => (
            <div key={r.id} className="card flex items-start gap-4">
              <div className="mt-0.5 shrink-0">
                {r.vulnerable ? <XCircle className="w-5 h-5 text-red-400" /> : <CheckCircle className="w-5 h-5 text-green-400" />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className={`text-xs font-black border px-2 py-0.5 rounded-full ${categoryColor[r.category] ?? 'text-gray-400 bg-gray-400/10 border-gray-400/30'}`} style={F}>{r.category}</span>
                  <span className={`text-xs font-black ${r.vulnerable ? 'text-red-400' : 'text-green-400'}`} style={F}>{r.vulnerable ? 'VULNERABLE' : 'PASSED'}</span>
                </div>
                <p className="text-[#E9EEF5]/70 text-sm font-normal" style={F}>{r.reason}</p>
              </div>
            </div>
          )) : (
            <div className="card text-center py-8">
              <AlertTriangle className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <p className="text-[#E9EEF5]/60 font-semibold" style={F}>No live audit data. Showing sample report layout.</p>
            </div>
          )}
        </div>

        <div className="card bg-[#14B8A6]/5 border-[#14B8A6]/30 mb-8">
          <h2 className="text-xl font-black text-white mb-4" style={F}>Remediation Recommendations</h2>
          <ol className="space-y-3 text-sm text-[#E9EEF5]/70 list-decimal list-inside leading-relaxed font-normal" style={F}>
            <li><span className="text-white font-bold">Implement output filtering:</span> Deploy a PHI-detection layer that scans all model outputs before returning to users.</li>
            <li><span className="text-white font-bold">Harden system prompt:</span> Add explicit role-restriction instructions and test all persona injection variants.</li>
            <li><span className="text-white font-bold">Suppress error verbosity:</span> Configure your API gateway to return generic errors without stack traces.</li>
            <li><span className="text-white font-bold">Add multi-turn monitoring:</span> Implement conversation-level monitoring to detect escalating adversarial patterns.</li>
          </ol>
        </div>

        <div className="flex flex-wrap gap-3">
          <button className="btn-teal flex items-center gap-2 text-sm py-2 px-5">
            <Download className="w-4 h-4" /> Download PDF Report
          </button>
          <Link href="/dashboard">
            <button className="btn-blue text-sm py-2 px-5">Start Another Audit</button>
          </Link>
          <Link href="/dashboard">
            <button className="border border-[#1F2937] text-[#E9EEF5] rounded-lg px-5 py-2 text-sm hover:border-[#14B8A6] transition-colors font-bold" style={F}>Back to Dashboard</button>
          </Link>
        </div>

        <div className="mt-8 p-4 border border-[#14B8A6]/20 rounded-lg bg-[#14B8A6]/5 text-center">
          <p className="text-[#14B8A6] text-xs font-black tracking-widest uppercase" style={F}>
            HipaaRed AI · HHS 2026 AI Compliance Evidence · {audit?.auditId ?? 'HR-SAMPLE'}
          </p>
        </div>
      </main>
    </div>
  )
}
