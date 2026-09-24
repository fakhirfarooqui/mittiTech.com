'use client';

import React from 'react';
import {
  Pause,
  Play,
  Square,
  Droplets,
  Clock,
  Calendar,
  X,
  Radio,
  Sliders,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

interface CurrentTaskPanelProps {
  isOpen: boolean;
  onClose: () => void;
  status: 'running' | 'paused' | 'stopped';
  onPauseToggle: () => void;
  onStop: () => void;
  progressPercent?: number;
  remainingMinutes?: number;
}

export default function CurrentTaskPanel({
  isOpen,
  onClose,
  status,
  onPauseToggle,
  onStop,
  progressPercent = 1,
  remainingMinutes = 30,
}: CurrentTaskPanelProps) {
  if (!isOpen) return null;

  const isRunning = status === 'running';
  const isPaused = status === 'paused';
  const isStopped = status === 'stopped';

  return (
    <aside
      className="mitti-ai-task-panel flex flex-col flex-shrink-0 w-80 lg:w-[330px] border-l select-none animate-slide-right transition-all duration-300 z-10"
      style={{
        background: 'var(--bg-card)',
        borderColor: 'var(--border-light)',
        boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.03)',
      }}
    >
      {/* Panel Header */}
      <div
        className="flex items-center justify-between px-5 py-4 border-b"
        style={{ borderColor: 'var(--border-faint)' }}
      >
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{
              background: isRunning ? '#52B788' : isPaused ? '#F59E0B' : '#9CA3AF',
            }}
          />
          <h2
            className="text-[14px] font-bold tracking-tight"
            style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}
          >
            Current Task
          </h2>
        </div>

        <button
          onClick={onClose}
          className="p-1 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-all"
          title="Collapse panel"
        >
          <X size={15} />
        </button>
      </div>

      {/* Panel Content (Scrollable) */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {/* Field & Crop Overview Card */}
        <div
          className="p-4 rounded-2xl relative overflow-hidden"
          style={{
            background: 'linear-gradient(145deg, #F8FAF8 0%, #F1F6F2 100%)',
            border: '1px solid rgba(45, 106, 79, 0.12)',
          }}
        >
          <div className="flex items-start justify-between">
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                Active Zone
              </div>
              <div className="text-[17px] font-bold text-[#14372A] mt-0.5">
                East Field
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[#2D6A4F] mt-1 font-medium">
                <span>🌱 Soybean</span>
                <span>•</span>
                <span>Sector E-2</span>
              </div>
            </div>

            {/* Status Badge */}
            <div
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
              style={{
                background: isRunning
                  ? '#D8F3DC'
                  : isPaused
                  ? '#FEF3C7'
                  : '#F3F4F6',
                color: isRunning
                  ? '#1B4332'
                  : isPaused
                  ? '#92400E'
                  : '#4B5563',
                border: isRunning
                  ? '1px solid rgba(82, 183, 136, 0.4)'
                  : isPaused
                  ? '1px solid rgba(245, 158, 11, 0.4)'
                  : '1px solid var(--border-light)',
              }}
            >
              <span className="relative flex h-2 w-2">
                {isRunning && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#52B788] opacity-75" />
                )}
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{
                    background: isRunning ? '#2D6A4F' : isPaused ? '#D97706' : '#6B7280',
                  }}
                />
              </span>
              <span>{isRunning ? 'Running' : isPaused ? 'Paused' : 'Stopped'}</span>
            </div>
          </div>

          {/* Progress Section */}
          <div className="mt-4 pt-3 border-t border-[rgba(45,106,79,0.08)]">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-[var(--text-muted)] font-medium">Progress</span>
              <span className="font-bold text-[#1A4731]">
                {isStopped ? 'Halted' : `${progressPercent}%`}
              </span>
            </div>
            <div className="w-full h-2 rounded-full overflow-hidden bg-white/80 border border-[rgba(45,106,79,0.12)]">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out"
                style={{
                  width: `${Math.max(progressPercent, 1)}%`,
                  background: isStopped
                    ? '#9CA3AF'
                    : isPaused
                    ? '#F59E0B'
                    : 'linear-gradient(90deg, #52B788 0%, #2D6A4F 100%)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Task Metrics (Clean two-column layout) */}
        <div>
          <div className="text-[11px] font-bold uppercase tracking-wider text-[var(--text-faint)] mb-2.5">
            Operational Telemetry
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {/* Metric 1: Current Moisture */}
            <div
              className="p-3.5 rounded-xl border"
              style={{
                background: 'var(--bg-card-alt)',
                borderColor: 'var(--border-light)',
              }}
            >
              <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
                <Droplets size={12} className="text-[#2563EB]" />
                <span>Current Moisture</span>
              </div>
              <div className="text-[20px] font-bold text-[var(--text-primary)] mt-1 flex items-baseline gap-1">
                23%
                <span className="text-[10px] font-normal text-rose-600 bg-rose-50 px-1 py-0.5 rounded border border-rose-100">
                  -15% target
                </span>
              </div>
            </div>

            {/* Metric 2: Remaining */}
            <div
              className="p-3.5 rounded-xl border"
              style={{
                background: 'var(--bg-card-alt)',
                borderColor: 'var(--border-light)',
              }}
            >
              <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
                <Clock size={12} className="text-[#2D6A4F]" />
                <span>Remaining</span>
              </div>
              <div className="text-[20px] font-bold text-[var(--text-primary)] mt-1">
                {isStopped ? '0 min' : `${remainingMinutes} min`}
              </div>
            </div>

            {/* Metric 3: Start */}
            <div
              className="p-3.5 rounded-xl border"
              style={{
                background: 'var(--bg-card-alt)',
                borderColor: 'var(--border-light)',
              }}
            >
              <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
                <Calendar size={12} className="text-[var(--text-faint)]" />
                <span>Start</span>
              </div>
              <div className="text-[15px] font-semibold text-[var(--text-primary)] mt-1">
                10:42 AM
              </div>
            </div>

            {/* Metric 4: Finish */}
            <div
              className="p-3.5 rounded-xl border"
              style={{
                background: 'var(--bg-card-alt)',
                borderColor: 'var(--border-light)',
              }}
            >
              <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)]">
                <Clock size={12} className="text-[var(--text-faint)]" />
                <span>Finish</span>
              </div>
              <div className="text-[15px] font-semibold text-[var(--text-primary)] mt-1">
                11:12 AM
              </div>
            </div>
          </div>
        </div>

        {/* Moisture Goal Comparison Bar */}
        <div
          className="p-3.5 rounded-xl border"
          style={{
            background: 'var(--bg-surface)',
            borderColor: 'var(--border-light)',
          }}
        >
          <div className="flex items-center justify-between text-xs">
            <span className="text-[var(--text-muted)]">Moisture Objective</span>
            <span className="font-semibold text-[#1B4332]">23% ➔ 38%</span>
          </div>

          <div className="mt-2 flex items-center gap-1">
            <div className="h-1.5 flex-1 rounded-l bg-amber-400" title="Current: 23%" />
            <div className="h-1.5 flex-1 bg-emerald-300" title="Target zone" />
            <div className="h-1.5 flex-1 rounded-r bg-[#2D6A4F]" title="Optimal capacity" />
          </div>

          <div className="flex justify-between text-[10px] text-[var(--text-faint)] mt-1 font-mono">
            <span>Critical (20%)</span>
            <span>Target (38%)</span>
            <span>Field Cap (45%)</span>
          </div>
        </div>

        {/* Hardware Status Note */}
        <div
          className="px-3.5 py-3 rounded-xl flex items-center justify-between text-xs"
          style={{
            background: '#F0FAF3',
            border: '1px solid rgba(82, 183, 136, 0.25)',
          }}
        >
          <div className="flex items-center gap-2">
            <Radio size={14} className="text-[#2D6A4F] animate-pulse" />
            <span className="text-[#14372A] font-medium text-[11.5px]">
              Valve #EV-02 Active
            </span>
          </div>
          <span className="text-[10px] font-mono text-[#2D6A4F]">42 L/min</span>
        </div>
      </div>

      {/* Task Controls (Sticky Bottom) */}
      <div
        className="p-5 border-t space-y-2.5 flex-shrink-0"
        style={{
          background: 'var(--bg-card)',
          borderColor: 'var(--border-light)',
        }}
      >
        {/* Primary Action: Pause / Resume Button */}
        <button
          onClick={onPauseToggle}
          disabled={isStopped}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white flex items-center justify-center gap-2 transition-all duration-200 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
          style={{
            background: isPaused
              ? 'linear-gradient(135deg, #2D6A4F 0%, #1A4731 100%)'
              : '#2D6A4F',
          }}
        >
          {isPaused ? (
            <>
              <Play size={14} fill="currentColor" />
              <span>Resume</span>
            </>
          ) : (
            <>
              <Pause size={14} fill="currentColor" />
              <span>Pause</span>
            </>
          )}
        </button>

        {/* Secondary Action: Stop Irrigation */}
        <button
          onClick={onStop}
          disabled={isStopped}
          className="w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-all duration-200 border disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5"
          style={{
            background: isStopped ? 'transparent' : 'rgba(254, 242, 242, 0.6)',
            borderColor: isStopped ? 'var(--border-light)' : 'rgba(239, 68, 68, 0.25)',
            color: isStopped ? 'var(--text-muted)' : '#B91C1C',
          }}
        >
          <Square size={13} fill={isStopped ? 'none' : 'currentColor'} />
          <span>{isStopped ? 'Irrigation Stopped' : 'Stop Irrigation'}</span>
        </button>
      </div>
    </aside>
  );
}
