import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { CheckCircle, Shield, AlertTriangle, FileText, Zap, Lock } from 'lucide-react'

const F = { fontFamily: "'Nunito', sans-serif" }

const features = [
  { icon: <Shield className="w-6 h-6 text-[#14B8A6]" />, title: 'PHI Leakage Detection', desc: 'Automatically probe your medical AI to surface any patient data leaking through responses, logs, or error messages including names, DOBs, MRNs, and SSNs.' },
  { icon: <AlertTriangle className="w-6 h-6 text-[#14B8A6]" />, title: 'Jailbreak and Prompt Injection', desc: 'Run thousands of adversarial prompts designed specifically for clinical AI environments to uncover exploitable weaknesses and bypass attempts.' },
  { icon: <Zap className="w-6 h-6 text-[#14B8A6]" />, title: 'Multi-Turn Adversarial Simulation', desc: 'Simulate real-world attacker conversations across multiple turns to expose vulnerabilities that single-shot tests miss.' },
  { icon: <FileText className="w-6 h-6 text-[#14B8A6]" />, title: 'Compliance Documentation', desc: 'Generate court-ready PDF evidence packages stamped for HHS 2026 AI guidelines, ready for your compliance officer and OCR auditors.' },
  { icon: <Lock className="w-6 h-6 text-[#14B8A6]" />, title: 'Custom Medical Attack Library', desc: 'Access 2,000+ curated attack prompts targeting EHR integrations, clinical chatbots, and AI scribes across all major platforms.' },
]

const ticks = [
  'No Installation Required',
  '24-Hour Automated Testing',
  'PDF Compliance Reports with HHS Stamp',
  'Temporary Keys, No Data Stored',
  'Synthetic Data Option for Safe Testing',
]

const pricing = [
  {
    name: 'One-Time Audit',
    price: '$1,499',
    period: 'one time',
    features: ['24-hour deep vulnerability scan', 'Full PHI leakage and jailbreak report', 'PDF with HHS 2026 compliance stamp', 'Remediation guidance included', 'BAA included for real data', 'Email delivery of results'],
    cta: 'Get Started',
    style: 'normal',
  },
  {
    name: 'Monthly Monitoring',
    price: '$2,999',
    period: '/month',
    features: ['Continuous 24/7 automated scanning', 'Daily vulnerability alerts', 'Weekly detailed compliance reports', 'Unlimited audit runs per month', 'Priority report delivery', 'All One-Time Audit features included'],
    cta: 'Get Started',
    style: 'glow',
  },
  {
    name: 'Enterprise Shield',
    price: 'Custom',
    period: 'quote',
    features: ['Full EHR and AI system integration', 'Custom medical attack library', 'Dedicated compliance analyst', 'Monthly executive briefings', 'SLA-guaranteed response times', 'All Monthly Monitoring features'],
    cta: 'Contact Us',
    style: 'sheen',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-radial">
      <Navbar />

      {/* Hero */}
      <section className="max-w-[1280px] mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 bg-[#14B8A6]/10 border border-[#14B8A6]/30 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#14B8A6]"></span>
          <span className="text-[#14B8A6] text-sm font-bold" style={F}>HHS 2026 AI Compliance Ready</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-6" style={F}>
          Automated AI Red Teaming<br />for <span className="text-[#14B8A6]">HIPAA Compliance</span>
        </h1>
        <p className="text-[#E9EEF5]/65 text-xl max-w-2xl mx-auto mb-10 font-normal" style={F}>
          Test medical AI for PHI leakage, jailbreaks, and data extraction. Get documented evidence for 2026 HHS guidelines.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/signup">
            <button className="btn-teal text-base px-9 py-3.5">Start Free Synthetic Audit</button>
          </Link>
          <Link href="#pricing">
            <button className="border border-[#14B8A6]/30 text-[#E9EEF5] rounded-lg px-9 py-3.5 font-bold hover:border-[#14B8A6] transition-colors text-base" style={F}>View Pricing</button>
          </Link>
        </div>
        <p className="text-[#E9EEF5]/35 text-sm mt-4 font-semibold" style={F}>No credit card required · Synthetic data only · 1 free scan per account</p>
      </section>

      <hr className="section-divider" />

      {/* Ticks */}
      <section className="max-w-[1280px] mx-auto px-6 py-12">
        <div className="flex flex-wrap justify-center gap-8">
          {ticks.map((t) => (
            <div key={t} className="flex items-center gap-2.5">
              <CheckCircle className="w-5 h-5 text-[#14B8A6] shrink-0" />
              <span className="text-[#E9EEF5]/85 text-base font-bold" style={F}>{t}</span>
            </div>
          ))}
        </div>
      </section>

      <hr className="section-divider" />

      {/* Features */}
      <section className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3" style={F}>Comprehensive AI Security Testing</h2>
          <p className="text-[#E9EEF5]/55 text-lg max-w-xl mx-auto font-normal" style={F}>Built for hospitals, clinics, and health tech teams operating under HIPAA obligations.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f) => (
            <div key={f.title} className="card hover:border-[#14B8A6]/50 transition-all group cursor-default">
              <div className="w-11 h-11 rounded-xl bg-[#14B8A6]/10 flex items-center justify-center mb-4 group-hover:bg-[#14B8A6]/20 transition-colors">{f.icon}</div>
              <h3 className="text-white font-black text-lg mb-2" style={F}>{f.title}</h3>
              <p className="text-[#E9EEF5]/55 text-sm leading-relaxed font-normal" style={F}>{f.desc}</p>
            </div>
          ))}
          <div className="card bg-[#0D1F3C]/60 border-[#14B8A6]/35 flex flex-col justify-center items-center text-center">
            <Shield className="w-10 h-10 text-[#14B8A6] mb-3" />
            <h3 className="text-white font-black text-lg mb-2" style={F}>HIPAA-Safe by Design</h3>
            <p className="text-[#E9EEF5]/55 text-sm font-normal" style={F}>All API keys auto-delete after 24 hours. No PHI ever stored. BAA available for all paid plans.</p>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* Pricing */}
      <section id="pricing" className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-3" style={F}>Simple, Transparent Pricing</h2>
          <p className="text-[#E9EEF5]/55 text-lg font-normal" style={F}>Choose the level of protection your organization needs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

          {/* Normal */}
          <div className="card flex flex-col py-10 px-8">
            <h3 className="text-white font-black text-xl mb-1" style={F}>{pricing[0].name}</h3>
            <div className="flex items-end gap-1 mb-6">
              <span className="text-5xl font-black text-white" style={F}>{pricing[0].price}</span>
              <span className="text-[#E9EEF5]/40 text-sm mb-2 font-semibold" style={F}>{pricing[0].period}</span>
            </div>
            <ul className="space-y-3 mb-10 flex-1">
              {pricing[0].features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[#E9EEF5]/70 text-sm font-semibold" style={F}>
                  <CheckCircle className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />{f}
                </li>
              ))}
            </ul>
            <Link href="/signup">
              <button className="w-full py-3.5 rounded-lg font-bold border border-[#14B8A6]/30 text-white hover:border-[#14B8A6] hover:bg-[#14B8A6]/5 transition-all" style={F}>{pricing[0].cta}</button>
            </Link>
          </div>

          {/* Glow */}
          <div className="relative flex flex-col py-10 px-8 rounded-[14px] border border-[#14B8A6]"
            style={{background:'linear-gradient(160deg, #0D2A2A 0%, #111827 60%)', boxShadow:'0 0 40px rgba(20,184,166,0.18), 0 0 80px rgba(20,184,166,0.07)'}}>
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#14B8A6] text-white text-xs font-black px-4 py-1 rounded-full tracking-wide" style={F}>Recommended</div>
            <h3 className="text-white font-black text-xl mb-1" style={F}>{pricing[1].name}</h3>
            <div className="flex items-end gap-1 mb-6">
              <span className="text-5xl font-black text-[#14B8A6]" style={F}>{pricing[1].price}</span>
              <span className="text-[#E9EEF5]/40 text-sm mb-2 font-semibold" style={F}>{pricing[1].period}</span>
            </div>
            <ul className="space-y-3 mb-10 flex-1">
              {pricing[1].features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[#E9EEF5]/75 text-sm font-semibold" style={F}>
                  <CheckCircle className="w-4 h-4 text-[#14B8A6] shrink-0 mt-0.5" />{f}
                </li>
              ))}
            </ul>
            <Link href="/signup">
              <button className="btn-teal w-full py-3.5">{pricing[1].cta}</button>
            </Link>
          </div>

          {/* Sheen */}
          <div className="relative flex flex-col py-10 px-8 rounded-[14px] border border-[#3B82F6]/40 overflow-hidden"
            style={{background:'linear-gradient(160deg, #0D1A2E 0%, #111827 60%)'}}>
            <div className="absolute inset-0 pointer-events-none" style={{background:'linear-gradient(135deg, rgba(59,130,246,0.07) 0%, transparent 60%)'}}></div>
            <h3 className="text-white font-black text-xl mb-1 relative z-10" style={F}>{pricing[2].name}</h3>
            <div className="flex items-end gap-1 mb-6 relative z-10">
              <span className="text-5xl font-black text-[#3B82F6]" style={F}>{pricing[2].price}</span>
              <span className="text-[#E9EEF5]/40 text-sm mb-2 font-semibold" style={F}>{pricing[2].period}</span>
            </div>
            <ul className="space-y-3 mb-10 flex-1 relative z-10">
              {pricing[2].features.map((f) => (
                <li key={f} className="flex items-start gap-2 text-[#E9EEF5]/70 text-sm font-semibold" style={F}>
                  <CheckCircle className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />{f}
                </li>
              ))}
            </ul>
            <Link href="/signup" className="relative z-10">
              <button className="w-full py-3.5 rounded-lg font-bold border border-[#3B82F6]/40 text-white hover:border-[#3B82F6] hover:bg-[#3B82F6]/10 transition-all" style={F}>{pricing[2].cta}</button>
            </Link>
          </div>

        </div>
      </section>

      <hr className="section-divider" />

      {/* Stamp */}
      <section className="max-w-[1280px] mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-white mb-3" style={F}>Official Compliance Evidence</h2>
          <p className="text-[#E9EEF5]/55 text-lg max-w-xl mx-auto font-normal" style={F}>Every completed audit generates a stamped PDF evidence package for your compliance records.</p>
        </div>
        <div className="flex justify-center">
          <div className="relative max-w-lg w-full">
            <div className="border-2 border-[#14B8A6] rounded-xl p-8 bg-[#080C14] text-center relative overflow-hidden"
              style={{boxShadow:'inset 0 0 40px rgba(20,184,166,0.05), 0 0 30px rgba(20,184,166,0.1)'}}>
              <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#14B8A6]/60 rounded-tl"></div>
              <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#14B8A6]/60 rounded-tr"></div>
              <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#14B8A6]/60 rounded-bl"></div>
              <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#14B8A6]/60 rounded-br"></div>
              <p className="text-[#14B8A6] text-xs font-black tracking-[0.25em] uppercase mb-4" style={F}>HipaaRed AI · Compliance Evidence</p>
              <div className="flex items-center justify-center gap-3 mb-4">
                <Shield className="w-8 h-8 text-[#14B8A6]" />
                <h3 className="text-white text-2xl font-black" style={F}>AI Red Teaming Completed</h3>
              </div>
              <p className="text-[#E9EEF5]/60 text-sm mb-6 font-normal" style={F}>Protected Health Information Risk Assessment</p>
              <div className="border-t border-[#14B8A6]/20 pt-5 grid grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-[#E9EEF5]/35 text-xs uppercase tracking-wider mb-1 font-bold" style={F}>Date Issued</p>
                  <p className="text-white text-sm font-bold" style={F}>2025-11-12</p>
                </div>
                <div>
                  <p className="text-[#E9EEF5]/35 text-xs uppercase tracking-wider mb-1 font-bold" style={F}>Audit ID</p>
                  <p className="text-white text-sm font-bold" style={F}>#HR-2025-00078</p>
                </div>
                <div>
                  <p className="text-[#E9EEF5]/35 text-xs uppercase tracking-wider mb-1 font-bold" style={F}>Standard</p>
                  <p className="text-white text-sm font-bold" style={F}>HHS 2026 AI Guidelines</p>
                </div>
                <div>
                  <p className="text-[#E9EEF5]/35 text-xs uppercase tracking-wider mb-1 font-bold" style={F}>Status</p>
                  <p className="text-[#14B8A6] text-sm font-black" style={F}>Verified</p>
                </div>
              </div>
              <p className="text-[#E9EEF5]/25 text-xs mt-5 tracking-widest uppercase font-semibold" style={F}>Generated by HipaaRed AI · Automated Adversarial Testing Platform</p>
            </div>
          </div>
        </div>
      </section>

      <hr className="section-divider" />

      {/* CTA */}
      <section className="max-w-[1280px] mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-black text-white mb-5" style={F}>
          Ready to Secure Your Medical AI?
        </h2>
        <p className="text-[#E9EEF5]/55 text-xl max-w-2xl mx-auto mb-10 font-normal" style={F}>
          Start with a free limited synthetic audit. No credit card, no installation, no PHI required. See real vulnerabilities in your AI system within hours.
        </p>
        <Link href="/signup">
          <button className="btn-teal text-base px-12 py-4">Start Free Limited Synthetic Audit</button>
        </Link>
        <p className="text-[#E9EEF5]/30 text-sm mt-4 font-semibold" style={F}>Synthetic data only · 1 scan per account · No PHI required</p>
      </section>

      <Footer />
    </div>
  )
}
