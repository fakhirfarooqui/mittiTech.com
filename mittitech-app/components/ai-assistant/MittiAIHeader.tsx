'use client';

import React from 'react';
import {
  RotateCcw,
  Sliders,
  ChevronRight,
  Radio,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';

export type JourneyStage =
  | 'ASK'
  | 'UNDERSTAND'
  | 'ANALYSE'
  | 'RECOMMEND'
  | 'CONFIRM'
  | 'EXECUTE'
  | 'MONITOR';

interface MittiAIHeaderProps {
  title: string;
  timestamp?: string;
  farmContext?: string;
  currentStage: JourneyStage;
  isTaskOpen: boolean;
  hasActiveTask: boolean;
  taskStatus: 'idle' | 'running' | 'paused' | 'stopped';
  onToggleTask: () => void;
  onReset: () => void;
}

const STAGES: JourneyStage[] = [
  'ASK',
  'UNDERSTAND',
  'ANALYSE',
  'RECOMMEND',
  'CONFIRM',
  'EXECUTE',
  'MONITOR',
];

export default function MittiAIHeader({
  title,
  timestamp = 'Today 10:42 AM',
  farmContext = 'Green Valley Farm · East Field (Soybean)',
  currentStage,
  isTaskOpen,
  hasActiveTask,
  taskStatus,
  onToggleTask,
  onReset,
}: MittiAIHeaderProps) {
  const currentStageIndex = STAGES.indexOf(currentStage);

  return (
    <header
      className="mitti-ai-header flex flex-col border-b select-none flex-shrink-0"
      style={{
        background: 'var(--bg-card)',
        borderColor: 'var(--border-light)',
        boxShadow: 'var(--shadow-xs)',
      }}
    >
      {/* Main Top Bar */}
      <div className="mitti-ai-header-main flex items-center justify-between px-6 py-3.5 gap-4 min-h-[58px]">
        {/* Left: Title & Metadata */}
        <div className="flex items-center gap-3 min-w-0">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: 'linear-gradient(135deg, #1A4731 0%, #2D6A4F 100%)',
              boxShadow: '0 2px 8px rgba(26, 71, 49, 0.25)',
            }}
          >
            <Sparkles size={16} className="text-[#A3E635]" />
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1
                className="font-bold tracking-tight text-[15px] truncate"
                style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif' }}
              >
                {title}
              </h1>
              <span
                className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full"
                style={{
                  background: 'var(--brand-10)',
                  color: 'var(--brand-700)',
                  border: '1px solid var(--border-brand)',
                }}
              >
                <Radio size={10} className="animate-pulse text-[#2D6A4F]" />
                Live Telemetry
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs text-[var(--text-muted)] mt-0.5">
              <span>{farmContext}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock size={11} className="text-[var(--text-faint)]" />
                {timestamp}
              </span>
            </div>
          </div>
        </div>

        {/* Right: Controls & Task Button */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {hasActiveTask && (
            <button
              onClick={onToggleTask}
              className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 hover:scale-[1.02]"
              style={{
                background:
                  taskStatus === 'running'
                    ? 'linear-gradient(135deg, #F0FAF3 0%, #E8F5E9 100%)'
                    : taskStatus === 'paused'
                    ? '#FFFBEB'
                    : '#F9FAFB',
                border:
                  taskStatus === 'running'
                    ? '1px solid rgba(45, 106, 79, 0.3)'
                    : taskStatus === 'paused'
                    ? '1px solid rgba(217, 119, 6, 0.3)'
                    : '1px solid var(--border-light)',
                color:
                  taskStatus === 'running'
                    ? '#1A4731'
                    : taskStatus === 'paused'
                    ? '#B45309'
                    : '#4B5563',
                boxShadow: isTaskOpen ? '0 0 0 2px rgba(45, 106, 79, 0.2)' : 'none',
              }}
              title="Toggle Current Task Panel"
            >
              <span className="relative flex h-2 w-2">
                {taskStatus === 'running' && (
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#52B788] opacity-75" />
                )}
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{
                    background:
                      taskStatus === 'running'
                        ? '#2D6A4F'
                        : taskStatus === 'paused'
                        ? '#D97706'
                        : '#9CA3AF',
                  }}
                />
              </span>
              <span>Current Task: {taskStatus === 'running' ? 'Running' : taskStatus === 'paused' ? 'Paused' : 'Stopped'}</span>
              <span className="text-[10px] opacity-70">
                {isTaskOpen ? 'Hide' : 'View'}
              </span>
            </button>
          )}

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-surface)] transition-all border border-[var(--border-light)]"
            title="Reset interactive prototype to initial state"
          >
            <RotateCcw size={12} className="text-[var(--text-muted)]" />
            <span className="hidden sm:inline">Reset Flow</span>
          </button>
        </div>
      </div>

      {/* Operational Journey Sub-Bar: ASK -> UNDERSTAND -> ANALYSE -> RECOMMEND -> CONFIRM -> EXECUTE -> MONITOR */}
      <div
        className="mitti-ai-pipeline hidden md:flex items-center justify-between px-6 py-2 overflow-x-auto text-[11px]"
        style={{
          background: 'var(--bg-surface)',
          borderTop: '1px solid var(--border-faint)',
        }}
      >
        <div className="flex items-center gap-1 text-[var(--text-faint)] font-medium">
          <span className="text-[var(--text-secondary)] font-semibold uppercase text-[10px] tracking-wider mr-2">
            AI Operations Pipeline:
          </span>
          {STAGES.map((stage, idx) => {
            const isPassed = idx < currentStageIndex;
            const isCurrent = idx === currentStageIndex;

            return (
              <React.Fragment key={stage}>
                <div
                  className={`flex items-center gap-1 px-2 py-0.5 rounded-md transition-all ${
                    isCurrent
                      ? 'bg-white text-[#1A4731] font-bold shadow-xs border border-[rgba(45,106,79,0.25)]'
                      : isPassed
                      ? 'text-[#2D6A4F] font-medium'
                      : 'text-[var(--text-faint)]'
                  }`}
                >
                  {isPassed ? (
                    <CheckCircle2 size={11} className="text-[#52B788]" />
                  ) : isCurrent ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] animate-pulse" />
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--border-strong)] opacity-40" />
                  )}
                  <span>{stage}</span>
                </div>
                {idx < STAGES.length - 1 && (
                  <ChevronRight size={11} className="text-[var(--border-strong)] opacity-40 mx-0.5" />
                )}
              </React.Fragment>
            );
          })}
        </div>

        <div className="text-[10px] text-[var(--text-muted)] font-mono flex items-center gap-1.5">
          <span>East Field Node #EF-04</span>
          <span className="text-[#52B788]">● 100% Signal</span>
        </div>
      </div>
    </header>
  );
}
