import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-light.png"
            alt="QBX Service"
            width={120}
            height={34}
            className="h-8 w-auto object-contain mix-blend-multiply"
          />
        </Link>

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
