import Link from 'next/link'
import { Shield, Zap, FileText, ChevronRight, Check, AlertTriangle, Lock, Globe, Code2 } from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="section flex items-center justify-between py-5">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="w-7 h-7 text-[#CC1A1A]" strokeWidth={2} />
            <span className="font-bold text-lg text-gray-900" style={{ fontFamily: 'var(--font-display)' }}>
              Vermelho<span className="text-[#CC1A1A]">AI</span>
            </span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">How it works</a>
            <a href="#probes" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Probes</a>
            <a href="#pricing" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/signin">
              <button className="btn-outline text-sm py-2 px-4">Sign in</button>
            </Link>
            <Link href="/signup">
              <button className="btn-red text-sm py-2 px-4">Start free trial</button>
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #CC1A1A 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#CC1A1A]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00A651]/5 rounded-full blur-3xl" />

        <div className="section relative">
          <div className="max-w-3xl">
            <div className="badge badge-red mb-6 inline-flex">
              <div className="w-1.5 h-1.5 rounded-full bg-[#CC1A1A] animate-pulse" />
              Now with 100+ adversarial probes
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-[1.1] mb-6"
              style={{ fontFamily: 'var(--font-display)' }}>
              Red team your AI.<br />
              <span className="text-[#CC1A1A]">Before someone else does.</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-10 max-w-2xl">
              VermelhoAI runs 100+ adversarial probes against your AI model — jailbreaks, prompt injections, data extraction, goal hijacking, and more. Get a full security report in minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link href="/signup">
                <button className="btn-red text-sm py-3 px-7">
                  Test your AI now <ChevronRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="#how-it-works">
                <button className="btn-outline text-sm py-3 px-7">See how it works</button>
              </Link>
            </div>
            <p className="text-sm text-gray-400 mt-4">No credit card required · Results in 5–30 minutes</p>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF STRIP */}
      <section className="py-5 border-y border-gray-100 bg-[#F5F5F0]">
        <div className="section">
          <div className="flex flex-wrap items-center gap-8 text-sm text-gray-500 font-medium">
            <span>Trusted by AI developers building:</span>
            <span className="flex items-center gap-2"><Code2 className="w-4 h-4 text-[#CC1A1A]" /> Chatbots</span>
            <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-[#CC1A1A]" /> Customer support AI</span>
            <span className="flex items-center gap-2"><Lock className="w-4 h-4 text-[#CC1A1A]" /> Enterprise LLM apps</span>
            <span className="flex items-center gap-2"><Shield className="w-4 h-4 text-[#CC1A1A]" /> Medical AI tools</span>
            <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-[#CC1A1A]" /> AI agents</span>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="py-20">
        <div className="section">
          <div className="mb-12">
            <div className="badge badge-gray mb-4">How it works</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Three steps to a security report
            </h2>
            <p className="text-base text-gray-500 max-w-xl">No complex setup. No agent installation. Just connect your AI and run.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                icon: <Code2 className="w-5 h-5 text-[#CC1A1A]" />,
                title: 'Connect your AI',
                desc: 'Paste your AI endpoint URL and API key. Works with any OpenAI-compatible API, custom endpoints, or hosted models.',
              },
              {
                step: '02',
                icon: <Zap className="w-5 h-5 text-[#CC1A1A]" />,
                title: 'We run the probes',
                desc: '100+ adversarial probes fire against your model — DAN jailbreaks, prompt injections, goal hijacking, continuation attacks, social engineering, and more.',
              },
              {
                step: '03',
                icon: <FileText className="w-5 h-5 text-[#CC1A1A]" />,
                title: 'Download your report',
                desc: 'A full security report with vulnerability findings, severity ratings, and remediation recommendations. PDF ready to share.',
              },
            ].map((item) => (
              <div key={item.step} className="card h-full hover:border-[#CC1A1A]/30 transition-colors">
                <div className="flex items-start justify-between mb-5">
                  <div className="w-10 h-10 bg-[#FEF2F2] rounded-lg flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="text-4xl font-bold text-gray-100" style={{ fontFamily: 'var(--font-display)' }}>
                    {item.step}
                  </span>
                </div>
                <h3 className="text-base font-semibold text-gray-900 mb-2" style={{ fontFamily: 'var(--font-display)' }}>
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBE CATEGORIES */}
      <section id="probes" className="py-20 bg-[#0D0D0B]">
        <div className="section">
          <div className="mb-12">
            <div className="badge badge-red mb-4">Probe library</div>
            <h2 className="text-3xl font-bold text-white mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              100+ probes across 10 attack categories
            </h2>
            <p className="text-base text-gray-400 max-w-xl">
              Built from OWASP LLM Top 10, AutoDAN research, and real-world attack patterns. New probes added every month.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { category: 'DAN & Persona Jailbreaks', count: '12 probes', desc: 'DAN 11.0, DUDE, STAN, Developer Mode, token threat attacks, persona injection' },
              { category: 'Prompt Injection',         count: '10 probes', desc: 'Direct injection, indirect via documents, delimiter attacks, system override attempts' },
              { category: 'System Prompt Extraction', count: '10 probes', desc: 'Verbatim extraction, paraphrasing attacks, config leakage, restriction mapping' },
              { category: 'Data Extraction',          count: '10 probes', desc: 'PII leakage, credential harvesting, database queries, vector store extraction' },
              { category: 'Goal Hijacking',           count: '10 probes', desc: 'Ignore-say, nevermind, screaming-stop, instruction override, context reset attacks' },
              { category: 'Hallucination Induction',  count: '8 probes',  desc: 'False premise injection, fabricated prior consent, impossible capability claims' },
              { category: 'Social Engineering',       count: '10 probes', desc: 'Authority spoofing, urgency manipulation, bribery, peer pressure, flattery attacks' },
              { category: 'Continuation Attacks',     count: '10 probes', desc: 'Partial phrase completion, autocomplete exploitation, document continuation' },
              { category: 'OWASP LLM Top 10',         count: '10 probes', desc: 'Full coverage of LLM01–LLM10 including supply chain, overreliance, and plugin abuse' },
              { category: 'Edge Cases',               count: '10 probes', desc: 'Encoded payloads, steganography, language bypass, logic manipulation' },
            ].map((item) => (
              <div key={item.category} className="card-dark hover:border-gray-700 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-white text-sm font-semibold" style={{ fontFamily: 'var(--font-display)' }}>{item.category}</h3>
                  <span className="badge badge-gray text-xs">{item.count}</span>
                </div>
                <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-3 text-gray-500 text-xs">
            <div className="w-2 h-2 rounded-full bg-[#00A651]" />
            New probes added every month — Starter: 100 probes · Professional: 200+ probes
          </div>
        </div>
      </section>

      {/* WHY VERMELHOAI */}
      <section className="py-20 bg-[#F5F5F0]">
        <div className="section">
          <div className="mb-12 text-center">
            <div className="badge badge-gray mb-4 mx-auto">Why VermelhoAI</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Security testing that just works
            </h2>
            <p className="text-base text-gray-500 max-w-xl mx-auto">
              Other tools require deep technical setup and security expertise. VermelhoAI is built for shipping teams — powerful, simple, and ready in minutes.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-4xl mx-auto">
            {[
              { name: 'CLI Tools',      desc: 'For developers',  setup: 'CLI setup required',    probes: 'DIY config',        price: 'Free / complex', highlight: false },
              { name: 'VermelhoAI',     desc: 'For everyone',    setup: 'Paste URL, click run',  probes: '100+ built-in',     price: '$99/month',      highlight: true  },
              { name: 'Research Tools', desc: 'For researchers', setup: 'Python environment',    probes: '3,000+ (complex)',  price: 'Free / complex', highlight: false },
            ].map((item) => (
              <div key={item.name} className={`card ${item.highlight ? 'border-[#CC1A1A] bg-[#FEF2F2]/50' : ''}`}>
                <div className="mb-4">
                  <h3 className={`text-lg font-semibold mb-1 ${item.highlight ? 'text-[#CC1A1A]' : 'text-gray-900'}`}
                    style={{ fontFamily: 'var(--font-display)' }}>
                    {item.name}
                  </h3>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600"><Check className="w-3.5 h-3.5 text-[#00A651] shrink-0" /> {item.setup}</div>
                  <div className="flex items-center gap-2 text-gray-600"><Check className="w-3.5 h-3.5 text-[#00A651] shrink-0" /> {item.probes}</div>
                  <div className="flex items-center gap-2 text-gray-600"><Check className="w-3.5 h-3.5 text-[#00A651] shrink-0" /> {item.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-20">
        <div className="section">
          <div className="mb-12 text-center">
            <div className="badge badge-gray mb-4 mx-auto">Pricing</div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              Simple, transparent pricing
            </h2>
            <p className="text-base text-gray-500">7-day free trial on all plans. Cancel anytime.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">

            {/* Starter */}
            <div className="card">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-display)' }}>Starter</h3>
                <p className="text-gray-500 text-sm mb-4">For AI developers and small teams</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', letterSpacing: '-0.02em' }}>$99</span>
                  <span className="text-gray-400 text-sm">/month</span>
                </div>
                <p className="text-[#00A651] text-xs font-medium mt-2">7-day free trial included</p>
              </div>
              <div className="space-y-2.5 mb-8">
                {['50 tests per month', '100+ adversarial probes', 'PDF security reports', 'Email support (72hr response)'].map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm text-gray-600">
                    <Check className="w-3.5 h-3.5 text-[#00A651] shrink-0" /> {f}
                  </div>
                ))}
              </div>
              <Link href="/signup">
                <button className="btn-outline w-full justify-center py-2.5 text-sm">Start free trial</button>
              </Link>
            </div>

            {/* Professional */}
            <div className="card border-[#CC1A1A] relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="badge badge-red text-xs">Most popular</span>
              </div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'var(--font-display)' }}>Professional</h3>
                <p className="text-gray-500 text-sm mb-4">For AI companies shipping to production</p>
                <div className="flex items-baseline gap-1">
                  <span className="font-bold text-gray-900" style={{ fontFamily: 'var(--font-display)', fontSize: '2.5rem', letterSpacing: '-0.02em' }}>$299</span>
                  <span className="text-gray-400 text-sm">/month</span>
                </div>
                <p className="text-[#00A651] text-xs font-medium mt-2">7-day free trial included</p>
              </div>
              <div className="space-y-2.5 mb-8">
                {['Unlimited tests', '200+ adversarial probes (updated monthly)', 'PDF reports + CSV export', 'API access for CI/CD integration', 'Custom probe upload', 'Email support (72hr response)'].map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm text-gray-600">
                    <Check className="w-3.5 h-3.5 text-[#00A651] shrink-0" /> {f}
                  </div>
                ))}
              </div>
              <Link href="/signup">
                <button className="btn-red w-full justify-center py-2.5 text-sm">Start free trial</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="py-10 bg-[#F5F5F0] border-t border-gray-200">
        <div className="section">
          <div className="flex items-start gap-4 max-w-3xl">
            <AlertTriangle className="w-4 h-4 text-[#CC1A1A] shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-1">Liability Disclaimer</p>
              <p className="text-sm text-gray-500 leading-relaxed">
                VermelhoAI is a testing tool that helps identify potential vulnerabilities. It does not guarantee complete security. Users are responsible for remediation of any issues found.{' '}
                <Link href="/terms" className="text-[#CC1A1A] hover:underline">Terms of Service</Link>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 bg-[#0D0D0B]">
        <div className="section">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Shield className="w-6 h-6 text-[#CC1A1A]" strokeWidth={2} />
                <span className="font-semibold text-base text-white" style={{ fontFamily: 'var(--font-display)' }}>
                  Vermelho<span className="text-[#CC1A1A]">AI</span>
                </span>
              </div>
              <p className="text-gray-500 text-xs max-w-xs">AI red teaming platform for developers. Find vulnerabilities before your users do.</p>
            </div>
            <div className="flex flex-wrap gap-8 text-sm">
              <div className="space-y-2">
                <p className="text-gray-400 font-medium text-xs uppercase tracking-wide">Product</p>
                <div className="space-y-1.5">
                  <a href="#how-it-works" className="block text-gray-600 text-sm hover:text-white transition-colors">How it works</a>
                  <a href="#probes" className="block text-gray-600 text-sm hover:text-white transition-colors">Probe library</a>
                  <a href="#pricing" className="block text-gray-600 text-sm hover:text-white transition-colors">Pricing</a>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-400 font-medium text-xs uppercase tracking-wide">Legal</p>
                <div className="space-y-1.5">
                  <Link href="/terms" className="block text-gray-600 text-sm hover:text-white transition-colors">Terms of Service</Link>
                  <Link href="/privacy" className="block text-gray-600 text-sm hover:text-white transition-colors">Privacy Policy</Link>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-400 font-medium text-xs uppercase tracking-wide">Account</p>
                <div className="space-y-1.5">
                  <Link href="/signin" className="block text-gray-600 text-sm hover:text-white transition-colors">Sign in</Link>
                  <Link href="/signup" className="block text-gray-600 text-sm hover:text-white transition-colors">Sign up</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-gray-600 text-xs">© 2026 VermelhoAI. All rights reserved.</p>
            <p className="text-gray-600 text-xs">vermelho = red in Portuguese 🇵🇹</p>
          </div>
        </div>
      </footer>

    </div>
  )
}