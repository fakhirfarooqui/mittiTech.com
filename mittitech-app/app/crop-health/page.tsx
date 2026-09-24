'use client';

import React, { useState, useRef } from 'react';
import Header from '@/components/layout/Header';
import { cropVisionExamples } from '@/data/mockData';
import {
  Upload,
  Camera,
  X,
  CheckCircle2,
  AlertTriangle,
  Eye,
  Leaf,
  Info,
  Loader2,
  Sparkles,
  ArrowRight,
  ShieldAlert,
} from 'lucide-react';

// ────────────────────────────────────────────────────────────
// SUPPORTED CROPS
// ────────────────────────────────────────────────────────────
const supportedCrops = [
  { name: 'Bhindi (Okra)', emoji: '🌿', color: '#166534' },
  { name: 'Tomato', emoji: '🍅', color: '#DC2626' },
  { name: 'Aloo (Potato)', emoji: '🥔', color: '#7C3AED' },
  { name: 'Wheat', emoji: '🌾', color: '#D97706' },
  { name: 'Rice', emoji: '🌾', color: '#2D6A4F' },
  { name: 'Corn', emoji: '🌽', color: '#B45309' },
];

// ────────────────────────────────────────────────────────────
// SAMPLE DEMO IMAGES
// ────────────────────────────────────────────────────────────
const sampleImages = [
  {
    name: 'Okra Yellow Vein Mosaic',
    crop: 'Bhindi (Okra)',
    url: 'https://images.unsplash.com/photo-1592417817098-8f3d6ef23a07?w=600&auto=format&fit=crop&q=80',
    tag: 'Symptom Detected',
  },
  {
    name: 'Tomato Early Blight',
    crop: 'Tomato',
    url: 'https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=600&auto=format&fit=crop&q=80',
    tag: 'Fungal Spot',
  },
  {
    name: 'Healthy Wheat Foliage',
    crop: 'Wheat',
    url: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&auto=format&fit=crop&q=80',
    tag: 'Optimal Canopy',
  },
];

// ────────────────────────────────────────────────────────────
// ANALYSIS STAGES
// ────────────────────────────────────────────────────────────
const analysisStages = [
  { label: 'Ingesting Multi-spectral Frame', icon: '📤', desc: 'Calibrating color balance & leaf boundary' },
  { label: 'CNN Feature Extraction', icon: '⚙️', desc: 'Running Mitti-Vision edge neural network' },
  { label: 'Pathogen & Symptom Classification', icon: '🔍', desc: 'Cross-referencing 40,000+ agronomic samples' },
  { label: 'Generating Agronomic Prescription', icon: '🧠', desc: 'Formulating localized treatment advisory' },
];

// ────────────────────────────────────────────────────────────
// RECENT SCANS
// ────────────────────────────────────────────────────────────
const recentScans = [
  {
    id: 1,
    crop: 'Bhindi',
    emoji: '🌿',
    date: 'Today, 08:20 AM',
    observation: 'Interveinal Chlorosis Pattern',
    result: 'Suspected Micronutrient Deficiency',
    status: 'good',
  },
  {
    id: 2,
    crop: 'Tomato',
    emoji: '🍅',
    date: 'Sep 22, 02:15 PM',
    observation: 'Concentric Brown Ring Lesions',
    result: 'Early Blight (Alternaria solani)',
    status: 'warn',
  },
  {
    id: 3,
    crop: 'Wheat',
    emoji: '🌾',
    date: 'Sep 20, 09:30 AM',
    observation: 'Uniform Vibrant Green Index',
    result: 'Healthy Tillering Phase',
    status: 'good',
  },
];

// ────────────────────────────────────────────────────────────
// MAIN CROP HEALTH AI PAGE
// ────────────────────────────────────────────────────────────
export default function CropHealthPage() {
  const [selectedCrop, setSelectedCrop] = useState<string | null>('Bhindi (Okra)');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisStage, setAnalysisStage] = useState(0);
  const [analysisResult, setAnalysisResult] = useState<typeof cropVisionExamples[0] | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      setImagePreview(e.target?.result as string);
      setAnalysisResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const selectSample = (sample: typeof sampleImages[0]) => {
    setSelectedCrop(sample.crop);
    setImagePreview(sample.url);
    setAnalysisResult(null);
  };

  const runAnalysis = () => {
    setAnalyzing(true);
    setAnalysisStage(0);
    setAnalysisResult(null);

    const advance = (stage: number) => {
      if (stage <= analysisStages.length) {
        setTimeout(() => {
          setAnalysisStage(stage);
          if (stage < analysisStages.length) {
            advance(stage + 1);
          } else {
            setAnalyzing(false);
            const example = cropVisionExamples.find((c) =>
              selectedCrop ? c.crop.toLowerCase().includes(selectedCrop.toLowerCase().split(' ')[0]) : true
            ) || cropVisionExamples[0];
            setAnalysisResult({ ...example, crop: selectedCrop || 'Field Crop' });
          }
        }, 1100);
      }
    };
    advance(1);
  };

  const resetAll = () => {
    setImagePreview(null);
    setAnalysisResult(null);
    setAnalyzing(false);
    setAnalysisStage(0);
  };

  return (
    <div className="flex flex-col flex-1 overflow-hidden" style={{ background: 'var(--bg-base)' }}>
      <Header title="MittiVision AI" subtitle="Computer vision crop diagnostics & pathogen detection" />

      <main className="page-content crop-health-page flex-1 overflow-y-auto page-enter">
        {/* Hero Banner */}
        <div
          className="mitti-card mb-6 flex items-center justify-between flex-wrap gap-4"
          style={{
            background: 'linear-gradient(135deg, #1A4731 0%, #2D6A4F 100%)',
            color: 'white',
            border: 'none',
            boxShadow: 'var(--shadow-brand)',
          }}
        >
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge" style={{ background: 'rgba(255,255,255,0.15)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)' }}>
                ✦ Edge Computer Vision Model v2.4
              </span>
            </div>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: '#FFFFFF', fontFamily: 'Space Grotesk, sans-serif' }}>
              MittiVision Crop Health Intelligence
            </h2>
            <p style={{ fontSize: 13, color: '#C8D8C9', marginTop: 4, maxWidth: 540, lineHeight: 1.6 }}>
              Instant foliar pathology analysis powered by deep residual neural networks. Detect leaf spot, rust, nutrient chlorosis, and insect damage in sub-second inference time.
            </p>
          </div>
          <div className="hidden lg:flex items-center gap-3">
            <div
              className="rounded-2xl p-4 text-center"
              style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              <div style={{ fontSize: 26, fontWeight: 800, color: '#AEDBB8', fontFamily: 'Space Grotesk, sans-serif' }}>
                98.4%
              </div>
              <div style={{ fontSize: 11, color: '#E0E7E1' }}>Top-3 Classification</div>
            </div>
            <div
              className="rounded-2xl p-4 text-center"
              style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.15)' }}
            >
              <div style={{ fontSize: 26, fontWeight: 800, color: '#AEDBB8', fontFamily: 'Space Grotesk, sans-serif' }}>
                45ms
              </div>
              <div style={{ fontSize: 11, color: '#E0E7E1' }}>Inference Latency</div>
            </div>
          </div>
        </div>

        <div className="crop-health-workspace grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* LEFT: Controls & History */}
          <div className="crop-health-sidebar space-y-4">
            {/* Crop Selection */}
            <div className="mitti-card">
              <div className="section-header">Target Crop Type</div>
              <div className="grid grid-cols-2 gap-2">
                {supportedCrops.map((crop) => (
                  <button
                    key={crop.name}
                    onClick={() => setSelectedCrop(crop.name)}
                    className="flex items-center gap-2 rounded-xl p-2.5 text-left transition-all"
                    style={{
                      background: selectedCrop === crop.name ? 'var(--bg-selected)' : 'var(--bg-surface)',
                      border: selectedCrop === crop.name
                        ? '1px solid var(--border-brand)'
                        : '1px solid var(--border-faint)',
                    }}
                  >
                    <span style={{ fontSize: 16 }}>{crop.emoji}</span>
                    <span
                      style={{
                        fontSize: 12,
                        fontWeight: selectedCrop === crop.name ? 700 : 500,
                        color: selectedCrop === crop.name ? 'var(--brand-700)' : 'var(--text-secondary)',
                      }}
                    >
                      {crop.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Demo Samples */}
            <div className="mitti-card">
              <div className="flex items-center justify-between mb-3">
                <span className="section-header" style={{ marginBottom: 0 }}>Try Sample Imagery</span>
                <span className="demo-notice" style={{ fontSize: 9 }}>Click to load</span>
              </div>
              <div className="space-y-2">
                {sampleImages.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => selectSample(s)}
                    className="w-full flex items-center gap-3 p-2.5 rounded-xl text-left transition-all hover:border-[var(--brand-400)]"
                    style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)' }}
                  >
                    <img
                      src={s.url}
                      alt={s.name}
                      className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {s.name}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span style={{ fontSize: 10, color: 'var(--text-muted)' }}>{s.crop}</span>
                        <span className="badge badge-brand" style={{ fontSize: 9, padding: '1px 6px' }}>{s.tag}</span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent Scans */}
            <div className="mitti-card">
              <div className="section-header">Field Audit Stream</div>
              <div className="space-y-2.5">
                {recentScans.map((scan) => (
                  <div
                    key={scan.id}
                    className="rounded-xl p-3"
                    style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)' }}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span style={{ fontSize: 15 }}>{scan.emoji}</span>
                        <span style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--text-primary)' }}>
                          {scan.crop}
                        </span>
                      </div>
                      <span style={{ fontSize: 10, color: 'var(--text-faint)' }}>{scan.date}</span>
                    </div>
                    <div style={{ fontSize: 11.5, color: 'var(--text-secondary)' }}>{scan.observation}</div>
                    <div className="flex items-center gap-1 mt-1.5" style={{ fontSize: 11, fontWeight: 600, color: scan.status === 'good' ? 'var(--status-good)' : 'var(--status-warn)' }}>
                      <ArrowRight size={11} /> {scan.result}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CENTER & RIGHT: Upload & Analysis Results */}
          <div className="crop-health-stage lg:col-span-2 space-y-4">
            {/* Upload Zone */}
            {!imagePreview && !analysisResult && (
              <div
                className="mitti-card crop-upload-zone"
                onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={handleDrop}
                style={{
                  borderStyle: isDragOver ? 'solid' : 'dashed',
                  borderColor: isDragOver ? 'var(--brand-500)' : 'var(--border-default)',
                  background: isDragOver ? 'var(--bg-selected)' : 'var(--bg-card)',
                  minHeight: 380,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  textAlign: 'center',
                  padding: '40px 24px',
                }}
                onClick={() => fileRef.current?.click()}
              >
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                />

                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4"
                  style={{
                    background: 'var(--brand-10)',
                    border: '1px solid var(--border-brand)',
                    boxShadow: 'var(--shadow-brand)',
                  }}
                >
                  <Upload size={32} style={{ color: 'var(--brand-700)' }} />
                </div>

                <h3 style={{ fontSize: 19, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 6, fontFamily: 'Space Grotesk, sans-serif' }}>
                  Upload Crop Specimen Image
                </h3>
                <p style={{ fontSize: 13, color: 'var(--text-muted)', maxWidth: 420, lineHeight: 1.6, marginBottom: 20 }}>
                  Drag & drop high-resolution close-ups of leaves, fruits, or canopy foliage. MittiVision will parse structural anomalies.
                </p>

                <div className="flex items-center gap-3">
                  <button className="btn-primary" style={{ fontSize: 13 }}>
                    <Upload size={14} />
                    Select Image File
                  </button>
                  <button className="btn-secondary" style={{ fontSize: 13 }}>
                    <Camera size={14} />
                    Mobile Camera Sync
                  </button>
                </div>

                <div className="demo-notice mt-6">
                  ✦ Client-side edge simulation · or pick from &ldquo;Try Sample Imagery&rdquo; on the left
                </div>
              </div>
            )}

            {/* Preview & Action */}
            {imagePreview && !analyzing && !analysisResult && (
              <div className="mitti-card">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)' }}>
                      Specimen Preview Loaded
                    </div>
                    <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                      Ready for inference on {selectedCrop}
                    </div>
                  </div>
                  <button onClick={resetAll} className="btn-ghost" style={{ fontSize: 12 }}>
                    <X size={14} /> Clear Image
                  </button>
                </div>

                <div
                  className="rounded-2xl overflow-hidden mb-4"
                  style={{ border: '1px solid var(--border-light)', maxHeight: 320, background: '#000000' }}
                >
                  <img
                    src={imagePreview}
                    alt="Uploaded crop specimen"
                    style={{ width: '100%', maxHeight: 320, objectFit: 'contain' }}
                  />
                </div>

                <button
                  onClick={runAnalysis}
                  className="btn-primary w-full justify-center"
                  style={{ fontSize: 14, padding: '13px' }}
                >
                  <Eye size={16} />
                  Initiate AI Diagnostic Scan
                </button>
              </div>
            )}

            {/* In-Flight Analysis Stepper */}
            {analyzing && (
              <div className="mitti-card" style={{ minHeight: 340 }}>
                <div className="flex items-center gap-3 mb-6">
                  <Loader2 size={24} style={{ color: 'var(--brand-600)', animation: 'spin 1s linear infinite' }} />
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: 'var(--text-primary)' }}>
                      Mitti-Vision Inference in Progress
                    </div>
                    <div className="demo-notice mt-1">Multi-modal Agronomic Neural Network</div>
                  </div>
                </div>

                {imagePreview && (
                  <div className="relative rounded-xl overflow-hidden mb-5" style={{ height: 160 }}>
                    <img
                      src={imagePreview}
                      alt="Analyzing specimen"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: 'linear-gradient(180deg, rgba(82,183,136,0) 0%, rgba(82,183,136,0.3) 50%, rgba(82,183,136,0) 100%)',
                        animation: 'scan-pulse 2s ease-in-out infinite',
                      }}
                    />
                  </div>
                )}

                <div className="space-y-2">
                  {analysisStages.map((stage, i) => {
                    const done = i + 1 < analysisStage;
                    const active = i + 1 === analysisStage;
                    return (
                      <div
                        key={i}
                        className="flex items-center gap-3 rounded-xl px-4 py-3 transition-all"
                        style={{
                          background: done
                            ? 'var(--status-good-bg)'
                            : active
                            ? 'var(--bg-selected)'
                            : 'transparent',
                          border: active ? '1px solid var(--border-brand)' : '1px solid transparent',
                        }}
                      >
                        <span style={{ fontSize: 16 }}>
                          {done ? '✅' : stage.icon}
                        </span>
                        <div style={{ flex: 1 }}>
                          <div
                            style={{
                              fontSize: 12.5,
                              fontWeight: 700,
                              color: done ? 'var(--brand-800)' : active ? 'var(--brand-700)' : 'var(--text-muted)',
                            }}
                          >
                            {stage.label}
                          </div>
                          {active && (
                            <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>{stage.desc}</div>
                          )}
                        </div>
                        {active && (
                          <Loader2 size={15} style={{ color: 'var(--brand-600)', animation: 'spin 1s linear infinite' }} />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Diagnostic Output Card */}
            {analysisResult && (
              <div className="space-y-4 animate-fade-in">
                <div
                  className="mitti-card"
                  style={{ borderTop: '4px solid #D97706' }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle size={18} style={{ color: '#D97706' }} />
                        <span style={{ fontSize: 17, fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}>
                          Diagnostic Assessment Complete
                        </span>
                        <span className="badge badge-brand">Confidence: 94.2%</span>
                      </div>
                      <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
                        Crop: {analysisResult.crop} · Specimen ID: #MVI-8924 · {new Date().toLocaleTimeString()}
                      </div>
                    </div>
                    <button onClick={resetAll} className="btn-secondary" style={{ fontSize: 12 }}>
                      Analyze Another Specimen
                    </button>
                  </div>

                  {imagePreview && (
                    <div className="rounded-xl overflow-hidden mb-4" style={{ maxHeight: 220 }}>
                      <img
                        src={imagePreview}
                        alt="Analyzed specimen"
                        style={{ width: '100%', height: 220, objectFit: 'cover' }}
                      />
                    </div>
                  )}

                  {/* Diagnostic Attributes */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div
                      className="rounded-xl p-3.5"
                      style={{ background: 'var(--status-warn-bg)', border: '1px solid var(--status-warn-border)' }}
                    >
                      <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--status-warn)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                        Observed Visual Pattern
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-primary)', marginTop: 4 }}>
                        {analysisResult.observation}
                      </div>
                    </div>
                    <div
                      className="rounded-xl p-3.5"
                      style={{ background: 'var(--status-danger-bg)', border: '1px solid var(--status-danger-border)' }}
                    >
                      <div style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--status-danger)', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                        Primary Pathogen / Stress Indicator
                      </div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--status-danger)', marginTop: 4 }}>
                        {analysisResult.possibleIssue}
                      </div>
                    </div>
                  </div>

                  {/* Confidence Banner */}
                  <div
                    className="rounded-xl p-3"
                    style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)' }}
                  >
                    <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                      <strong>Model Note:</strong> Matches validated signature from Indian Council of Agricultural Research (ICAR) pathogen library.
                    </div>
                  </div>
                </div>

                {/* Treatment & Remediation Steps */}
                <div className="mitti-card">
                  <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 14, fontFamily: 'Space Grotesk, sans-serif' }}>
                    Agronomist Action Plan
                  </div>
                  <div className="space-y-2.5">
                    {analysisResult.suggestions.map((s, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 rounded-xl p-3"
                        style={{ background: 'var(--bg-surface)', border: '1px solid var(--border-light)' }}
                      >
                        <div
                          className="flex items-center justify-center rounded-lg flex-shrink-0 font-bold"
                          style={{
                            width: 24,
                            height: 24,
                            background: 'var(--brand-700)',
                            color: 'white',
                            fontSize: 11,
                          }}
                        >
                          {i + 1}
                        </div>
                        <span style={{ fontSize: 12.5, color: 'var(--text-primary)', lineHeight: 1.5 }}>{s}</span>
                      </div>
                    ))}
                  </div>

                  <div
                    className="mt-4 rounded-xl p-3.5 flex items-start gap-2.5"
                    style={{ background: 'var(--status-info-bg)', border: '1px solid var(--status-info-border)' }}
                  >
                    <Info size={16} style={{ color: 'var(--status-info)', flexShrink: 0, marginTop: 1 }} />
                    <p style={{ fontSize: 11.5, color: 'var(--status-info)', lineHeight: 1.6 }}>
                      <strong>Extension Advisory Protocol:</strong> For critical cash crops, submit photographic confirmation to your designated district Krishi Vigyan Kendra before applying scheduled fungicides.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ height: 28 }} />
      </main>
    </div>
  );
}
