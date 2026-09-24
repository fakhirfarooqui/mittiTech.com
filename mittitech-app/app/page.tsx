'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  selectedFarm,
  weatherData,
  soilReadings,
  alerts,
  recentActivity,
  soilTrendData,
  overviewChartData,
} from '@/data/mockData';
import {
  TrendingUp,
  TrendingDown,
  ArrowRight,
  ChevronRight,
  MapPin,
  Droplets,
  AlertTriangle,
  Clock,
  Thermometer,
  Wind,
  CloudRain,
  Sprout,
  Activity,
  Cpu,
  Scan,
  CheckCircle2,
  Calendar,
  Zap,
  BarChart3,
  Bot,
  ChevronDown,
  Eye,
  Layers,
  FlaskConical,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie,
} from 'recharts';
import type { PieLabelRenderProps } from 'recharts';

// ─────────────────────────────────────────────────────────────
// CONSTANTS & DATA
// ─────────────────────────────────────────────────────────────
const m = soilReadings.metrics;
const unreadAlerts = alerts.filter((a) => !a.read);

const SOIL_MOISTURE_14D = [
  { date: 'Sep 11', value: 26 }, { date: 'Sep 12', value: 29 },
  { date: 'Sep 13', value: 31 }, { date: 'Sep 14', value: 34 },
  { date: 'Sep 15', value: 33 }, { date: 'Sep 16', value: 30 },
  { date: 'Sep 17', value: 28 }, { date: 'Sep 18', value: 32 },
  { date: 'Sep 19', value: 30 }, { date: 'Sep 20', value: 38 },
  { date: 'Sep 21', value: 35 }, { date: 'Sep 22', value: 33 },
  { date: 'Sep 23', value: 34 }, { date: 'Sep 24', value: 36 },
];

const CROP_DONUT = [
  { name: 'Healthy', value: 82, color: '#2D6A4F' },
  { name: 'Moderate', value: 12, color: '#D97706' },
  { name: 'Attention', value: 6, color: '#DC2626' },
];

const UPCOMING_TASKS = [
  { id: 1, task: 'Irrigation Check', field: 'Field A', when: 'Today', icon: '💧', urgency: 'today' },
  { id: 2, task: 'Soil Scan', field: 'Field B', when: 'Tomorrow', icon: '🔬', urgency: 'tomorrow' },
  { id: 3, task: 'Crop Inspection', field: 'Field C', when: 'Sep 26', icon: '🌿', urgency: 'upcoming' },
  { id: 4, task: 'NPK Top-Dressing', field: 'Field A', when: 'Sep 28', icon: '🧪', urgency: 'upcoming' },
];

const activityIcons: Record<string, string> = {
  scan: '🔬', alert: '⚠️', weather: '🌧️', ai: '🤖',
  irrigation: '💧', update: '📊', image: '📷', monitoring: '🛰️',
  report: '📊',
};

// ─────────────────────────────────────────────────────────────
// CHART TOOLTIP
// ─────────────────────────────────────────────────────────────
type TooltipPayload = { value?: number | string };

function ChartTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayload[]; label?: string }) {
  if (active && payload?.length) {
    return (
      <div style={{
        background: 'rgba(20,20,20,0.92)',
        backdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.1)',
        borderRadius: 10,
        padding: '8px 12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
      }}>
        <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', marginBottom: 3 }}>{label}</div>
        {payload.map((p, i: number) => (
          <div key={i} style={{ color: '#74C69D', fontWeight: 700, fontSize: 14, fontFamily: 'Space Grotesk' }}>
            {p.value}%
          </div>
        ))}
      </div>
    );
  }
  return null;
}

// ─────────────────────────────────────────────────────────────
// ANIMATED COUNTER
// ─────────────────────────────────────────────────────────────
function AnimatedNumber({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setDisplay(target); clearInterval(timer); }
      else setDisplay(Math.floor(start));
    }, 18);
    return () => clearInterval(timer);
  }, [target]);
  return <>{display}{suffix}</>;
}

// ─────────────────────────────────────────────────────────────
// METRIC CARD
// ─────────────────────────────────────────────────────────────
function MetricCard({
  icon, label, value, suffix, status, statusColor, trend, trendUp, sub, accentColor, accentBg,
}: {
  icon: React.ReactNode; label: string; value: number; suffix?: string;
  status: string; statusColor: string; trend: string; trendUp: boolean;
  sub?: string; accentColor: string; accentBg: string;
}) {
  return (
    <div
      className="overview-metric-card"
      style={{
        background: '#FFFFFF',
        border: '1px solid rgba(0,0,0,0.07)',
        borderRadius: 16,
        padding: '18px 20px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.05), 0 1px 3px rgba(0,0,0,0.04)',
        transition: 'all 0.22s ease',
        position: 'relative',
        overflow: 'hidden',
        cursor: 'default',
      }}
    >
      {/* accent strip */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 3,
        background: `linear-gradient(90deg, ${accentColor}, transparent)`,
        borderRadius: '16px 16px 0 0',
      }} />

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
        <div style={{
          width: 38, height: 38,
          borderRadius: 10,
          background: accentBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          {icon}
        </div>
        <span style={{
          fontSize: 9, fontWeight: 700, letterSpacing: '0.8px',
          color: statusColor, textTransform: 'uppercase',
          background: `${statusColor}14`,
          padding: '3px 8px', borderRadius: 20,
          border: `1px solid ${statusColor}25`,
        }}>{status}</span>
      </div>

      <div style={{ fontFamily: 'Space Grotesk', fontSize: 28, fontWeight: 800, color: '#141414', letterSpacing: '-1.5px', lineHeight: 1 }}>
        <AnimatedNumber target={value} suffix={suffix} />
      </div>
      <div style={{ fontSize: 11, fontWeight: 500, color: '#6B7280', marginTop: 4 }}>{label}</div>
      {sub && <div style={{ fontSize: 10, color: '#9CA3AF', marginTop: 1 }}>{sub}</div>}

      <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 10, paddingTop: 10, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
        {trendUp
          ? <TrendingUp size={11} color="#166534" />
          : <TrendingDown size={11} color="#991B1B" />}
        <span style={{ fontSize: 10, color: trendUp ? '#166534' : '#991B1B' }}>{trend}</span>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// FARM HERO — AERIAL IMAGE WITH OVERLAYS
// ─────────────────────────────────────────────────────────────
function FarmHeroVisual() {
  const [hoveredField, setHoveredField] = useState<string | null>(null);

  const fields = [
    { id: 'a', label: 'Field A', crop: 'Bhindi', health: 84, colorHex: '#10b981', position: { left: '8%', top: '20%' } },
    { id: 'b', label: 'Field B', crop: 'Aloo', health: 76, colorHex: '#f59e0b', position: { left: '45%', top: '30%' } },
    { id: 'c', label: 'Field C', crop: 'Wheat', health: 88, colorHex: '#60a5fa', position: { right: '8%', top: '25%' } },
  ];

  return (
    <div style={{
      position: 'relative',
      borderRadius: 20,
      overflow: 'hidden',
      height: '100%',
      boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
    }}>
      {/* Aerial background image */}
      <img
        src="/farm-hero.jpg"
        alt="Green Valley Farm — Aerial View"
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%' }}
      />

      {/* Gradient overlay — bottom fade for readability */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(10,20,12,0.75) 0%, rgba(10,20,12,0.2) 45%, transparent 70%)',
      }} />

      {/* Top gradient — subtle for badges */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(10,20,12,0.3) 0%, transparent 30%)',
      }} />

      {/* Demo badge */}
      <div style={{
        position: 'absolute', top: 14, left: 14,
        background: 'rgba(20,20,20,0.65)', backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 8, padding: '4px 10px',
        fontSize: 9, color: 'rgba(255,255,255,0.6)', fontWeight: 700, letterSpacing: '0.8px',
      }}>✦ DEMO VISUALIZATION</div>

      {/* Live indicator */}
      <div style={{
        position: 'absolute', top: 14, right: 14,
        background: 'rgba(20,20,20,0.65)', backdropFilter: 'blur(8px)',
        border: '1px solid rgba(255,255,255,0.12)',
        borderRadius: 8, padding: '5px 12px',
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', animation: 'pulse 2s infinite' }} />
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.8)', fontWeight: 600 }}>Field Monitor Active</span>
      </div>

      {/* Field overlays */}
      {fields.map((f) => (
        <button
          key={f.id}
          onMouseEnter={() => setHoveredField(f.id)}
          onMouseLeave={() => setHoveredField(null)}
          onClick={() => {}}
          style={{
            position: 'absolute',
            ...f.position,
            background: hoveredField === f.id
              ? 'rgba(20,20,20,0.82)'
              : 'rgba(20,20,20,0.62)',
            backdropFilter: 'blur(12px)',
            border: `1.5px solid ${f.colorHex}55`,
            borderRadius: 12,
            padding: '8px 13px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            transform: hoveredField === f.id ? 'scale(1.05) translateY(-2px)' : 'scale(1)',
            boxShadow: hoveredField === f.id ? `0 8px 24px rgba(0,0,0,0.3), 0 0 0 1px ${f.colorHex}55` : 'none',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: f.colorHex, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#fff', whiteSpace: 'nowrap' }}>{f.label}</div>
              <div style={{ fontSize: 9, color: 'rgba(255,255,255,0.65)' }}>{f.crop} · {f.health}% health</div>
            </div>
          </div>
        </button>
      ))}

      {/* Bottom info strip */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '20px 20px 18px',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#fff', letterSpacing: '-0.5px', fontFamily: 'Space Grotesk' }}>
              {selectedFarm.name}
            </h2>
            <span style={{
              background: 'rgba(45,106,79,0.85)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(82,183,136,0.4)',
              borderRadius: 20, padding: '2px 10px',
              fontSize: 9, fontWeight: 700, color: '#B7E4C7', letterSpacing: '0.6px',
            }}>GOOD HEALTH</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <MapPin size={11} color="rgba(255,255,255,0.55)" />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>{selectedFarm.location}</span>
            </div>
            <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11 }}>·</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>12 Acres</span>
            <span style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11 }}>·</span>
            <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>🌿 Bhindi</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, marginTop: 6 }}>
            <Clock size={10} color="rgba(255,255,255,0.45)" />
            <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>Last scan: {selectedFarm.lastScan}</span>
          </div>
        </div>

        <Link
          href="/farms"
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: 10, padding: '8px 16px',
            fontSize: 12, fontWeight: 600, color: 'white',
            textDecoration: 'none', transition: 'all 0.2s ease',
            whiteSpace: 'nowrap',
          }}
        >
          View Farm Details <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// NPK SNAPSHOT
// ─────────────────────────────────────────────────────────────
function NPKBar({ label, value, max, color, unit }: { label: string; value: number; max: number; color: string; unit: string }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: color }} />
          <span style={{ fontSize: 12, fontWeight: 500, color: '#374151' }}>{label}</span>
        </div>
        <span style={{ fontSize: 13, fontWeight: 700, color: '#141414', fontFamily: 'Space Grotesk' }}>
          {value} <span style={{ fontSize: 10, fontWeight: 400, color: '#9CA3AF' }}>{unit}</span>
        </span>
      </div>
      <div style={{ height: 6, background: '#F3F4F6', borderRadius: 99, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${pct}%`, borderRadius: 99,
          background: `linear-gradient(90deg, ${color}88, ${color})`,
          transition: 'width 0.8s cubic-bezier(0.4,0,0.2,1)',
        }} />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// CROP HEALTH DONUT
// ─────────────────────────────────────────────────────────────
function CropHealthDonut() {
  const RADIAN = Math.PI / 180;
  const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, value }: PieLabelRenderProps) => {
    if ([cx, cy, midAngle, innerRadius, outerRadius, value].some((item) => typeof item !== 'number')) return null;
    const numericCx = Number(cx);
    const numericCy = Number(cy);
    const numericMidAngle = Number(midAngle);
    const numericInnerRadius = Number(innerRadius);
    const numericOuterRadius = Number(outerRadius);
    const numericValue = Number(value);
    const radius = numericInnerRadius + (numericOuterRadius - numericInnerRadius) * 0.5;
    const x = numericCx + radius * Math.cos(-numericMidAngle * RADIAN);
    const y = numericCy + radius * Math.sin(-numericMidAngle * RADIAN);
    if (numericValue < 8) return null;
    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={10} fontWeight={700}>
        {numericValue}%
      </text>
    );
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ position: 'relative', flexShrink: 0 }}>
        <ResponsiveContainer width={120} height={120}>
          <PieChart>
            <Pie
              data={CROP_DONUT}
              cx={55}
              cy={55}
              innerRadius={36}
              outerRadius={56}
              paddingAngle={2}
              dataKey="value"
              labelLine={false}
              label={renderLabel}
            >
              {CROP_DONUT.map((entry, idx) => (
                <Cell key={idx} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center', pointerEvents: 'none',
        }}>
          <div style={{ fontSize: 18, fontWeight: 800, color: '#141414', fontFamily: 'Space Grotesk', lineHeight: 1 }}>82%</div>
          <div style={{ fontSize: 8, color: '#6B7280', marginTop: 2 }}>Health</div>
        </div>
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        {CROP_DONUT.map((d) => (
          <div key={d.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: 8, flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: d.color, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: '#374151', whiteSpace: 'nowrap' }}>{d.name}</span>
            </div>
            <span style={{ fontSize: 12, fontWeight: 700, color: '#141414', fontFamily: 'Space Grotesk', whiteSpace: 'nowrap' }}>{d.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// SECTION HEADER
// ─────────────────────────────────────────────────────────────
function SectionHeader({ title, subtitle, action, actionHref }: {
  title: string; subtitle?: string; action?: string; actionHref?: string;
}) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 16 }}>
      <div>
        <h3 style={{ fontSize: 14, fontWeight: 700, color: '#141414', letterSpacing: '-0.3px' }}>{title}</h3>
        {subtitle && <p style={{ fontSize: 11, color: '#9CA3AF', marginTop: 2 }}>{subtitle}</p>}
      </div>
      {action && actionHref && (
        <Link
          href={actionHref}
          style={{
            display: 'flex', alignItems: 'center', gap: 4,
            fontSize: 11, fontWeight: 600, color: '#2D6A4F',
            textDecoration: 'none', transition: 'gap 0.18s ease',
          }}
        >
          {action} <ChevronRight size={13} />
        </Link>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MAIN DASHBOARD
// ─────────────────────────────────────────────────────────────
export default function OverviewDashboard() {
  const [farmSelectorOpen, setFarmSelectorOpen] = useState(false);
  const [selectedField, setSelectedField] = useState<'moisture' | 'pH' | 'nitrogen'>('moisture');
  const [activeFarm, setActiveFarm] = useState('Green Valley Farm');

  const farms = [
    { name: 'Green Valley Farm', location: 'Lucknow, UP', acres: 12, health: 'Good' },
    { name: 'Sunrise Farm', location: 'Kanpur, UP', acres: 8, health: 'Moderate' },
    { name: 'Demo Farm', location: 'Varanasi, UP', acres: 5, health: 'Excellent' },
  ];

  const chartConfigs = {
    moisture: { data: SOIL_MOISTURE_14D, color: '#2563EB', unit: '%', label: 'Moisture %' },
    pH:       { data: soilTrendData.pH.map(d => ({ ...d, value: Math.round(d.value * 10) / 10 })), color: '#2D6A4F', unit: ' pH', label: 'pH Level' },
    nitrogen: { data: soilTrendData.nitrogen, color: '#D97706', unit: ' kg/ha', label: 'Nitrogen kg/ha' },
  };
  const chart = chartConfigs[selectedField];

  const summaryCards = [
    {
      icon: <MapPin size={18} color="#2D6A4F" />,
      label: 'Total Farms',
      value: 3,
      suffix: '',
      status: 'Active',
      statusColor: '#166534',
      trend: '+1 this season',
      trendUp: true,
      sub: '3 farms monitored',
      accentColor: '#2D6A4F',
      accentBg: '#F0FAF3',
    },
    {
      icon: <FlaskConical size={18} color="#2563EB" />,
      label: 'Soil Health',
      value: 78,
      suffix: '%',
      status: 'Good',
      statusColor: '#1D4ED8',
      trend: '+4 pts this week',
      trendUp: true,
      sub: 'Field A · Green Valley',
      accentColor: '#2563EB',
      accentBg: '#EFF6FF',
    },
    {
      icon: <Sprout size={18} color="#059669" />,
      label: 'Crop Health',
      value: 82,
      suffix: '%',
      status: 'Healthy',
      statusColor: '#059669',
      trend: 'Vegetative stage',
      trendUp: true,
      sub: 'Bhindi · Field A',
      accentColor: '#059669',
      accentBg: '#ECFDF5',
    },
    {
      icon: <Droplets size={18} color="#0891B2" />,
      label: 'Soil Moisture',
      value: 62,
      suffix: '%',
      status: 'Optimal',
      statusColor: '#0891B2',
      trend: 'Within target range',
      trendUp: true,
      sub: 'Avg all fields',
      accentColor: '#0891B2',
      accentBg: '#ECFEFF',
    },
    {
      icon: <AlertTriangle size={18} color="#DC2626" />,
      label: 'Active Alerts',
      value: unreadAlerts.length,
      suffix: '',
      status: 'Attention',
      statusColor: '#DC2626',
      trend: '2 critical unread',
      trendUp: false,
      sub: 'Across all farms',
      accentColor: '#DC2626',
      accentBg: '#FEF2F2',
    },
  ];

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      {/* ── PREMIUM HEADER ── */}
      <header className="dashboard-header" style={{
        background: '#FFFFFF',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
        padding: '0 24px',
        minHeight: 60,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        flexShrink: 0,
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        position: 'relative',
        zIndex: 40,
      }}>
        {/* Farm Selector */}
        <div className="dashboard-farm-selector" style={{ position: 'relative' }}>
          <button
            id="farm-selector-btn"
            onClick={() => setFarmSelectorOpen(!farmSelectorOpen)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              background: farmSelectorOpen ? '#F0FAF3' : '#F8F8F5',
              border: farmSelectorOpen ? '1px solid rgba(45,106,79,0.3)' : '1px solid rgba(0,0,0,0.09)',
              borderRadius: 10, padding: '7px 12px',
              cursor: 'pointer', transition: 'all 0.18s ease',
            }}
          >
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: 'linear-gradient(135deg, #2D6A4F, #52B788)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, flexShrink: 0,
            }}>🏡</div>
            <div style={{ textAlign: 'left' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#141414', lineHeight: 1.2 }}>{activeFarm}</div>
              <div style={{ fontSize: 10, color: '#9CA3AF' }}>Lucknow, UP · 12 Acres</div>
            </div>
            <ChevronDown size={14} color="#9CA3AF" style={{ transition: 'transform 0.18s', transform: farmSelectorOpen ? 'rotate(180deg)' : 'rotate(0)' }} />
          </button>

          {farmSelectorOpen && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 6px)', left: 0,
              background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: 14, boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
              minWidth: 240, zIndex: 100, overflow: 'hidden',
            }}>
              <div style={{ padding: '10px 14px 6px', fontSize: 9, fontWeight: 700, color: '#9CA3AF', letterSpacing: '0.8px' }}>YOUR FARMS</div>
              {farms.map((f) => (
                <button
                  key={f.name}
                  onClick={() => { setActiveFarm(f.name); setFarmSelectorOpen(false); }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    width: '100%', padding: '9px 14px',
                    background: activeFarm === f.name ? '#F0FAF3' : 'transparent',
                    border: 'none', cursor: 'pointer', textAlign: 'left',
                    transition: 'background 0.15s',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#141414' }}>{f.name}</div>
                    <div style={{ fontSize: 10, color: '#9CA3AF' }}>{f.location} · {f.acres} Acres</div>
                  </div>
                  <span style={{
                    fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
                    background: f.health === 'Good' ? '#F0FAF3' : f.health === 'Excellent' ? '#ECFDF5' : '#FFFBEB',
                    color: f.health === 'Good' ? '#166534' : f.health === 'Excellent' ? '#059669' : '#92400E',
                    border: `1px solid ${f.health === 'Good' ? 'rgba(22,101,52,0.2)' : f.health === 'Excellent' ? 'rgba(5,150,105,0.2)' : 'rgba(146,64,14,0.2)'}`,
                  }}>{f.health}</span>
                </button>
              ))}
              <div style={{ height: 1, background: 'rgba(0,0,0,0.05)', margin: '4px 0' }} />
              <Link
                href="/farms"
                onClick={() => setFarmSelectorOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  padding: '9px 14px', fontSize: 11, fontWeight: 600, color: '#2D6A4F',
                  textDecoration: 'none',
                }}
              >
                Manage all farms <ArrowRight size={12} />
              </Link>
            </div>
          )}
        </div>

        {/* Page title */}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: 15, fontWeight: 700, color: '#141414', letterSpacing: '-0.2px' }}>
            Farm Overview
          </h1>
          <p style={{ fontSize: 10, color: '#9CA3AF' }}>
            {new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* Weather pill */}
        <div className="dashboard-weather" style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: '#F8F8F5', border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: 10, padding: '7px 14px',
        }}>
          <span style={{ fontSize: 20 }}>⛅</span>
          <div>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#141414', fontFamily: 'Space Grotesk', lineHeight: 1 }}>
              {weatherData.temperature}°C
            </div>
            <div style={{ fontSize: 10, color: '#9CA3AF' }}>{weatherData.condition}</div>
          </div>
          <div style={{ width: 1, height: 28, background: 'rgba(0,0,0,0.08)' }} />
          <div style={{ fontSize: 10, color: '#6B7280' }}>
            💧 {weatherData.humidity}% &nbsp;|&nbsp; 💨 {weatherData.windSpeed} km/h
          </div>
        </div>

        {/* Search */}
        <div className="dashboard-search" style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: '#F8F8F5', border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: 10, padding: '8px 12px', minWidth: 200,
        }}>
          <svg width="13" height="13" fill="none" stroke="#9CA3AF" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            placeholder="Search farms, fields..."
            style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: 12, color: '#141414', flex: 1, fontFamily: 'Inter' }}
          />
        </div>

        {/* Notifications */}
        <Link href="/alerts" style={{
          position: 'relative', width: 36, height: 36,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: '#F8F8F5', border: '1px solid rgba(0,0,0,0.08)',
          borderRadius: 10, color: '#6B7280', textDecoration: 'none',
          transition: 'all 0.18s ease',
        }}>
          <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          {unreadAlerts.length > 0 && (
            <span style={{
              position: 'absolute', top: 6, right: 6,
              width: 8, height: 8, borderRadius: '50%',
              background: '#DC2626', border: '1.5px solid white',
            }} />
          )}
        </Link>

        {/* User avatar */}
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'linear-gradient(135deg, #2D6A4F, #52B788)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 12, fontWeight: 700, color: 'white', cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(45,106,79,0.3)',
        }}>FM</div>

        {/* Demo tag */}
        <div style={{
          fontSize: 9, fontWeight: 700, letterSpacing: '0.8px',
          background: 'rgba(45,106,79,0.08)', color: '#2D6A4F',
          border: '1px solid rgba(45,106,79,0.15)',
          borderRadius: 6, padding: '3px 8px',
        }}>✦ DEMO</div>
      </header>

      {/* ── MAIN SCROLL AREA ── */}
      <main
        className="dashboard-main flex-1 overflow-y-auto"
        onClick={() => { if (farmSelectorOpen) setFarmSelectorOpen(false); }}
      >

        {/* ── HERO + METRICS ROW ── */}
        <div className="dashboard-hero-grid">

          {/* Farm Hero Visual */}
          <FarmHeroVisual />

          {/* Right: Metric Cards stacked */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* 2-col mini grid for top 4 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {summaryCards.slice(0, 4).map((c) => (
                <MetricCard key={c.label} {...c} />
              ))}
            </div>
            {/* Alerts card full width */}
            <div style={{
              background: '#FEF2F2',
              border: '1px solid rgba(220,38,38,0.15)',
              borderRadius: 16,
              padding: '14px 18px',
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              boxShadow: '0 2px 12px rgba(220,38,38,0.06)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'linear-gradient(90deg, #DC2626, transparent)', borderRadius: '16px 16px 0 0' }} />
              <div style={{ width: 40, height: 40, borderRadius: 11, background: '#FEE2E2', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <AlertTriangle size={19} color="#DC2626" />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: '#DC2626', letterSpacing: '0.8px', textTransform: 'uppercase' }}>Active Alerts</div>
                <div style={{ fontSize: 26, fontWeight: 800, color: '#991B1B', fontFamily: 'Space Grotesk', letterSpacing: '-1.5px', lineHeight: 1 }}>
                  <AnimatedNumber target={unreadAlerts.length} />
                </div>
                <div style={{ fontSize: 10, color: '#EF4444', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <TrendingDown size={10} /> 2 critical require attention
                </div>
              </div>
              <Link href="/alerts" style={{
                display: 'flex', alignItems: 'center', gap: 5,
                fontSize: 11, fontWeight: 600, color: '#DC2626', textDecoration: 'none',
                background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)',
                borderRadius: 8, padding: '7px 13px', whiteSpace: 'nowrap',
              }}>
                View all <ChevronRight size={12} />
              </Link>
            </div>
          </div>
        </div>

        {/* ── SOIL INTELLIGENCE + NPK + CROP HEALTH ROW ── */}
        <div className="dashboard-intelligence-grid">

          {/* Soil Moisture Trend Chart */}
          <div style={{
            background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.07)',
            borderRadius: 18, padding: '22px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          }}>
            <SectionHeader
              title="Soil Intelligence"
              subtitle="Monitor soil conditions across your fields."
              action="Full Report"
              actionHref="/soil-intelligence"
            />

            {/* Tab selectors */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              {(['moisture', 'pH', 'nitrogen'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedField(t)}
                  style={{
                    padding: '5px 12px', borderRadius: 8, fontSize: 11, fontWeight: 600,
                    cursor: 'pointer', transition: 'all 0.18s ease', border: '1px solid transparent',
                    background: selectedField === t ? '#2D6A4F' : '#F3F4F6',
                    color: selectedField === t ? '#fff' : '#6B7280',
                    borderColor: selectedField === t ? '#2D6A4F' : 'transparent',
                  }}
                >
                  {t === 'moisture' ? '💧 Moisture' : t === 'pH' ? '🧪 pH' : '🌿 Nitrogen'}
                </button>
              ))}
              <div style={{ marginLeft: 'auto', fontSize: 9, fontWeight: 700, letterSpacing: '0.6px', color: '#9CA3AF', background: '#F9FAFB', border: '1px solid rgba(0,0,0,0.07)', borderRadius: 6, padding: '3px 8px' }}>
                DEMO DATA · 14 DAYS
              </div>
            </div>

            <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: 12 }}>Field A — Bhindi</div>

            <div style={{ height: 180 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chart.data}>
                  <defs>
                    <linearGradient id="soilGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={chart.color} stopOpacity={0.15} />
                      <stop offset="95%" stopColor={chart.color} stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                  <XAxis dataKey="date" tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} interval={2} />
                  <YAxis tick={{ fontSize: 9, fill: '#9CA3AF' }} axisLine={false} tickLine={false} width={30} />
                  <Tooltip content={<ChartTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke={chart.color}
                    strokeWidth={2}
                    fill="url(#soilGrad)"
                    dot={{ fill: chart.color, r: 3, strokeWidth: 0 }}
                    activeDot={{ r: 5, stroke: 'white', strokeWidth: 2, fill: chart.color }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* NPK Snapshot */}
          <div style={{
            background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.07)',
            borderRadius: 18, padding: '22px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          }}>
            <SectionHeader title="NPK Snapshot" subtitle="Field A · Demo readings" />

            <div style={{
              background: '#F0FAF3', border: '1px solid rgba(45,106,79,0.12)',
              borderRadius: 12, padding: '12px 14px', marginBottom: 16,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: '#1A4731', fontFamily: 'Space Grotesk', letterSpacing: '-1px' }}>78</div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#2D6A4F' }}>Soil Health</div>
                <div style={{ fontSize: 9, color: '#52B788' }}>Overall Score</div>
              </div>
              <div style={{ marginLeft: 'auto' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(45,106,79,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <FlaskConical size={17} color="#2D6A4F" />
                </div>
              </div>
            </div>

            <NPKBar label="Nitrogen (N)" value={48} max={80} color="#2D6A4F" unit="mg/kg" />
            <NPKBar label="Phosphorus (P)" value={32} max={60} color="#D97706" unit="mg/kg" />
            <NPKBar label="Potassium (K)" value={210} max={280} color="#7C3AED" unit="mg/kg" />

            <div style={{
              marginTop: 8, padding: '8px 10px',
              background: '#FFFBEB', border: '1px solid rgba(217,119,6,0.2)',
              borderRadius: 9, fontSize: 10, color: '#92400E',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <AlertTriangle size={11} color="#D97706" />
              N is slightly below optimal range.
            </div>

            <div style={{ marginTop: 10, fontSize: 8, color: '#9CA3AF', fontWeight: 600, letterSpacing: '0.5px' }}>
              ⚠ ILLUSTRATIVE DEMO DATA — NOT REAL READINGS
            </div>
          </div>

          {/* Crop Health */}
          <div style={{
            background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.07)',
            borderRadius: 18, padding: '22px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          }}>
            <SectionHeader title="Crop Health" subtitle="All fields · Demo" action="Analysis" actionHref="/crop-health" />

            <CropHealthDonut />

            <div style={{ marginTop: 16, height: 1, background: 'rgba(0,0,0,0.05)' }} />

            <div style={{ marginTop: 14 }}>
              {selectedFarm.fields.map((f) => (
                <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: f.color, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                      <span style={{ fontSize: 11, fontWeight: 600, color: '#374151' }}>{f.name}</span>
                      <span style={{ fontSize: 11, fontWeight: 700, color: f.cropHealth >= 80 ? '#166534' : '#92400E', fontFamily: 'Space Grotesk' }}>{f.cropHealth}%</span>
                    </div>
                    <div style={{ height: 4, background: '#F3F4F6', borderRadius: 99, overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', width: `${f.cropHealth}%`, borderRadius: 99,
                        background: `linear-gradient(90deg, ${f.color}88, ${f.color})`,
                      }} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── AI INSIGHT + WEATHER + ACTIVITY ROW ── */}
        <div className="dashboard-insights-grid">

          {/* Mitti AI Insight */}
          <div style={{
            background: 'linear-gradient(145deg, #0F2318 0%, #1A3D28 50%, #0F2318 100%)',
            borderRadius: 18, padding: '24px',
            boxShadow: '0 8px 32px rgba(15,35,24,0.35), 0 2px 8px rgba(0,0,0,0.2)',
            position: 'relative', overflow: 'hidden',
            border: '1px solid rgba(82,183,136,0.15)',
          }}>
            {/* decorative orb */}
            <div style={{
              position: 'absolute', right: -40, top: -40,
              width: 180, height: 180, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(82,183,136,0.12) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', left: -20, bottom: -20,
              width: 120, height: 120, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(45,106,79,0.15) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: 11,
                  background: 'linear-gradient(135deg, rgba(82,183,136,0.25), rgba(45,106,79,0.35))',
                  border: '1px solid rgba(82,183,136,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Bot size={18} color="#74C69D" />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Mitti AI Insight</div>
                  <div style={{ fontSize: 9, color: 'rgba(116,198,157,0.7)', fontWeight: 600, letterSpacing: '0.5px' }}>AGRICULTURAL INTELLIGENCE</div>
                </div>
                <div style={{
                  marginLeft: 'auto',
                  display: 'flex', alignItems: 'center', gap: 5,
                  background: 'rgba(82,183,136,0.15)',
                  border: '1px solid rgba(82,183,136,0.25)',
                  borderRadius: 20, padding: '3px 10px',
                }}>
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#4ade80', animation: 'pulse 2s infinite' }} />
                  <span style={{ fontSize: 9, color: '#74C69D', fontWeight: 600 }}>AI READY</span>
                </div>
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 12, padding: '14px 16px', marginBottom: 16,
              }}>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.82)', lineHeight: 1.7, fontStyle: 'italic' }}>
                  &ldquo;Field A currently shows stable soil moisture levels in this demo dataset. Nitrogen is slightly below optimal for Bhindi — consider reviewing your top-dressing schedule. Soil pH at 6.8 is within the ideal range.&rdquo;
                </p>
              </div>

              <div style={{
                background: 'rgba(82,183,136,0.08)',
                border: '1px solid rgba(82,183,136,0.18)',
                borderRadius: 10, padding: '10px 14px', marginBottom: 16,
              }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: 'rgba(116,198,157,0.7)', letterSpacing: '0.6px', marginBottom: 4 }}>KEY RECOMMENDATIONS (DEMO)</div>
                {['Increase organic matter via compost', 'Monitor Field B moisture closely', 'Soil pH is suitable for Bhindi'].map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, marginBottom: 5 }}>
                    <CheckCircle2 size={11} color="#52B788" style={{ marginTop: 1, flexShrink: 0 }} />
                    <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)' }}>{r}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Link href="/mitti-ai" style={{
                  flex: 1, textAlign: 'center',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  background: 'linear-gradient(135deg, #2D6A4F, #52B788)',
                  border: 'none', borderRadius: 10, padding: '10px 18px',
                  fontSize: 12, fontWeight: 700, color: '#fff',
                  textDecoration: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(82,183,136,0.3)',
                }}>
                  <Bot size={14} /> View AI Insight →
                </Link>
                <button style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  width: 40, height: 40,
                  background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 10, cursor: 'pointer', color: 'rgba(255,255,255,0.5)',
                }}>
                  <Activity size={14} />
                </button>
              </div>

              <p style={{ marginTop: 10, fontSize: 9, color: 'rgba(255,255,255,0.3)', lineHeight: 1.5 }}>
                ⚠ Demo content only. Not real agricultural diagnosis. Consult a certified agronomist for production decisions.
              </p>
            </div>
          </div>

          {/* Weather Card */}
          <div style={{
            background: 'linear-gradient(145deg, #EBF4FF 0%, #DBEAFE 50%, #EFF6FF 100%)',
            border: '1px solid rgba(37,99,235,0.15)',
            borderRadius: 18, padding: '22px',
            boxShadow: '0 4px 20px rgba(37,99,235,0.08)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', right: -20, top: -20,
              width: 120, height: 120, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(96,165,250,0.2) 0%, transparent 70%)',
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#1E40AF', marginBottom: 14, letterSpacing: '-0.2px' }}>
                Weather Forecast
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 44, lineHeight: 1 }}>⛅</span>
                <div>
                  <div style={{ fontSize: 36, fontWeight: 800, color: '#1E3A8A', fontFamily: 'Space Grotesk', letterSpacing: '-2px', lineHeight: 1 }}>
                    {weatherData.temperature}°
                  </div>
                  <div style={{ fontSize: 12, color: '#3B82F6', fontWeight: 500 }}>{weatherData.condition}</div>
                  <div style={{ fontSize: 10, color: '#6B7280', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                    <MapPin size={9} /> {weatherData.location}
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 14 }}>
                {[
                  { icon: <Droplets size={13} color="#3B82F6" />, label: 'Humidity', value: `${weatherData.humidity}%` },
                  { icon: <Wind size={13} color="#6B7280" />, label: 'Wind', value: `${weatherData.windSpeed} km/h` },
                  { icon: <CloudRain size={13} color="#60A5FA" />, label: 'Rain Prob.', value: '10%' },
                  { icon: <Thermometer size={13} color="#EF4444" />, label: 'Feels Like', value: `${weatherData.feelsLike}°C` },
                ].map((d) => (
                  <div key={d.label} style={{
                    background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.7)',
                    borderRadius: 10, padding: '8px 10px',
                    display: 'flex', alignItems: 'center', gap: 6,
                  }}>
                    {d.icon}
                    <div>
                      <div style={{ fontSize: 9, color: '#6B7280' }}>{d.label}</div>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#1E3A8A', fontFamily: 'Space Grotesk' }}>{d.value}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid rgba(59,130,246,0.15)', paddingTop: 12 }}>
                <div style={{ fontSize: 9, fontWeight: 700, color: '#6B7280', letterSpacing: '0.6px', marginBottom: 8 }}>5-DAY FORECAST</div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {weatherData.forecast.map((f) => (
                    <div key={f.day} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 16 }}>{f.icon}</div>
                      <div style={{ fontSize: 9, color: '#6B7280', marginTop: 2 }}>{f.day}</div>
                      <div style={{ fontSize: 10, fontWeight: 700, color: '#1E3A8A', fontFamily: 'Space Grotesk' }}>{f.high}°</div>
                      <div style={{ fontSize: 8, color: '#9CA3AF' }}>{f.rain}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div style={{
            background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.07)',
            borderRadius: 18, padding: '22px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          }}>
            <SectionHeader title="Recent Activity" subtitle="Latest platform events" action="View All" actionHref="/alerts" />

            <div>
              {recentActivity.slice(0, 5).map((act, i) => {
                const icon = activityIcons[act.type] || '📋';
                const isLast = i === 4;
                return (
                  <div key={act.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, paddingBottom: isLast ? 0 : 14, position: 'relative' }}>
                    {!isLast && (
                      <div style={{
                        position: 'absolute', left: 15, top: 32, bottom: 0,
                        width: 1, background: 'rgba(0,0,0,0.06)',
                      }} />
                    )}
                    <div style={{
                      width: 30, height: 30, borderRadius: 9, flexShrink: 0,
                      background: '#F8F8F5', border: '1px solid rgba(0,0,0,0.07)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 12, position: 'relative', zIndex: 1,
                    }}>{icon}</div>
                    <div style={{ flex: 1, paddingTop: 1 }}>
                      <div style={{ fontSize: 12, fontWeight: 600, color: '#141414', lineHeight: 1.3 }}>{act.title}</div>
                      <div style={{ fontSize: 10, color: '#6B7280', marginTop: 1 }}>{act.description}</div>
                      <div style={{ fontSize: 9, color: '#9CA3AF', marginTop: 3, display: 'flex', alignItems: 'center', gap: 3 }}>
                        <Clock size={9} /> {act.time}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── UPCOMING TASKS + SCANNER PROMO ROW ── */}
        <div className="dashboard-operations-grid">

          {/* Upcoming Tasks */}
          <div style={{
            background: '#FFFFFF', border: '1px solid rgba(0,0,0,0.07)',
            borderRadius: 18, padding: '22px', boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
          }}>
            <SectionHeader title="Upcoming Tasks" subtitle="Scheduled farm activities" />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {UPCOMING_TASKS.map((task) => {
                const urgencyMap: Record<string, { bg: string; border: string; badge: string; badgeBg: string }> = {
                  today:    { bg: '#FEF2F2', border: 'rgba(220,38,38,0.15)', badge: '#DC2626', badgeBg: '#FEE2E2' },
                  tomorrow: { bg: '#FFFBEB', border: 'rgba(217,119,6,0.15)', badge: '#D97706', badgeBg: '#FEF3C7' },
                  upcoming: { bg: '#F0FAF3', border: 'rgba(45,106,79,0.12)', badge: '#2D6A4F', badgeBg: '#D8F3DC' },
                };
                const us = urgencyMap[task.urgency] ?? urgencyMap['upcoming'];

                return (
                  <div key={task.id} style={{
                    background: us.bg,
                    border: `1px solid ${us.border}`,
                    borderRadius: 12, padding: '14px',
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: 10,
                      background: 'rgba(255,255,255,0.7)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 17, flexShrink: 0,
                    }}>{task.icon}</div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#141414', lineHeight: 1.3 }}>{task.task}</div>
                      <div style={{ fontSize: 10, color: '#6B7280', marginTop: 2 }}>{task.field}</div>
                      <div style={{ marginTop: 8 }}>
                        <span style={{
                          fontSize: 9, fontWeight: 700, padding: '2px 8px', borderRadius: 20,
                          background: us.badgeBg, color: us.badge,
                          border: `1px solid ${us.badge}25`,
                        }}>
                          <Calendar size={8} style={{ display: 'inline', marginRight: 3 }} />
                          {task.when}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Mitti Scanner Promo */}
          <div style={{
            background: 'linear-gradient(145deg, #1C2B1E 0%, #243328 60%, #1A3024 100%)',
            border: '1px solid rgba(82,183,136,0.2)',
            borderRadius: 18, padding: '24px',
            boxShadow: '0 8px 32px rgba(15,35,24,0.3)',
            position: 'relative', overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
          }}>
            {/* Background orbs */}
            <div style={{
              position: 'absolute', right: -30, top: -30,
              width: 140, height: 140, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(82,183,136,0.1) 0%, transparent 70%)',
            }} />
            <div style={{
              position: 'absolute', left: -20, bottom: -20,
              width: 100, height: 100, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(45,106,79,0.15) 0%, transparent 70%)',
            }} />

            <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
              {/* Scanner visual */}
              <div style={{
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(82,183,136,0.15)',
                borderRadius: 14, padding: '18px', marginBottom: 18,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                minHeight: 90,
              }}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: 42, marginBottom: 4 }}>🌱</div>
                  <div style={{
                    fontSize: 9, fontWeight: 700, color: 'rgba(116,198,157,0.7)',
                    letterSpacing: '1px', textTransform: 'uppercase',
                  }}>MITTI SCANNER v1.2</div>
                </div>
              </div>

              <div style={{ marginBottom: 6 }}>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px', marginBottom: 4 }}>
                  Mitti Scanner
                </div>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', lineHeight: 1.65, marginBottom: 14 }}>
                  Turn field measurements into actionable soil intelligence. Instant NPK, pH, EC, moisture readings.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                {['NPK', 'pH', 'EC', 'Moisture'].map((tag) => (
                  <span key={tag} style={{
                    fontSize: 9, fontWeight: 700, padding: '3px 9px', borderRadius: 20,
                    background: 'rgba(82,183,136,0.12)', color: '#74C69D',
                    border: '1px solid rgba(82,183,136,0.2)',
                  }}>{tag}</span>
                ))}
              </div>

              <div style={{ marginTop: 'auto' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12,
                  padding: '8px 12px',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: 9,
                }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(156,163,175,0.4)' }} />
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>Scanner not connected — prototype only</span>
                </div>

                <Link href="/soil-intelligence" style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                  background: 'linear-gradient(135deg, #2D6A4F, #52B788)',
                  border: 'none', borderRadius: 11, padding: '11px 20px',
                  fontSize: 12, fontWeight: 700, color: '#fff',
                  textDecoration: 'none', cursor: 'pointer',
                  boxShadow: '0 4px 14px rgba(82,183,136,0.28)',
                  width: '100%',
                }}>
                  <Scan size={14} /> Explore Scanner →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom spacing */}
        <div style={{ height: 20 }} />
      </main>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.85); }
        }
        .overview-metric-card:hover {
          box-shadow: 0 8px 28px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.05) !important;
          transform: translateY(-2px);
          border-color: rgba(0,0,0,0.12) !important;
        }
      `}</style>
    </div>
  );
}
