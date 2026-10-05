import React from 'react';
import { X, Sprout, Droplets, Ruler, Calendar, ShieldCheck, Layers, TreePine, MoveHorizontal } from 'lucide-react';
import { getSpeciesBanner, getSpeciesCategory } from '../services/speciesImages';

export default function PlantationGuideModal({ species, isOpen, onClose }) {
  if (!isOpen || !species) return null;

  const guidance = species.basic_plantation_guidance || species.plantation_guidance || {};
  const speciesName = species.name || species.tree_species || 'Botanical Specimen';
  const bannerUrl = getSpeciesBanner(speciesName);
  const category = getSpeciesCategory(speciesName);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '820px' }}>
        {/* Modal Banner & Header */}
        <div style={{
          position: 'relative',
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          marginBottom: '1.5rem',
          height: '160px',
          background: '#071811'
        }}>
          <img
            src={bannerUrl}
            alt={speciesName}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(11, 26, 19, 0.95) 0%, rgba(11, 26, 19, 0.5) 60%, rgba(0,0,0,0.3) 100%)'
          }} />

          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              background: 'rgba(0, 0, 0, 0.6)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              cursor: 'pointer',
              zIndex: 10,
              backdropFilter: 'blur(8px)',
              transition: 'background 0.2s ease'
            }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {/* Title on Banner */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '20px',
            right: '20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '0.5rem'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  padding: '0.2rem 0.6rem',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(52, 211, 153, 0.2)',
                  color: 'var(--accent-mint)',
                  border: '1px solid rgba(52, 211, 153, 0.4)'
                }}>
                  {category}
                </span>
                {species.family && (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                    Family: {species.family}
                  </span>
                )}
              </div>
              <h2 style={{ fontSize: '1.75rem', margin: '0.2rem 0 0 0', color: '#ffffff' }}>
                {speciesName}
              </h2>
              <div style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>
                {species.scientific_name}
              </div>
            </div>
          </div>
        </div>

        {/* Section Heading */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
          <Sprout size={18} color="var(--accent-mint)" />
          <h3 style={{ fontSize: '1.15rem', color: '#ffffff', margin: 0 }}>
            Standard Agronomic Plantation Protocol
          </h3>
        </div>

        {/* Plantation Guidance Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
          {/* Pit Dimensions */}
          <div className="glass-panel" style={{ padding: '1.1rem', background: 'rgba(8, 20, 15, 0.5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--accent-mint)', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              <Ruler size={16} /> Pit Dimensions
            </div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 500 }}>
              {guidance.pit_dimensions || '45 cm x 45 cm x 45 cm'}
            </div>
          </div>

          {/* Spacing Requirement */}
          <div className="glass-panel" style={{ padding: '1.1rem', background: 'rgba(8, 20, 15, 0.5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--accent-cyan)', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              <MoveHorizontal size={16} /> Recommended Spacing
            </div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 500 }}>
              {guidance.spacing_meters || '4m x 4m standard'}
            </div>
          </div>

          {/* Planting Season */}
          <div className="glass-panel" style={{ padding: '1.1rem', background: 'rgba(8, 20, 15, 0.5)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--accent-amber)', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              <Calendar size={16} /> Planting Season
            </div>
            <div style={{ fontSize: '0.92rem', color: 'var(--text-primary)', fontWeight: 500 }}>
              {guidance.planting_season || 'Monsoon onset (June - August)'}
            </div>
          </div>

          {/* Soil Prep */}
          <div className="glass-panel" style={{ padding: '1.1rem', background: 'rgba(8, 20, 15, 0.5)', gridColumn: '1 / -1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#a78bfa', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              <Layers size={16} /> Soil Preparation & Amendments
            </div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              {guidance.soil_preparation || 'Blend topsoil with organic farmyard manure (FYM) and vermicompost for initial nutrient availability.'}
            </div>
          </div>

          {/* Irrigation Schedule */}
          <div className="glass-panel" style={{ padding: '1.1rem', background: 'rgba(8, 20, 15, 0.5)', gridColumn: '1 / -1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: 'var(--accent-cyan)', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              <Droplets size={16} /> Irrigation Schedule
            </div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              {guidance.irrigation_schedule || 'Water twice weekly for first 3 months; weekly during summer; drought hardy once established.'}
            </div>
          </div>

          {/* Special Care */}
          <div className="glass-panel" style={{ padding: '1.1rem', background: 'rgba(8, 20, 15, 0.5)', gridColumn: '1 / -1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#6ee7b7', fontSize: '0.84rem', fontWeight: 600, marginBottom: '0.35rem' }}>
              <ShieldCheck size={16} /> Special Care & Sapling Protection
            </div>
            <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
              {guidance.special_care || 'Protect saplings from livestock grazing during first 2 years with tree guards. Ensure weed-free basin.'}
            </div>
          </div>
        </div>

        {/* Ecological Benefits Footer Note */}
        {species.ecological_value && (
          <div style={{
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(16, 185, 129, 0.08)',
            border: '1px solid rgba(16, 185, 129, 0.25)',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.75rem',
            marginBottom: '1.5rem'
          }}>
            <TreePine size={20} color="var(--accent-mint)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.2rem' }}>
                Ecological & Agroforestry Value
              </div>
              <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {species.ecological_value}
              </div>
            </div>
          </div>
        )}

        {/* Modal Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
          <button onClick={onClose} className="btn btn-primary" style={{ padding: '0.65rem 1.5rem' }}>
            Close Guide
          </button>
        </div>
      </div>
    </div>
  );
}
