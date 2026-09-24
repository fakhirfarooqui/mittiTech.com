'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { alerts } from '@/data/mockData';
import {
  Bell,
  CheckCheck,
  ChevronRight,
  X,
  ShieldAlert,
} from 'lucide-react';

const priorityConfig = {
  critical: {
    label: 'Critical',
    color: '#DC2626',
    bg: 'var(--status-danger-bg)',
    border: 'var(--status-danger-border)',
    badgeClass: 'badge-danger',
  },
  attention: {
    label: 'Attention',
    color: '#D97706',
    bg: 'var(--status-warn-bg)',
    border: 'var(--status-warn-border)',
    badgeClass: 'badge-warning',
  },
  info: {
    label: 'Advisory',
    color: '#2563EB',
    bg: 'var(--status-info-bg)',
    border: 'var(--status-info-border)',
    badgeClass: 'badge-info',
  },
};

const typeIconMap: Record<string, string> = {
  soil_moisture: '💧',
  crop_health: '🌿',
  weather: '🌧️',
  irrigation: '🚿',
  ai_insight: '🤖',
  scan_complete: '🔬',
  scanner: '📡',
};

export default function AlertsPage() {
  const [alertList, setAlertList] = useState(alerts);
  const [filter, setFilter] = useState<string>('all');
  const [readFilter, setReadFilter] = useState<'all' | 'unread' | 'read'>('all');
  const [selectedAlert, setSelectedAlert] = useState<typeof alerts[0] | null>(null);

  const filtered = alertList.filter((a) => {
    const matchPriority = filter === 'all' || a.priority === filter;
    const matchRead =
      readFilter === 'all' ||
      (readFilter === 'unread' && !a.read) ||
      (readFilter === 'read' && a.read);
    return matchPriority && matchRead;
  });

  const markRead = (id: string) => {
    setAlertList((prev) => prev.map((a) => (a.id === id ? { ...a, read: true } : a)));
  };

  const markAllRead = () => {
    setAlertList((prev) => prev.map((a) => ({ ...a, read: true })));
  };

  const unreadCount = alertList.filter((a) => !a.read).length;

  const counts = {
    all: alertList.length,
    critical: alertList.filter((a) => a.priority === 'critical').length,
    attention: alertList.filter((a) => a.priority === 'attention').length,
    info: alertList.filter((a) => a.priority === 'info').length,
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      <Header title="Farm Telemetry & Alerts" subtitle={`${unreadCount} pending action items`} />

      <main className="page-content flex-1 overflow-y-auto page-enter">
        {/* Metric Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Logs', value: alertList.length, icon: '🔔', color: 'var(--brand-700)' },
            { label: 'Critical Action', value: counts.critical, icon: '🔴', color: 'var(--status-danger)' },
            { label: 'Agronomic Warning', value: counts.attention, icon: '🟡', color: 'var(--status-warn)' },
            { label: 'Unresolved', value: unreadCount, icon: '📩', color: 'var(--status-info)' },
          ].map((s) => (
            <div key={s.label} className="metric-card">
              <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
              <div className="metric-value" style={{ fontSize: 26, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Toolbar & Filters */}
        <div className="flex items-center gap-3 mb-5 flex-wrap">
          {/* Priority Tabs */}
          <div className="tab-nav">
            {(['all', 'critical', 'attention', 'info'] as const).map((p) => (
              <button
                key={p}
                className={`tab-item ${filter === p ? 'active' : ''}`}
                onClick={() => setFilter(p)}
                style={{ fontSize: 12 }}
              >
                {p === 'all' ? 'All Alerts' : p.charAt(0).toUpperCase() + p.slice(1)}
                {counts[p as keyof typeof counts] > 0 && (
                  <span
                    className="ml-1.5 inline-flex items-center justify-center rounded-full px-2 py-0.2"
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      background: p === 'critical' ? 'var(--status-danger-bg)' : p === 'attention' ? 'var(--status-warn-bg)' : 'var(--bg-surface)',
                      color: p === 'critical' ? 'var(--status-danger)' : p === 'attention' ? 'var(--status-warn)' : 'var(--text-muted)',
                    }}
                  >
                    {counts[p as keyof typeof counts]}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Read Status */}
          <div className="tab-nav">
            {(['all', 'unread', 'read'] as const).map((r) => (
              <button
                key={r}
                className={`tab-item ${readFilter === r ? 'active' : ''}`}
                onClick={() => setReadFilter(r)}
                style={{ fontSize: 11.5 }}
              >
                {r.charAt(0).toUpperCase() + r.slice(1)}
              </button>
            ))}
          </div>

          <div style={{ flex: 1 }} />

          {unreadCount > 0 && (
            <button onClick={markAllRead} className="btn-secondary" style={{ fontSize: 12, padding: '7px 14px' }}>
              <CheckCheck size={14} /> Mark All Acknowledged
            </button>
          )}
        </div>

        {/* Alerts List */}
        <div className="space-y-3">
          {filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100">
              <span style={{ fontSize: 44, marginBottom: 12 }}>🌿</span>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>
                No notifications matching current filters
              </div>
              <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>
                All systems and telemetry sensors functioning optimally.
              </div>
            </div>
          )}

          {filtered.map((alert) => {
            const cfg = priorityConfig[alert.priority as keyof typeof priorityConfig] || priorityConfig.info;
            const icon = typeIconMap[alert.type] || '📋';

            return (
              <div
                key={alert.id}
                className="mitti-card p-4 cursor-pointer transition-all hover:translate-x-1"
                style={{
                  background: alert.read ? 'var(--bg-card-alt)' : 'var(--bg-card)',
                  borderLeft: `4px solid ${alert.read ? 'var(--border-default)' : cfg.color}`,
                  boxShadow: alert.read ? 'none' : 'var(--shadow-card)',
                }}
                onClick={() => {
                  setSelectedAlert(alert);
                  if (!alert.read) markRead(alert.id);
                }}
              >
                <div className="flex items-start gap-4">
                  {/* Icon Box */}
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-xl"
                    style={{
                      width: 42,
                      height: 42,
                      background: cfg.bg,
                      border: `1px solid ${cfg.border}`,
                      fontSize: 20,
                    }}
                  >
                    {icon}
                  </div>

                  {/* Body */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span style={{ fontSize: 14, fontWeight: 700, color: alert.read ? 'var(--text-secondary)' : 'var(--text-primary)' }}>
                        {alert.title}
                      </span>
                      <span className={`badge ${cfg.badgeClass}`} style={{ fontSize: 10 }}>
                        {cfg.label}
                      </span>
                      {!alert.read && (
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ background: cfg.color }}
                        />
                      )}
                    </div>
                    <p style={{ fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.6 }}>
                      {alert.message}
                    </p>
                    <div className="flex items-center gap-2 mt-2.5 flex-wrap">
                      <span className="tag" style={{ fontSize: 10.5 }}>🏡 {alert.farm}</span>
                      {alert.field !== 'All Fields' && alert.field !== 'N/A' && (
                        <span className="tag" style={{ fontSize: 10.5 }}>📍 {alert.field}</span>
                      )}
                      <span style={{ fontSize: 11, color: 'var(--text-faint)', marginLeft: 'auto' }}>
                        {alert.time}
                      </span>
                    </div>
                  </div>

                  {/* Arrow Indicator */}
                  <ChevronRight size={18} style={{ color: 'var(--text-faint)', flexShrink: 0, marginTop: 12 }} />
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ height: 28 }} />
      </main>

      {/* Alert Detail Modal */}
      {selectedAlert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(28, 43, 30, 0.6)', backdropFilter: 'blur(6px)' }}
          onClick={() => setSelectedAlert(null)}
        >
          <div
            className="animate-fade-in"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: 20,
              width: '100%',
              maxWidth: 480,
              padding: 28,
              boxShadow: 'var(--shadow-elevated)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <span style={{ fontSize: 26 }}>{typeIconMap[selectedAlert.type] || '📋'}</span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                    {selectedAlert.title}
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{selectedAlert.time}</div>
                </div>
              </div>
              <button onClick={() => setSelectedAlert(null)} className="p-1 hover:bg-gray-100 rounded-lg">
                <X size={18} style={{ color: 'var(--text-muted)' }} />
              </button>
            </div>

            <p style={{ fontSize: 13.5, color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: 16 }}>
              {selectedAlert.message}
            </p>

            <div className="flex items-center gap-2 flex-wrap mb-5">
              <span className="tag">🏡 {selectedAlert.farm}</span>
              <span className="tag">📍 {selectedAlert.field}</span>
              <span
                className={`badge ${(priorityConfig[selectedAlert.priority as keyof typeof priorityConfig] || priorityConfig.info).badgeClass}`}
              >
                {selectedAlert.priority.toUpperCase()}
              </span>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSelectedAlert(null)}
                className="btn-secondary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                Dismiss
              </button>
              <button
                onClick={() => {
                  markRead(selectedAlert.id);
                  setSelectedAlert(null);
                }}
                className="btn-primary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <CheckCheck size={15} /> Acknowledge Action
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
