'use client';

import React from 'react';
import { Droplets, Activity, Sprout, BarChart3, ArrowRight } from 'lucide-react';

interface QuickActionsProps {
  onSelectAction: (actionText: string) => void;
  disabled?: boolean;
}

const ACTIONS = [
  {
    label: 'Start irrigation in East Field for 30 minutes',
    icon: Droplets,
    highlight: true,
    tag: 'Recommended Operation',
  },
  {
    label: 'Which field needs irrigation?',
    icon: Activity,
    highlight: false,
    tag: 'Diagnostics',
  },
  {
    label: 'Analyse my fields',
    icon: BarChart3,
    highlight: false,
    tag: 'Field Overview',
  },
  {
    label: 'Check crop health',
    icon: Sprout,
    highlight: false,
    tag: 'NDVI & Stress',
  },
  {
    label: 'Show soil conditions',
    icon: Activity,
    highlight: false,
    tag: 'NPK & pH',
  },
];

export default function QuickActions({
  onSelectAction,
  disabled = false,
}: QuickActionsProps) {
  return (
    <div className="mitti-ai-quick-actions space-y-2 select-none">
      <div className="text-[11px] font-semibold uppercase tracking-wider text-[var(--text-faint)] px-1">
        Suggested Operations & Queries
      </div>

      <div className="mitti-ai-quick-grid flex flex-wrap gap-2">
        {ACTIONS.map((action, idx) => {
          const Icon = action.icon;
          return (
            <button
              key={idx}
              onClick={() => onSelectAction(action.label)}
              disabled={disabled}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium text-left transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-[1.01] ${
                action.highlight
                  ? 'text-[#1A4731] bg-[#F0FAF3] border border-[rgba(45,106,79,0.35)] shadow-xs hover:border-[#2D6A4F]'
                  : 'text-[var(--text-secondary)] bg-[var(--bg-card)] border border-[var(--border-light)] hover:border-[var(--brand-400)] hover:bg-[var(--bg-surface)]'
              }`}
            >
              <Icon
                size={13}
                className={action.highlight ? 'text-[#2D6A4F]' : 'text-[var(--text-muted)]'}
              />
              <span>{action.label}</span>
              {action.highlight && (
                <span className="text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#2D6A4F] text-white ml-1">
                  Actionable
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
