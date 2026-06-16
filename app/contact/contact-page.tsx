'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';

// Update these to your real contact details.
const CONTACT_EMAIL = 'hello@qbx.in';
const CONTACT_PHONE = '+91 00000 00000';
const CONTACT_OFFICE = 'India';

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-28 pb-20 px-4 sm:px-6 max-w-3xl mx-auto">
        <div className="max-w-xl mb-12">
          <p className="text-sm font-medium text-qbx-blue uppercase tracking-wide">Get in touch</p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-balance">
            Let&apos;s talk about your <span className="text-qbx-blue">next campaign</span>
          </h1>
          <p className="mt-6 text-lg text-gray-500 leading-relaxed">
            Reach out and we&apos;ll get back to you within one business day.
          </p>
        </div>

        <div className="space-y-4">
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-qbx-sky/30 hover:shadow-lg hover:shadow-qbx-sky/5 transition-all"
          >
            <div className="w-11 h-11 rounded-xl bg-qbx-blue/10 flex items-center justify-center text-qbx-blue flex-shrink-0">
              <Mail size={20} />
            </div>
            <div>
              <div className="font-display font-semibold">Email</div>
              <div className="text-sm text-gray-500 mt-0.5">{CONTACT_EMAIL}</div>
            </div>
          </a>

          <a
            href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`}
            className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-qbx-sky/30 hover:shadow-lg hover:shadow-qbx-sky/5 transition-all"
          >
            <div className="w-11 h-11 rounded-xl bg-qbx-blue/10 flex items-center justify-center text-qbx-blue flex-shrink-0">
              <Phone size={20} />
            </div>
            <div>
              <div className="font-display font-semibold">Phone</div>
              <div className="text-sm text-gray-500 mt-0.5">{CONTACT_PHONE}</div>
            </div>
          </a>

          <div className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100">
            <div className="w-11 h-11 rounded-xl bg-qbx-blue/10 flex items-center justify-center text-qbx-blue flex-shrink-0">
              <MapPin size={20} />
            </div>
            <div>
              <div className="font-display font-semibold">Office</div>
              <div className="text-sm text-gray-500 mt-0.5">{CONTACT_OFFICE}</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
