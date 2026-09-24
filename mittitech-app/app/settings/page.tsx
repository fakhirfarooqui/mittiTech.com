'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import {
  User,
  Building2,
  Leaf,
  Bell,
  Palette,
  Shield,
  Globe,
  ChevronRight,
  Save,
  Check,
  Smartphone,
  Cpu,
} from 'lucide-react';

const sections = [
  { id: 'profile', label: 'Profile & Credentials', icon: User, emoji: '👤' },
  { id: 'organization', label: 'Enterprise / Tenant', icon: Building2, emoji: '🏢' },
  { id: 'farm-preferences', label: 'Agronomic Parameters', icon: Leaf, emoji: '🌿' },
  { id: 'hardware', label: 'Scanner Hardware Sync', icon: Cpu, emoji: '📡' },
  { id: 'language', label: 'Language & Locale', icon: Globe, emoji: '🌐' },
  { id: 'notifications', label: 'Telemetry Alerts', icon: Bell, emoji: '🔔' },
  { id: 'appearance', label: 'Display & Aesthetics', icon: Palette, emoji: '🎨' },
  { id: 'access', label: 'Role-Based Access', icon: Shield, emoji: '🛡️' },
];

function SettingToggle({ label, desc, defaultOn = false }: { label: string; desc?: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-center justify-between py-3.5" style={{ borderBottom: '1px solid var(--border-faint)' }}>
      <div>
        <div style={{ fontSize: 13.5, fontWeight: 600, color: 'var(--text-primary)' }}>{label}</div>
        {desc && <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 2 }}>{desc}</div>}
      </div>
      <button
        onClick={() => setOn(!on)}
        className="relative flex-shrink-0 rounded-full transition-all duration-300"
        style={{
          width: 44,
          height: 24,
          background: on ? 'var(--brand-600)' : 'var(--bg-hover)',
          border: `1px solid ${on ? 'var(--brand-500)' : 'var(--border-default)'}`,
        }}
      >
        <div
          className="absolute top-0.5 rounded-full transition-all duration-300"
          style={{
            width: 18,
            height: 18,
            background: 'white',
            left: on ? 22 : 2,
            boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
          }}
        />
      </button>
    </div>
  );
}

function SettingInput({ label, placeholder, defaultValue = '' }: { label: string; placeholder: string; defaultValue?: string }) {
  return (
    <div className="py-2.5">
      <label style={{ fontSize: 12.5, fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 6 }}>
        {label}
      </label>
      <input
        type="text"
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="mitti-input"
      />
    </div>
  );
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('profile');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div>
            <div className="section-header">Agronomist & User Profile</div>
            <div className="demo-notice mb-5">Verified Enterprise Tenant · Role: Senior Farm Architect</div>

            {/* Avatar Section */}
            <div className="flex items-center gap-4 mb-6">
              <div
                className="flex items-center justify-center rounded-2xl shadow-sm"
                style={{ width: 72, height: 72, background: 'linear-gradient(135deg, #1A4731 0%, #2D6A4F 100%)', fontSize: 24, fontWeight: 800, color: 'white' }}
              >
                FH
              </div>
              <div>
                <button className="btn-secondary" style={{ fontSize: 12.5, padding: '7px 14px' }}>Update Headshot</button>
                <div style={{ fontSize: 11.5, color: 'var(--text-muted)', marginTop: 4 }}>PNG, JPG or WEBP (Max 4MB)</div>
              </div>
            </div>

            <div className="space-y-1">
              <SettingInput label="Full Name" placeholder="Full name" defaultValue="Fakhir Hassan" />
              <SettingInput label="Official Email" placeholder="Work email" defaultValue="fakhir@themittitech.com" />
              <SettingInput label="Direct Line" placeholder="Phone" defaultValue="+91 98765 43210" />
              <SettingInput label="Assigned Agronomic Scope" placeholder="Scope" defaultValue="Lead Platform Architect & Farm Director" />
            </div>
          </div>
        );
      case 'organization':
        return (
          <div>
            <div className="section-header">Enterprise Organization Account</div>
            <div className="demo-notice mb-4">MittiTech Enterprise Cloud</div>
            <div className="space-y-1">
              <SettingInput label="Legal Entity" placeholder="Name" defaultValue="The Mitti Tech Private Limited" />
              <SettingInput label="Enterprise ID" placeholder="ID" defaultValue="MTT-ENT-2026-IND" />
              <SettingInput label="Operations Hub" placeholder="Location" defaultValue="Lucknow Agritech Innovation Cluster, Uttar Pradesh" />
              <SettingInput label="Billing Tier" placeholder="Tier" defaultValue="Strategic Enterprise / Government KVK Partner" />
            </div>
          </div>
        );
      case 'farm-preferences':
        return (
          <div>
            <div className="section-header">Agronomic Preferences</div>
            <div className="space-y-1 mb-5">
              <SettingInput label="Primary Default Farm" placeholder="Default farm" defaultValue="Green Valley Farm (Sector 4)" />
              <SettingInput label="Acreage Standard" placeholder="Unit" defaultValue="Acres (Imperial Agronomic Standard)" />
              <SettingInput label="AI Dialect & Idiom" placeholder="Language" defaultValue="Hinglish / Hindi Agro-technical" />
            </div>
            <div className="section-header">Telemetry Handling</div>
            <SettingToggle label="Auto-sync Bluetooth scanner data" desc="Pushes telemetry directly to cloud telemetry warehouse" defaultOn={true} />
            <SettingToggle label="Automated PDF dispatch on anomaly" desc="Generates KVK-ready report when pH or EC deviates >15%" defaultOn={true} />
            <SettingToggle label="Offline Edge Telemetry Cache" desc="Preserves up to 500 scans on scanner SD memory during cellular outages" defaultOn={true} />
          </div>
        );
      case 'hardware':
        return (
          <div>
            <div className="section-header">Mitti Smart Soil Scanner Device Sync</div>
            <div className="demo-notice mb-4">Hardware Telemetry Stack</div>
            <div className="space-y-3 mb-6">
              {[
                { name: 'Mitti Scanner v1.2 (#SN-8941)', status: 'Connected (BLE 5.2)', battery: '94%', firmware: 'v2.1.0-prod' },
                { name: 'Drone Multispectral Gateway (#DR-04)', status: 'Standby in Hangar', battery: '100%', firmware: 'v1.8.4' },
              ].map((hw) => (
                <div
                  key={hw.name}
                  className="flex items-center justify-between rounded-xl p-4"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'var(--brand-10)', color: 'var(--brand-700)' }}>
                      <Cpu size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--text-primary)' }}>{hw.name}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>Firmware: {hw.firmware} · Battery: {hw.battery}</div>
                    </div>
                  </div>
                  <span className="badge badge-good">{hw.status}</span>
                </div>
              ))}
            </div>
            <SettingToggle label="Real-time High-Frequency Sensor Stream" desc="Increases sampling rate from 1Hz to 10Hz during deep soil probing" defaultOn={true} />
            <SettingToggle label="Auto-Calibrate Spectroscopy Sensor" desc="Performs optical black-reference calibration before each run" defaultOn={true} />
          </div>
        );
      case 'language':
        return (
          <div>
            <div className="section-header">Language & Regional Dialect</div>
            <div className="demo-notice mb-4">Multilingual Natural Language Processing</div>
            <div className="space-y-2">
              {[
                { label: 'English (India)', sub: 'Default interface & technical exports', selected: true },
                { label: 'हिंदी (Hindi)', sub: 'Complete UI localization & audio speech synthesis', selected: false },
                { label: 'Hinglish (Colloquial)', sub: 'Optimized for conversational Mitti AI agronomist', selected: false },
                { label: 'ਪੰਜਾਬੀ (Punjabi)', sub: 'Regional agronomic terms for wheat-paddy cycle', selected: false },
              ].map((lang) => (
                <div
                  key={lang.label}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5 cursor-pointer transition-all hover:border-[var(--brand-400)]"
                  style={{
                    background: lang.selected ? 'var(--bg-selected)' : 'var(--bg-surface)',
                    border: lang.selected ? '1px solid var(--border-brand)' : '1px solid var(--border-light)',
                  }}
                >
                  <div>
                    <div style={{ fontSize: 13.5, fontWeight: lang.selected ? 700 : 500, color: lang.selected ? 'var(--brand-700)' : 'var(--text-primary)' }}>
                      {lang.label}
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{lang.sub}</div>
                  </div>
                  {lang.selected && <Check size={18} style={{ color: 'var(--brand-600)' }} />}
                </div>
              ))}
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div>
            <div className="section-header">Notification Channels & Escalation</div>
            <SettingToggle label="Critical Soil Moisture Depletion (<20%)" desc="Triggers immediate mobile push & SMS alert" defaultOn={true} />
            <SettingToggle label="Pathogen Outbreak Proximity Warning" desc="Alerts when nearby farms log fungal/pest spore vectors" defaultOn={true} />
            <SettingToggle label="Hardware Scanner Battery / Calibration Warnings" defaultOn={true} />
            <SettingToggle label="Localized Weather & Rainfall Radar Alerts" defaultOn={true} />
            <SettingToggle label="Weekly Enterprise Field Executive Briefing" defaultOn={false} />
          </div>
        );
      case 'appearance':
        return (
          <div>
            <div className="section-header">Theme & Visual Experience</div>
            <div className="demo-notice mb-4">Active: Warm Ivory × Forest Green Premium Aesthetic</div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { name: 'Warm Ivory & Forest Green (Active)', preview: '#F8F7F2', sidebar: '#1C2B1E', selected: true },
                { name: 'Nocturnal Field (Dark Mode)', preview: '#0A1410', sidebar: '#050C08', selected: false },
              ].map((theme) => (
                <div
                  key={theme.name}
                  className="rounded-xl p-3.5 cursor-pointer transition-all"
                  style={{
                    background: theme.selected ? 'var(--bg-selected)' : 'var(--bg-surface)',
                    border: theme.selected ? '2px solid var(--brand-500)' : '1px solid var(--border-light)',
                  }}
                >
                  <div
                    className="rounded-lg mb-3 flex overflow-hidden border border-gray-200"
                    style={{ height: 64 }}
                  >
                    <div style={{ width: '28%', background: theme.sidebar }} />
                    <div style={{ width: '72%', background: theme.preview }} />
                  </div>
                  <div className="flex items-center justify-between">
                    <span style={{ fontSize: 12.5, color: theme.selected ? 'var(--brand-700)' : 'var(--text-secondary)', fontWeight: theme.selected ? 700 : 500 }}>
                      {theme.name}
                    </span>
                    {theme.selected && <Check size={16} style={{ color: 'var(--brand-600)' }} />}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20 }}>
              <SettingToggle label="High Contrast Data Visualizations" desc="Optimizes chart lines for field readability under direct sunlight" defaultOn={true} />
              <SettingToggle label="Fluid Micro-Animations" desc="Smooth spring physics for tab and card transitions" defaultOn={true} />
            </div>
          </div>
        );
      case 'access':
        return (
          <div>
            <div className="section-header">Enterprise Access Control</div>
            <div className="space-y-3 mb-5">
              {[
                { role: 'Platform Architect / Super-Admin', user: 'Fakhir Hassan', access: 'Full System Access & Telemetry Pipeline', color: '#166534' },
                { role: 'Field Agronomist', user: 'Dr. Ramesh Sharma', access: 'Soil Scans, Prescription Builder & KVK Reports', color: '#2563EB' },
                { role: 'Farm Operator / Technician', user: 'Sunil Verma', access: 'Scanner Probe Operations & Field Sample Logging', color: '#D97706' },
              ].map((r) => (
                <div
                  key={r.role}
                  className="flex items-center justify-between rounded-xl px-4 py-3.5"
                  style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)' }}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="rounded-lg px-2.5 py-1 text-xs font-bold"
                      style={{ background: 'white', color: r.color, border: '1px solid var(--border-light)' }}
                    >
                      {r.role}
                    </div>
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{r.user}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{r.access}</div>
                    </div>
                  </div>
                  <ChevronRight size={16} style={{ color: 'var(--text-faint)' }} />
                </div>
              ))}
            </div>
            <SettingToggle label="Require Hardware Token for Calibration" defaultOn={false} />
            <SettingToggle label="REST & GraphQL API Keys Active" desc="Bearer tokens for enterprise ERP integration" defaultOn={true} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      <Header title="Platform Configuration" subtitle="Telemetry thresholds, enterprise settings, and hardware management" />

      <main className="page-content settings-page flex-1 overflow-y-auto page-enter">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
          {/* Sidebar Nav */}
          <div className="lg:col-span-1">
            <div className="mitti-card p-2" style={{ background: 'var(--bg-card)' }}>
              <div className="space-y-1">
                {sections.map((s) => {
                  const active = activeSection === s.id;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActiveSection(s.id)}
                      className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-left transition-all"
                      style={{
                        background: active ? 'var(--bg-selected)' : 'transparent',
                        border: active ? '1px solid var(--border-brand)' : '1px solid transparent',
                      }}
                    >
                      <span style={{ fontSize: 16 }}>{s.emoji}</span>
                      <span
                        style={{
                          fontSize: 13,
                          fontWeight: active ? 700 : 500,
                          color: active ? 'var(--brand-700)' : 'var(--text-secondary)',
                        }}
                      >
                        {s.label}
                      </span>
                      {active && (
                        <ChevronRight size={14} style={{ color: 'var(--brand-600)', marginLeft: 'auto' }} />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="lg:col-span-3">
            <div className="mitti-card" style={{ background: 'var(--bg-card)' }}>
              {renderContent()}

              {/* Save Footer */}
              <div className="flex items-center justify-end gap-3 mt-8 pt-4" style={{ borderTop: '1px solid var(--border-light)' }}>
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                  Preferences auto-sync to all registered devices
                </span>
                <button
                  onClick={handleSave}
                  className="btn-primary"
                  style={{ fontSize: 13, padding: '9px 20px' }}
                >
                  {saved ? <><Check size={15} /> Saved Preferences!</> : <><Save size={15} /> Save Changes</>}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div style={{ height: 28 }} />
      </main>
    </div>
  );
}
