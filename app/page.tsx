import Link from 'next/link'
import { Shield, Zap, BarChart3, FileText, ChevronRight, Check, AlertTriangle, Lock, Globe, Code2 } from 'lucide-react'

const F = { fontFamily: "'Syne', sans-serif" }
const B = { fontFamily: "'Space Grotesk', sans-serif" }

export default function LandingPage() {
  return (
    <div style={B} className="min-h-screen bg-white">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100">
        <div className="section flex items-center justify-between py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#CC1A1A] rounded-lg flex items-center justify-center">
              <Shield className="w-4 h-4 text-white" />
            </div>
            <span style={F} className="font-800 text-xl text-gray-900 font-bold">Vermelho<span className="text-[#CC1A1A]">AI</span></span>
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <a href="#how-it-works" style={B} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">How it works</a>
            <a href="#probes" style={B} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Probes</a>
            <a href="#pricing" style={B} className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Pricing</a>
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
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, #CC1A1A 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }} />
        <div className="absolute top-20 right-0 w-96 h-96 bg-[#CC1A1A]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#00A651]/5 rounded-full blur-3xl" />

        <div className="section relative">
          <div className="max-w-4xl">
            <div className="badge badge-red mb-6 inline-flex">
              <div className="w-1.5 h-1.5 rounded-full bg-[#CC1A1A] animate-pulse" />
              Now with 60+ adversarial probes
            </div>
            <h1 style={F} className="text-6xl md:text-7xl font-black text-gray-900 leading-[1.05] mb-6">
              Red team your AI.<br />
              <span className="text-[#CC1A1A]">Before someone else does.</span>
            </h1>
            <p style={B} className="text-xl text-gray-500 font-normal leading-relaxed mb-10 max-w-2xl">
              VermelhoAI runs 60+ adversarial probes against your AI model — jailbreaks, prompt injections, data extraction, and more. Get a full security report in minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <Link href="/signup">
                <button className="btn-red text-base py-3.5 px-8">
                  Test your AI now <ChevronRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="#how-it-works">
                <button className="btn-outline text-base py-3.5 px-8">See how it works</button>
              </Link>
            </div>
            <p style={B} className="text-sm text-gray-400 mt-4 font-normal">No credit card required · Results in 5-30 minutes</p>
          </div>
        </div>
      </section>

      {/* SOCIAL PROOF STRIP */}
      <section className="py-6 border-y border-gray-100 bg-[#F5F5F0]">
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
      <section id="how-it-works" className="py-24">
        <div className="section">
          <div className="mb-16">
            <div className="badge badge-gray mb-4">How it works</div>
            <h2 style={F} className="text-4xl font-black text-gray-900 mb-4">Three steps to a security report</h2>
            <p style={B} className="text-lg text-gray-500 font-normal max-w-xl">No complex setup. No agent installation. Just connect your AI and run.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: '01',
                icon: <Code2 className="w-6 h-6 text-[#CC1A1A]" />,
                title: 'Connect your AI',
                desc: 'Paste your AI endpoint URL and API key. Works with any OpenAI-compatible API, custom endpoints, or hosted models.',
              },
              {
                step: '02',
                icon: <Zap className="w-6 h-6 text-[#CC1A1A]" />,
                title: 'We run the probes',
                desc: '60+ adversarial probes run against your model — jailbreaks, prompt injections, data extraction attempts, roleplay attacks, and more.',
              },
              {
                step: '03',
                icon: <FileText className="w-6 h-6 text-[#CC1A1A]" />,
                title: 'Download your report',
                desc: 'A full security report with vulnerability findings, severity ratings, and remediation recommendations. PDF ready to share.',
              },
            ].map((item) => (
              <div key={item.step} className="relative">
                <div className="card h-full hover:border-[#CC1A1A]/30 transition-colors">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 bg-[#FEF2F2] rounded-xl flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span style={F} className="text-5xl font-black text-gray-100">{item.step}</span>
                  </div>
                  <h3 style={F} className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                  <p style={B} className="text-gray-500 font-normal leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBE CATEGORIES */}
      <section id="probes" className="py-24 bg-[#0D0D0B]">
        <div className="section">
          <div className="mb-16">
            <div className="badge badge-red mb-4">Probe library</div>
            <h2 style={F} className="text-4xl font-black text-white mb-4">60+ probes across 6 attack categories</h2>
            <p style={B} className="text-lg text-gray-400 font-normal max-w-xl">Built from Garak, OWASP LLM Top 10, and real-world attack patterns. New probes added every month.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { category: 'Jailbreaks', count: '10 probes', desc: 'DAN attacks, roleplay bypasses, persona injection, token manipulation', color: '#CC1A1A' },
              { category: 'Prompt Injection', count: '8 probes', desc: 'Goal hijacking, instruction override, delimiter attacks, system prompt extraction', color: '#DC2626' },
              { category: 'Data Extraction', count: '8 probes', desc: 'PII leakage, credential harvesting, memory extraction, training data exposure', color: '#00A651' },
              { category: 'OWASP LLM Top 10', count: '10 probes', desc: 'Full coverage of OWASP LLM01-LLM10 attack vectors', color: '#00A651' },
              { category: 'Multi-Turn Attacks', count: '6 probes', desc: 'Social engineering, authority spoofing, consent manipulation', color: '#CC1A1A' },
              { category: 'Edge Cases', count: '8 probes', desc: 'Hallucination induction, false context, boundary probing', color: '#00A651' },
            ].map((item) => (
              <div key={item.category} className="card-dark hover:border-gray-700 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <h3 style={F} className="text-white font-bold">{item.category}</h3>
                  <span className="badge badge-gray text-xs">{item.count}</span>
                </div>
                <p style={B} className="text-gray-500 text-sm font-normal leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-3 text-gray-500 text-sm" style={B}>
            <div className="w-2 h-2 rounded-full bg-[#00A651]" />
            10 new probes added every month — Basic: 30 probes · Pro: full library
          </div>
        </div>
      </section>

      {/* VS SECTION */}
      <section className="py-24 bg-[#F5F5F0]">
        <div className="section">
          <div className="mb-16 text-center">
            <div className="badge badge-gray mb-4 mx-auto">Why VermelhoAI</div>
            <h2 style={F} className="text-4xl font-black text-gray-900 mb-4">Built for developers, not security PhDs</h2>
            <p style={B} className="text-lg text-gray-500 font-normal">Promptfoo and Garak are powerful but complex. VermelhoAI is powerful and simple.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: 'Promptfoo', desc: 'For developers', setup: 'CLI setup required', probes: 'DIY config', price: 'Free/complex' },
              { name: 'VermelhoAI', desc: 'For everyone', setup: 'Paste URL, click run', probes: '60+ built-in', price: '$99/month', highlight: true },
              { name: 'Garak', desc: 'For researchers', setup: 'Python environment', probes: '3,000+ (complex)', price: 'Free/complex' },
            ].map((item) => (
              <div key={item.name} className={`card ${item.highlight ? 'border-[#CC1A1A] bg-[#FEF2F2]/50' : ''}`}>
                <div className="mb-4">
                  <h3 style={F} className={`text-xl font-bold mb-1 ${item.highlight ? 'text-[#CC1A1A]' : 'text-gray-900'}`}>{item.name}</h3>
                  <p style={B} className="text-sm text-gray-500 font-normal">{item.desc}</p>
                </div>
                <div className="space-y-3 text-sm" style={B}>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Check className="w-4 h-4 text-[#00A651] shrink-0" /> {item.setup}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Check className="w-4 h-4 text-[#00A651] shrink-0" /> {item.probes}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Check className="w-4 h-4 text-[#00A651] shrink-0" /> {item.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="py-24">
        <div className="section">
          <div className="mb-16 text-center">
            <div className="badge badge-gray mb-4 mx-auto">Pricing</div>
            <h2 style={F} className="text-4xl font-black text-gray-900 mb-4">Simple, transparent pricing</h2>
            <p style={B} className="text-lg text-gray-500 font-normal">Run as many tests as you need. Cancel anytime.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Basic */}
            <div className="card">
              <div className="mb-6">
                <h3 style={F} className="text-2xl font-black text-gray-900 mb-1">Basic</h3>
                <p style={B} className="text-gray-500 text-sm font-normal mb-4">For small AI projects and indie developers</p>
                <div className="flex items-baseline gap-1">
                  <span style={F} className="text-5xl font-black text-gray-900">$99</span>
                  <span style={B} className="text-gray-400 font-normal">/month</span>
                </div>
              </div>
              <div className="space-y-3 mb-8" style={B}>
                {[
                  '10 tests per month',
                  '30 standard probes',
                  'PDF security reports',
                  'Groq-powered AI analysis',
                  'Email support',
                ].map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-[#00A651] shrink-0" /> {f}
                  </div>
                ))}
              </div>
              <Link href="/signup">
                <button className="btn-outline w-full justify-center py-3">Get started</button>
              </Link>
            </div>

            {/* Pro */}
            <div className="card border-[#CC1A1A] relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="badge badge-red text-xs">Most popular</span>
              </div>
              <div className="mb-6">
                <h3 style={F} className="text-2xl font-black text-gray-900 mb-1">Pro</h3>
                <p style={B} className="text-gray-500 text-sm font-normal mb-4">For serious AI companies and teams</p>
                <div className="flex items-baseline gap-1">
                  <span style={F} className="text-5xl font-black text-gray-900">$299</span>
                  <span style={B} className="text-gray-400 font-normal">/month</span>
                </div>
              </div>
              <div className="space-y-3 mb-8" style={B}>
                {[
                  'Unlimited tests',
                  'Full 60+ probe library',
                  'PDF security reports',
                  'Groq-powered AI analysis',
                  'API access',
                  'Custom probes',
                  'Priority support',
                ].map(f => (
                  <div key={f} className="flex items-center gap-3 text-sm text-gray-600">
                    <Check className="w-4 h-4 text-[#00A651] shrink-0" /> {f}
                  </div>
                ))}
              </div>
              <Link href="/signup">
                <button className="btn-red w-full justify-center py-3">Get started</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="py-12 bg-[#F5F5F0] border-t border-gray-200">
        <div className="section">
          <div className="flex items-start gap-4 max-w-3xl">
            <AlertTriangle className="w-5 h-5 text-[#CC1A1A] shrink-0 mt-0.5" />
            <div style={B}>
              <p className="text-sm font-semibold text-gray-700 mb-1">Liability Disclaimer</p>
              <p className="text-sm text-gray-500 font-normal leading-relaxed">
                VermelhoAI is a testing tool that helps identify potential vulnerabilities. It does not guarantee complete security. Users are responsible for remediation of any issues found and for their overall security posture. Testing only — not a security guarantee. See our <Link href="/terms" className="text-[#CC1A1A] hover:underline">Terms of Service</Link> for full details.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-[#0D0D0B]">
        <div className="section">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 bg-[#CC1A1A] rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <span style={F} className="font-bold text-xl text-white">Vermelho<span className="text-[#CC1A1A]">AI</span></span>
              </div>
              <p style={B} className="text-gray-500 text-sm font-normal max-w-xs">AI red teaming platform for developers. Find vulnerabilities before your users do.</p>
            </div>
            <div className="flex flex-wrap gap-8 text-sm" style={B}>
              <div className="space-y-2">
                <p className="text-gray-400 font-semibold">Product</p>
                <div className="space-y-1">
                  <a href="#how-it-works" className="block text-gray-600 hover:text-white transition-colors">How it works</a>
                  <a href="#probes" className="block text-gray-600 hover:text-white transition-colors">Probe library</a>
                  <a href="#pricing" className="block text-gray-600 hover:text-white transition-colors">Pricing</a>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-400 font-semibold">Legal</p>
                <div className="space-y-1">
                  <Link href="/terms" className="block text-gray-600 hover:text-white transition-colors">Terms of Service</Link>
                  <Link href="/privacy" className="block text-gray-600 hover:text-white transition-colors">Privacy Policy</Link>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-400 font-semibold">Account</p>
                <div className="space-y-1">
                  <Link href="/signin" className="block text-gray-600 hover:text-white transition-colors">Sign in</Link>
                  <Link href="/signup" className="block text-gray-600 hover:text-white transition-colors">Sign up</Link>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p style={B} className="text-gray-600 text-sm font-normal">© 2026 VermelhoAI. All rights reserved.</p>
            <p style={B} className="text-gray-600 text-sm font-normal">vermelho = red in Portuguese 🇵🇹</p>
          </div>
        </div>
      </footer>
    </div>
  )
}