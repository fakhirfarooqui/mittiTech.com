'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { logoutUser } from '@/lib/auth';
import {
  LayoutDashboard,
  Bot,
  MapPin,
  FlaskConical,
  Leaf,
  Satellite,
  Sprout,
  Bell,
  FileBarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
  Wifi,
  Building2,
  ChevronDown,
  LogOut,
} from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { label: 'Overview', href: '/', icon: LayoutDashboard, group: 'main' },
  { label: 'Mitti AI', href: '/mitti-ai', icon: Bot, group: 'main' },
  { label: 'Farms', href: '/farms', icon: MapPin, group: 'main' },
  { label: 'Soil Intelligence', href: '/soil-intelligence', icon: FlaskConical, group: 'intelligence' },
  { label: 'Crop Health AI', href: '/crop-health', icon: Leaf, group: 'intelligence' },
  { label: 'FieldSense', href: '/remote-sensing', icon: Satellite, group: 'intelligence' },
  { label: 'Crop Guidance', href: '/crop-recommendations', icon: Sprout, group: 'intelligence' },
  { label: 'Alerts', href: '/alerts', icon: Bell, group: 'operations', badge: 3 },
  { label: 'Reports', href: '/reports', icon: FileBarChart2, group: 'operations' },
  { label: 'Settings', href: '/settings', icon: Settings, group: 'operations' },
];

const groups = [
  { key: 'main', label: 'Workspace' },
  { key: 'intelligence', label: 'Intelligence' },
  { key: 'operations', label: 'Operations' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);

  if (pathname === '/login') {
    return null;
  }

  const handleLogout = () => {
    logoutUser();
    router.replace('/login');
  };

  return (
    <aside
      className={clsx(
        'app-sidebar relative flex flex-col h-full transition-all duration-300 ease-in-out select-none sidebar-scroll overflow-y-auto',
        collapsed ? 'w-[64px]' : 'w-[232px]'
      )}
      style={{
        background: 'var(--sidebar-bg)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        flexShrink: 0,
      }}
    >
      {/* Subtle texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 0% 0%, rgba(82,183,136,0.06) 0%, transparent 60%)',
        }}
      />

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3.5 top-7 z-20 flex h-7 w-7 items-center justify-center rounded-full border transition-all duration-200 hover:scale-110"
        style={{
          background: '#2D6A4F',
          borderColor: 'rgba(255,255,255,0.15)',
          color: 'white',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}
        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>

      {/* Logo */}
      <div
        className="relative flex items-center gap-3 px-4 py-5 flex-shrink-0"
        style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Logo mark */}
        <div
          className="relative flex-shrink-0 flex items-center justify-center rounded-xl"
          style={{
            width: 36,
            height: 36,
            background: 'linear-gradient(135deg, #2D6A4F 0%, #52B788 100%)',
            boxShadow: '0 4px 12px rgba(82, 183, 136, 0.35)',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M9 2C5.13 2 2 5.13 2 9s3.13 7 7 7 7-3.13 7-7-3.13-7-7-7z" fill="rgba(255,255,255,0.15)"/>
            <path d="M9 4.5c0 0-1.5 2.5-1.5 4.5S9 13.5 9 13.5s1.5-2.5 1.5-4.5S9 4.5 9 4.5z" fill="white" opacity="0.9"/>
            <path d="M4.5 9c0 0 2.5-1.5 4.5-1.5S13.5 9 13.5 9s-2.5 1.5-4.5 1.5S4.5 9 4.5 9z" fill="white" opacity="0.6"/>
          </svg>
        </div>

        {!collapsed && (
          <div className="overflow-hidden flex-1">
            <div
              className="font-bold leading-tight whitespace-nowrap"
              style={{
                fontSize: 14,
                color: '#FFFFFF',
                letterSpacing: '-0.3px',
              }}
            >
              Mitti Tech
            </div>
            <div
              className="whitespace-nowrap"
              style={{ fontSize: 10, color: 'var(--sidebar-muted)', letterSpacing: '0.5px' }}
            >
              Agricultural Intelligence
            </div>
          </div>
        )}
      </div>

      {/* Farm Selector */}
      {!collapsed && (
        <div className="px-3 pt-3 pb-1 flex-shrink-0">
          <div className="sidebar-farm-card">
            <div className="flex items-center gap-2.5">
              <div
                className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(82, 183, 136, 0.2)', fontSize: 13 }}
              >
                🏡
              </div>
              <div className="overflow-hidden flex-1 min-w-0">
                <div
                  className="font-semibold truncate"
                  style={{ fontSize: 12, color: '#FFFFFF' }}
                >
                  Green Valley Farm
                </div>
                <div
                  className="truncate"
                  style={{ fontSize: 10, color: 'var(--sidebar-muted)' }}
                >
                  Lucknow, UP · 12 Acres
                </div>
              </div>
              <div className="flex items-center gap-1.5 flex-shrink-0">
                <div
                  className="w-1.5 h-1.5 rounded-full animate-pulse-dot"
                  style={{ background: '#52B788' }}
                />
                <ChevronDown size={12} style={{ color: 'var(--sidebar-muted)' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-2 py-2 overflow-y-auto sidebar-scroll">
        {groups.map((group) => {
          const items = navItems.filter((n) => n.group === group.key);
          return (
            <div key={group.key} className="mb-1">
              {!collapsed && (
                <div className="nav-group-label">{group.label}</div>
              )}
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                      'nav-item',
                      isActive && 'active',
                      collapsed && 'justify-center px-0 py-3'
                    )}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon
                      size={17}
                      className="flex-shrink-0"
                      style={{
                        color: isActive ? '#74C69D' : 'var(--sidebar-muted)',
                        transition: 'color 0.18s ease',
                      }}
                    />
                    {!collapsed && (
                      <span className="flex-1 truncate">{item.label}</span>
                    )}
                    {!collapsed && item.badge && (
                      <span
                        className="flex-shrink-0 flex items-center justify-center rounded-full text-white"
                        style={{
                          width: 18,
                          height: 18,
                          fontSize: 9,
                          fontWeight: 700,
                          background: '#DC2626',
                        }}
                      >
                        {item.badge}
                      </span>
                    )}
                    {collapsed && item.badge && (
                      <span
                        className="absolute top-1.5 right-1.5 rounded-full"
                        style={{ width: 5, height: 5, background: '#DC2626' }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          );
        })}
      </nav>

      {/* Bottom Section */}
      <div
        className="px-2 pb-4 pt-2 flex-shrink-0"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
      >
        {/* Scanner Status */}
        {!collapsed && (
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-lg mb-2"
            style={{
              background: 'rgba(82, 183, 136, 0.08)',
              border: '1px solid rgba(82, 183, 136, 0.15)',
            }}
          >
            <Wifi size={12} style={{ color: '#74C69D', flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, color: '#C8D8C9', fontWeight: 600 }}>
                Scanner Ready
              </div>
              <div style={{ fontSize: 9, color: 'var(--sidebar-muted)' }}>
                Mitti Scanner v1.2 · BLE
              </div>
            </div>
            <div
              className="w-1.5 h-1.5 rounded-full animate-pulse-dot flex-shrink-0"
              style={{ background: '#74C69D' }}
            />
          </div>
        )}

        {/* User Profile */}
        <div
          className={clsx(
            'flex items-center gap-2.5 px-2 py-2 rounded-xl cursor-pointer transition-all',
            collapsed && 'justify-center'
          )}
          style={{}} // hover handled via Tailwind transition-all className
        >
          <div
            className="flex-shrink-0 flex items-center justify-center rounded-full font-bold"
            style={{
              width: 32,
              height: 32,
              background: 'linear-gradient(135deg, #2D6A4F 0%, #52B788 100%)',
              color: 'white',
              fontSize: 12,
            }}
          >
            FM
          </div>
          {!collapsed && (
            <div className="overflow-hidden flex-1 min-w-0">
              <div
                className="font-semibold truncate"
                style={{ fontSize: 12, color: '#FFFFFF' }}
              >
                Farm Manager
              </div>
              <div className="flex items-center gap-1">
                <Building2 size={9} style={{ color: 'var(--sidebar-muted)' }} />
                <span
                  className="truncate"
                  style={{ fontSize: 10, color: 'var(--sidebar-muted)' }}
                >
                  The Mitti Tech
                </span>
              </div>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={handleLogout}
              title="Sign Out / Switch Account"
              className="p-1.5 rounded-lg text-rose-300/70 hover:text-rose-200 hover:bg-rose-950/50 transition-colors"
            >
              <LogOut size={13} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
