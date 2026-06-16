import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'QBX — Marketing That Moves Markets',
  description: 'ATL, BTL and Business Growth Marketing Agency',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-qbx-navy antialiased">{children}</body>
    </html>
  );
}
