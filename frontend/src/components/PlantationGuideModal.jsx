import React from 'react';
import { X, Sprout, Droplets, Sun, Ruler, Calendar, ShieldCheck, Check } from 'lucide-react';

export default function PlantationGuideModal({ species, isOpen, onClose }) {
  if (!isOpen || !species) return null;

  const guidance = species.basic_plantation_guidance || species.plantation_guidance || {};

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderBottom: '1px solid var(--border-subtle)',
          paddingBottom: '1rem',
          marginBottom: '1.25rem'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Sprout size={22} color="var(--accent-mint)" />
              <h3 style={{ fontSize: '1.4rem' }}>{species.name || species.tree_species}</h3>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '0.2rem' }}>
              {species.scientific_name}
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.08)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-secondary)',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Plantation Guidance Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {/* Pit Dimensions */}
          <div className="glass-panel" style={{ padding: '1rem', background: 'rgba(15, 28, 24, 0.45)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-mint)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              <Ruler size={16} /> Pit Dimensions
            </div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>
              {guidance.pit_dimensions || '45 cm x 45 cm x 45 cm'}
            </div>
          </div>

          {/* Recommended Spacing */}
          <div className="glass-panel" style={{ padding: '1rem', background: 'rgba(15, 28, 24, 0.45)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              <Ruler size={16} /> Spacing Requirement
            </div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>
              {guidance.spacing_meters || '4m x 4m standard'}
            </div>
          </div>

          {/* Planting Season */}
          <div className="glass-panel" style={{ padding: '1rem', background: 'rgba(15, 28, 24, 0.45)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-amber)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              <Calendar size={16} /> Optimal Planting Season
            </div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>
              {guidance.planting_season || 'Monsoon onset (June - August)'}
            </div>
          </div>

          {/* Irrigation Schedule */}
          <div className="glass-panel" style={{ padding: '1rem', background: 'rgba(15, 28, 24, 0.45)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-mint)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              <Droplets size={16} /> Irrigation Schedule
            </div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)' }}>
              {guidance.irrigation_schedule || 'Water twice weekly in early stages'}
            </div>
          </div>
        </div>

        {/* Soil Preparation & Special Care */}
        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <div className="glass-panel" style={{ padding: '1.1rem', background: 'rgba(15, 28, 24, 0.45)' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-mint)', marginBottom: '0.35rem' }}>
              🌱 Soil Preparation & Manuring
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {guidance.soil_preparation || 'Mix native topsoil with decomposed farmyard manure (FYM) and bio-fertilizer.'}
            </p>
          </div>

          <div className="glass-panel" style={{ padding: '1.1rem', background: 'rgba(15, 28, 24, 0.45)' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-amber)', marginBottom: '0.35rem' }}>
              🛡️ Protective Maintenance & Monitoring
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
              {guidance.special_care || 'Provide tree guards to deter livestock grazing; inspect regularly for leaf pests.'}
            </p>
          </div>
        </div>

        {/* Modal Actions */}
        <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-primary" onClick={onClose} style={{ padding: '0.6rem 1.4rem' }}>
            <Check size={16} /> Got It
          </button>
        </div>
      </div>
    </div>
  );
}
