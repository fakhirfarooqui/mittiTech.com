'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  Droplets,
  Clock,
  Target,
  Play,
  CheckCircle2,
  Copy,
  Check,
  Radio,
  ArrowRight,
  TrendingDown,
  Info,
} from 'lucide-react';

export interface StructuredMetrics {
  currentMoisture: string;
  duration: string;
  targetMoisture: string;
  field?: string;
}

export interface AIMessageData {
  id: string;
  type: 'irrigation_proposal' | 'irrigation_started' | 'general' | 'analysis';
  content?: string;
  heading?: string;
  metrics?: StructuredMetrics;
  confirmationPrompt?: string;
  hasActionCTA?: boolean;
  actionCTALabel?: string;
  isActionExecuted?: boolean;
  time?: string;
  quickReplies?: string[];
}

interface AIMessageProps {
  message: AIMessageData;
  onActionClick?: (messageId: string) => void;
  onQuickReply?: (reply: string) => void;
}

export default function AIMessage({
  message,
  onActionClick,
  onQuickReply,
}: AIMessageProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const textToCopy = [
      message.heading || '',
      message.content || '',
      message.metrics
        ? `Current moisture: ${message.metrics.currentMoisture}, Duration: ${message.metrics.duration}, Target: ${message.metrics.targetMoisture}`
        : '',
    ]
      .filter(Boolean)
      .join('\n\n');

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-start gap-3 animate-fade-in group">
      {/* AI Avatar */}
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm"
        style={{
          background: 'linear-gradient(135deg, #1A4731 0%, #2D6A4F 100%)',
          border: '1px solid rgba(82, 183, 136, 0.3)',
        }}
      >
        <Sparkles size={16} className="text-[#A3E635]" />
      </div>

      {/* Main Message Body */}
      <div className="ai-message-body flex-1 max-w-xl">
        {/* Name, Role & Timestamp */}
        <div className="flex items-center gap-2 mb-1.5 text-[11px] text-[var(--text-muted)]">
          <span className="font-bold text-[#1A4731]">Mitti AI</span>
          <span
            className="text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded tracking-wider"
            style={{
              background: 'var(--brand-10)',
              color: 'var(--brand-700)',
              border: '1px solid var(--border-brand)',
            }}
          >
            Copilot
          </span>
          <span>•</span>
          <span>{message.time || '10:42 AM'}</span>
        </div>

        {/* Message Container Card */}
        <div
          className="p-4 rounded-2xl select-text transition-all"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-light)',
            boxShadow: 'var(--shadow-xs)',
            borderRadius: '4px 18px 18px 18px',
          }}
        >
          {/* Header if present (e.g. Irrigation has started ▶) */}
          {message.heading && (
            <div className="flex items-center gap-2 mb-2.5">
              <span className="text-[15px] font-bold text-[#1A4731]">
                {message.heading}
              </span>
              {message.type === 'irrigation_started' && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#52B788] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2D6A4F]" />
                </span>
              )}
            </div>
          )}

          {/* Primary Text Content */}
          {message.content && (
            <p className="text-[13.5px] leading-relaxed text-[var(--text-secondary)] whitespace-pre-line">
              {message.content}
            </p>
          )}

          {/* Structured Information Grid (for Irrigation Proposal) */}
          {message.metrics && (
            <div
              className="mt-3.5 p-3 rounded-xl border space-y-2"
              style={{
                background: 'var(--bg-surface)',
                borderColor: 'var(--border-light)',
              }}
            >
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)] flex items-center justify-between">
                <span>Operation Parameters</span>
                <span className="text-[#2D6A4F] font-mono text-[10px]">Field: East Field (Soybean)</span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1">
                {/* Metric 1: Current Soil Moisture */}
                <div className="p-2 rounded-lg bg-white border border-[var(--border-faint)]">
                  <div className="text-[10.5px] text-[var(--text-muted)] flex items-center gap-1">
                    <Droplets size={11} className="text-[#2563EB]" />
                    <span>Current</span>
                  </div>
                  <div className="text-[14px] font-bold text-rose-600 mt-0.5">
                    {message.metrics.currentMoisture}
                  </div>
                  <div className="text-[9.5px] text-[var(--text-faint)]">Below optimal</div>
                </div>

                {/* Metric 2: Duration */}
                <div className="p-2 rounded-lg bg-white border border-[var(--border-faint)]">
                  <div className="text-[10.5px] text-[var(--text-muted)] flex items-center gap-1">
                    <Clock size={11} className="text-[#2D6A4F]" />
                    <span>Duration</span>
                  </div>
                  <div className="text-[14px] font-bold text-[var(--text-primary)] mt-0.5">
                    {message.metrics.duration}
                  </div>
                  <div className="text-[9.5px] text-[var(--text-faint)]">Automatic stop</div>
                </div>

                {/* Metric 3: Target Moisture */}
                <div className="p-2 rounded-lg bg-white border border-[var(--border-faint)]">
                  <div className="text-[10.5px] text-[var(--text-muted)] flex items-center gap-1">
                    <Target size={11} className="text-[#059669]" />
                    <span>Target</span>
                  </div>
                  <div className="text-[14px] font-bold text-[#059669] mt-0.5">
                    {message.metrics.targetMoisture}
                  </div>
                  <div className="text-[9.5px] text-[var(--text-faint)]">Sensor feedback</div>
                </div>
              </div>
            </div>
          )}

          {/* Confirmation Prompt & Action Button */}
          {message.hasActionCTA && (
            <div className="mt-4 pt-3 border-t border-[var(--border-faint)] flex items-center justify-between gap-3">
              <span className="text-[13px] font-semibold text-[var(--text-primary)]">
                {message.confirmationPrompt || 'Start irrigation?'}
              </span>

              {message.isActionExecuted ? (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-[#1B4332] bg-[#D8F3DC] border border-[rgba(82,183,136,0.4)]">
                  <CheckCircle2 size={13} className="text-[#2D6A4F]" />
                  <span>Irrigation Started</span>
                </div>
              ) : (
                <button
                  onClick={() => onActionClick && onActionClick(message.id)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-white transition-all duration-200 hover:scale-[1.02] shadow-xs active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #1A4731 0%, #2D6A4F 100%)',
                  }}
                >
                  <Play size={12} fill="currentColor" />
                  <span>{message.actionCTALabel || 'Start irrigation'}</span>
                </button>
              )}
            </div>
          )}
        </div>

        {/* Action utility row */}
        <div className="flex items-center gap-3 mt-1.5 pl-1">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-[10.5px] text-[var(--text-muted)] hover:text-[#1A4731] transition-colors"
          >
            {copied ? (
              <>
                <Check size={11} className="text-[#2D6A4F]" />
                <span className="text-[#2D6A4F]">Copied response</span>
              </>
            ) : (
              <>
                <Copy size={11} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        {/* Optional Quick Reply Chips for follow up */}
        {message.quickReplies && message.quickReplies.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2.5">
            {message.quickReplies.map((reply, idx) => (
              <button
                key={idx}
                onClick={() => onQuickReply && onQuickReply(reply)}
                className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium text-[var(--text-secondary)] hover:text-[#1A4731] hover:border-[var(--brand-400)] transition-all"
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border-light)',
                  boxShadow: 'var(--shadow-xs)',
                }}
              >
                <span>{reply}</span>
                <ArrowRight size={10} className="text-[var(--text-faint)]" />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
