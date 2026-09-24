'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { soilReadings, soilTrendData, scanHistory, selectedFarm } from '@/data/mockData';
import {
  FlaskConical,
  Download,
  Scan,
  ChevronDown,
  Wifi,
  CheckCircle2,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  Info,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

// ────────────────────────────────────────────────────────────
// SOIL HEALTH SCORE RING
// ────────────────────────────────────────────────────────────
function SoilHealthRing({ score }: { score: number }) {
  const radius = 68;
  const circumference = 2 * Math.PI * radius;
  const progress = (score / 100) * circumference;
  const color = score >= 75 ? '#166534' : score >= 50 ? '#D97706' : '#DC2626';

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: 170, height: 170 }}>
        <svg width="170" height="170" className="rotate-[-90deg]">
          <circle cx="85" cy="85" r={radius} fill="none" stroke="rgba(0,0,0,0.06)" strokeWidth="12" />
          <circle
            cx="85"
            cy="85"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="12"
            strokeDasharray={`${progress} ${circumference}`}
            strokeLinecap="round"
            style={{
              transition: 'stroke-dasharray 1s ease',
              filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.08))',
            }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="metric-value" style={{ fontSize: 38, color, lineHeight: 1 }}>
            {score}
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>/ 100</div>
          <div
            className="badge badge-good mt-1.5"
            style={{ fontSize: 10, padding: '2px 8px' }}
          >
            {score >= 75 ? 'Optimal' : score >= 50 ? 'Moderate' : 'Action Needed'}
          </div>
        </div>
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginTop: 8 }}>
        Soil Health Score
      </div>
      <div className="demo-notice mt-1">Calibrated Sensor Stream</div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// METRIC CARD
// ────────────────────────────────────────────────────────────
const statusColor: Record<string, string> = {
  good: '#166534',
  moderate: '#D97706',
  low: '#DC2626',
  high: '#DC2626',
};

const statusIcon: Record<string, React.ReactElement> = {
  good: <TrendingUp size={12} />,
  moderate: <Minus size={12} />,
  low: <TrendingDown size={12} />,
  high: <TrendingDown size={12} />,
};

function SoilMetricCard({
  label,
  value,
  unit,
  status,
  range,
  icon,
}: {
  label: string;
  value: number;
  unit: string;
  status: string;
  range: string;
  icon: string;
}) {
  const color = statusColor[status] || 'var(--brand-600)';

  return (
    <div
      className="metric-card"
      style={{
        borderLeft: `4px solid ${color}`,
        background: 'var(--bg-card)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <div className="flex items-start justify-between mb-2">
        <span style={{ fontSize: 22 }}>{icon}</span>
        <span
          className="flex items-center gap-1 font-semibold"
          style={{ fontSize: 10.5, color }}
        >
          {statusIcon[status]}
          <span>{status.charAt(0).toUpperCase() + status.slice(1)}</span>
        </span>
      </div>
      <div className="metric-value" style={{ fontSize: 24, color: 'var(--text-primary)' }}>
        {value}
        <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-muted)', marginLeft: 4 }}>
          {unit}
        </span>
      </div>
      <div style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-secondary)', marginTop: 2 }}>
        {label}
      </div>
      <div style={{ fontSize: 10.5, color: 'var(--text-muted)', marginTop: 2 }}>
        Target: {range}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// SCAN WORKFLOW
// ────────────────────────────────────────────────────────────
function ScanWorkflow({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);

  const steps = [
    { label: 'Pair Scanner', icon: '⚡', desc: 'BLE connected to Mitti Scanner v1.2' },
    { label: 'Sample Telemetry', icon: '📡', desc: 'Reading NPK, pH, EC, Moisture, Temp' },
    { label: 'Mrida-AI Analysis', icon: '🧠', desc: 'Running local edge agronomy model' },
    { label: 'Sync Insights', icon: '✅', desc: 'Publishing field health advisory' },
  ];

  const runDemo = () => {
    setStep(1);
    const advance = (s: number) => {
      if (s <= 4) {
        setTimeout(() => {
          setStep(s);
          if (s < 4) advance(s + 1);
          else onComplete();
        }, 1200);
      }
    };
    advance(2);
  };

  return (
    <div
      className="mitti-card"
      style={{
        background: 'linear-gradient(135deg, #FFFFFF 0%, var(--brand-10) 100%)',
        border: '1px solid var(--border-brand)',
      }}
    >
      <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center"
            style={{ background: 'var(--brand-700)', color: 'white', boxShadow: 'var(--shadow-brand)' }}
          >
            <FlaskConical size={20} />
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
              Hardware Scanner Orchestration
            </div>
            <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>
              Real-time multi-spectral sensor probe & telemetry ingestion
            </div>
          </div>
        </div>
        <button
          onClick={runDemo}
          className="btn-primary"
          style={{ fontSize: 12.5 }}
          disabled={step > 0 && step < 4}
        >
          <Scan size={14} />
          {step === 0 ? 'Trigger Field Scan (Demo)' : step < 4 ? 'Processing Probe...' : 'Initiate Re-scan'}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {steps.map((s, i) => {
          const done = step > i + 1;
          const active = step === i + 1;

          return (
            <div
              key={i}
              className="flex flex-col items-center text-center p-3 rounded-xl transition-all"
              style={{
                background: done
                  ? 'var(--status-good-bg)'
                  : active
                  ? 'white'
                  : 'var(--bg-surface)',
                border: done
                  ? '1px solid var(--status-good-border)'
                  : active
                  ? '2px solid var(--brand-500)'
                  : '1px solid var(--border-faint)',
                boxShadow: active ? 'var(--shadow-md)' : 'none',
              }}
            >
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                style={{
                  background: done
                    ? 'var(--brand-100)'
                    : active
                    ? 'var(--brand-600)'
                    : 'white',
                  color: active ? 'white' : 'var(--brand-700)',
                }}
              >
                {done ? (
                  <CheckCircle2 size={18} style={{ color: 'var(--brand-700)' }} />
                ) : (
                  <span style={{ fontSize: 16 }}>{s.icon}</span>
                )}
              </div>

              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: done ? 'var(--brand-800)' : active ? 'var(--brand-600)' : 'var(--text-secondary)',
                }}
              >
                {s.label}
              </div>
              <div
                style={{
                  fontSize: 10,
                  color: 'var(--text-muted)',
                  marginTop: 2,
                  lineHeight: 1.3,
                }}
              >
                {s.desc}
              </div>
            </div>
          );
        })}
      </div>

      {step > 0 && step < 4 && (
        <div className="mt-4">
          <div className="progress-bar">
            <div
              className="progress-fill animate-shimmer"
              style={{ width: `${(step / 4) * 100}%` }}
            />
          </div>
          <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 6, textAlign: 'center' }}>
            Simulating edge telemetry ingestion... ({Math.round((step / 4) * 100)}%)
          </div>
        </div>
      )}

      {step === 4 && (
        <div
          className="mt-4 flex items-center gap-2 rounded-xl px-4 py-3 animate-fade-in"
          style={{ background: 'var(--status-good-bg)', border: '1px solid var(--status-good-border)' }}
        >
          <CheckCircle2 size={16} style={{ color: 'var(--status-good)' }} />
          <span style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--status-good)' }}>
            Telemetry sync verified: 6 sensor channels refreshed. Mrida-AI updated.
          </span>
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────
// MAIN SOIL INTELLIGENCE PAGE
// ────────────────────────────────────────────────────────────
export default function SoilIntelligencePage() {
  const [activeChart, setActiveChart] = useState<'moisture' | 'pH' | 'nitrogen' | 'temperature'>('moisture');
  const [selectedField, setSelectedField] = useState('Field A');

  const m = soilReadings.metrics;
  const chartData = {
    moisture: { data: soilTrendData.moisture, unit: '%', color: '#2563EB', fill: '#DBEAFE' },
    pH: { data: soilTrendData.pH, unit: ' pH', color: '#166534', fill: '#DCFCE7' },
    nitrogen: { data: soilTrendData.nitrogen, unit: ' kg/ha', color: '#2D6A4F', fill: '#D8F3DC' },
    temperature: { data: soilTrendData.temperature, unit: '°C', color: '#D97706', fill: '#FEF3C7' },
  };
  const active = chartData[activeChart];

  const nutrients = [
    { name: 'Nitrogen (N)', value: 142, max: 200, color: '#2D6A4F', icon: '🌿' },
    { name: 'Phosphorus (P)', value: 38, max: 80, color: '#2563EB', icon: '⚗️' },
    { name: 'Potassium (K)', value: 195, max: 300, color: '#D97706', icon: '⚡' },
  ];

  const radarData = [
    { subject: 'pH', A: 85, fullMark: 100 },
    { subject: 'N', A: 71, fullMark: 100 },
    { subject: 'P', A: 63, fullMark: 100 },
    { subject: 'K', A: 78, fullMark: 100 },
    { subject: 'EC', A: 84, fullMark: 100 },
    { subject: 'Moisture', A: 76, fullMark: 100 },
    { subject: 'Temp', A: 88, fullMark: 100 },
  ];

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      <Header title="Soil Intelligence" subtitle="IoT soil sensor telemetry & Mrida-AI analytics" />

      <main className="page-content soil-page flex-1 overflow-y-auto page-enter">
        {/* Top Controls */}
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Farm Context */}
            <div
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl"
              style={{ background: 'var(--bg-card)', border: '1px solid var(--border-light)', boxShadow: 'var(--shadow-xs)' }}
            >
              <span style={{ fontSize: 14 }}>🏡</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{selectedFarm.name}</span>
            </div>

            {/* Field Selector */}
            <div className="tab-nav">
              {selectedFarm.fields.map((f) => (
                <button
                  key={f.id}
                  className={`tab-item ${selectedField === f.name ? 'active' : ''}`}
                  onClick={() => setSelectedField(f.name)}
                  style={{ fontSize: 12 }}
                >
                  {f.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full" style={{ background: 'var(--status-good-bg)', border: '1px solid var(--status-good-border)' }}>
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: 'var(--status-good)' }} />
              <Wifi size={13} style={{ color: 'var(--status-good)' }} />
              <span style={{ fontSize: 11, color: 'var(--status-good)', fontWeight: 700 }}>Scanner Active (BLE)</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              Last sync: {soilReadings.scanTime}
            </span>
            <button className="btn-secondary" style={{ fontSize: 12, padding: '7px 14px' }}>
              <Download size={13} /> Export PDF Report
            </button>
          </div>
        </div>

        {/* Scan Workflow */}
        <ScanWorkflow onComplete={() => {}} />

        <div style={{ height: 20 }} />

        {/* Main Grid: Score Ring + 6 Metric Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          {/* Soil Health Ring Card */}
          <div className="mitti-card flex flex-col items-center justify-center py-6">
            <SoilHealthRing score={m.soilHealthScore} />
            <div className="mt-5 w-full">
              <div className="space-y-2">
                {soilReadings.recommendations.slice(0, 2).map((r, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 rounded-xl px-3.5 py-2.5"
                    style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)' }}
                  >
                    <Info size={13} style={{ color: 'var(--brand-600)', flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: 11.5, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{r}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Soil Metrics */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-3">
            <SoilMetricCard
              label="Soil pH"
              value={m.pH.value}
              unit={m.pH.unit}
              status={m.pH.status}
              range={m.pH.range}
              icon="🧪"
            />
            <SoilMetricCard
              label="Nitrogen (N)"
              value={m.nitrogen.value}
              unit={m.nitrogen.unit}
              status={m.nitrogen.status}
              range={m.nitrogen.range}
              icon="🌿"
            />
            <SoilMetricCard
              label="Phosphorus (P)"
              value={m.phosphorus.value}
              unit={m.phosphorus.unit}
              status={m.phosphorus.status}
              range={m.phosphorus.range}
              icon="⚗️"
            />
            <SoilMetricCard
              label="Potassium (K)"
              value={m.potassium.value}
              unit={m.potassium.unit}
              status={m.potassium.status}
              range={m.potassium.range}
              icon="⚡"
            />
            <SoilMetricCard
              label="Electrical Cond."
              value={m.ec.value}
              unit={m.ec.unit}
              status={m.ec.status}
              range={m.ec.range}
              icon="🔋"
            />
            <SoilMetricCard
              label="Moisture Content"
              value={m.moisture.value}
              unit={m.moisture.unit}
              status={m.moisture.status}
              range={m.moisture.range}
              icon="💧"
            />
          </div>
        </div>

        {/* Charts Row: Trend Area Chart + Radar Profile */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          {/* Trend Chart */}
          <div className="mitti-card lg:col-span-2">
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                  Soil Parameter Trends
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>7-day telemetry window · {selectedField}</div>
              </div>
              <div className="tab-nav">
                {(['moisture', 'pH', 'nitrogen', 'temperature'] as const).map((t) => (
                  <button
                    key={t}
                    className={`tab-item ${activeChart === t ? 'active' : ''}`}
                    onClick={() => setActiveChart(t)}
                    style={{ fontSize: 11 }}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={active.data}>
                  <defs>
                    <linearGradient id="paramGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={active.color} stopOpacity={0.25} />
                      <stop offset="95%" stopColor={active.color} stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: 'var(--text-muted)' }} axisLine={false} tickLine={false} width={40} />
                  <Tooltip
                    contentStyle={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border-light)',
                      borderRadius: 12,
                      fontSize: 12,
                      boxShadow: 'var(--shadow-md)',
                      color: 'var(--text-primary)',
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={active.color}
                    strokeWidth={2.5}
                    fill="url(#paramGrad)"
                    dot={{ fill: active.color, r: 4, strokeWidth: 0 }}
                    activeDot={{ r: 6, stroke: active.color, strokeWidth: 2, fill: '#FFFFFF' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Radar Chart */}
          <div className="mitti-card">
            <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
              Agronomic Balance Radar
            </div>
            <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 12 }}>
              Normalized indices across 7 variables
            </div>
            <div style={{ height: 220 }}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData}>
                  <PolarGrid stroke="rgba(0,0,0,0.08)" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: 'var(--text-secondary)', fontWeight: 500 }} />
                  <Radar name="Soil" dataKey="A" stroke="var(--brand-600)" fill="var(--brand-500)" fillOpacity={0.25} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* NPK Bars */}
        <div className="mitti-card mb-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                Macronutrient Balance (NPK)
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                Field A reading vs agronomist benchmark thresholds
              </div>
            </div>
            <span className="badge badge-brand">Optimal Ratio: 4:2:1</span>
          </div>

          <div className="space-y-4">
            {nutrients.map((n) => (
              <div key={n.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: 16 }}>{n.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{n.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="metric-value" style={{ fontSize: 15, color: n.color }}>
                      {n.value}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>/ {n.max} kg/ha target</span>
                  </div>
                </div>
                <div className="progress-bar" style={{ height: 8 }}>
                  <div
                    className="progress-fill"
                    style={{
                      width: `${(n.value / n.max) * 100}%`,
                      background: n.color,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scan History Table */}
        <div className="mitti-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                Historical Scan Archive
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                Audit trail of device readings & technician signatures
              </div>
            </div>
            <span className="demo-notice">Field Archive</span>
          </div>
          <div className="overflow-x-auto">
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12.5 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border-default)', background: 'var(--bg-surface)' }}>
                  {['Scan ID', 'Timestamp', 'Field', 'Crop', 'Soil Health', 'pH', 'Moisture', 'Device / Operator'].map((h) => (
                    <th
                      key={h}
                      style={{
                        padding: '10px 14px',
                        textAlign: 'left',
                        fontSize: 10.5,
                        fontWeight: 700,
                        color: 'var(--text-secondary)',
                        letterSpacing: '0.5px',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {scanHistory.map((s, i) => (
                  <tr
                    key={s.id}
                    style={{
                      borderBottom: '1px solid var(--border-faint)',
                      background: i % 2 === 0 ? 'transparent' : 'var(--bg-surface)',
                    }}
                  >
                    <td style={{ padding: '12px 14px', color: 'var(--brand-700)', fontWeight: 700, fontSize: 12 }}>
                      {s.id}
                    </td>
                    <td style={{ padding: '12px 14px', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                      {s.date} · {s.time}
                    </td>
                    <td style={{ padding: '12px 14px', color: 'var(--text-primary)', fontWeight: 500 }}>{s.field}</td>
                    <td style={{ padding: '12px 14px', color: 'var(--text-secondary)' }}>{s.crop}</td>
                    <td style={{ padding: '12px 14px' }}>
                      <span
                        className="badge"
                        style={{
                          background: s.soilHealth >= 75 ? 'var(--status-good-bg)' : 'var(--status-warn-bg)',
                          color: s.soilHealth >= 75 ? 'var(--status-good)' : 'var(--status-warn)',
                          border: `1px solid ${s.soilHealth >= 75 ? 'var(--status-good-border)' : 'var(--status-warn-border)'}`,
                          fontWeight: 700,
                        }}
                      >
                        {s.soilHealth}%
                      </span>
                    </td>
                    <td style={{ padding: '12px 14px', color: 'var(--text-primary)', fontWeight: 600 }}>{s.pH}</td>
                    <td style={{ padding: '12px 14px', color: 'var(--text-primary)', fontWeight: 600 }}>{s.moisture}%</td>
                    <td style={{ padding: '12px 14px', color: 'var(--text-muted)', fontSize: 11 }}>{s.scannedBy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div style={{ height: 28 }} />
      </main>
    </div>
  );
}
