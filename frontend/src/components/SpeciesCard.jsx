import React, { useState } from 'react';
import { Award, CheckCircle2, Sprout, ArrowRight, Sparkles, Layers } from 'lucide-react';
import StatusBadge from './StatusBadge';
import { getSpeciesPhoto, getSpeciesCategory } from '../services/speciesImages';

export default function SpeciesCard({ species, onOpenGuide }) {
  const isTop1 = species.rank === 1;
  const isTop2 = species.rank === 2;
  const [imageLoaded, setImageLoaded] = useState(false);

  const photoUrl = getSpeciesPhoto(species.name || species.tree_species);
  const category = getSpeciesCategory(species.name || species.tree_species);
  const survivalVal = species.survival_percentage || (species.survival_probability * 100).toFixed(1);

  return (
    <div
      className="glass-panel glass-panel-interactive"
      style={{
        borderRadius: 'var(--radius-lg)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        border: isTop1
          ? '1px solid rgba(52, 211, 153, 0.45)'
          : isTop2
          ? '1px solid rgba(6, 182, 212, 0.35)'
          : '1px solid var(--border-color)',
        background: isTop1
          ? 'linear-gradient(160deg, rgba(16, 42, 32, 0.85), rgba(8, 22, 16, 0.95))'
          : 'var(--bg-card)',
        position: 'relative'
      }}
    >
      {/* Top Rank Badge Banner */}
      <div style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        zIndex: 10,
        background: isTop1
          ? 'linear-gradient(135deg, #10b981, #059669)'
          : isTop2
          ? 'linear-gradient(135deg, #06b6d4, #0891b2)'
          : 'rgba(255, 255, 255, 0.12)',
        color: '#ffffff',
        fontSize: '0.72rem',
        fontWeight: 700,
        padding: '0.3rem 0.75rem',
        borderRadius: 'var(--radius-full)',
        display: 'flex',
        alignItems: 'center',
        gap: '0.35rem',
        letterSpacing: '0.04em',
        boxShadow: isTop1 ? '0 4px 15px rgba(16, 185, 129, 0.4)' : '0 2px 8px rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(8px)'
      }}>
        {isTop1 ? <Award size={13} /> : <Sparkles size={13} />}
        {isTop1 ? 'OPTIMAL MATCH #1' : `RECOMMENDATION #${species.rank}`}
      </div>

      {/* Card Image Header */}
      <div style={{ position: 'relative', height: '160px', overflow: 'hidden', background: '#091a13' }}>
        <img
          src={photoUrl}
          alt={species.name}
          onLoad={() => setImageLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease, opacity 0.3s ease',
            opacity: imageLoaded ? 1 : 0.4,
            transform: 'scale(1.02)'
          }}
        />
        {/* Dark subtle gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(12, 28, 21, 0.95) 0%, rgba(12, 28, 21, 0.4) 50%, rgba(0, 0, 0, 0.3) 100%)'
        }} />

        {/* Category Pill on Image */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '14px',
          fontSize: '0.72rem',
          fontWeight: 600,
          padding: '0.2rem 0.55rem',
          borderRadius: '4px',
          background: 'rgba(0, 0, 0, 0.65)',
          color: 'var(--accent-mint)',
          border: '1px solid rgba(52, 211, 153, 0.25)',
          backdropFilter: 'blur(6px)'
        }}>
          {category}
        </div>
      </div>

      {/* Card Body */}
      <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          {/* Title and Survival Score */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.65rem' }}>
            <div>
              <h4 style={{ fontSize: '1.25rem', margin: 0, color: '#ffffff', fontFamily: 'var(--font-display)' }}>
                {species.name || species.tree_species}
              </h4>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '0.15rem' }}>
                {species.scientific_name}
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.5rem',
                fontWeight: 800,
                color: isTop1 ? 'var(--accent-mint)' : '#ffffff',
                lineHeight: 1
              }}>
                {survivalVal}%
              </div>
              <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                Survival Prob.
              </div>
            </div>
          </div>

          {/* Survival Progress Bar */}
          <div style={{
            width: '100%',
            height: '6px',
            borderRadius: '3px',
            background: 'rgba(255, 255, 255, 0.08)',
            marginBottom: '0.85rem',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${survivalVal}%`,
              height: '100%',
              background: isTop1
                ? 'linear-gradient(90deg, #10b981, #34d399)'
                : 'linear-gradient(90deg, #06b6d4, #10b981)',
              borderRadius: '3px',
              transition: 'width 1.2s cubic-bezier(0.16, 1, 0.3, 1)'
            }} />
          </div>

          {/* Risk Level Badge */}
          <div style={{ marginBottom: '0.8rem' }}>
            <StatusBadge riskLevel={species.risk_level} status={species.status} size="sm" />
          </div>

          {/* Reasoning / Explanation */}
          <p style={{
            fontSize: '0.83rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.5,
            marginBottom: '0.9rem',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            {species.reason}
          </p>

          {/* Strengths Pills */}
          {species.strengths && species.strengths.length > 0 && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', marginBottom: '1.1rem' }}>
              {species.strengths.slice(0, 2).map((s, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.4rem', fontSize: '0.76rem', color: '#a7f3d0' }}>
                  <CheckCircle2 size={13} color="var(--accent-mint)" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* View Full Protocol Button */}
        <button
          onClick={() => onOpenGuide(species)}
          className="btn btn-secondary"
          style={{
            width: '100%',
            padding: '0.6rem 0.9rem',
            fontSize: '0.82rem',
            display: 'flex',
            justifyContent: 'space-between',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <Sprout size={15} color="var(--accent-mint)" /> View Plantation Protocol
          </span>
          <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
}
