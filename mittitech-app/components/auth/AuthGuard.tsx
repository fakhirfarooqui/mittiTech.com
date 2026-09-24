'use client';

import React, { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { isAuthenticated } from '@/lib/auth';
import { Radio } from 'lucide-react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const run = async () => {
      // Login page shows immediately; no auth check needed
      if (pathname === '/login') {
        return;
      }

      // Check if user is logged in
      const authenticated = isAuthenticated();

      if (!authenticated) {
        // Without login, no one can access the dashboard or any protected route!
        router.replace('/login');
      } else {
        setIsReady(true);
      }
    };

    run();
  }, [pathname, router]);

  // Always show login page immediately
  if (pathname === '/login') {
    return <>{children}</>;
  }

  // If not ready yet, show verification indicator to prevent dashboard flashing
  if (!isReady) {
    return (
      <div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center select-none"
        style={{ background: '#0D1811', color: '#FFFFFF' }}
      >
        <div
          className="relative flex items-center justify-center w-16 h-16 rounded-2xl mb-4 animate-breathe"
          style={{
            background: 'linear-gradient(135deg, #1A4731 0%, #2D6A4F 100%)',
            boxShadow: '0 4px 24px rgba(45, 106, 79, 0.45)',
            border: '1px solid rgba(82, 183, 136, 0.3)',
          }}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
              fill="rgba(255,255,255,0.12)"
            />
            <path
              d="M12 5c0 0-2 3.5-2 6.5s2 6.5 2 6.5 2-3.5 2-6.5S12 5 12 5z"
              fill="#A3E635"
            />
            <path
              d="M6 12c0 0 3.5-2 6.5-2s6.5 2 6.5 2-3.5 2-6.5 2S6 12 6 12z"
              fill="#FFFFFF"
              opacity="0.85"
            />
          </svg>
        </div>
        <div className="text-sm font-bold text-white tracking-tight flex items-center gap-2">
          <span>The Mitti Tech</span>
          <Radio size={12} className="text-[#52B788] animate-pulse" />
        </div>
        <div className="text-xs text-[#AEDBB8] mt-1 font-medium">
          Verifying security credentials...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
