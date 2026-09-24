'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { farms } from '@/data/mockData';
import {
  Search,
  Plus,
  MapPin,
  ChevronRight,
  Sprout,
  FlaskConical,
  X,
  Layers,
  Calendar,
} from 'lucide-react';
import Link from 'next/link';

// ────────────────────────────────────────────────────────────
// FARM FIELD MAP VISUAL
// ────────────────────────────────────────────────────────────
function FarmFieldVisualization({ farm }: { farm: typeof farms[0] }) {
  const [selectedField, setSelectedField] = useState<string | null>(null);
  const colors = ['#166534', '#2D6A4F', '#2563EB', '#D97706', '#7C3AED'];

  const fieldPolygons = [
    { id: 'field-a', label: 'Field A', points: '60,50 300,45 310,180 55,185', cx: 180, cy: 115 },
    { id: 'field-b', label: 'Field B', points: '315,50 490,45 500,180 320,185', cx: 405, cy: 115 },
    { id: 'field-c', label: 'Field C', points: '505,50 640,50 645,180 510,180', cx: 575, cy: 115 },
  ];

  const getField = (id: string) => farm.fields.find((f) => f.id === id);
  const sel = selectedField ? getField(selectedField) : null;

  return (
    <div className="relative">
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'linear-gradient(160deg, #1C2B1E 0%, #152217 60%, #0F1A10 100%)',
          border: '1px solid var(--border-brand)',
          minHeight: 220,
        }}
      >
        <svg width="100%" height="220" viewBox="0 0 700 220" preserveAspectRatio="xMidYMid meet" className="relative z-10">
          <defs>
            {fieldPolygons.map((fp, i) => (
              <linearGradient key={fp.id} id={`fg-${fp.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={colors[i % colors.length]} stopOpacity="0.6" />
                <stop offset="100%" stopColor={colors[i % colors.length]} stopOpacity="0.25" />
              </linearGradient>
            ))}
          </defs>

          {/* Cadastral farm boundary */}
          <polygon
            points="50,40 650,38 655,190 45,192"
            fill="none"
            stroke="rgba(82, 183, 136, 0.45)"
            strokeWidth="2"
            strokeDasharray="8 4"
          />

          {fieldPolygons.map((fp, i) => {
            const f = getField(fp.id);
            const isSelected = selectedField === fp.id;
            const color = f?.color || colors[i];
            return (
              <g key={fp.id} onClick={() => setSelectedField(isSelected ? null : fp.id)} style={{ cursor: 'pointer' }}>
                <polygon
                  points={fp.points}
                  fill={isSelected ? `${color}70` : `${color}35`}
                  stroke={color}
                  strokeWidth={isSelected ? 3 : 1.5}
                />
                {/* Agronomic furrow marks */}
                {[60, 85, 110, 135, 160].map((y, ri) => (
                  <line
                    key={ri}
                    x1={parseInt(fp.points.split(' ')[0].split(',')[0]) + 8}
                    y1={y}
                    x2={parseInt(fp.points.split(' ')[1].split(',')[0]) - 8}
                    y2={y}
                    stroke={color}
                    strokeWidth="0.8"
                    opacity="0.3"
                  />
                ))}
                <circle cx={fp.cx} cy={fp.cy} r="18" fill="#1C2B1E" stroke={color} strokeWidth="1" />
                <text x={fp.cx} y={fp.cy + 1} textAnchor="middle" dominantBaseline="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">
                  {fp.label.split(' ')[1]}
                </text>
              </g>
            );
          })}

          <text x="665" y="55" fill="rgba(82, 183, 136, 0.7)" fontSize="11" fontWeight="700">N↑</text>
          <text x="55" y="210" fill="rgba(255, 255, 255, 0.4)" fontSize="9.5">
            Cadastral Boundary · {farm.area} Acres
          </text>
        </svg>
      </div>

      {/* Field Inspection Tooltip */}
      {sel && (
        <div
          className="mt-3 rounded-xl p-4 animate-fade-in"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-card)',
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 rounded-full" style={{ background: sel.color }} />
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
                {sel.name} — {sel.crop}
              </span>
            </div>
            <button onClick={() => setSelectedField(null)} className="p-1 hover:bg-gray-100 rounded-md">
              <X size={15} style={{ color: 'var(--text-muted)' }} />
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-2">
            {[
              { label: 'Acreage', value: `${sel.area} Ac` },
              { label: 'Canopy Health', value: `${sel.cropHealth}%` },
              { label: 'Soil Health', value: `${sel.soilHealth}%` },
              { label: 'Phenology', value: sel.stage },
              { label: 'Last Telemetry', value: sel.lastScan },
            ].map((it) => (
              <div key={it.label} className="p-2 rounded-lg" style={{ background: 'var(--bg-surface)' }}>
                <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>{it.label}</div>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-primary)', marginTop: 2 }}>{it.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// FARM CARD
// ────────────────────────────────────────────────────────────
function FarmCard({
  farm,
  onView,
}: {
  farm: typeof farms[0];
  onView: (f: typeof farms[0]) => void;
}) {
  const healthColor =
    farm.farmHealth === 'Excellent'
      ? '#166534'
      : farm.farmHealth === 'Good'
      ? '#2D6A4F'
      : farm.farmHealth === 'Moderate'
      ? '#D97706'
      : '#DC2626';

  const badgeClass =
    farm.farmHealth === 'Excellent' || farm.farmHealth === 'Good'
      ? 'badge-good'
      : farm.farmHealth === 'Moderate'
      ? 'badge-warning'
      : 'badge-danger';

  return (
    <div
      className="mitti-card farm-card cursor-pointer"
      onClick={() => onView(farm)}
      style={{
        borderLeft: `4px solid ${healthColor}`,
        background: 'var(--bg-card)',
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4 flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
              {farm.name}
            </h3>
            <span className={`badge ${badgeClass}`}>{farm.farmHealth}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin size={13} style={{ color: 'var(--text-muted)' }} />
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{farm.location}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {farm.monitoringStatus === 'Active' ? (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: 'var(--status-good-bg)', border: '1px solid var(--status-good-border)' }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--status-good)' }} />
              <span style={{ fontSize: 11, color: 'var(--status-good)', fontWeight: 700 }}>Telemetry Stream Active</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{ background: 'var(--bg-surface)' }}>
              <div className="w-2 h-2 rounded-full" style={{ background: '#9CA3AF' }} />
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Standby</span>
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
        {[
          { label: 'Total Acreage', value: `${farm.area} ${farm.areaUnit}`, icon: '📐' },
          { label: 'Principal Crop', value: farm.primaryCrop, icon: '🌿' },
          { label: 'Soil Health Index', value: `${farm.soilHealth}%`, icon: '🧪' },
          { label: 'Canopy Index', value: `${farm.cropHealth}%`, icon: '🌱' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl p-3"
            style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)' }}
          >
            <div style={{ fontSize: 16, marginBottom: 2 }}>{stat.icon}</div>
            <div className="metric-value" style={{ fontSize: 15, color: 'var(--text-primary)' }}>{stat.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Fields Preview Chips */}
      <div className="flex items-center gap-2 flex-wrap mb-4">
        {farm.fields.map((field) => (
          <div
            key={field.id}
            className="flex items-center gap-2 rounded-lg px-3 py-1.5"
            style={{
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-light)',
            }}
          >
            <div className="w-2.5 h-2.5 rounded-full" style={{ background: field.color }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)' }}>{field.name}</span>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>({field.crop})</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3" style={{ borderTop: '1px solid var(--border-light)' }}>
        <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
          Last sensor probe: {farm.lastScan}
        </span>
        <button
          className="flex items-center gap-1.5 text-xs font-bold"
          style={{ color: 'var(--brand-700)' }}
          onClick={(e) => { e.stopPropagation(); onView(farm); }}
        >
          Inspect Farm Cadastre <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// FARM DETAIL MODAL
// ────────────────────────────────────────────────────────────
function FarmDetailPanel({
  farm,
  onClose,
}: {
  farm: typeof farms[0] | null;
  onClose: () => void;
}) {
  if (!farm) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(28, 43, 30, 0.65)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="animate-fade-in overflow-y-auto"
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-light)',
          borderRadius: 24,
          width: '100%',
          maxWidth: 880,
          maxHeight: '92vh',
          boxShadow: 'var(--shadow-elevated)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-7 py-5"
          style={{ borderBottom: '1px solid var(--border-light)' }}
        >
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
              {farm.name}
            </h2>
            <div className="flex items-center gap-2.5 mt-1">
              <MapPin size={13} style={{ color: 'var(--text-muted)' }} />
              <span style={{ fontSize: 12.5, color: 'var(--text-muted)' }}>{farm.location}</span>
              <span className={`badge ${farm.farmHealth === 'Good' || farm.farmHealth === 'Excellent' ? 'badge-good' : 'badge-warning'}`}>
                {farm.farmHealth} Condition
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex items-center justify-center rounded-xl p-2 hover:bg-gray-100"
          >
            <X size={18} style={{ color: 'var(--text-muted)' }} />
          </button>
        </div>

        <div className="p-7">
          {/* Cadastral Visualization */}
          <div className="mb-6">
            <div className="section-header">Cadastral Boundary & Parcel Distribution</div>
            <FarmFieldVisualization farm={farm} />
          </div>

          {/* Key Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-6">
            {[
              { label: 'Total Acreage', value: `${farm.area} Acres`, icon: '📐' },
              { label: 'Active Parcels', value: `${farm.fields.length} Fields`, icon: '🗺️' },
              { label: 'Current Crop', value: farm.primaryCrop, icon: '🌿' },
              { label: 'Latest Sync', value: farm.lastScan, icon: '📡' },
            ].map((s) => (
              <div key={s.label} className="metric-card">
                <div style={{ fontSize: 18, marginBottom: 4 }}>{s.icon}</div>
                <div className="metric-value" style={{ fontSize: 16, color: 'var(--text-primary)' }}>{s.value}</div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Fields Detail */}
          <div className="section-header">Field Sub-Parcels & Telemetry</div>
          <div className="space-y-3">
            {farm.fields.map((field) => (
              <div
                key={field.id}
                className="rounded-xl p-4"
                style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)' }}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm"
                      style={{ background: 'white', color: field.color, border: '1px solid var(--border-light)' }}
                    >
                      {field.name.split(' ')[1]}
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)' }}>
                        {field.name}
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                        {field.crop} · {field.area} Acres · Stage: {field.stage}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>Canopy Health</div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: field.color }}>{field.cropHealth}%</div>
                    </div>
                    <div className="text-right">
                      <div style={{ fontSize: 10.5, color: 'var(--text-muted)' }}>Soil Health</div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: 'var(--brand-700)' }}>{field.soilHealth}%</div>
                    </div>
                  </div>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${field.cropHealth}%`, background: field.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Modal Action CTA */}
          <div className="flex items-center gap-3 mt-6">
            <Link href="/soil-intelligence" className="btn-primary" style={{ flex: 1, justifyContent: 'center' }}>
              <FlaskConical size={15} /> Open Soil Telemetry
            </Link>
            <Link href="/remote-sensing" className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
              <Layers size={15} /> Satellite View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// MAIN FARMS PAGE
// ────────────────────────────────────────────────────────────
export default function FarmsPage() {
  const [search, setSearch] = useState('');
  const [filterHealth, setFilterHealth] = useState<string | null>(null);
  const [selectedFarm, setSelectedFarm] = useState<typeof farms[0] | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const filtered = farms.filter((f) => {
    const matchesSearch =
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.location.toLowerCase().includes(search.toLowerCase()) ||
      f.primaryCrop.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = !filterHealth || f.farmHealth === filterHealth;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      <Header title="Farm Holdings & Cadastre" subtitle={`${farms.length} agricultural facilities under management`} />

      <main className="page-content farms-page flex-1 overflow-y-auto page-enter">
        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-6 flex-wrap">
          <div
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl flex-1 min-w-52"
            style={{ background: 'var(--bg-card)', border: '1px solid var(--border-default)', maxWidth: 320 }}
          >
            <Search size={15} style={{ color: 'var(--text-faint)', flexShrink: 0 }} />
            <input
              type="text"
              placeholder="Search farm name, location, crop..."
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

          {/* Filter by Health */}
          <div className="tab-nav">
            {[null, 'Excellent', 'Good', 'Moderate'].map((h) => (
              <button
                key={h || 'all'}
                onClick={() => setFilterHealth(h)}
                className={`tab-item ${filterHealth === h ? 'active' : ''}`}
                style={{ fontSize: 11.5 }}
              >
                {h || 'All Facilities'}
              </button>
            ))}
          </div>

          <div style={{ flex: 1 }} />

          {/* Add Farm Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="btn-primary"
            style={{ fontSize: 13, padding: '9px 18px' }}
          >
            <Plus size={15} />
            Register New Farm
          </button>
        </div>

        {/* Aggregate KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Registered Holdings', value: farms.length, icon: '🏡', color: 'var(--brand-700)' },
            { label: 'Total Managed Acreage', value: `${farms.reduce((a, f) => a + f.area, 0)} Acres`, icon: '📐', color: '#2563EB' },
            { label: 'Continuous Telemetry', value: `${farms.filter((f) => f.monitoringStatus === 'Active').length} Active`, icon: '📡', color: '#166534' },
            { label: 'Mean Soil Health', value: `${Math.round(farms.reduce((a, f) => a + f.soilHealth, 0) / farms.length)}%`, icon: '🧪', color: '#D97706' },
          ].map((s) => (
            <div key={s.label} className="metric-card">
              <div style={{ fontSize: 20, marginBottom: 4 }}>{s.icon}</div>
              <div className="metric-value" style={{ fontSize: 24, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Farm Cards List */}
        <div className="space-y-4">
          {filtered.map((farm) => (
            <FarmCard key={farm.id} farm={farm} onView={setSelectedFarm} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100">
            <span style={{ fontSize: 44, marginBottom: 12 }}>🔍</span>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text-primary)' }}>No farms matching search criteria</div>
            <div style={{ fontSize: 13, color: 'var(--text-muted)', marginTop: 4 }}>Try clearing the search box or selecting &apos;All Facilities&apos;</div>
          </div>
        )}

        <div style={{ height: 28 }} />
      </main>

      {/* Farm Detail Modal */}
      {selectedFarm && <FarmDetailPanel farm={selectedFarm} onClose={() => setSelectedFarm(null)} />}

      {/* Add Farm Modal */}
      {showAddModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: 'rgba(28, 43, 30, 0.65)', backdropFilter: 'blur(6px)' }}
          onClick={() => setShowAddModal(false)}
        >
          <div
            className="animate-fade-in"
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-light)',
              borderRadius: 24,
              width: '100%',
              maxWidth: 500,
              boxShadow: 'var(--shadow-elevated)',
              padding: 30,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 style={{ fontSize: 19, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                Register New Agricultural Asset
              </h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 hover:bg-gray-100 rounded-md">
                <X size={18} style={{ color: 'var(--text-muted)' }} />
              </button>
            </div>

            <div className="demo-notice mb-5">
              Enterprise Cadastral Onboarding Wizard
            </div>

            <div className="space-y-4">
              {[
                { label: 'Farm / Estate Name', placeholder: 'e.g. Sunrise Organic Estate', type: 'text' },
                { label: 'District / State', placeholder: 'e.g. Varanasi, Uttar Pradesh', type: 'text' },
                { label: 'Total Survey Area (Acres)', placeholder: 'e.g. 15.5', type: 'number' },
                { label: 'Principal Commodity Crop', placeholder: 'e.g. Basmati Paddy / Wheat', type: 'text' },
              ].map((f) => (
                <div key={f.label}>
                  <label style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
                    {f.label}
                  </label>
                  <input
                    type={f.type}
                    placeholder={f.placeholder}
                    className="mitti-input"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-3 mt-7">
              <button
                onClick={() => setShowAddModal(false)}
                className="btn-secondary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  alert('Farm asset successfully registered in demonstration ledger!');
                }}
                className="btn-primary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                Register Asset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
