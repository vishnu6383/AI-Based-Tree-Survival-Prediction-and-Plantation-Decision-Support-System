import React from 'react';
import { ShieldCheck, AlertTriangle, ShieldAlert, Sparkles } from 'lucide-react';

export default function StatusBadge({ riskLevel, status, size = 'md' }) {
  const isLowRisk = riskLevel?.toLowerCase().includes('low') || status?.toLowerCase().includes('high');
  const isMediumRisk = riskLevel?.toLowerCase().includes('medium') || riskLevel?.toLowerCase().includes('moderate') || status?.toLowerCase().includes('moderate');
  
  let config = {
    bg: 'rgba(244, 63, 94, 0.12)',
    border: 'rgba(244, 63, 94, 0.35)',
    color: '#fda4af',
    dot: '#f43f5e',
    glow: '0 0 10px rgba(244, 63, 94, 0.5)',
    icon: ShieldAlert,
    label: riskLevel || status || 'High Risk'
  };

  if (isLowRisk) {
    config = {
      bg: 'rgba(16, 185, 129, 0.12)',
      border: 'rgba(16, 185, 129, 0.35)',
      color: '#6ee7b7',
      dot: '#10b981',
      glow: '0 0 10px rgba(16, 185, 129, 0.5)',
      icon: ShieldCheck,
      label: riskLevel || status || 'Low Risk'
    };
  } else if (isMediumRisk) {
    config = {
      bg: 'rgba(245, 158, 11, 0.12)',
      border: 'rgba(245, 158, 11, 0.35)',
      color: '#fcd34d',
      dot: '#f59e0b',
      glow: '0 0 10px rgba(245, 158, 11, 0.5)',
      icon: AlertTriangle,
      label: riskLevel || status || 'Medium Risk'
    };
  }

  const Icon = config.icon;
  const isSm = size === 'sm';

  return (
    <span style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: isSm ? '0.35rem' : '0.45rem',
      padding: isSm ? '0.2rem 0.6rem' : '0.32rem 0.85rem',
      borderRadius: 'var(--radius-full)',
      background: config.bg,
      border: `1px solid ${config.border}`,
      color: config.color,
      fontSize: isSm ? '0.72rem' : '0.8rem',
      fontWeight: 600,
      letterSpacing: '0.02em',
      fontFamily: 'var(--font-sans)',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)'
    }}>
      <span style={{
        width: isSm ? '6px' : '7px',
        height: isSm ? '6px' : '7px',
        borderRadius: '50%',
        background: config.dot,
        boxShadow: config.glow,
        flexShrink: 0
      }} />
      <Icon size={isSm ? 12 : 14} style={{ flexShrink: 0 }} />
      <span>{config.label}</span>
    </span>
  );
}
