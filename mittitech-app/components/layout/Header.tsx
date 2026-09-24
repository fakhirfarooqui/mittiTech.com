'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Bell, ChevronDown, X, LogOut } from 'lucide-react';
import { weatherData } from '@/data/mockData';
import { logoutUser } from '@/lib/auth';
import MittiLogo from '@/components/ui/MittiLogo';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export default function Header({ title, subtitle }: HeaderProps) {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);

  const handleLogout = () => {
    logoutUser();
    router.replace('/login');
  };

  const notifications = [
    { icon: '💧', title: 'Low Soil Moisture', desc: 'Field B — Green Valley Farm', time: '2h ago', priority: 'warning' },
    { icon: '🌿', title: 'Crop Health Alert', desc: 'Sunrise Farm — Tomato', time: '5h ago', priority: 'danger' },
    { icon: '🌧️', title: 'Rain Expected Tomorrow', desc: '70% chance — All farms', time: '7h ago', priority: 'info' },
  ];

  const priorityColor: Record<string, string> = {
    warning: '#D97706',
    danger: '#DC2626',
    info: '#2563EB',
  };

  return (
    <header
      className="app-header flex items-center gap-4 px-6 flex-shrink-0"
      style={{
        background: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-light)',
        minHeight: 58,
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {/* Page Title */}
      <div className="flex-1 min-w-0 flex items-center gap-3">
        <div className="sm:hidden flex-shrink-0">
          <MittiLogo size={28} />
        </div>
        <div className="min-w-0">
          <h1
            className="font-bold leading-tight truncate"
            style={{ fontSize: 17, color: 'var(--text-primary)', letterSpacing: '-0.35px' }}
          >
            {title}
          </h1>
          {subtitle && (
            <p style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 0 }}>
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Weather Pill */}
      <div
        className="hidden lg:flex header-pill"
      >
        <span style={{ fontSize: 14 }}>
          {weatherData.condition?.includes('Cloud') ? '⛅' : weatherData.condition?.includes('Rain') ? '🌧️' : '☀️'}
        </span>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
          {weatherData.temperature}°C
        </span>
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
          {weatherData.condition}
        </span>
        <div
          style={{
            width: 1,
            height: 14,
            background: 'var(--border-light)',
            flexShrink: 0,
          }}
        />
        <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
          💧 {weatherData.humidity}%
        </span>
      </div>

      {/* Search */}
      <div
        className="app-header-search hidden md:flex items-center gap-2 px-3 py-2 rounded-xl transition-all"
        style={{
          background: searchFocused ? 'var(--bg-card)' : 'var(--bg-surface)',
          border: searchFocused
            ? '1px solid var(--accent)'
            : '1px solid var(--border-light)',
          minWidth: 220,
          boxShadow: searchFocused ? '0 0 0 3px var(--accent-glow)' : 'none',
          transition: 'all 0.18s ease',
        }}
      >
        <Search size={13} style={{ color: 'var(--text-faint)', flexShrink: 0 }} />
        <input
          type="text"
          placeholder="Search farms, fields, scans..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            fontSize: 12,
            color: 'var(--text-primary)',
            width: '100%',
            fontFamily: 'Inter, sans-serif',
          }}
        />
        <kbd
          style={{
            fontSize: 10,
            color: 'var(--text-faint)',
            padding: '1px 5px',
            borderRadius: 5,
            border: '1px solid var(--border-light)',
            background: 'var(--bg-surface)',
            flexShrink: 0,
          }}
        >
          ⌘K
        </kbd>
      </div>

      {/* Notifications */}
      <div className="relative">
        <button
          onClick={() => setShowNotifications(!showNotifications)}
          className="relative flex items-center justify-center rounded-xl transition-all hover:scale-105"
          style={{
            width: 36,
            height: 36,
            background: showNotifications ? 'var(--brand-10)' : 'var(--bg-surface)',
            border: showNotifications
              ? '1px solid var(--border-brand)'
              : '1px solid var(--border-light)',
            color: showNotifications ? 'var(--text-brand)' : 'var(--text-muted)',
          }}
          aria-label="Notifications"
        >
          <Bell size={15} />
          <span
            className="absolute rounded-full"
            style={{
              top: 7,
              right: 7,
              width: 7,
              height: 7,
              background: '#DC2626',
              border: '1.5px solid var(--bg-card)',
            }}
          />
        </button>

        {showNotifications && (
          <div
            className="absolute right-0 top-11 z-50 rounded-2xl overflow-hidden animate-slide-down"
            style={{
              width: 340,
              background: 'var(--bg-card)',
              border: '1px solid var(--border-default)',
              boxShadow: 'var(--shadow-elevated)',
            }}
          >
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ borderBottom: '1px solid var(--border-faint)' }}
            >
              <div className="flex items-center gap-2">
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                  Notifications
                </span>
                <span className="badge badge-danger" style={{ fontSize: 9 }}>
                  {notifications.length} New
                </span>
              </div>
              <button
                onClick={() => setShowNotifications(false)}
                style={{ color: 'var(--text-muted)' }}
              >
                <X size={14} />
              </button>
            </div>

            {notifications.map((n, i) => (
              <div
                key={i}
                className="flex items-start gap-3 px-4 py-3 cursor-pointer transition-all hover:bg-[var(--bg-surface)]"
                style={{ borderBottom: '1px solid var(--border-faint)' }}
                onClick={() => setShowNotifications(false)}
              >
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-xl"
                  style={{
                    width: 34,
                    height: 34,
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-light)',
                    fontSize: 14,
                  }}
                >
                  {n.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                      {n.title}
                    </div>
                    <div
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: priorityColor[n.priority] }}
                    />
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 1 }}>
                    {n.desc}
                  </div>
                </div>
                <span style={{ fontSize: 10, color: 'var(--text-faint)', flexShrink: 0, whiteSpace: 'nowrap' }}>
                  {n.time}
                </span>
              </div>
            ))}

            <div
              className="px-4 py-3"
              style={{ background: 'var(--bg-surface)' }}
            >
              <a
                href="/alerts"
                style={{ fontSize: 12, color: 'var(--text-brand)', fontWeight: 600 }}
                onClick={() => setShowNotifications(false)}
              >
                View all alerts →
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Demo Badge */}
      <div className="demo-notice hidden sm:flex">
        <span style={{ fontSize: 9 }}>✦</span>
        DEMO
      </div>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200/80 transition-all duration-200 shadow-xs hover:scale-[1.02] active:scale-[0.98]"
        title="Sign Out of Mitti Tech"
      >
        <LogOut size={13} />
        <span>Logout</span>
      </button>
    </header>
  );
}
