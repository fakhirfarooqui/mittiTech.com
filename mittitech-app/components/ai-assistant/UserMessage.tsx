'use client';

import React, { useState } from 'react';
import { Copy, Edit3, RotateCcw, Check, User } from 'lucide-react';

interface UserMessageProps {
  content: string;
  time?: string;
  onEdit?: (text: string) => void;
  onRegenerate?: () => void;
}

export default function UserMessage({
  content,
  time = '10:42 AM',
  onEdit,
  onRegenerate,
}: UserMessageProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-end gap-1.5 animate-fade-in group">
      {/* Sender & Timestamp */}
      <div className="flex items-center gap-1.5 text-[11px] text-[var(--text-muted)] pr-1">
        <span className="font-semibold text-[var(--text-secondary)]">You</span>
        <span>•</span>
        <span>{time}</span>
      </div>

      {/* Forest Green Bubble */}
      <div
        className="px-4 py-3 rounded-2xl max-w-lg select-text text-white shadow-sm"
        style={{
          background: 'linear-gradient(135deg, #1A4731 0%, #215C3E 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '18px 18px 4px 18px',
        }}
      >
        <p className="text-[13.5px] leading-relaxed font-normal">{content}</p>
      </div>

      {/* Subtle Utility Actions (Regenerate, Edit, Copy) */}
      <div className="flex items-center gap-2 pr-1 opacity-70 group-hover:opacity-100 transition-opacity duration-150">
        <button
          onClick={onRegenerate}
          className="flex items-center gap-1 text-[10.5px] text-[var(--text-muted)] hover:text-[#1A4731] transition-colors"
          title="Regenerate response"
        >
          <RotateCcw size={11} />
          <span>Regenerate</span>
        </button>

        <span className="text-[var(--border-strong)] text-[10px]">•</span>

        <button
          onClick={() => onEdit && onEdit(content)}
          className="flex items-center gap-1 text-[10.5px] text-[var(--text-muted)] hover:text-[#1A4731] transition-colors"
          title="Edit message"
        >
          <Edit3 size={11} />
          <span>Edit</span>
        </button>

        <span className="text-[var(--border-strong)] text-[10px]">•</span>

        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-[10.5px] text-[var(--text-muted)] hover:text-[#1A4731] transition-colors"
          title="Copy message"
        >
          {copied ? (
            <>
              <Check size={11} className="text-[#2D6A4F]" />
              <span className="text-[#2D6A4F] font-medium">Copied</span>
            </>
          ) : (
            <>
              <Copy size={11} />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
