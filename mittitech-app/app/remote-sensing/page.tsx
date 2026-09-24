'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { remoteSensingData, selectedFarm } from '@/data/mockData';
import {
  Satellite,
  Layers,
  Calendar,
  ZoomIn,
  ZoomOut,
  RefreshCw,
  Info,
  Droplets,
  Activity,
  Compass,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// ────────────────────────────────────────────────────────────
// NDVI LEGEND
// ────────────────────────────────────────────────────────────
const ndviLegend = [
  { color: '#166534', label: 'Dense Healthy Foliage (NDVI > 0.70)' },
  { color: '#2D6A4F', label: 'Active Vigorous Canopy (0.50–0.70)' },
  { color: '#52B788', label: 'Moderate Canopy Index (0.35–0.50)' },
  { color: '#D97706', label: 'Moisture / Water Stress (0.15–0.35)' },
  { color: '#DC2626', label: 'Fallow / Emergence (< 0.15)' },
];

// ────────────────────────────────────────────────────────────
// MOCK FARM MAP SVG
// ────────────────────────────────────────────────────────────
function RemoteSensingMap({
  activeLayer,
  selectedFieldId,
  onSelectField,
}: {
  activeLayer: string;
  selectedFieldId: string | null;
  onSelectField: (id: string) => void;
}) {
  const fields = [
    {
      id: 'field-a',
      name: 'Field A (Bhindi)',
      points: '80,70 380,60 390,260 70,270',
      ndvi: 0.72,
      waterStress: 'Low',
      cx: 225, cy: 165,
    },
    {
      id: 'field-b',
      name: 'Field B (Potato)',
      points: '400,65 620,60 625,255 405,260',
      ndvi: 0.58,
      waterStress: 'Moderate',
      cx: 515, cy: 160,
    },
    {
      id: 'field-c',
      name: 'Field C (Wheat)',
      points: '635,65 770,60 770,255 638,255',
      ndvi: 0.82,
      waterStress: 'Low',
      cx: 703, cy: 158,
    },
  ];

  const getNDVIColor = (ndvi: number) => {
    if (ndvi > 0.7) return '#166534';
    if (ndvi > 0.5) return '#2D6A4F';
    if (ndvi > 0.35) return '#52B788';
    if (ndvi > 0.15) return '#D97706';
    return '#DC2626';
  };

  const getLayerColor = (field: typeof fields[0]) => {
    if (activeLayer === 'ndvi' || activeLayer === 'crop-health') return getNDVIColor(field.ndvi);
    if (activeLayer === 'water-stress') {
      return field.waterStress === 'Low' ? '#2563EB' : field.waterStress === 'Moderate' ? '#D97706' : '#DC2626';
    }
    return '#2D6A4F';
  };

  return (
    <div
      className="relative rounded-2xl overflow-hidden shadow-sm"
      style={{
        background: 'linear-gradient(160deg, #1C2B1E 0%, #152217 60%, #0F1A10 100%)',
        border: '1px solid var(--border-brand)',
        minHeight: 360,
      }}
    >
      {/* Precision Geospatial Grid */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(82, 183, 136, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(82, 183, 136, 0.08) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <svg
        width="100%"
        height="360"
        viewBox="0 0 860 360"
        preserveAspectRatio="xMidYMid meet"
        className="relative z-10"
      >
        {/* Farm cadastral boundary */}
        <polygon
          points="60,55 785,50 790,285 55,288"
          fill="none"
          stroke="rgba(82, 183, 136, 0.5)"
          strokeWidth="2"
          strokeDasharray="8 4"
        />

        {/* Polygons for each parcel */}
        {fields.map((field) => {
          const color = getLayerColor(field);
          const selected = selectedFieldId === field.id;
          return (
            <g key={field.id} onClick={() => onSelectField(field.id)} style={{ cursor: 'pointer' }}>
              <polygon
                points={field.points}
                fill={`${color}${selected ? '70' : '40'}`}
                stroke={color}
                strokeWidth={selected ? 3 : 1.5}
                style={{ transition: 'all 0.2s ease' }}
              />

              {/* Agronomic contour lines */}
              {[85, 120, 155, 190, 225, 255].map((y, i) => (
                <line
                  key={i}
                  x1={parseInt(field.points.split(' ')[0].split(',')[0]) + 10}
                  y1={y}
                  x2={parseInt(field.points.split(' ')[1].split(',')[0]) - 10}
                  y2={y}
                  stroke={color}
                  strokeWidth="0.8"
                  opacity="0.3"
                />
              ))}

              {/* Field Label badge */}
              <rect
                x={field.cx - 50}
                y={field.cy - 14}
                width={100}
                height={28}
                rx={8}
                fill="#1C2B1E"
                stroke={color}
                strokeWidth="1"
              />
              <text
                x={field.cx}
                y={field.cy + 1}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#FFFFFF"
                fontSize="11"
                fontWeight="700"
              >
                {field.name.split('(')[0].trim()}
              </text>
              <text
                x={field.cx}
                y={field.cy + 22}
                textAnchor="middle"
                fill="#AEDBB8"
                fontSize="9"
                fontWeight="600"
              >
                NDVI: {field.ndvi}
              </text>
            </g>
          );
        })}

        {/* Water / Subsurface drip main line */}
        <path d="M65,288 Q300,305 390,260" stroke="#60A5FA" strokeWidth="2.5" fill="none" opacity="0.6" strokeDasharray="6 3" />
        <path d="M390,260 Q510,270 625,255" stroke="#60A5FA" strokeWidth="2" fill="none" opacity="0.4" strokeDasharray="6 3" />

        {/* Compass Rosette */}
        <circle cx="800" cy="75" r="16" fill="rgba(28, 43, 30, 0.8)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        <text x="800" y="80" textAnchor="middle" fill="#52B788" fontSize="10" fontWeight="800">N↑</text>

        {/* Geospatial Scale Bar */}
        <line x1="60" y1="320" x2="180" y2="320" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
        <text x="120" y="335" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9" fontWeight="600">~250m Baseline</text>
      </svg>

      {/* Floating Active Layer Pill */}
      <div
        className="absolute top-4 left-4 flex items-center gap-2 px-3.5 py-2 rounded-xl backdrop-blur-md"
        style={{ background: 'rgba(28, 43, 30, 0.85)', border: '1px solid rgba(82, 183, 136, 0.3)' }}
      >
        <Satellite size={14} style={{ color: '#52B788' }} />
        <span style={{ fontSize: 12, color: '#FFFFFF', fontWeight: 700 }}>
          Sentinel-2 / {activeLayer.toUpperCase().replace('-', ' ')}
        </span>
        <span className="badge badge-brand" style={{ fontSize: 9, padding: '1px 6px' }}>10m Res</span>
      </div>

      {/* Zoom Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-1.5">
        {[
          { icon: <ZoomIn size={14} />, label: 'Zoom in' },
          { icon: <ZoomOut size={14} />, label: 'Zoom out' },
        ].map((b, i) => (
          <button
            key={i}
            className="flex items-center justify-center rounded-xl transition-all hover:bg-white/20"
            style={{
              width: 32,
              height: 32,
              background: 'rgba(28, 43, 30, 0.85)',
              border: '1px solid rgba(255,255,255,0.15)',
              color: 'white',
            }}
            title={b.label}
          >
            {b.icon}
          </button>
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// LAYER CONTROLS
// ────────────────────────────────────────────────────────────
const layers = [
  { id: 'ndvi', label: 'Normalized Vegetation (NDVI)', icon: '🌿', color: '#166534' },
  { id: 'water-stress', label: 'Canopy Water Stress (NDWI)', icon: '💧', color: '#2563EB' },
  { id: 'crop-health', label: 'Chlorophyll Absorbance', icon: '🌱', color: '#2D6A4F' },
  { id: 'field-zones', label: 'Cadastral Boundaries', icon: '📐', color: '#7C3AED' },
];

// ────────────────────────────────────────────────────────────
// MAIN REMOTE SENSING PAGE
// ────────────────────────────────────────────────────────────
export default function RemoteSensingPage() {
  const [activeLayer, setActiveLayer] = useState('ndvi');
  const [selectedFieldId, setSelectedFieldId] = useState<string | null>('field-a');

  const selectedField = remoteSensingData.fields.find((f) => f.id === selectedFieldId) || remoteSensingData.fields[0];

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      <Header title="FieldSense" subtitle="Satellite remote sensing & multispectral farm telemetry" />

      <main className="page-content fieldsense-page flex-1 overflow-y-auto page-enter">
        {/* Hero Control Bar */}
        <div
          className="mitti-card mb-5 flex items-center justify-between flex-wrap gap-3"
          style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'var(--brand-10)', border: '1px solid var(--border-brand)' }}
            >
              <Satellite size={20} style={{ color: 'var(--brand-700)' }} />
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                FieldSense Orbital Telemetry
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                {selectedFarm.name} · European Space Agency Sentinel-2 Feed · Updated: {remoteSensingData.lastUpdated}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="btn-secondary" style={{ fontSize: 12, padding: '7px 14px' }}>
              <Calendar size={13} /> 30-Day Window
            </button>
            <button className="btn-primary" style={{ fontSize: 12, padding: '7px 14px' }}>
              <RefreshCw size={13} /> Fetch New Tile
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {/* Main Map + Trends (3 cols) */}
          <div className="lg:col-span-3 space-y-5">
            <RemoteSensingMap
              activeLayer={activeLayer}
              selectedFieldId={selectedFieldId}
              onSelectField={setSelectedFieldId}
            />

            {/* Selected Field Telemetry Strip */}
            {selectedField && (
              <div
                className="mitti-card"
                style={{ borderLeft: '4px solid var(--brand-600)' }}
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)' }}>
                      {selectedField.name} — {selectedField.crop}
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>
                      Cadastral Lot #7842 · Stage: {selectedField.growthStage}
                    </div>
                  </div>

                  <div className="flex items-center gap-6 flex-wrap">
                    <div className="text-center">
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Mean NDVI</div>
                      <div className="metric-value" style={{ fontSize: 18, color: 'var(--status-good)' }}>
                        {selectedField.ndvi.toFixed(2)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Canopy Index</div>
                      <span className="badge badge-good" style={{ fontSize: 11 }}>
                        {selectedField.ndviStatus}
                      </span>
                    </div>
                    <div className="text-center">
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Moisture Stress</div>
                      <span
                        className="badge"
                        style={{
                          background: selectedField.waterStress === 'Low' ? 'var(--status-info-bg)' : 'var(--status-warn-bg)',
                          color: selectedField.waterStress === 'Low' ? 'var(--status-info)' : 'var(--status-warn)',
                          border: `1px solid ${selectedField.waterStress === 'Low' ? 'var(--status-info-border)' : 'var(--status-warn-border)'}`,
                        }}
                      >
                        {selectedField.waterStress}
                      </span>
                    </div>
                    <div className="text-center">
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Acreage</div>
                      <div className="metric-value" style={{ fontSize: 18, color: 'var(--text-primary)' }}>
                        {selectedField.area} ac
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Vegetation Trend Chart */}
            <div className="mitti-card">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <div>
                  <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                    Multi-Field Canopy Indices (NDVI)
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                    Comparative bi-weekly satellite passes
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {[
                    { label: 'Field A (Bhindi)', color: '#166534' },
                    { label: 'Field B (Potato)', color: '#D97706' },
                    { label: 'Field C (Wheat)', color: '#2563EB' },
                  ].map((l) => (
                    <div key={l.label} className="flex items-center gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full" style={{ background: l.color }} />
                      <span style={{ fontSize: 11, color: 'var(--text-secondary)', fontWeight: 500 }}>{l.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ height: 210 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={remoteSensingData.vegetationTrend}>
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                    <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                    <YAxis domain={[0.3, 1.0]} tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} width={40} />
                    <Tooltip
                      contentStyle={{
                        background: 'var(--bg-card)',
                        border: '1px solid var(--border-light)',
                        borderRadius: 12,
                        fontSize: 12,
                        boxShadow: 'var(--shadow-md)',
                      }}
                    />
                    <Line type="monotone" dataKey="fieldA" stroke="#166534" strokeWidth={2.5} dot={false} name="Field A" />
                    <Line type="monotone" dataKey="fieldB" stroke="#D97706" strokeWidth={2.5} dot={false} name="Field B" />
                    <Line type="monotone" dataKey="fieldC" stroke="#2563EB" strokeWidth={2.5} dot={false} name="Field C" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Right: Layer Selector & Legend (1 col) */}
          <div className="space-y-4">
            {/* Layer Controls */}
            <div className="mitti-card">
              <div className="section-header">Multispectral Layers</div>
              <div className="space-y-2">
                {layers.map((layer) => (
                  <button
                    key={layer.id}
                    onClick={() => setActiveLayer(layer.id)}
                    className="w-full flex items-center gap-2.5 rounded-xl px-3.5 py-3 text-left transition-all"
                    style={{
                      background:
                        activeLayer === layer.id ? 'var(--bg-selected)' : 'var(--bg-surface)',
                      border:
                        activeLayer === layer.id
                          ? '1px solid var(--border-brand)'
                          : '1px solid var(--border-faint)',
                    }}
                  >
                    <span style={{ fontSize: 16 }}>{layer.icon}</span>
                    <span
                      style={{
                        fontSize: 12.5,
                        fontWeight: activeLayer === layer.id ? 700 : 500,
                        color: activeLayer === layer.id ? 'var(--brand-700)' : 'var(--text-secondary)',
                      }}
                    >
                      {layer.label}
                    </span>
                    {activeLayer === layer.id && (
                      <div
                        className="ml-auto w-2 h-2 rounded-full"
                        style={{ background: 'var(--brand-500)' }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* NDVI Legend */}
            <div className="mitti-card">
              <div className="section-header">Canopy Scale Legend</div>
              <div className="space-y-2">
                {ndviLegend.map((item) => (
                  <div key={item.label} className="flex items-center gap-2.5">
                    <div
                      className="rounded-md"
                      style={{ width: 14, height: 14, background: item.color, flexShrink: 0 }}
                    />
                    <span style={{ fontSize: 11, color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Field Parcels Summary */}
            <div className="mitti-card">
              <div className="section-header">Parcels Under Monitoring</div>
              <div className="space-y-3">
                {remoteSensingData.fields.map((field) => (
                  <div
                    key={field.id}
                    className="rounded-xl p-3.5 cursor-pointer transition-all hover:border-[var(--brand-400)]"
                    style={{
                      background: selectedFieldId === field.id ? 'var(--bg-selected)' : 'var(--bg-surface)',
                      border: selectedFieldId === field.id ? '1px solid var(--border-brand)' : '1px solid var(--border-light)',
                    }}
                    onClick={() => setSelectedFieldId(field.id)}
                  >
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 4 }}>
                      {field.name} — {field.crop}
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Canopy NDVI</span>
                      <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--brand-700)' }}>
                        {field.ndvi}
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{
                          width: `${field.ndvi * 100}%`,
                          background: 'linear-gradient(90deg, var(--brand-700), var(--brand-400))',
                        }}
                      />
                    </div>
                    <div className="flex items-center justify-between mt-2.5">
                      <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Water Stress</span>
                      <span
                        className="badge"
                        style={{
                          fontSize: 10,
                          background: field.waterStress === 'Low' ? 'var(--status-info-bg)' : 'var(--status-warn-bg)',
                          color: field.waterStress === 'Low' ? 'var(--status-info)' : 'var(--status-warn)',
                          border: `1px solid ${field.waterStress === 'Low' ? 'var(--status-info-border)' : 'var(--status-warn-border)'}`,
                        }}
                      >
                        {field.waterStress}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: 28 }} />
      </main>
    </div>
  );
}
