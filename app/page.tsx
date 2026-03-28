import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CheckCircle, Shield, AlertTriangle, FileText, Zap, Lock, ChevronRight } from 'lucide-react'

const features = [
  { icon: <Shield className="w-6 h-6 text-[#14B8A6]" />, title: 'PHI Leakage Detection', desc: 'Automatically probe your medical AI to surface any patient data leaking through responses, logs, or error messages.' },
  { icon: <AlertTriangle className="w-6 h-6 text-[#14B8A6]" />, title: 'Jailbreak & Prompt Injection', desc: 'Run thousands of adversarial prompts designed specifically for clinical AI environments to uncover exploitable weaknesses.' },
  { icon: <Zap className="w-6 h-6 text-[#14B8A6]" />, title: 'Multi-Turn Adversarial Simulation', desc: 'Simulate real-world attacker conversations across multiple turns to expose vulnerabilities that single-shot tests miss.' },
  { icon: <FileText className="w-6 h-6 text-[#14B8A6]" />, title: 'Compliance Documentation', desc: 'Generate court-ready PDF evidence packages stamped for HHS 2026 AI guidelines — ready for your compliance officer.' },
  { icon: <Lock className="w-6 h-6 text-[#14B8A6]" />, title: 'Custom Medical Attack Library', desc: 'Access 2,000+ curated attack prompts targeting EHR integrations, clinical chatbots, and AI scribes.' },
]

const ticks = [
  'No Installation Required',
  '24-Hour Automated Testing',
  'PDF Compliance Reports with HHS Stamp',
  'Temporary Keys – No Data Stored',
  'Synthetic Data Option for Safe Testing',
]

const pricing = [
  {
    name: 'One-Time Audit',
    price: '$1,499',
    period: 'one time',
    features: ['24-hour deep scan', 'Full vulnerability report', 'PDF with HHS 2026 stamp', 'Remediation guidance', 'Email support'],
    cta: 'Start Audit',
    highlight: false,
  },
  {
    name: 'Monthly Monitoring',
    price: '$2,999',
    period: '/month',
    features: ['24/7 automated scans', 'Daily alert emails', 'Weekly reports', 'All One-Time features', 'Priority support'],
    cta: 'Get Started',
    highlight: true,
  },
  {
    name: 'Enterprise Shield',
    price: 'Custom',
    period: 'quote',
    features: ['Full API integration', 'Custom attack library', 'Dedicated analyst', 'BAA included', 'SLA guarantee'],
    cta: 'Contact Sales',
    highlight: false,
  },
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Hero */}
      <section className="max-w-[1280px] mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-[#14B8A6]/10 border border-[#14B8A6]/30 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse"></span>
          <span className="text-[#14B8A6] text-sm font-medium">HHS 2026 AI Compliance Ready</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6" style={{fontFamily:'Space Grotesk'}}>
          Automated AI Red Teaming<br />for <span className="text-[#14B8A6]">HIPAA Compliance</span>
        </h1>
        <p className="text-[#E9EEF5]/70 text-xl max-w-2xl mx-auto mb-10">
          Test medical AI for PHI leakage, jailbreaks, and data extraction. Get documented evidence for 2026 HHS guidelines — no installation required.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <button className="btn-teal text-base px-8 py-3">Start Free Synthetic Audit</button>
          </Link>
          <Link href="#pricing">
            <button className="border border-[#1F2937] text-[#E9EEF5] rounded-lg px-8 py-3 font-semibold hover:border-[#14B8A6] transition-colors text-base">View Pricing</button>
          </Link>
        </div>
        <p className="text-[#E9EEF5]/40 text-sm mt-4">No credit card required · Synthetic data only · 1 free scan per account</p>
      </section>

      {/* Trust Ticks */}
      <section className="max-w-[1280px] mx-auto px-6 py-10">
        <div className="flex flex-wrap justify-center gap-6">
          {ticks.map((t) => (
            <div key={t} className="flex items-center gap-2 text-[#E9EEF5]/80 text-sm">
              <CheckCircle className="w-4 h-4 text-[#14B8A6] shrink-0" />
              <span>{t}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{fontFamily:'Space Grotesk'}}>Comprehensive AI Security Testing</h2>
          <p className="text-[#E9EEF5]/60 text-lg max-w-xl mx-auto">Built for hospitals, clinics, and health tech teams operating under HIPAA obligations.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="card hover:border-[#14B8A6]/60 transition-all group">
              <div className="w-10 h-10 rounded-lg bg-[#14B8A6]/10 flex items-center justify-center mb-4 group-hover:bg-[#14B8A6]/20 transition-colors">{f.icon}</div>
              <h3 className="text-white font-semibold text-lg mb-2" style={{fontFamily:'Space Grotesk'}}>{f.title}</h3>
              <p className="text-[#E9EEF5]/60 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
          <div className="card bg-[#14B8A6]/5 border-[#14B8A6]/40 flex flex-col justify-center items-center text-center">
            <Shield className="w-10 h-10 text-[#14B8A6] mb-3" />
            <h3 className="text-white font-semibold text-lg mb-2" style={{fontFamily:'Space Grotesk'}}>HIPAA-Safe by Design</h3>
            <p className="text-[#E9EEF5]/60 text-sm">All API keys auto-delete after 24h. No PHI ever stored. BAA available for all paid plans.</p>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3" style={{fontFamily:'Space Grotesk'}}>Simple, Transparent Pricing</h2>
          <p className="text-[#E9EEF5]/60 text-lg">Choose the level of protection your organization needs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pricing.map((p) => (
            <div key={p.name} className={`card flex flex-col ${p.highlight ? 'border-[#14B8A6] ring-1 ring-[#14B8A6]/40 relative' : ''}`}>
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#14B8A6] text-white text-xs font-bold px-3 py-1 rounded-full">Most Popular</div>
              )}
              <h3 className="text-white font-bold text-xl mb-1" style={{fontFamily:'Space Grotesk'}}>{p.name}</h3>
              <div className="flex items-end gap-1 mb-6">
                <span className="text-4xl font-bold text-[#14B8A6]">{p.price}</span>
                <span className="text-[#E9EEF5]/50 text-sm mb-1">{p.period}</span>
              </div>
              <ul className="space-y-2 mb-8 flex-1">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-[#E9EEF5]/75 text-sm">
                    <CheckCircle className="w-4 h-4 text-[#14B8A6] shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link href="/signup">
                <button className={`w-full py-3 rounded-lg font-semibold transition-all ${p.highlight ? 'btn-teal' : 'border border-[#1F2937] text-white hover:border-[#14B8A6]'}`}>{p.cta}</button>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="card bg-gradient-to-r from-[#14B8A6]/10 to-[#3B82F6]/10 border-[#14B8A6]/40 text-center py-12">
          <h2 className="text-3xl font-bold text-white mb-3" style={{fontFamily:'Space Grotesk'}}>Ready to Secure Your Medical AI?</h2>
          <p className="text-[#E9EEF5]/60 mb-8 max-w-xl mx-auto">Start with a free synthetic audit. No credit card. No installation. Just answers.</p>
          <Link href="/signup">
            <button className="btn-teal text-base px-10 py-3">Start Free Limited Synthetic Audit</button>
          </Link>
          <p className="text-[#E9EEF5]/40 text-xs mt-3">Synthetic data only · 1 scan per account · No PHI required</p>
        </div>
      </section>

      <Footer />
    </div>
  )
}
