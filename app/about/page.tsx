'use client';

import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, Target, Eye, Heart, Zap, Users, Globe, TrendingUp } from 'lucide-react';

const values = [
  {
    icon: Zap,
    title: 'Performance First',
    desc: 'Every rupee of spend is measured against outcomes. We optimize relentlessly so marketing budgets turn into real revenue.',
  },
  {
    icon: Users,
    title: 'Partnership Mindset',
    desc: 'We work as an extension of your team, not a vendor. Your growth targets become our growth targets.',
  },
  {
    icon: Globe,
    title: 'Pan-India Reach',
    desc: 'A network of experts and partner agencies across the country gives us on-ground intelligence in every territory.',
  },
  {
    icon: TrendingUp,
    title: 'Built to Scale',
    desc: 'Tech-driven automation and dashboards let us scale campaigns without losing the precision that drives results.',
  },
];

const stats = [
  ['150+', 'Campaigns delivered'],
  ['40+', 'Partner agencies'],
  ['12', 'Territories covered'],
  ['300+', 'Team of experts'],
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 px-4 sm:px-6 max-w-4xl mx-auto text-center">
        <p className="text-sm font-medium text-qbx-blue uppercase tracking-wide">About QBX</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-balance">
          We are <span className="text-qbx-blue">growth partners</span> that drive results
        </h1>
        <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-2xl mx-auto">
          At QBX, we believe in pushing boundaries and turning challenges into opportunities. With our partners and a strong network of experts across India, we deliver exceptional marketing services that drive real business outcomes.
        </p>
      </section>

      {/* Stats strip */}
      <section className="border-y border-gray-100 bg-qbx-light/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map(([stat, label]) => (
            <div key={label}>
              <div className="font-display text-3xl font-bold text-qbx-navy">{stat}</div>
              <div className="mt-1 text-sm text-qbx-muted">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-gray-100 p-8">
            <div className="w-12 h-12 rounded-xl bg-qbx-blue/10 flex items-center justify-center text-qbx-blue mb-5">
              <Target size={24} />
            </div>
            <h2 className="font-display text-2xl font-bold">Our Mission</h2>
            <p className="mt-3 text-gray-500 leading-relaxed">
              To help brands compete and win by combining above-the-line reach with below-the-line precision — turning marketing spend into measurable growth at every stage of the funnel.
            </p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-100 p-8">
            <div className="w-12 h-12 rounded-xl bg-qbx-gold/10 flex items-center justify-center text-qbx-gold mb-5">
              <Eye size={24} />
            </div>
            <h2 className="font-display text-2xl font-bold">Our Vision</h2>
            <p className="mt-3 text-gray-500 leading-relaxed">
              To be India's most trusted growth partner — the team brands rely on to scale across new geographies, channels, and audiences without compromising on results.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-qbx-light/50">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-xl mb-14">
            <div className="flex items-center gap-2 text-qbx-blue mb-3">
              <Heart size={18} />
              <span className="text-sm font-medium uppercase tracking-wide">What drives us</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">Our values</h2>
            <p className="mt-4 text-gray-500 text-lg">
              The principles that shape how we work with every brand and partner.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="bg-white p-6 rounded-2xl border border-gray-100">
                <div className="w-11 h-11 rounded-xl bg-qbx-navy/5 flex items-center justify-center text-qbx-blue mb-4">
                  <v.icon size={22} />
                </div>
                <h3 className="font-display text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-qbx-navy rounded-3xl p-10 sm:p-14 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Let&apos;s grow your brand together
          </h2>
          <p className="mt-4 text-qbx-muted text-lg max-w-lg mx-auto">
            Join our partner network and start running campaigns that move markets.
          </p>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 mt-8 bg-qbx-gold text-qbx-navy font-semibold px-8 py-3.5 rounded-xl hover:bg-qbx-gold/90 transition-colors"
          >
            Join as Partner <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
