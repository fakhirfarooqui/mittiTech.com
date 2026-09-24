'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Sparkles } from 'lucide-react';

interface AIComposerProps {
  onSend: (message: string) => void;
  disabled?: boolean;
  initialValue?: string;
  onClearInitialValue?: () => void;
}

export default function AIComposer({
  onSend,
  disabled = false,
  initialValue = '',
  onClearInitialValue,
}: AIComposerProps) {
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (initialValue) {
      // The composer intentionally mirrors a quick-action selection into its editable draft.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setInput(initialValue);
      if (onClearInitialValue) onClearInitialValue();
      if (textareaRef.current) {
        textareaRef.current.focus();
      }
    }
  }, [initialValue, onClearInitialValue]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleMic = () => {
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      // Simulate speech-to-text input after 1.8s
      setTimeout(() => {
        setInput('Start irrigation in East Field for 30 minutes');
        setIsListening(false);
      }, 1600);
    }
  };

  return (
    <div
      className="mitti-ai-composer p-4 sm:p-5 border-t sticky bottom-0 select-none z-10"
      style={{
        background: 'var(--bg-card)',
        borderColor: 'var(--border-light)',
      }}
    >
      <div className="mitti-ai-composer-inner max-w-4xl mx-auto">
        {/* Large Rounded Composer Container */}
        <div
          className="flex items-center gap-3 px-4 py-2.5 rounded-2xl transition-all duration-200"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-default)',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          {/* Subtle AI Icon indicator */}
          <div className="flex-shrink-0 text-[#2D6A4F]">
            <Sparkles size={17} className="opacity-75" />
          </div>

          {/* Text Area */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={
              isListening
                ? 'Listening to farm voice instruction...'
                : 'Ask AI anything about your farm...'
            }
            className="flex-1 bg-transparent border-none outline-none text-sm resize-none leading-relaxed"
            style={{
              color: 'var(--text-primary)',
              fontFamily: 'Inter, sans-serif',
              maxHeight: 120,
            }}
            onInput={(e) => {
              const target = e.currentTarget;
              target.style.height = 'auto';
              target.style.height = `${Math.min(target.scrollHeight, 120)}px`;
            }}
          />

          {/* Microphone Button */}
          <button
            type="button"
            onClick={toggleMic}
            disabled={disabled}
            className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
              isListening
                ? 'bg-rose-100 text-rose-600 animate-pulse border border-rose-300'
                : 'text-[var(--text-muted)] hover:text-[#2D6A4F] hover:bg-white/80'
            }`}
            title={isListening ? 'Stop listening' : 'Use voice instruction'}
          >
            {isListening ? <MicOff size={16} /> : <Mic size={16} />}
          </button>

          {/* Send Button */}
          <button
            type="button"
            onClick={handleSend}
            disabled={!input.trim() || disabled}
            className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed hover:scale-[1.03]"
            style={{
              background:
                input.trim() && !disabled
                  ? 'linear-gradient(135deg, #1A4731 0%, #2D6A4F 100%)'
                  : 'var(--border-strong)',
              color: '#FFFFFF',
              boxShadow: input.trim() && !disabled ? '0 2px 8px rgba(26, 71, 49, 0.25)' : 'none',
            }}
            title="Send instruction to Mitti AI"
          >
            <Send size={15} />
          </button>
        </div>

        {/* Small Reassuring Operational Note (NO image icons, NO paperclip) */}
        <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] mt-2 px-2">
          <span>✦ Direct telemetry from Field Sensors & IoT Irrigation Controllers</span>
          <span className="hidden sm:inline font-mono text-[10px] text-[var(--text-faint)]">
            Press Enter ↵ to send
          </span>
        </div>
      </div>
    </div>
  );
}
