'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import { cropRecommendations, selectedFarm } from '@/data/mockData';
import { Sprout, ChevronDown, Info, Droplets, Clock, Leaf, CheckCircle2, Sparkles } from 'lucide-react';

const seasons = ['Kharif (Jun–Oct)', 'Rabi (Nov–Mar)', 'Zaid (Mar–Jun)'];
const waterOptions = ['Low', 'Moderate', 'High'];

export default function CropRecommendationsPage() {
  const [selectedSeason, setSelectedSeason] = useState('Kharif (Jun–Oct)');
  const [selectedWater, setSelectedWater] = useState('Moderate');
  const [selectedField, setSelectedField] = useState('Field A');

  const suitabilityColor = (score: number) =>
    score >= 80 ? 'var(--status-good)' : score >= 65 ? 'var(--brand-600)' : score >= 50 ? 'var(--status-warn)' : 'var(--status-danger)';

  const suitabilityBg = (score: number) =>
    score >= 80 ? 'var(--status-good-bg)' : score >= 65 ? 'var(--brand-10)' : score >= 50 ? 'var(--status-warn-bg)' : 'var(--status-danger-bg)';

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      <Header title="MittiGrow AI" subtitle="Machine learning crop suitability & seasonal planning" />

      <main className="page-content crop-guidance-page flex-1 overflow-y-auto page-enter">
        {/* Hero Configuration Card */}
        <div
          className="feature-hero crop-guidance-hero mb-6"
          style={{
            background: 'linear-gradient(135deg, #1A4731 0%, #2D6A4F 100%)',
            color: 'white',
            border: 'none',
            boxShadow: '0 16px 36px rgba(20,55,42,0.18)',
          }}
        >
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)' }}>
                  🌱 Mrida-AI Agronomic Engine
                </span>
              </div>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF', fontFamily: 'Space Grotesk, sans-serif' }}>
                Crop Suitability & Crop Rotation Planning
              </h2>
              <p style={{ fontSize: 13, color: '#C8D8C9', maxWidth: 600, lineHeight: 1.6, marginTop: 4 }}>
                Predictive crop matching correlated with your live NPK balance, historical climatic patterns, and irrigation availability.
              </p>
            </div>
          </div>

          {/* Interactive Filters Bar */}
          <div className="flex items-center gap-3 mt-6 flex-wrap">
            {/* Farm Selector */}
            <div
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              <span style={{ fontSize: 13 }}>🏡</span>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: '#FFFFFF' }}>{selectedFarm.name}</span>
            </div>

            {/* Field Tabs */}
            <div
              className="flex gap-1 p-1 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              {selectedFarm.fields.map((f) => (
                <button
                  key={f.id}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    background: selectedField === f.name ? '#FFFFFF' : 'transparent',
                    color: selectedField === f.name ? '#1A4731' : '#E0E7E1',
                  }}
                  onClick={() => setSelectedField(f.name)}
                >
                  {f.name}
                </button>
              ))}
            </div>

            {/* Season Selector */}
            <label className="crop-filter-select">
              <span aria-hidden="true">🗓️</span>
              <span className="sr-only">Growing season</span>
              <select value={selectedSeason} onChange={(event) => setSelectedSeason(event.target.value)}>
                {seasons.map((season) => <option key={season}>{season}</option>)}
              </select>
              <ChevronDown size={13} aria-hidden="true" />
            </label>

            {/* Water Availability */}
            <div
              className="flex gap-1 p-1 rounded-xl"
              style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}
            >
              {waterOptions.map((w) => (
                <button
                  key={w}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                  style={{
                    background: selectedWater === w ? '#FFFFFF' : 'transparent',
                    color: selectedWater === w ? '#1A4731' : '#E0E7E1',
                  }}
                  onClick={() => setSelectedWater(w)}
                >
                  💧 {w} Water
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Soil Telemetry Inputs Used */}
        <div
          className="mitti-card soil-parameter-strip mb-6 flex items-center gap-4 flex-wrap"
          style={{ background: 'var(--bg-card)', padding: '14px 20px' }}
        >
          <div style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-secondary)' }}>
            Active Soil Parameters Applied:
          </div>
          {[
            { label: 'pH', value: '6.8' },
            { label: 'Nitrogen (N)', value: '142 kg/ha' },
            { label: 'Phosphorus (P)', value: '38 kg/ha' },
            { label: 'Potassium (K)', value: '195 kg/ha' },
            { label: 'Moisture', value: '34%' },
            { label: 'Electrical Cond.', value: '0.42 dS/m' },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-1.5 rounded-lg px-2.5 py-1"
              style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)' }}
            >
              <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{s.label}:</span>
              <span style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--brand-700)' }}>{s.value}</span>
            </div>
          ))}
        </div>

        {/* Recommendation Cards Grid */}
        <div className="crop-recommendation-grid grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
          {cropRecommendations.map((rec) => (
            <div
              key={rec.id}
              className="mitti-card crop-recommendation-card"
              style={{ borderTop: `4px solid ${rec.color}`, background: 'var(--bg-card)' }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span style={{ fontSize: 32 }}>{rec.emoji}</span>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                      {rec.crop}
                    </div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-muted)' }}>{rec.season}</div>
                  </div>
                </div>
                <span
                  className="badge"
                  style={{
                    background: suitabilityBg(rec.suitability),
                    color: suitabilityColor(rec.suitability),
                    border: `1px solid ${suitabilityColor(rec.suitability)}`,
                    fontSize: 10,
                  }}
                >
                  {rec.label}
                </span>
              </div>

              {/* Suitability Score Gauge */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>Soil Compatibility</span>
                  <span
                    className="metric-value"
                    style={{ fontSize: 19, color: suitabilityColor(rec.suitability) }}
                  >
                    {rec.suitability}%
                  </span>
                </div>
                <div className="progress-bar" style={{ height: 8 }}>
                  <div
                    className="progress-fill"
                    style={{
                      width: `${rec.suitability}%`,
                      background: rec.color,
                    }}
                  />
                </div>
              </div>

              {/* Crop Metrics */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {[
                  { icon: '💧', label: 'Irrigation Duty', value: rec.waterRequirement },
                  { icon: '⏱️', label: 'Cycle Duration', value: rec.growthDuration },
                  { icon: '🌱', label: 'Optimal Soil', value: rec.soilType },
                ].map((d) => (
                  <div
                    key={d.label}
                    className="rounded-xl p-2.5"
                    style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)', gridColumn: d.label === 'Optimal Soil' ? 'span 2' : 'span 1' }}
                  >
                    <div style={{ fontSize: 10, color: 'var(--text-muted)', marginBottom: 2 }}>
                      {d.icon} {d.label}
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-primary)' }}>
                      {d.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Rationale Bullet Points */}
              <div>
                <div style={{ fontSize: 11, color: 'var(--text-muted)', fontWeight: 700, marginBottom: 8, letterSpacing: '0.4px', textTransform: 'uppercase' }}>
                  Agronomic Match Drivers:
                </div>
                <div className="space-y-2">
                  {rec.reasons.map((r, ri) => (
                    <div key={ri} className="flex items-start gap-2">
                      <CheckCircle2 size={13} style={{ color: rec.color, flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 11.5, color: 'var(--text-secondary)', lineHeight: 1.5 }}>{r}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer Notice */}
        <div
          className="mt-6 rounded-2xl p-4 flex items-start gap-3"
          style={{ background: 'var(--status-info-bg)', border: '1px solid var(--status-info-border)' }}
        >
          <Info size={18} style={{ color: 'var(--status-info)', flexShrink: 0, marginTop: 2 }} />
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--status-info)', marginBottom: 4 }}>
              Decision Support Notice
            </div>
            <p style={{ fontSize: 12, color: 'var(--status-info)', lineHeight: 1.6 }}>
              MittiGrow AI models incorporate localized weather forecasts and ICAR crop suitability benchmarks.
              Always verify crop rotation patterns with your assigned farm agronomist prior to seed procurement.
            </p>
          </div>
        </div>

        <div style={{ height: 28 }} />
      </main>
    </div>
  );
}
