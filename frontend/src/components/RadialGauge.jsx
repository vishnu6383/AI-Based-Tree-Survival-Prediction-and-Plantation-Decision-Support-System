import React, { useEffect, useState } from 'react';

export default function RadialGauge({
  percentage = 0,
  size = 240,
  strokeWidth = 16,
  riskLevel = 'Low Risk',
  status = 'High Viability',
  label = 'Estimated Survival'
}) {
  const [animatedPercent, setAnimatedPercent] = useState(0);

  useEffect(() => {
    // Smooth progress animation from 0 to target
    const timer = setTimeout(() => {
      setAnimatedPercent(Math.min(100, Math.max(0, percentage)));
    }, 150);
    return () => clearTimeout(timer);
  }, [percentage]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Use a 270 degree arc for gauge look
  const arcLength = circumference * 0.75;
  const strokeDashoffset = arcLength - (arcLength * (animatedPercent / 100));

  // Determine color scheme based on percentage/risk
  const isHigh = percentage >= 68;
  const isModerate = percentage >= 45 && percentage < 68;

  const gradientId = `gauge-grad-${Math.random().toString(36).substr(2, 9)}`;
  const glowId = `gauge-glow-${Math.random().toString(36).substr(2, 9)}`;

  const primaryColor = isHigh ? '#10b981' : isModerate ? '#f59e0b' : '#f43f5e';
  const secondaryColor = isHigh ? '#34d399' : isModerate ? '#fbbf24' : '#fb7185';
  const glowColor = isHigh ? 'rgba(16, 185, 129, 0.4)' : isModerate ? 'rgba(245, 158, 11, 0.4)' : 'rgba(244, 63, 94, 0.4)';

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      width: `${size}px`,
      margin: '0 auto'
    }}>
      <svg
        width={size}
        height={size * 0.88}
        viewBox={`0 0 ${size} ${size}`}
        style={{ overflow: 'visible' }}
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={secondaryColor} />
            <stop offset="100%" stopColor={primaryColor} />
          </linearGradient>

          <filter id={glowId} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Track Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255, 255, 255, 0.06)"
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeLinecap="round"
          transform={`rotate(135 ${size / 2} ${size / 2})`}
        />

        {/* Animated Fill Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          strokeDasharray={`${arcLength} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          filter={`url(#${glowId})`}
          transform={`rotate(135 ${size / 2} ${size / 2})`}
          style={{
            transition: 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1), stroke 0.4s ease'
          }}
        />
      </svg>

      {/* Center Metrics Content */}
      <div style={{
        position: 'absolute',
        top: '46%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
      }}>
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: size > 200 ? '3.2rem' : '2.4rem',
          fontWeight: 800,
          letterSpacing: '-0.03em',
          lineHeight: 1,
          color: '#ffffff',
          textShadow: `0 0 25px ${glowColor}`
        }}>
          {animatedPercent.toFixed(1)}%
        </span>

        <span style={{
          fontSize: '0.78rem',
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--text-secondary)',
          marginTop: '0.35rem'
        }}>
          {label}
        </span>
      </div>
    </div>
  );
}
