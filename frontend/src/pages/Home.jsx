import React from 'react';
import {
  Sparkles,
  ArrowRight,
  CloudRain,
  Thermometer,
  Layers,
  Droplets,
  Sun,
  Cpu,
  Sprout,
  CheckCircle2,
  TrendingUp,
  Award,
  ChevronRight,
  Database,
  BarChart3,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { getSpeciesPhoto, getSpeciesBadge, getSpeciesCategory } from '../services/speciesImages';

export default function Home({ setActiveTab, onSelectPreset }) {
  const presets = [
    {
      name: 'Tropical Mango Orchard',
      species: 'Mango',
      desc: 'Alluvial river basin loam with balanced seasonal monsoon rainfall for sweet commercial mango cultivars.',
      params: {
        rainfall_mm: 1150,
        temperature_c: 28.5,
        soil_type: 'Alluvial',
        soil_moisture_percent: 55.0,
        sunlight_hours: 8.0,
        water_availability: 'Medium',
        tree_species: 'Mango'
      }
    },
    {
      name: 'High-Density Guava Meadow',
      species: 'Guava',
      desc: 'Well-draining fertile loam ideal for meadow orchard system with prolific Vitamin C fruit yields.',
      params: {
        rainfall_mm: 850,
        temperature_c: 26.5,
        soil_type: 'Loamy',
        soil_moisture_percent: 45.0,
        sunlight_hours: 7.5,
        water_availability: 'Medium',
        tree_species: 'Guava'
      }
    },
    {
      name: 'Subtropical Banana Plantation',
      species: 'Banana',
      desc: 'High moisture, nutrient-rich alluvial/clay soil with continuous drip irrigation for rapid 10-month harvest.',
      params: {
        rainfall_mm: 1600,
        temperature_c: 29.0,
        soil_type: 'Alluvial',
        soil_moisture_percent: 75.0,
        sunlight_hours: 7.0,
        water_availability: 'High',
        tree_species: 'Banana'
      }
    },
    {
      name: 'Coastal Coconut Belt',
      species: 'Coconut',
      desc: 'Porous sandy-alluvial soil with high sunlight photoperiod for heavy perennial nut & tender water production.',
      params: {
        rainfall_mm: 1450,
        temperature_c: 30.0,
        soil_type: 'Sandy',
        soil_moisture_percent: 60.0,
        sunlight_hours: 8.5,
        water_availability: 'High',
        tree_species: 'Coconut'
      }
    },
    {
      name: 'Semi-Arid Pomegranate Zone',
      species: 'Pomegranate',
      desc: 'Drier climate with warm sunny days and light loamy soil tailored for sweet ruby arils and export quality.',
      params: {
        rainfall_mm: 550,
        temperature_c: 31.5,
        soil_type: 'Loamy',
        soil_moisture_percent: 32.0,
        sunlight_hours: 9.0,
        water_availability: 'Low',
        tree_species: 'Pomegranate'
      }
    },
    {
      name: 'Marginal Sodic Land Amla',
      species: 'Amla',
      desc: 'Extremely resilient Indian Gooseberry thriving in tough red/alkaline soils with high medicinal yield.',
      params: {
        rainfall_mm: 650,
        temperature_c: 32.0,
        soil_type: 'Red',
        soil_moisture_percent: 28.0,
        sunlight_hours: 8.0,
        water_availability: 'Low',
        tree_species: 'Amla'
      }
    }
  ];

  const featuredSpecies = [
    'Mango',
    'Guava',
    'Banana',
    'Coconut',
    'Papaya',
    'Pomegranate'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {/* Hero Section */}
      <div
        className="glass-panel"
        style={{
          padding: '3.5rem 2.5rem',
          background: 'linear-gradient(135deg, rgba(16, 36, 28, 0.95) 0%, rgba(9, 17, 14, 0.98) 100%)',
          border: '1px solid rgba(52, 211, 153, 0.3)',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '20px'
        }}
      >
        <div style={{ maxWidth: '850px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(52, 211, 153, 0.12)',
              border: '1px solid rgba(52, 211, 153, 0.35)',
              padding: '0.4rem 0.95rem',
              borderRadius: '9999px',
              fontSize: '0.82rem',
              color: 'var(--accent-mint)',
              fontWeight: 700,
              marginBottom: '1.25rem'
            }}
          >
            <Sparkles size={14} /> AI-POWERED YIELD-SPECIES SURVIVAL & DECISION SUPPORT
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)',
              lineHeight: 1.15,
              fontWeight: 800,
              marginBottom: '1.2rem',
              letterSpacing: '-0.025em'
            }}
          >
            High-Yield Plantation Survival <br />
            <span className="gradient-text">& Climate Decision Engine</span>
          </h1>

          <p
            style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              marginBottom: '2rem'
            }}
          >
            Evaluate rainfall, temperature, soil taxonomy, moisture, and sunlight to accurately predict survival odds for commercial fruit and crop trees like Mango, Guava, Banana, Coconut, and more. Receive AI rankings and complete cultivation protocols.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              className="btn btn-primary"
              onClick={() => setActiveTab('predict')}
              style={{ fontSize: '0.98rem', padding: '0.85rem 1.75rem' }}
            >
              <span>Launch Predictor</span>
              <ArrowRight size={18} />
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => setActiveTab('species')}
              style={{ fontSize: '0.98rem', padding: '0.85rem 1.6rem' }}
            >
              <Sprout size={18} color="var(--accent-mint)" />
              <span>Explore 10 Yield Species</span>
            </button>
          </div>
        </div>

        {/* Quick Highlights Metrics Bar */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '1rem',
            marginTop: '2.5rem',
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-subtle)'
          }}
        >
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-mint)' }}>10</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>High-Yield Fruit & Crop Species</div>
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>12,000</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Trained Agro-Ecological Records</div>
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#fbbf24' }}>Random Forest</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>ML Ensemble Inference Engine</div>
          </div>
          <div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#a78bfa' }}>6 Soils</div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Agronomic Soil Compatibility</div>
          </div>
        </div>
      </div>

      {/* Featured Yield Species Showcase */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-mint)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              <Award size={14} /> High-Yield Candidate Species
            </div>
            <h2 style={{ fontSize: '1.5rem', color: '#ffffff', margin: '0.25rem 0 0 0' }}>
              Top Commercial Fruit & Crop Species
            </h2>
          </div>

          <button
            onClick={() => setActiveTab('species')}
            className="btn btn-secondary"
            style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
          >
            <span>View All 10 Species</span>
            <ChevronRight size={15} />
          </button>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.25rem'
          }}
        >
          {featuredSpecies.map((spName) => (
            <div
              key={spName}
              className="glass-panel glass-panel-interactive"
              style={{
                overflow: 'hidden',
                borderRadius: '16px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column'
              }}
              onClick={() => {
                if (onSelectPreset) {
                  const matched = presets.find((p) => p.species === spName);
                  if (matched) onSelectPreset(matched.params);
                }
                setActiveTab('predict');
              }}
            >
              <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                <img
                  src={getSpeciesPhoto(spName)}
                  alt={spName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/species/mango.jpg';
                  }}
                />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(9, 17, 14, 0.9) 0%, transparent 60%)' }} />
                <div style={{ position: 'absolute', bottom: '0.75rem', left: '1rem', right: '1rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>{spName}</h3>
                  <div style={{ fontSize: '0.75rem', color: 'var(--accent-mint)' }}>{getSpeciesBadge(spName)}</div>
                </div>
              </div>
              <div style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{getSpeciesCategory(spName)}</span>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-mint)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  Predict <ArrowRight size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Test Presets */}
      <div>
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.78rem', fontWeight: 700, color: 'var(--accent-mint)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            <Zap size={14} /> Quick Microclimate Scenarios
          </div>
          <h2 style={{ fontSize: '1.5rem', color: '#ffffff', margin: '0.25rem 0 0 0' }}>
            Pre-Configured Regional Presets
          </h2>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginTop: '0.35rem' }}>
            Select any microclimate scenario to instantly populate input sliders and run survival predictions.
          </p>
        </div>

        <div className="grid-2">
          {presets.map((preset, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-interactive"
              style={{
                padding: '1.4rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderRadius: '14px'
              }}
              onClick={() => {
                onSelectPreset(preset.params);
                setActiveTab('predict');
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <h4 style={{ fontSize: '1.1rem', color: 'var(--accent-mint)', margin: 0 }}>{preset.name}</h4>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(255, 255, 255, 0.08)', padding: '0.2rem 0.6rem', borderRadius: '9999px', color: 'var(--text-secondary)' }}>
                    {preset.params.soil_type} Soil
                  </span>
                </div>
                <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1rem' }}>
                  {preset.desc}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                <div style={{ display: 'flex', gap: '0.85rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  <span>🌧️ {preset.params.rainfall_mm} mm</span>
                  <span>🌡️ {preset.params.temperature_c}°C</span>
                  <span>💧 {preset.params.soil_moisture_percent}%</span>
                </div>
                <span style={{ fontSize: '0.82rem', color: 'var(--accent-mint)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  Select <ArrowRight size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* System Architecture Flow */}
      <div className="glass-panel" style={{ padding: '2.25rem 2rem', borderRadius: '18px' }}>
        <div style={{ marginBottom: '1.75rem' }}>
          <h2 style={{ fontSize: '1.4rem', margin: 0, color: '#ffffff' }}>System Decision Architecture</h2>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Four-stage data processing pipeline delivering probabilistic accuracy and actionable cultivation guides.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem'
          }}
        >
          <div className="glass-panel" style={{ padding: '1.4rem', textAlign: 'center', background: 'rgba(15, 28, 24, 0.6)' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(52, 211, 153, 0.15)', color: 'var(--accent-mint)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.85rem' }}>
              <CloudRain size={22} />
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>1. Environmental Input</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.35rem', lineHeight: 1.45 }}>
              Rainfall, Temperature, Soil Class, Moisture, Sunlight Hours
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.4rem', textAlign: 'center', background: 'rgba(15, 28, 24, 0.6)' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.85rem' }}>
              <Cpu size={22} />
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>2. Random Forest Model</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.35rem', lineHeight: 1.45 }}>
              Trained scikit-learn pipeline with StandardScaler and One-Hot encoding
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.4rem', textAlign: 'center', background: 'rgba(15, 28, 24, 0.6)' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.15)', color: '#fbbf24', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.85rem' }}>
              <Sprout size={22} />
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>3. Species Ranking</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.35rem', lineHeight: 1.45 }}>
              Top 3 candidate species ranked by survival odds and plantation protocol
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.4rem', textAlign: 'center', background: 'rgba(15, 28, 24, 0.6)' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(139, 92, 246, 0.15)', color: '#a78bfa', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.85rem' }}>
              <Database size={22} />
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>4. History Storage</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.35rem', lineHeight: 1.45 }}>
              Persistent prediction audit trail for tracking long-term plantation outcomes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
