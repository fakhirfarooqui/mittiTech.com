import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/layout/Sidebar';

export const metadata: Metadata = {
  title: 'The Mitti Tech — Smart Soil & Agricultural Intelligence Platform',
  description:
    'AI-powered agricultural intelligence platform featuring smart soil scanning, crop health analysis, remote sensing, farm management, and agricultural analytics.',
  keywords: 'agritech, soil intelligence, farm management, crop health, AI agriculture',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;0,14..32,800;0,14..32,900&family=Space+Grotesk:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Subtle warm pattern overlay */}
        <div
          className="fixed inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 15% 0%, rgba(45, 106, 79, 0.035) 0%, transparent 55%), radial-gradient(ellipse at 85% 100%, rgba(82, 183, 136, 0.025) 0%, transparent 50%)',
            zIndex: 0,
          }}
        />

        {/* Main App Shell */}
        <div
          className="flex h-screen overflow-hidden relative"
          style={{ zIndex: 1 }}
        >
          {/* Sidebar */}
          <Sidebar />

          {/* Content Area */}
          <div
            className="flex flex-col flex-1 overflow-hidden"
            style={{ background: 'var(--bg-base)' }}
          >
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
