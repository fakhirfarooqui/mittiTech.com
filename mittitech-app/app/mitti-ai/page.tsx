'use client';

import React, { useState, useRef, useEffect } from 'react';
import MittiAIHeader, { JourneyStage } from '@/components/ai-assistant/MittiAIHeader';
import CurrentTaskPanel from '@/components/ai-assistant/CurrentTaskPanel';
import AIComposer from '@/components/ai-assistant/AIComposer';
import QuickActions from '@/components/ai-assistant/QuickActions';
import UserMessage from '@/components/ai-assistant/UserMessage';
import AIMessage, { AIMessageData } from '@/components/ai-assistant/AIMessage';
import {
  Sparkles,
  Droplets,
  Radio,
  Activity,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Info,
} from 'lucide-react';

interface ChatItem {
  id: string;
  sender: 'user' | 'ai';
  content?: string;
  aiData?: AIMessageData;
  time: string;
}

export default function MittiAIPage() {
  // Operational Task State
  const [taskStatus, setTaskStatus] = useState<'idle' | 'running' | 'paused' | 'stopped'>('idle');
  const [isTaskOpen, setIsTaskOpen] = useState(false);
  const [progressPercent, setProgressPercent] = useState(1);
  const [remainingMinutes, setRemainingMinutes] = useState(30);

  // Operational Pipeline Stage: ASK -> UNDERSTAND -> ANALYSE -> RECOMMEND -> CONFIRM -> EXECUTE -> MONITOR
  const [currentStage, setCurrentStage] = useState<JourneyStage>('ASK');

  // Messages State
  const [messages, setMessages] = useState<ChatItem[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [composerInitialValue, setComposerInitialValue] = useState('');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom smoothly when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Subtle live progress increment when running
  useEffect(() => {
    if (taskStatus !== 'running') return;

    const interval = setInterval(() => {
      setProgressPercent((prev) => {
        if (prev >= 99) return 99;
        return prev + 1;
      });
    }, 12000); // realistic gentle increment

    return () => clearInterval(interval);
  }, [taskStatus]);

  // Handlers for Task Controls
  const handlePauseToggle = () => {
    if (taskStatus === 'running') {
      setTaskStatus('paused');
    } else if (taskStatus === 'paused') {
      setTaskStatus('running');
    }
  };

  const handleStopIrrigation = () => {
    setTaskStatus('stopped');
  };

  // Reset demo flow to initial state
  const handleResetFlow = () => {
    setMessages([]);
    setTaskStatus('idle');
    setIsTaskOpen(false);
    setProgressPercent(1);
    setRemainingMinutes(30);
    setCurrentStage('ASK');
    setComposerInitialValue('');
  };

  // Core execution: When user clicks "Start irrigation" CTA in AI proposal message
  const handleExecuteIrrigation = (proposalMessageId: string) => {
    // 1. Mark proposal message action as executed
    setMessages((prev) =>
      prev.map((msg) => {
        if (msg.id === proposalMessageId && msg.aiData) {
          return {
            ...msg,
            aiData: {
              ...msg.aiData,
              isActionExecuted: true,
            },
          };
        }
        return msg;
      })
    );

    setCurrentStage('EXECUTE');
    setIsTyping(true);

    // 2. Append the "Irrigation has started ▶" AI confirmation response
    setTimeout(() => {
      const nowTime = '10:42 AM';

      const startedMessage: ChatItem = {
        id: `ai-started-${Date.now()}`,
        sender: 'ai',
        time: nowTime,
        aiData: {
          id: `started-${Date.now()}`,
          type: 'irrigation_started',
          heading: 'Irrigation has started ▶',
          content:
            "East Field is currently below the optimal soil moisture level (23%).\n\nI'll monitor the sensors and stop irrigation automatically after 30 minutes.",
          time: nowTime,
          quickReplies: [
            'Monitor soil sensor telemetry',
            'Adjust target moisture threshold',
            'View pump telemetry (Valve #EV-02)',
          ],
        },
      };

      setMessages((prev) => [...prev, startedMessage]);
      setIsTyping(false);

      // 3. Open the Current Task panel & set status to running
      setTaskStatus('running');
      setIsTaskOpen(true);
      setCurrentStage('MONITOR');
    }, 700);
  };

  // Process incoming user prompt (from Composer or Quick Action chips)
  const handleSendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userTime = '10:42 AM';
    const userMsg: ChatItem = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: trimmed,
      time: userTime,
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);
    setCurrentStage('ANALYSE');

    const lower = trimmed.toLowerCase();

    // Check if the user is asking to start irrigation (matches requirements)
    const isIrrigationRequest =
      lower.includes('start irrigation') ||
      lower.includes('east field') ||
      lower.includes('irrigation in east field') ||
      lower.includes('30 minutes');

    setTimeout(() => {
      const aiTime = '10:42 AM';

      if (isIrrigationRequest) {
        // STATE 4 & STATE 5: AI Proposal with Structured Info & CTA
        setCurrentStage('RECOMMEND');

        const proposalMsg: ChatItem = {
          id: `ai-prop-${Date.now()}`,
          sender: 'ai',
          time: aiTime,
          aiData: {
            id: `proposal-${Date.now()}`,
            type: 'irrigation_proposal',
            content: 'East Field is currently below the optimal soil moisture level.',
            metrics: {
              currentMoisture: '23%',
              duration: '30 min',
              targetMoisture: '38%',
              field: 'East Field',
            },
            confirmationPrompt: 'Start irrigation?',
            hasActionCTA: true,
            actionCTALabel: 'Start irrigation',
            isActionExecuted: false,
            time: aiTime,
          },
        };

        setMessages((prev) => [...prev, proposalMsg]);
        setCurrentStage('CONFIRM');
      } else if (lower.includes('which field') || lower.includes('needs irrigation')) {
        // Which field needs irrigation query
        const aiMsg: ChatItem = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          time: aiTime,
          aiData: {
            id: `diag-${Date.now()}`,
            type: 'analysis',
            heading: 'Telemetry Moisture Scan Report',
            content:
              'Real-time IoT sensors indicate **East Field** requires immediate water replenishment:\n\n• **East Field (Soybean)**: 23% moisture (Threshold: 35–45%) — Moisture Deficit: -15%\n• **West Field (Wheat)**: 36% moisture (Optimal)\n• **North Block (Cotton)**: 41% moisture (Healthy capacity)\n\nSoybean plants are currently in early flowering, making moisture stress critical to yield.',
            time: aiTime,
            quickReplies: ['Start irrigation in East Field for 30 minutes', 'Show full sensor telemetry'],
          },
        };
        setMessages((prev) => [...prev, aiMsg]);
        setCurrentStage('RECOMMEND');
      } else if (lower.includes('analyse') || lower.includes('fields')) {
        // Field analysis query
        const aiMsg: ChatItem = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          time: aiTime,
          aiData: {
            id: `analysis-${Date.now()}`,
            type: 'analysis',
            heading: 'Farm Intelligence Summary — Green Valley Farm',
            content:
              'Summary across 3 active cultivation blocks:\n\n• **East Field (12.4 Acres, Soybean)**: Soil moisture 23% (Deficient). Evapotranspiration is high (4.2 mm/day). Immediate irrigation advised.\n• **West Field (8.5 Acres, Wheat)**: Soil moisture 36%. Nitrogen: 148 kg/ha. Health score: 91/100.\n• **North Block (15.0 Acres, Cotton)**: Soil moisture 41%. Canopy cover: 78%. No water stress detected.',
            time: aiTime,
            quickReplies: ['Start irrigation in East Field for 30 minutes', 'Check crop health'],
          },
        };
        setMessages((prev) => [...prev, aiMsg]);
        setCurrentStage('RECOMMEND');
      } else if (lower.includes('crop health') || lower.includes('health')) {
        // Crop health query
        const aiMsg: ChatItem = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          time: aiTime,
          aiData: {
            id: `crop-${Date.now()}`,
            type: 'analysis',
            heading: 'Crop Health & Multispectral Satellite Diagnostics',
            content:
              '• **Soybean (East Field)**: Mean NDVI is 0.62. Normalized Difference Moisture Index (NDMI) shows mild water stress across the central zone.\n• **Wheat (West Field)**: NDVI 0.74 (Vigorous vegetative development).\n• **Root Zone Assessment**: Restoring soil moisture to 38% will reverse transient leaf curl within 4 hours.',
            time: aiTime,
            quickReplies: ['Start irrigation in East Field for 30 minutes', 'Show soil conditions'],
          },
        };
        setMessages((prev) => [...prev, aiMsg]);
        setCurrentStage('RECOMMEND');
      } else if (lower.includes('soil condition') || lower.includes('soil')) {
        // Soil conditions query
        const aiMsg: ChatItem = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          time: aiTime,
          aiData: {
            id: `soil-${Date.now()}`,
            type: 'analysis',
            heading: 'Root Zone Soil Chemistry — East Field Node #EF-04',
            content:
              '• **Soil pH**: 6.8 (Neutral · Optimal for soybean root nodules)\n• **Volumetric Soil Moisture**: 23% (Deficient · Target: 38%)\n• **Available Nitrogen (N)**: 142 kg/ha\n• **Phosphorus (P)**: 24 kg/ha\n• **Potassium (K)**: 188 kg/ha\n• **Electrical Conductivity (EC)**: 1.12 dS/m (Normal salinity)',
            time: aiTime,
            quickReplies: ['Start irrigation in East Field for 30 minutes', 'Analyse my fields'],
          },
        };
        setMessages((prev) => [...prev, aiMsg]);
        setCurrentStage('RECOMMEND');
      } else {
        // General agronomic query
        const aiMsg: ChatItem = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          time: aiTime,
          aiData: {
            id: `gen-${Date.now()}`,
            type: 'general',
            heading: 'Mitti AI Agronomic Advisory',
            content: `I have analyzed your query regarding "${trimmed}". Current farm sensors report steady conditions across Green Valley Farm, with the exception of East Field requiring soil moisture replenishment.\n\nLet me know if you would like me to trigger irrigation or run diagnostic soil telemetry.`,
            time: aiTime,
            quickReplies: ['Start irrigation in East Field for 30 minutes', 'Which field needs irrigation?'],
          },
        };
        setMessages((prev) => [...prev, aiMsg]);
        setCurrentStage('RECOMMEND');
      }

      setIsTyping(false);
    }, 850);
  };

  return (
    <div
      className="mitti-ai-page flex flex-col flex-1 h-full overflow-hidden select-none"
      style={{ background: 'var(--bg-base)' }}
    >
      {/* 1. MITTI AI HEADER */}
      <MittiAIHeader
        title={
          taskStatus === 'running' || taskStatus === 'paused'
            ? 'Active Irrigation — East Field'
            : 'Irrigation Needed on East Field'
        }
        timestamp="Today 10:42 AM"
        farmContext="Green Valley Farm · East Field (Soybean)"
        currentStage={currentStage}
        isTaskOpen={isTaskOpen}
        hasActiveTask={taskStatus !== 'idle'}
        taskStatus={taskStatus}
        onToggleTask={() => setIsTaskOpen(!isTaskOpen)}
        onReset={handleResetFlow}
      />

      {/* 2. MAIN WORKSPACE: Conversation Area (Center) + Current Task Panel (Right) */}
      <div className="mitti-ai-workspace flex flex-1 overflow-hidden relative">
        {/* CENTER CONVERSATION AREA */}
        <div className="mitti-ai-conversation flex flex-col flex-1 overflow-hidden">
          {/* Scrollable Conversation History */}
          <div className="mitti-ai-scroll flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
            <div className="mitti-ai-thread max-w-4xl mx-auto space-y-6">
              {/* STATE 1: Empty / Initial Welcome State */}
              {messages.length === 0 && (
                <div className="mitti-ai-empty-state space-y-6 animate-fade-in py-2">
                  {/* Contextual Advisory Banner */}
                  <div
                    className="p-5 rounded-2xl relative overflow-hidden"
                    style={{
                      background: 'linear-gradient(135deg, #FFFFFF 0%, #F9FAF8 100%)',
                      border: '1px solid rgba(45, 106, 79, 0.15)',
                      boxShadow: 'var(--shadow-sm)',
                    }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1.5 max-w-xl">
                        <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10.5px] font-semibold text-[#1A4731] bg-[#EAF4EE] border border-[rgba(45,106,79,0.2)]">
                          <Radio size={11} className="text-[#2D6A4F] animate-pulse" />
                          <span>Mitti Farm Operations Copilot</span>
                        </div>
                        <h2
                          className="text-[17px] font-bold text-[var(--text-primary)] tracking-tight"
                          style={{ fontFamily: 'Space Grotesk, sans-serif' }}
                        >
                          Telemetry Alert: East Field moisture deficit detected
                        </h2>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                          Connected to 14 IoT root-zone sensors across Green Valley Farm.
                          East Field (Soybean) is currently at <strong className="text-rose-600 font-semibold">23% soil moisture</strong>,
                          below the 35% agronomic threshold for flowering stage.
                        </p>
                      </div>

                      {/* Sensor telemetry badge */}
                      <div className="hidden sm:flex flex-col items-end text-right p-3 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-light)] flex-shrink-0">
                        <span className="text-[10px] uppercase font-bold text-[var(--text-faint)]">
                          Node #EF-04
                        </span>
                        <span className="text-[18px] font-bold text-rose-600 mt-0.5">
                          23%
                        </span>
                        <span className="text-[10px] text-[var(--text-muted)]">
                          Optimal: 35–45%
                        </span>
                      </div>
                    </div>

                    {/* Sensor Telemetry Bar */}
                    <div className="mt-4 pt-3.5 border-t border-[rgba(0,0,0,0.06)] grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                      <div>
                        <div className="text-[10.5px] text-[var(--text-faint)]">Field / Crop</div>
                        <div className="font-semibold text-[var(--text-primary)]">East Field · Soybean</div>
                      </div>
                      <div>
                        <div className="text-[10.5px] text-[var(--text-faint)]">Current Status</div>
                        <div className="font-semibold text-rose-600">Requires Irrigation</div>
                      </div>
                      <div>
                        <div className="text-[10.5px] text-[var(--text-faint)]">Recommended Cycle</div>
                        <div className="font-semibold text-[#1A4731]">30 minutes</div>
                      </div>
                      <div>
                        <div className="text-[10.5px] text-[var(--text-faint)]">Target Moisture</div>
                        <div className="font-semibold text-[#059669]">38% Volumetric</div>
                      </div>
                    </div>
                  </div>

                  {/* AI Quick Actions Chips */}
                  <QuickActions
                    onSelectAction={(actionText) => handleSendMessage(actionText)}
                  />
                </div>
              )}

              {/* Chat Messages */}
              {messages.map((item) => (
                <React.Fragment key={item.id}>
                  {item.sender === 'user' && item.content && (
                    <UserMessage
                      content={item.content}
                      time={item.time}
                      onEdit={(text) => setComposerInitialValue(text)}
                      onRegenerate={() => handleSendMessage(item.content || '')}
                    />
                  )}

                  {item.sender === 'ai' && item.aiData && (
                    <AIMessage
                      message={item.aiData}
                      onActionClick={(msgId) => handleExecuteIrrigation(msgId)}
                      onQuickReply={(replyText) => handleSendMessage(replyText)}
                    />
                  )}
                </React.Fragment>
              ))}

              {/* Typing / Analyzing Telemetry Indicator */}
              {isTyping && (
                <div className="flex items-start gap-3 animate-fade-in">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #1A4731 0%, #2D6A4F 100%)',
                    }}
                  >
                    <Sparkles size={16} className="text-[#A3E635]" />
                  </div>
                  <div
                    className="flex items-center gap-2.5 px-4 py-3 rounded-2xl border"
                    style={{
                      background: 'var(--bg-card)',
                      borderColor: 'var(--border-light)',
                      borderRadius: '4px 18px 18px 18px',
                    }}
                  >
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] animate-bounce" style={{ animationDelay: '0ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] animate-bounce" style={{ animationDelay: '150ms' }} />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#2D6A4F] animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                    <span className="text-xs text-[var(--text-muted)] font-medium">
                      Mitti AI evaluating soil moisture telemetry...
                    </span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* 3. AI COMPOSER (Sticky Bottom, NO image upload, NO paperclip) */}
          <AIComposer
            onSend={handleSendMessage}
            disabled={isTyping}
            initialValue={composerInitialValue}
            onClearInitialValue={() => setComposerInitialValue('')}
          />
        </div>

        {/* 4. CONTEXTUAL CURRENT TASK PANEL (Right side) */}
        <CurrentTaskPanel
          isOpen={isTaskOpen}
          onClose={() => setIsTaskOpen(false)}
          status={taskStatus === 'idle' ? 'running' : taskStatus}
          onPauseToggle={handlePauseToggle}
          onStop={handleStopIrrigation}
          progressPercent={progressPercent}
          remainingMinutes={remainingMinutes}
        />
      </div>
    </div>
  );
}
