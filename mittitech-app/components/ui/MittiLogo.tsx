import React from 'react';

interface MittiLogoProps {
  size?: number;
  className?: string;
}

export default function MittiLogo({ size = 36, className = '' }: MittiLogoProps) {
  return (
    <div
      className={`relative flex-shrink-0 flex items-center justify-center rounded-xl overflow-hidden ${className}`}
      style={{
        width: size,
        height: size,
        background: 'linear-gradient(135deg, #05190E 0%, #15452C 50%, #2D6A4F 100%)',
        border: '1px solid rgba(163, 230, 53, 0.35)',
        boxShadow: '0 4px 14px rgba(45, 106, 79, 0.35)',
      }}
    >
      <svg
        width={Math.round(size * 0.72)}
        height={Math.round(size * 0.72)}
        viewBox="0 0 512 512"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="mlLeafLeft" x1="0%" y1="100%" x2="80%" y2="0%">
            <stop offset="0%" stop-color="#15803D" />
            <stop offset="50%" stop-color="#22C55E" />
            <stop offset="100%" stop-color="#4ADE80" />
          </linearGradient>
          <linearGradient id="mlLeafRight" x1="20%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#166534" />
            <stop offset="45%" stop-color="#65A30D" />
            <stop offset="100%" stop-color="#A3E635" />
          </linearGradient>
          <linearGradient id="mlSoil" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stop-color="#78350F" stop-opacity="0.85" />
            <stop offset="50%" stop-color="#2D6A4F" />
            <stop offset="100%" stop-color="#52B788" />
          </linearGradient>
          <radialGradient id="mlPulse" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#FFFFFF" />
            <stop offset="35%" stop-color="#BEF264" />
            <stop offset="75%" stop-color="#4ADE80" stop-opacity="0.9" />
            <stop offset="100%" stop-color="#22C55E" stop-opacity="0" />
          </radialGradient>
        </defs>

        {/* Soil Layer Arc */}
        <path
          d="M 64 380 C 140 330, 200 375, 290 345 C 360 322, 410 345, 448 375 L 448 400 C 448 424, 424 448, 400 448 L 112 448 C 88 448, 64 424, 64 400 Z"
          fill="url(#mlSoil)"
          opacity="0.75"
        />

        {/* Telemetry Arc */}
        <path
          d="M 320 120 A 110 110 0 0 1 385 185"
          fill="none"
          stroke="#A3E635"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.8"
        />
        <circle cx="388" cy="112" r="9" fill="#A3E635" />

        {/* Sprout Leaves */}
        <path
          d="M 256 112 C 256 112, 155 165, 150 268 C 145 345, 202 388, 256 398 C 256 345, 256 215, 256 112 Z"
          fill="url(#mlLeafLeft)"
        />
        <path
          d="M 256 112 C 256 112, 355 160, 360 252 C 365 325, 312 378, 256 398 C 278 325, 292 215, 256 112 Z"
          fill="url(#mlLeafRight)"
        />

        {/* Bio-Circuit Spine */}
        <path
          d="M 256 398 L 256 135"
          stroke="#FFFFFF"
          strokeWidth="9"
          strokeLinecap="round"
          opacity="0.95"
        />
        <path
          d="M 256 322 L 206 284"
          stroke="#FFFFFF"
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M 256 270 L 308 232"
          stroke="#FFFFFF"
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M 256 218 L 216 186"
          stroke="#FFFFFF"
          strokeWidth="7"
          strokeLinecap="round"
          opacity="0.85"
        />

        {/* Core Node */}
        <circle cx="256" cy="270" r="32" fill="url(#mlPulse)" />
        <circle cx="256" cy="270" r="14" fill="#FFFFFF" />
        <circle cx="256" cy="270" r="7" fill="#15803D" />

        {/* Nodes */}
        <circle cx="206" cy="284" r="8" fill="#A3E635" />
        <circle cx="308" cy="232" r="8" fill="#BEF264" />
        <circle cx="216" cy="186" r="7" fill="#A3E635" />
      </svg>
    </div>
  );
}
