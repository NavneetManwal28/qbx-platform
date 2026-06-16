'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

// Update this to the real inbox where enquiries should land.
const CONTACT_EMAIL = 'hello@qbx.in';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `New enquiry from ${name || 'a website visitor'}`;
    const body = [
      `Name: ${name}`,
      `Email: ${email}`,
      company ? `Company: ${company}` : null,
      '',
      message,
    ]
      .filter((line) => line !== null)
      .join('\n');

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const inputClass =
    'w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-qbx-blue focus:ring-2 focus:ring-qbx-blue/10 outline-none transition-all text-sm';

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-28 pb-20 px-4 sm:px-6 max-w-6xl mx-auto">
        <div className="max-w-xl mb-12">
          <p className="text-sm font-medium text-qbx-blue uppercase tracking-wide">Get in touch</p>
          <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight text-balance">
            Let&apos;s talk about your <span className="text-qbx-blue">next campaign</span>
          </h1>
          <p className="mt-6 text-lg text-gray-500 leading-relaxed">
            Tell us what you&apos;re working on and we&apos;ll get back to you within one business day.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-10">
          {/* Contact details */}
          <div className="lg:col-span-2 space-y-6">
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
              href="tel:+910000000000"
              className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100 hover:border-qbx-sky/30 hover:shadow-lg hover:shadow-qbx-sky/5 transition-all"
            >
              <div className="w-11 h-11 rounded-xl bg-qbx-blue/10 flex items-center justify-center text-qbx-blue flex-shrink-0">
                <Phone size={20} />
              </div>
              <div>
                <div className="font-display font-semibold">Phone</div>
                <div className="text-sm text-gray-500 mt-0.5">+91 00000 00000</div>
              </div>
            </a>

            <div className="flex items-start gap-4 p-5 rounded-2xl border border-gray-100">
              <div className="w-11 h-11 rounded-xl bg-qbx-blue/10 flex items-center justify-center text-qbx-blue flex-shrink-0">
                <MapPin size={20} />
              </div>
              <div>
                <div className="font-display font-semibold">Office</div>
                <div className="text-sm text-gray-500 mt-0.5">India</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl border border-gray-100 p-8 space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company <span className="text-gray-400 font-normal">(optional)</span>
                </label>
                <input
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className={inputClass}
                  placeholder="Your company"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${inputClass} resize-none`}
                  placeholder="Tell us about your project or campaign…"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-qbx-navy text-white font-medium py-3 rounded-xl hover:bg-qbx-blue transition-colors"
              >
                <Send size={16} /> Send message
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
