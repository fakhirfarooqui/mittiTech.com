'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { reports } from '@/data/mockData';
import {
  FileBarChart2,
  Download,
  Eye,
  Search,
  Calendar,
  FileText,
  BarChart3,
  Leaf,
  FlaskConical,
  ScanLine,
  Map,
} from 'lucide-react';

const reportTypeIcons: Record<string, React.ReactElement> = {
  'Soil Health': <FlaskConical size={18} />,
  'Farm Overview': <Map size={18} />,
  'Crop Health': <Leaf size={18} />,
  'Scan History': <ScanLine size={18} />,
  'Field Comparison': <BarChart3 size={18} />,
};

const reportTypeColors: Record<string, string> = {
  'Soil Health': 'var(--brand-600)',
  'Farm Overview': '#2563EB',
  'Crop Health': '#166534',
  'Scan History': '#7C3AED',
  'Field Comparison': '#D97706',
};

export default function ReportsPage() {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState<string | null>(null);
  const [showDemoToast, setShowDemoToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const types = Array.from(new Set(reports.map((r) => r.type)));

  const filtered = reports.filter((r) => {
    const matchSearch =
      r.title.toLowerCase().includes(search.toLowerCase()) ||
      r.farm.toLowerCase().includes(search.toLowerCase());
    const matchType = !filterType || r.type === filterType;
    return matchSearch && matchType;
  });

  const triggerDemo = (msg: string) => {
    setToastMsg(msg);
    setShowDemoToast(true);
    setTimeout(() => setShowDemoToast(false), 3000);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      <Header title="Agronomic Intelligence Reports" subtitle="Automated telemetry summaries, soil assays, and exports" />

      <main className="page-content flex-1 overflow-y-auto page-enter">
        {/* Metric Summary Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Published Reports', value: reports.length, icon: '📋', color: 'var(--brand-700)' },
            { label: 'Soil Health Audits', value: reports.filter((r) => r.type === 'Soil Health').length, icon: '🧪', color: '#166534' },
            { label: 'Farm Spatial Profiles', value: reports.filter((r) => r.type === 'Farm Overview').length, icon: '🏡', color: '#2563EB' },
            { label: 'Generated This Month', value: reports.length, icon: '📅', color: '#D97706' },
          ].map((s) => (
            <div key={s.label} className="metric-card">
              <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
              <div className="metric-value" style={{ fontSize: 26, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Search & Filter Toolbar */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <div
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl flex-1 min-w-56"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', maxWidth: 320 }}
          >
            <Search size={15} style={{ color: 'var(--text-faint)' }} />
            <input
              type="text"
              placeholder="Search by title, crop or field..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontSize: 13,
                color: 'var(--text-primary)',
                width: '100%',
              }}
            />
          </div>

          <div className="tab-nav">
            <button className={`tab-item ${!filterType ? 'active' : ''}`} onClick={() => setFilterType(null)} style={{ fontSize: 11.5 }}>All Reports</button>
            {types.map((t) => (
              <button
                key={t}
                className={`tab-item ${filterType === t ? 'active' : ''}`}
                onClick={() => setFilterType(t)}
                style={{ fontSize: 11.5 }}
              >
                {t}
              </button>
            ))}
          </div>

          <div style={{ flex: 1 }} />
          <button className="btn-secondary" style={{ fontSize: 12, padding: '7px 14px' }}>
            <Calendar size={13} /> Fiscal Year 2026
          </button>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-6">
          {filtered.map((report) => {
            const color = reportTypeColors[report.type] || 'var(--brand-600)';
            const icon = reportTypeIcons[report.type] || <FileText size={18} />;

            return (
              <div
                key={report.id}
                className="mitti-card"
                style={{ borderTop: `4px solid ${color}`, background: 'var(--bg-card)' }}
              >
                {/* Header with Type Icon */}
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: 'var(--bg-surface)',
                      color,
                      border: '1px solid var(--border-light)',
                    }}
                  >
                    {icon}
                  </div>
                  <span
                    className="badge badge-good"
                    style={{ fontSize: 10 }}
                  >
                    {report.status}
                  </span>
                </div>

                <h3 style={{ fontSize: 14.5, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4, lineHeight: 1.4, fontFamily: 'Space Grotesk, sans-serif' }}>
                  {report.title}
                </h3>
                <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginBottom: 12 }}>
                  {report.type} · {report.farm} · {report.field}
                </div>

                {/* Metadata Row */}
                <div className="flex items-center gap-3 mb-4 text-xs" style={{ color: 'var(--text-secondary)' }}>
                  <span>📅 {report.date}</span>
                  <span>📄 {report.pages} pages</span>
                  <span>💾 {report.size}</span>
                </div>

                <div className="demo-notice mb-4" style={{ fontSize: 9.5 }}>
                  Verified SHA-256 Sensor Telemetry
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => triggerDemo(`Viewing full PDF preview for: ${report.title}`)}
                    className="btn-primary flex-1 justify-center min-w-0"
                    style={{ fontSize: 11.5, padding: '7px 9px', whiteSpace: 'nowrap' }}
                  >
                    <Eye size={13} /> View
                  </button>
                  <button
                    onClick={() => triggerDemo('PDF download generated')}
                    className="btn-secondary flex-1 justify-center min-w-0"
                    style={{ fontSize: 11.5, padding: '7px 9px', whiteSpace: 'nowrap' }}
                  >
                    <Download size={13} /> PDF
                  </button>
                  <button
                    onClick={() => triggerDemo('CSV telemetry dataset exported')}
                    className="btn-secondary flex-1 justify-center min-w-0"
                    style={{ fontSize: 11.5, padding: '7px 9px', whiteSpace: 'nowrap' }}
                  >
                    <Download size={13} /> CSV
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Custom Report Banner */}
        <div
          className="mitti-card p-6 flex items-center justify-between flex-wrap gap-4"
          style={{ background: 'linear-gradient(135deg, #FFFFFF 0%, var(--brand-10) 100%)', border: '1px solid var(--border-brand)' }}
        >
          <div>
            <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif', marginBottom: 4 }}>
              Compile Custom Farm Intelligence Package
            </div>
            <p style={{ fontSize: 12.5, color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: 560 }}>
              Aggregate multi-sensor hardware logs, drone NDVI mosaics, and KVK crop disease assessments into an investor-ready agronomic dossier.
            </p>
          </div>
          <button
            onClick={() => triggerDemo('Custom Report Builder initiated')}
            className="btn-primary"
            style={{ fontSize: 13, padding: '10px 18px' }}
          >
            <FileBarChart2 size={16} /> Launch Report Builder
          </button>
        </div>

        <div style={{ height: 28 }} />
      </main>

      {/* Demo Toast Notification */}
      {showDemoToast && (
        <div
          className="fixed bottom-6 right-6 z-50 animate-fade-in rounded-xl px-5 py-3.5"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-brand)',
            boxShadow: 'var(--shadow-xl)',
            fontSize: 13,
            color: 'var(--text-primary)',
            maxWidth: 380,
          }}
        >
          <div className="flex items-center gap-2.5">
            <span style={{ fontSize: 18 }}>🌱</span>
            <span style={{ fontWeight: 600 }}>{toastMsg}</span>
          </div>
        </div>
      )}
    </div>
  );
}
