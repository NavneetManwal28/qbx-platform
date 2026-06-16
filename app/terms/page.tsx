'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: 'By accessing or using the QBX platform, you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, please do not use the platform.',
  },
  {
    title: '2. Partner Accounts',
    body: 'Partners may register for instant access to the platform. You are responsible for maintaining the confidentiality of your account credentials and for all activity that occurs under your account.',
  },
  {
    title: '3. Use of the Platform',
    body: 'The platform is provided for the purpose of managing marketing campaigns, uploading campaign assets, and coordinating with QBX. You agree not to misuse the platform, upload unlawful content, or attempt to gain unauthorized access to any part of the system.',
  },
  {
    title: '4. Content & Uploads',
    body: 'You retain ownership of the content you upload, but grant QBX a license to store, process, and use that content for the purpose of delivering services. You are responsible for ensuring you have the rights to any assets you upload.',
  },
  {
    title: '5. Intellectual Property',
    body: 'All platform software, branding, and design elements remain the property of QBX. Nothing in these terms grants you any right to use QBX trademarks without prior written consent.',
  },
  {
    title: '6. Limitation of Liability',
    body: 'QBX provides the platform on an "as is" basis. To the fullest extent permitted by law, QBX is not liable for any indirect or consequential loss arising from your use of the platform.',
  },
  {
    title: '7. Changes to These Terms',
    body: 'We may update these Terms & Conditions from time to time. Continued use of the platform after changes are posted constitutes acceptance of the revised terms.',
  },
  {
    title: '8. Contact',
    body: 'For any questions about these Terms & Conditions, please reach out through our Contact Us page.',
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-28 pb-20 px-4 sm:px-6 max-w-3xl mx-auto">
        <p className="text-sm font-medium text-qbx-blue uppercase tracking-wide">Legal</p>
        <h1 className="mt-4 font-display text-4xl sm:text-5xl font-bold leading-[1.1] tracking-tight">
          Terms &amp; Conditions
        </h1>
        <p className="mt-4 text-sm text-qbx-muted">
          Last updated {new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
        </p>

        <div className="mt-12 space-y-8">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="font-display text-lg font-semibold text-qbx-navy">{s.title}</h2>
              <p className="mt-2 text-gray-500 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
