import React from 'react';
import { Award, CheckCircle2, AlertCircle, Sprout, ArrowRight, ShieldAlert } from 'lucide-react';
import StatusBadge from './StatusBadge';

export default function SpeciesCard({ species, onOpenGuide }) {
  const isTop1 = species.rank === 1;

  return (
    <div
      className="glass-panel glass-panel-interactive"
      style={{
        padding: '1.4rem',
        position: 'relative',
        overflow: 'hidden',
        border: isTop1 ? '1px solid rgba(52, 211, 153, 0.45)' : '1px solid var(--border-color)',
        background: isTop1 ? 'linear-gradient(145deg, rgba(20, 42, 34, 0.85), rgba(14, 28, 23, 0.75))' : 'var(--bg-card)'
      }}
    >
      {/* Top Rank Badge */}
      {isTop1 && (
        <div style={{
          position: 'absolute',
          top: '0',
          right: '0',
          background: 'linear-gradient(135deg, #10b981, #059669)',
          color: '#ffffff',
          fontSize: '0.72rem',
          fontWeight: 700,
          padding: '0.25rem 0.85rem 0.25rem 0.75rem',
          borderBottomLeftRadius: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.35rem',
          letterSpacing: '0.04em'
        }}>
          <Award size={13} /> BEST MATCH
        </div>
      )}

      {/* Card Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              width: '24px',
              height: '24px',
              borderRadius: '6px',
              background: 'rgba(52, 211, 153, 0.15)',
              color: 'var(--accent-mint)',
              fontSize: '0.8rem',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              #{species.rank}
            </span>
            <h4 style={{ fontSize: '1.2rem', margin: 0 }}>{species.name}</h4>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '0.2rem' }}>
            {species.scientific_name}
          </div>
        </div>

        <div style={{ textAlign: 'right', marginRight: isTop1 ? '5.5rem' : '0' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.35rem', fontWeight: 700, color: 'var(--accent-mint)' }}>
            {species.survival_percentage || (species.survival_probability * 100).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div style={{
        width: '100%',
        height: '6px',
        borderRadius: '3px',
        background: 'rgba(255, 255, 255, 0.08)',
        marginBottom: '0.85rem',
        overflow: 'hidden'
      }}>
        <div style={{
          width: `${species.survival_percentage || species.survival_probability * 100}%`,
          height: '100%',
          background: species.survival_probability >= 0.68 ? 'linear-gradient(90deg, #10b981, #34d399)' : species.survival_probability >= 0.45 ? 'linear-gradient(90deg, #f59e0b, #fbbf24)' : 'linear-gradient(90deg, #f43f5e, #fb7185)',
          borderRadius: '3px',
          transition: 'width 1s ease'
        }} />
      </div>

      <div style={{ marginBottom: '0.75rem' }}>
        <StatusBadge riskLevel={species.risk_level} status={species.status} />
      </div>

      {/* Why Recommended / Rule summary */}
      <p style={{
        fontSize: '0.84rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.45,
        marginBottom: '0.9rem',
        minHeight: '2.8rem'
      }}>
        {species.reason}
      </p>

      {/* Strengths / Warnings pills */}
      {species.strengths && species.strengths.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1rem' }}>
          {species.strengths.slice(0, 2).map((s, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.78rem', color: '#6ee7b7' }}>
              <CheckCircle2 size={13} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>{s}</span>
            </div>
          ))}
        </div>
      )}

      {/* View Full Plantation Protocol Button */}
      <button
        onClick={() => onOpenGuide(species)}
        className="btn btn-secondary"
        style={{
          width: '100%',
          padding: '0.55rem 0.9rem',
          fontSize: '0.82rem',
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <Sprout size={15} color="var(--accent-mint)" /> View Plantation Protocol
        </span>
        <ArrowRight size={14} />
      </button>
    </div>
  );
}
