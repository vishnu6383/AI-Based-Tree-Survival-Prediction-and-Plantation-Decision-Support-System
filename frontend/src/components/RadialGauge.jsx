import React from 'react';

export default function RadialGauge({ percentage = 0, size = 180, strokeWidth = 14 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedPercentage = Math.min(Math.max(percentage, 0), 100);
  const strokeDashoffset = circumference - (clampedPercentage / 100) * circumference;

  let strokeColor = '#10b981'; // Emerald
  let glowColor = 'rgba(16, 185, 129, 0.4)';
  if (clampedPercentage < 45) {
    strokeColor = '#f43f5e'; // Rose
    glowColor = 'rgba(244, 63, 94, 0.4)';
  } else if (clampedPercentage < 68) {
    strokeColor = '#f59e0b'; // Amber
    glowColor = 'rgba(245, 158, 11, 0.4)';
  }

  return (
    <div style={{ position: 'relative', width: size, height: size, margin: '0 auto' }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {/* Background Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke="rgba(255, 255, 255, 0.08)"
          strokeWidth={strokeWidth}
        />
        {/* Animated Progress Track */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="transparent"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          style={{
            transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.5s ease',
            filter: `drop-shadow(0 0 10px ${glowColor})`
          }}
        />
      </svg>
      {/* Center Percentage Display */}
      <div style={{
        position: 'absolute',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2.4rem',
          fontWeight: 700,
          color: 'var(--text-primary)',
          lineHeight: 1
        }}>
          {clampedPercentage.toFixed(1)}%
        </div>
        <div style={{
          fontSize: '0.75rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          color: 'var(--text-muted)',
          marginTop: '0.35rem',
          fontWeight: 600
        }}>
          Survival Odds
        </div>
      </div>
    </div>
  );
}
