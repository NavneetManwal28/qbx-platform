import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="font-display text-xl font-bold text-qbx-navy">QBX</div>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link href="/about" className="text-sm text-qbx-muted hover:text-qbx-navy transition-colors">
            About Us
          </Link>
          <Link href="/contact" className="text-sm text-qbx-muted hover:text-qbx-navy transition-colors">
            Contact Us
          </Link>
          <Link href="/terms" className="text-sm text-qbx-muted hover:text-qbx-navy transition-colors">
            Terms &amp; Conditions
          </Link>
        </nav>

        <p className="text-sm text-qbx-muted">
          &copy; {new Date().getFullYear()} QBX Marketing Agency. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
