'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Building2,
  Globe,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Radio,
  Droplets,
  Activity,
  Sprout,
  Satellite,
  Sliders,
  ChevronDown,
} from 'lucide-react';
import { loginUser } from '@/lib/auth';

export default function LoginPage() {
  const router = useRouter();

  // Form State
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [keepSignedIn, setKeepSignedIn] = useState(true);
  const [error, setError] = useState('');
  const [forgotNotice, setForgotNotice] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Language Selector
  const [selectedLang, setSelectedLang] = useState('English');
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const languages = ['English', 'हिन्दी (Hindi)', 'ਪੰਜਾਬੀ (Punjabi)', 'मराठी (Marathi)'];

  // Interactive 3D Parallax Tilt State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

  // Auto-cycle through floating features
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeatureIndex((prev) => (prev + 1) % 5);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { clientWidth, clientHeight } = currentTarget;
    const x = (clientX / clientWidth - 0.5) * 2;
    const y = (clientY / clientHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  // Autofill Demo Credentials
  const handleAutofill = () => {
    setEmail('admin@mittitech.com');
    setPassword('admin123');
    setError('');
    setForgotNotice(false);
  };

  // Submit Handler with Static Verification
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setForgotNotice(false);

    if (email.trim() === 'admin@mittitech.com' && password === 'admin123') {
      setIsLoading(true);
      loginUser();
      setTimeout(() => {
        setIsLoading(false);
        setIsSuccess(true);
        setTimeout(() => {
          router.push('/');
        }, 500);
      }, 650);
    } else {
      setError('Invalid email or password.');
    }
  };

  const productCapabilities = [
    {
      title: 'Soil Intelligence',
      desc: 'Know your soil, grow better',
      icon: Droplets,
    },
    {
      title: 'Crop Health AI',
      desc: 'Detect issues early',
      icon: Sprout,
    },
    {
      title: 'FieldSense',
      desc: 'Monitor every field',
      icon: Satellite,
    },
    {
      title: 'MittiGrow AI',
      desc: 'Choose the right crop',
      icon: Sparkles,
    },
    {
      title: 'Smart Farm Operations',
      desc: 'Turn insights into action',
      icon: Sliders,
    },
  ];

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative flex flex-col lg:flex-row min-h-screen w-full select-none overflow-x-hidden bg-[#07110A]"
    >
      {/* ========================================================================= */}
      {/* LEFT SIDE: 3D AGRICULTURE WORLD (~60%)                                   */}
      {/* ========================================================================= */}
      <div className="relative flex-1 lg:w-[58%] xl:w-[62%] min-h-[580px] lg:min-h-screen overflow-hidden flex flex-col justify-between p-6 sm:p-10 lg:p-14 text-white z-10">
        {/* 3D Background with Parallax Depth */}
        <div
          className="absolute inset-0 pointer-events-none transition-transform duration-700 ease-out scale-105"
          style={{
            transform: `translate(${mousePos.x * -8}px, ${mousePos.y * -8}px)`,
          }}
        >
          <Image
            src="/images/mitti_3d_login_bg.jpg"
            alt="Mitti Tech 3D Agricultural Landscape"
            fill
            priority
            className="object-cover object-center"
          />

          {/* Cinematic Atmospheric Depth Overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 75% 25%, rgba(254, 243, 199, 0.12) 0%, transparent 60%), radial-gradient(ellipse at 20% 85%, rgba(7, 17, 10, 0.95) 0%, rgba(7, 17, 10, 0.45) 60%, transparent 100%)',
            }}
          />

          {/* Smooth blend into right panel */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(90deg, rgba(7, 17, 10, 0.7) 0%, rgba(7, 17, 10, 0.15) 50%, rgba(7, 17, 10, 0.85) 100%), linear-gradient(180deg, rgba(7, 17, 10, 0.5) 0%, transparent 35%, rgba(7, 17, 10, 0.9) 100%)',
            }}
          />

          {/* Animated Geospatial Scan Sweep Laser */}
          <div
            className="absolute w-full h-[2px] opacity-40 pointer-events-none"
            style={{
              background:
                'linear-gradient(90deg, transparent 0%, rgba(82, 183, 136, 0.9) 50%, transparent 100%)',
              top: '52%',
              boxShadow: '0 0 16px rgba(82, 183, 136, 0.7)',
              animation: 'scan-pulse 8s ease-in-out infinite',
            }}
          />
        </div>

        {/* ── TOP-LEFT: BRANDING ── */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            {/* Logo Mark */}
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl"
              style={{
                background: 'linear-gradient(135deg, #1A4731 0%, #2D6A4F 60%, #52B788 100%)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                boxShadow: '0 4px 20px rgba(45, 106, 79, 0.45)',
              }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
                  fill="rgba(255,255,255,0.15)"
                />
                <path
                  d="M12 5c0 0-2 3.5-2 6.5s2 6.5 2 6.5 2-3.5 2-6.5S12 5 12 5z"
                  fill="#A3E635"
                />
                <path
                  d="M6 12c0 0 3.5-2 6.5-2s6.5 2 6.5 2-3.5 2-6.5 2S6 12 6 12z"
                  fill="#FFFFFF"
                  opacity="0.85"
                />
              </svg>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h1
                  className="text-xl sm:text-2xl font-extrabold tracking-tight text-white leading-tight"
                  style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                >
                  The Mitti Tech
                </h1>
                <span
                  className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
                  style={{
                    background: 'rgba(82, 183, 136, 0.2)',
                    color: '#AEDBB8',
                    border: '1px solid rgba(82, 183, 136, 0.35)',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <Radio size={10} className="animate-pulse text-[#52B788]" />
                  Live Grid
                </span>
              </div>
              <p className="text-xs font-medium tracking-wide text-[#AEDBB8] mt-0.5">
                Soil Intelligence. Smarter Farming.
              </p>
            </div>
          </div>

          {/* Sector Pill */}
          <div
            className="hidden md:flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs"
            style={{
              background: 'rgba(16, 33, 23, 0.75)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#52B788] animate-pulse" />
            <span className="text-white/80 text-xs font-medium">Sector E-2 Telemetry Active</span>
          </div>
        </div>

        {/* ── CENTER: HERO COPY & FLOATING HUD METRIC CARDS ── */}
        <div className="relative z-10 my-auto py-6 max-w-2xl">
          {/* Tagline Pill */}
          <div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{
              background: 'rgba(26, 71, 49, 0.8)',
              border: '1px solid rgba(82, 183, 136, 0.4)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.25)',
              backdropFilter: 'blur(12px)',
            }}
          >
            <Sparkles size={13} className="text-[#A3E635]" />
            <span className="text-[#E8F5E9] tracking-wide text-xs">
              AI-Powered Agriculture. Smarter Decisions.
            </span>
          </div>

          {/* Hero Headline */}
          <h2
            className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-white tracking-tight leading-[1.12] mb-3"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              textShadow: '0 2px 20px rgba(0, 0, 0, 0.75)',
            }}
          >
            AI-Powered Agriculture <br />
            <span
              style={{
                background: 'linear-gradient(90deg, #FFFFFF 0%, #D8F3DC 50%, #74C69D 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              for a Smarter Tomorrow
            </span>
          </h2>

          <p
            className="text-sm sm:text-base text-white/85 max-w-lg leading-relaxed mb-7"
            style={{ textShadow: '0 1px 8px rgba(0,0,0,0.6)' }}
          >
            From soil to satellite, Mitti Tech brings intelligence to every acre.
          </p>

          {/* ── FARM DATA VISUALIZATION: FLOATING HUD CARDS (Clean Grid) ── */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-3 max-w-xl">
            {/* HUD 1: Soil Health */}
            <div
              className="p-3.5 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'rgba(12, 26, 17, 0.8)',
                border: '1px solid rgba(82, 183, 136, 0.35)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div className="flex items-center justify-between text-[11px] text-white/60 mb-1">
                <span>Soil Health</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#52B788] animate-pulse" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                82<span className="text-xs font-normal text-white/50">/100</span>
              </div>
              <div className="text-[10px] text-[#74C69D] mt-0.5 font-medium">Optimal Fertility</div>
            </div>

            {/* HUD 2: Moisture */}
            <div
              className="p-3.5 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'rgba(12, 26, 17, 0.8)',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div className="flex items-center justify-between text-[11px] text-white/60 mb-1">
                <span className="flex items-center gap-1">
                  <Droplets size={11} className="text-[#60A5FA]" />
                  Moisture
                </span>
                <span className="text-[10px] text-[#60A5FA]">Target 38%</span>
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                28%
              </div>
              <div className="text-[10px] text-[#93C5FD] mt-0.5 font-medium">Sensor #EF-04</div>
            </div>

            {/* HUD 3: NPK */}
            <div
              className="p-3.5 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'rgba(12, 26, 17, 0.8)',
                border: '1px solid rgba(163, 230, 53, 0.35)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div className="flex items-center justify-between text-[11px] text-white/60 mb-1">
                <span>NPK Balance</span>
                <Sparkles size={11} className="text-[#A3E635]" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-[#A3E635] tracking-tight">
                Optimal
              </div>
              <div className="text-[10px] text-white/70 mt-0.5 font-mono">142:24:188 kg/ha</div>
            </div>

            {/* HUD 4: Crop Health */}
            <div
              className="p-3.5 rounded-2xl transition-all duration-300 hover:scale-[1.02]"
              style={{
                background: 'rgba(12, 26, 17, 0.8)',
                border: '1px solid rgba(82, 183, 136, 0.35)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.35)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <div className="flex items-center justify-between text-[11px] text-white/60 mb-1">
                <span>Crop Health</span>
                <Activity size={11} className="text-[#52B788]" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                94%
              </div>
              <div className="text-[10px] text-[#52B788] mt-0.5 font-medium">NDVI 0.78 High</div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM: PRODUCT CAPABILITIES (Clean Row with Ample Clearance) ── */}
        <div className="relative z-10 pb-2">
          <div className="text-[10.5px] font-bold uppercase tracking-wider text-white/60 mb-2.5">
            Core AI Capabilities
          </div>

          <div className="flex flex-wrap gap-2">
            {productCapabilities.map((cap, idx) => {
              const Icon = cap.icon;
              const isActive = idx === activeFeatureIndex;

              return (
                <button
                  key={cap.title}
                  onClick={() => setActiveFeatureIndex(idx)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-left transition-all duration-200 ${isActive
                    ? 'bg-[rgba(45,106,79,0.85)] border border-[rgba(82,183,136,0.6)] shadow-lg'
                    : 'bg-[rgba(14,28,19,0.65)] border border-white/10 hover:border-white/25 hover:bg-[rgba(14,28,19,0.8)]'
                    }`}
                  style={{ backdropFilter: 'blur(12px)' }}
                >
                  <Icon
                    size={13}
                    className={isActive ? 'text-[#A3E635]' : 'text-white/60'}
                  />
                  <span className={`text-xs font-semibold ${isActive ? 'text-white' : 'text-white/85'}`}>
                    {cap.title}
                  </span>
                  <span className="hidden xl:inline text-[11px] text-white/50 border-l border-white/20 pl-2">
                    {cap.desc}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* RIGHT SIDE: PREMIUM AUTHENTICATION SECTION (~38–40%)                      */}
      {/* ========================================================================= */}
      <div
        className="w-full lg:w-[480px] xl:w-[540px] lg:flex-shrink-0 min-h-fit lg:min-h-0 flex justify-center items-start lg:items-center overflow-visible lg:overflow-y-auto p-6 sm:p-10 lg:p-12 relative z-20"
        style={{
          background: 'linear-gradient(160deg, #F8F7F3 0%, #F1EFE8 100%)',
          borderLeft: '1px solid rgba(0, 0, 0, 0.08)',
          boxShadow: '-12px 0 40px rgba(0, 0, 0, 0.12)',
        }}
      >
        {/* Floating Authentication Card */}
        <div
          className="w-full max-w-[440px] my-auto bg-white rounded-3xl p-7 sm:p-9 border shadow-xl flex flex-col justify-between"
          style={{
            borderColor: 'rgba(0, 0, 0, 0.08)',
            boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)',
          }}
        >
          {/* Card Top: Portal Badge & Language Selector */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1A4731] bg-[#F0FAF3] px-3 py-1 rounded-full border border-[rgba(82,183,136,0.35)]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F]" />
              <span>Admin Portal</span>
            </div>

            {/* Language Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] border border-[var(--border-light)] transition-all"
              >
                <Globe size={13} className="text-[#2D6A4F]" />
                <span>{selectedLang}</span>
                <ChevronDown size={12} className="text-[var(--text-muted)]" />
              </button>

              {langMenuOpen && (
                <div
                  className="absolute right-0 top-9 w-44 rounded-xl py-1.5 shadow-xl border z-50 animate-slide-down bg-white"
                  style={{ borderColor: 'var(--border-light)' }}
                >
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setSelectedLang(lang.split(' ')[0]);
                        setLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-1.5 text-xs transition-colors ${selectedLang === lang.split(' ')[0]
                        ? 'bg-[#F0FAF3] text-[#1A4731] font-bold'
                        : 'text-[var(--text-secondary)] hover:bg-[var(--bg-surface)]'
                        }`}
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Card Heading */}
          <div className="mb-5">
            <h2
              className="text-2xl sm:text-[26px] font-extrabold text-[var(--text-primary)] tracking-tight"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              Welcome to Mitti Tech
            </h2>
            <p className="text-xs sm:text-[13px] text-[var(--text-muted)] mt-1.5 leading-relaxed">
              Sign in to access your farm intelligence platform.
            </p>
          </div>

          {/* ── DEMO CREDENTIAL DISPLAY BOX (Clean & Spacious) ── */}
          <div
            className="p-3.5 rounded-2xl border mb-5 transition-all"
            style={{
              background: '#F0FAF3',
              borderColor: 'rgba(82, 183, 136, 0.4)',
            }}
          >


            <div className="space-y-1.5">
              <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-white border border-[rgba(82,183,136,0.25)]">
                <span className="text-[11px] text-[var(--text-muted)] font-medium">Email:</span>
                <span className="font-mono text-xs font-bold text-[#1A4731]">admin@mittitech.com</span>
              </div>
              <div className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-white border border-[rgba(82,183,136,0.25)]">
                <span className="text-[11px] text-[var(--text-muted)] font-medium">Password:</span>
                <span className="font-mono text-xs font-bold text-[#1A4731]">admin123</span>
              </div>
            </div>
          </div>

          {/* Inline Error State */}
          {error && (
            <div
              className="p-3 rounded-xl border flex items-center gap-2 text-xs text-rose-700 bg-rose-50 mb-4 animate-shake"
              style={{ borderColor: 'rgba(239, 68, 68, 0.3)' }}
            >
              <AlertCircle size={15} className="flex-shrink-0 text-rose-600" />
              <span className="font-semibold">{error}</span>
            </div>
          )}

          {/* Forgot Password Notice */}
          {forgotNotice && (
            <div
              className="p-2.5 rounded-xl border flex items-center gap-2 text-xs text-amber-800 bg-amber-50 mb-4"
              style={{ borderColor: 'rgba(245, 158, 11, 0.3)' }}
            >
              <AlertCircle size={15} className="flex-shrink-0 text-amber-600" />
              <span>Password recovery is unavailable in demo mode.</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5"
              >
                Email
              </label>
              <div
                className="flex items-center gap-3 px-3.5 h-12 rounded-xl border transition-all duration-200 bg-[#FAFAFA] focus-within:bg-white focus-within:border-[#2D6A4F] focus-within:ring-2 focus-within:ring-[#2D6A4F]/20"
                style={{
                  borderColor: 'var(--border-default)',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <Mail size={16} className="text-[var(--text-faint)] flex-shrink-0" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mittitech.com"
                  required
                  className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-faint)]"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5"
              >
                Password
              </label>
              <div
                className="flex items-center gap-3 px-3.5 h-12 rounded-xl border transition-all duration-200 bg-[#FAFAFA] focus-within:bg-white focus-within:border-[#2D6A4F] focus-within:ring-2 focus-within:ring-[#2D6A4F]/20"
                style={{
                  borderColor: 'var(--border-default)',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <Lock size={16} className="text-[var(--text-faint)] flex-shrink-0" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-transparent border-none outline-none text-xs sm:text-sm text-[var(--text-primary)] placeholder-[var(--text-faint)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[var(--text-muted)] hover:text-[var(--text-primary)] focus:outline-none p-1"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Login Options: Keep me signed in & Forgot Password */}
            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none text-[var(--text-secondary)] font-medium">
                <input
                  type="checkbox"
                  checked={keepSignedIn}
                  onChange={(e) => setKeepSignedIn(e.target.checked)}
                  className="rounded border-[var(--border-default)] text-[#2D6A4F] focus:ring-[#2D6A4F] w-4 h-4 cursor-pointer"
                />
                <span>Keep me signed in</span>
              </label>

              <button
                type="button"
                onClick={() => setForgotNotice(true)}
                className="text-xs font-semibold text-[#2D6A4F] hover:underline"
              >
                Forgot password?
              </button>
            </div>

            {/* Primary Submit Button */}
            <button
              type="submit"
              disabled={isLoading || isSuccess}
              className="w-full h-12 px-4 rounded-xl text-xs sm:text-sm font-bold text-white transition-all duration-200 flex items-center justify-center gap-2 shadow-sm hover:shadow-md hover:scale-[1.01] active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed mt-2 cursor-pointer"
              style={{
                background: isSuccess
                  ? '#166534'
                  : 'linear-gradient(135deg, #1A4731 0%, #2D6A4F 100%)',
              }}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : isSuccess ? (
                <>
                  <CheckCircle2 size={16} />
                  <span>Authenticated — Redirecting...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={15} />
                </>
              )}
            </button>
          </form>

          {/* ── SECURITY / TRUST AREA (CARD FOOTER) ── */}
          <div className="pt-6 mt-6 border-t border-[var(--border-faint)]">
            <div className="grid grid-cols-3 gap-2 text-center text-[10.5px] text-[var(--text-muted)] font-medium">
              <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[var(--bg-surface)]">
                <ShieldCheck size={14} className="text-[#2D6A4F]" />
                <span>Secure Access</span>
              </div>

              <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[var(--bg-surface)]">
                <Lock size={14} className="text-[#2D6A4F]" />
                <span>Data Protected</span>
              </div>

              <div className="flex flex-col items-center gap-1 p-2 rounded-xl bg-[var(--bg-surface)]">
                <Building2 size={14} className="text-[#2D6A4F]" />
                <span>Enterprise Ready</span>
              </div>
            </div>

            <p className="text-[10px] text-center text-[var(--text-faint)] mt-3.5">
              © 2026 The Mitti Tech. AI-Powered Precision Agriculture.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
