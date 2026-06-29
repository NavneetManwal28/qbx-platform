'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, Megaphone, Target, TrendingUp, Users, BarChart3, Globe, Zap, Award, Layers, CheckCircle2 } from 'lucide-react';

const services = [
  {
    icon: Megaphone,
    title: 'ATL Marketing',
    desc: 'Television, radio, print and outdoor campaigns that build mass awareness and position your brand at the top of mind.',
  },
  {
    icon: Target,
    title: 'BTL Marketing',
    desc: 'Activations, direct engagement, sampling and experiential marketing that drive conversion at the point of decision.',
  },
  {
    icon: TrendingUp,
    title: 'Business Growth',
    desc: 'Data-driven growth strategy, market expansion planning, and performance marketing that turns spend into revenue.',
  },
  {
    icon: Users,
    title: 'Brand Strategy',
    desc: 'Market positioning, audience segmentation and messaging frameworks that give your brand a competitive edge.',
  },
  {
    icon: BarChart3,
    title: 'Campaign Analytics',
    desc: 'Real-time dashboards, ROI measurement and actionable insights to optimize every campaign in flight.',
  },
  {
    icon: Globe,
    title: 'Regional Expansion',
    desc: 'Territory-specific execution with local market intelligence to scale your presence across new geographies.',
  },
];

const growthPillars = [
  {
    icon: Zap,
    title: 'Performance Marketing',
    points: ['Data-driven campaign optimization', 'In-depth brand & creative strategy', 'Organic traffic growth', 'Tech to scale and automate'],
  },
  {
    icon: Users,
    title: 'Influencer & Creator Network',
    points: ['Tech-based influencer platform', 'Automated dashboards with real-time reporting', 'Curated creator partnerships', 'End-to-end campaign management'],
  },
  {
    icon: Layers,
    title: 'D2C & Ecommerce Solutions',
    points: ['End-to-end ecommerce solutions for D2C brands', 'Ad campaign optimization and alerts', 'Brand partnership and scaling', 'ROI-focused media buying'],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-6 items-center">
          <div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] tracking-tight text-balance">
              Marketing that
              <span className="text-qbx-blue"> moves markets</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-gray-500 leading-relaxed max-w-xl">
              QBX combines above-the-line reach with below-the-line precision to grow brands that compete and win.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 bg-qbx-navy text-white font-medium px-7 py-3.5 rounded-xl hover:bg-qbx-blue transition-colors"
              >
                Join as Partner <ArrowRight size={18} />
              </Link>
              <Link
                href="/#services"
                className="inline-flex items-center justify-center gap-2 border border-gray-200 text-qbx-navy font-medium px-7 py-3.5 rounded-xl hover:border-qbx-navy/30 transition-colors"
              >
                Explore Services
              </Link>
            </div>
          </div>

          {/* Mobile Hero Banner — visible only on small screens */}
          <div className="block lg:hidden mt-8">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100">
              <Image
                src="/logo-light.png"
                alt="QBX Service — Marketing that moves markets"
                width={800}
                height={400}
                className="w-full object-contain bg-gradient-to-br from-slate-50 to-blue-50 p-8"
                priority
              />
              {/* Overlay stats bar */}
              <div className="absolute bottom-0 left-0 right-0 bg-qbx-navy/90 backdrop-blur-sm px-4 py-3 flex justify-around">
                <div className="text-center">
                  <div className="font-display text-lg font-bold text-white">150+</div>
                  <div className="text-[10px] text-blue-200">Campaigns</div>
                </div>
                <div className="w-px bg-white/20" />
                <div className="text-center">
                  <div className="font-display text-lg font-bold text-white">40+</div>
                  <div className="text-[10px] text-blue-200">Partners</div>
                </div>
                <div className="w-px bg-white/20" />
                <div className="text-center">
                  <div className="font-display text-lg font-bold text-qbx-gold">98%</div>
                  <div className="text-[10px] text-blue-200">Retention</div>
                </div>
                <div className="w-px bg-white/20" />
                <div className="text-center">
                  <div className="font-display text-lg font-bold text-white">12</div>
                  <div className="text-[10px] text-blue-200">Territories</div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Hero Creative — hidden on mobile */}
          <div className="hidden lg:block relative">
            <div className="relative w-full max-w-md ml-auto" style={{ height: 480 }}>
              
              {/* SVG connection lines & decorative grid */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 480" fill="none">
                {/* Dot grid */}
                {Array.from({ length: 8 }).map((_, row) =>
                  Array.from({ length: 7 }).map((_, col) => (
                    <circle key={`${row}-${col}`} cx={30 + col * 55} cy={20 + row * 60} r="1.2" fill="#1E4D8C" opacity="0.08" />
                  ))
                )}
                {/* Connection paths */}
                <path d="M120 100 Q200 140 280 90" stroke="#4A90D9" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.2" />
                <path d="M100 280 Q200 240 300 300" stroke="#D4A843" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.2" />
                <path d="M200 160 L200 260" stroke="#1E4D8C" strokeWidth="1" strokeDasharray="4 4" opacity="0.12" />
                {/* Accent circles */}
                <circle cx="200" cy="240" r="80" stroke="#4A90D9" strokeWidth="0.5" opacity="0.08" />
                <circle cx="200" cy="240" r="140" stroke="#D4A843" strokeWidth="0.5" opacity="0.06" />
              </svg>

              {/* Main center card - Growth chart */}
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl shadow-qbx-navy/8 p-6 w-64 border border-gray-100/80 z-10">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div className="text-xs font-medium text-gray-400 uppercase tracking-wide">Growth Index</div>
                    <div className="font-display text-3xl font-bold text-qbx-navy mt-0.5">+284%</div>
                  </div>
                  <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-lg shadow-green-200">
                    <TrendingUp size={20} className="text-white" />
                  </div>
                </div>
                {/* Mini chart */}
                <svg viewBox="0 0 200 50" className="w-full h-12">
                  <defs>
                    <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#4A90D9" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#4A90D9" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  <path d="M0 40 Q20 38 40 32 Q60 26 80 28 Q100 30 120 18 Q140 8 160 12 Q180 6 200 4" stroke="#4A90D9" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                  <path d="M0 40 Q20 38 40 32 Q60 26 80 28 Q100 30 120 18 Q140 8 160 12 Q180 6 200 4 L200 50 L0 50 Z" fill="url(#chartGrad)" />
                </svg>
                <div className="flex justify-between text-[10px] text-gray-300 mt-1 font-medium">
                  <span>Jan</span><span>Mar</span><span>May</span><span>Jul</span><span>Sep</span>
                </div>
              </div>

              {/* Top-left: Partners */}
              <div className="absolute top-4 left-0 bg-white rounded-xl shadow-lg shadow-gray-200/40 px-4 py-3 border border-gray-100/80 z-20">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-qbx-blue flex items-center justify-center">
                    <Users size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="font-display text-xl font-bold leading-none">40+</div>
                    <div className="text-[10px] text-gray-400 font-medium mt-0.5">Active Partners</div>
                  </div>
                </div>
              </div>

              {/* Top-right: Retention */}
              <div className="absolute top-8 right-0 bg-qbx-navy rounded-xl shadow-lg px-4 py-3 z-20">
                <div className="text-[10px] text-qbx-muted font-medium">Retention Rate</div>
                <div className="font-display text-2xl font-bold text-white leading-none mt-1">98%</div>
                <div className="flex gap-0.5 mt-2">
                  {[1,1,1,1,1,1,1,1,1,0].map((filled, i) => (
                    <div key={i} className={`w-2.5 h-1.5 rounded-sm ${filled ? 'bg-qbx-gold' : 'bg-white/20'}`} />
                  ))}
                </div>
              </div>

              {/* Bottom-left: Territories */}
              <div className="absolute bottom-16 left-2 bg-white rounded-xl shadow-lg shadow-gray-200/40 px-4 py-3 border border-gray-100/80 z-20">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-qbx-gold to-amber-500 flex items-center justify-center">
                    <Globe size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="font-display text-xl font-bold leading-none">12</div>
                    <div className="text-[10px] text-gray-400 font-medium mt-0.5">Territories</div>
                  </div>
                </div>
              </div>

              {/* Bottom-right: Campaigns */}
              <div className="absolute bottom-4 right-4 bg-white rounded-xl shadow-lg shadow-gray-200/40 px-4 py-3 border border-gray-100/80 z-20">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-qbx-sky to-qbx-blue flex items-center justify-center">
                    <Megaphone size={16} className="text-white" />
                  </div>
                  <div>
                    <div className="font-display text-xl font-bold leading-none">150+</div>
                    <div className="text-[10px] text-gray-400 font-medium mt-0.5">Campaigns</div>
                  </div>
                </div>
              </div>

              {/* Floating accent dots */}
              <div className="absolute top-24 right-20 w-3 h-3 rounded-full bg-qbx-gold/40 z-0" />
              <div className="absolute bottom-36 left-24 w-2 h-2 rounded-full bg-qbx-sky/50 z-0" />
              <div className="absolute top-40 left-16 w-2 h-2 rounded-full bg-green-400/40 z-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-gray-100 bg-qbx-light/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            ['150+', 'Campaigns delivered'],
            ['40+', 'Partner agencies'],
            ['12', 'Territories covered'],
            ['98%', 'Client retention'],
          ].map(([stat, label]) => (
            <div key={label}>
              <div className="font-display text-3xl font-bold text-qbx-navy">{stat}</div>
              <div className="mt-1 text-sm text-qbx-muted">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-20 px-4 sm:px-6 max-w-6xl mx-auto scroll-mt-20">
        <div className="max-w-xl mb-14">
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">What we do</h2>
          <p className="mt-4 text-gray-500 text-lg">
            End-to-end marketing capabilities, from national broadcast campaigns to hyper-local activations.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className="group p-6 rounded-2xl border border-gray-100 hover:border-qbx-sky/30 hover:shadow-lg hover:shadow-qbx-sky/5 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-qbx-navy/5 flex items-center justify-center text-qbx-blue mb-4 group-hover:bg-qbx-blue group-hover:text-white transition-colors">
                <s.icon size={22} />
              </div>
              <h3 className="font-display text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-gray-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Driving Growth */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-qbx-light/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              Driving Growth and Managing
            </h2>
            <p className="mt-2 font-display text-2xl sm:text-3xl font-bold text-qbx-blue">
              India&apos;s Digital & On-Ground Spends
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {growthPillars.map((pillar) => (
              <div key={pillar.title} className="bg-white rounded-2xl border border-gray-100 p-8 hover:shadow-lg hover:shadow-gray-100 transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-qbx-blue/10 flex items-center justify-center text-qbx-blue mb-5">
                  <pillar.icon size={24} />
                </div>
                <h3 className="font-display text-xl font-bold mb-4">{pillar.title}</h3>
                <ul className="space-y-3">
                  {pillar.points.map((point) => (
                    <li key={point} className="flex items-start gap-2.5 text-sm text-gray-600 leading-relaxed">
                      <CheckCircle2 size={16} className="text-qbx-blue mt-0.5 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About QBX */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              About <span className="text-qbx-blue">QBX</span>
            </h2>
            <p className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
              At QBX, we believe in pushing boundaries and turning challenges into opportunities. With our partners and a strong network of experts across India, we deliver exceptional marketing services that drive real business outcomes.
            </p>
          </div>

          <div className="mt-12 text-center">
            <h3 className="font-display text-2xl sm:text-3xl font-bold">
              We are <span className="text-qbx-blue">growth partners</span> that drive results
            </h3>
          </div>

          <div className="mt-12 relative">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
              <svg width="500" height="500" viewBox="0 0 500 500" fill="none" className="opacity-[0.04]">
                <circle cx="250" cy="250" r="200" stroke="#1E4D8C" strokeWidth="1.5" />
                <circle cx="250" cy="250" r="150" stroke="#1E4D8C" strokeWidth="1" />
                <circle cx="250" cy="250" r="100" stroke="#1E4D8C" strokeWidth="0.8" />
                <circle cx="250" cy="250" r="50" stroke="#1E4D8C" strokeWidth="0.5" />
                <line x1="50" y1="250" x2="450" y2="250" stroke="#1E4D8C" strokeWidth="0.5" />
                <line x1="250" y1="50" x2="250" y2="450" stroke="#1E4D8C" strokeWidth="0.5" />
                <line x1="109" y1="109" x2="391" y2="391" stroke="#1E4D8C" strokeWidth="0.5" />
                <line x1="391" y1="109" x2="109" y2="391" stroke="#1E4D8C" strokeWidth="0.5" />
                <polygon points="250,60 440,250 250,440 60,250" stroke="#D4A843" strokeWidth="1" fill="none" />
                <circle cx="250" cy="60" r="6" fill="#1E4D8C" />
                <circle cx="440" cy="250" r="6" fill="#D4A843" />
                <circle cx="250" cy="440" r="6" fill="#1E4D8C" />
                <circle cx="60" cy="250" r="6" fill="#D4A843" />
                <circle cx="250" cy="250" r="8" fill="#1E4D8C" />
              </svg>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto relative z-10">
              <div className="space-y-5">
                {[
                  'Performance marketing with a data-driven approach',
                  'In-depth brand & creative strategy for best outcomes',
                  'Organic traffic growth',
                  'Tech to scale and automate',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-4 rounded-xl bg-qbx-light/80 border border-gray-100">
                    <div className="w-2 h-2 rounded-full bg-qbx-blue flex-shrink-0" />
                    <span className="text-sm font-medium text-qbx-navy">{item}</span>
                  </div>
                ))}
              </div>
              <div className="space-y-5">
                {[
                  'Premier Google Partner and Meta Business Partner',
                  'Pan-India growth partner network',
                  '300+ member team of experts',
                  'Curate hyper-scale strategies for your brand',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 p-4 rounded-xl bg-qbx-light/80 border border-gray-100">
                    <div className="w-2 h-2 rounded-full bg-qbx-gold flex-shrink-0" />
                    <span className="text-sm font-medium text-qbx-navy">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-qbx-navy rounded-3xl p-10 sm:p-14 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Ready to partner with QBX?
          </h2>
          <p className="mt-4 text-qbx-muted text-lg max-w-lg mx-auto">
            Sign up instantly and start uploading campaign assets to your dedicated dashboard.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 mt-8 bg-qbx-gold text-qbx-navy font-semibold px-8 py-3.5 rounded-xl hover:bg-qbx-gold/90 transition-colors"
          >
            Get Started Now <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
