import React from 'react';
import { Trees, ArrowRight, Sparkles, CloudRain, Layers, Cpu, Database } from 'lucide-react';

export default function Home({ setActiveTab, onSelectPreset }) {
  const presets = [
    {
      name: "Semi-Arid Zone",
      desc: "Low rainfall, high summer temperature, red soil with moderate sunlight.",
      params: {
        rainfall_mm: 550,
        temperature_c: 34.0,
        soil_type: "Red",
        soil_moisture_percent: 22.0,
        sunlight_hours: 8.5,
        water_availability: "Low",
        tree_species: "Neem"
      }
    },
    {
      name: "High-Rain Zone",
      desc: "Heavy precipitation, alluvial fertile loam, high moisture.",
      params: {
        rainfall_mm: 2600,
        temperature_c: 26.5,
        soil_type: "Alluvial",
        soil_moisture_percent: 78.0,
        sunlight_hours: 6.0,
        water_availability: "High",
        tree_species: "Teak"
      }
    },
    {
      name: "Alluvial Plain",
      desc: "Balanced climate, deep alluvial loamy soil, medium water table.",
      params: {
        rainfall_mm: 1100,
        temperature_c: 28.0,
        soil_type: "Alluvial",
        soil_moisture_percent: 50.0,
        sunlight_hours: 7.5,
        water_availability: "Medium",
        tree_species: "Mango"
      }
    },
    {
      name: "Highland Forestry",
      desc: "Monsoonal rain, loamy substrate, moderate sunlight.",
      params: {
        rainfall_mm: 1450,
        temperature_c: 25.0,
        soil_type: "Loamy",
        soil_moisture_percent: 55.0,
        sunlight_hours: 7.0,
        water_availability: "Medium",
        tree_species: "Sal"
      }
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {/* Hero Section */}
      <div className="glass-panel" style={{
        padding: '3rem 2.5rem',
        background: 'linear-gradient(135deg, rgba(16, 36, 28, 0.9) 0%, rgba(9, 17, 14, 0.95) 100%)',
        border: '1px solid rgba(52, 211, 153, 0.25)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ maxWidth: '800px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(52, 211, 153, 0.12)',
            border: '1px solid rgba(52, 211, 153, 0.3)',
            padding: '0.35rem 0.85rem',
            borderRadius: '9999px',
            fontSize: '0.8rem',
            color: 'var(--accent-mint)',
            fontWeight: 600,
            marginBottom: '1rem'
          }}>
            <Sparkles size={14} /> AI TREE SURVIVAL PREDICTION & DECISION SUPPORT
          </div>

          <h1 style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Tree Survival Prediction & <span className="gradient-text">Plantation Decision Support</span>
          </h1>

          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.75rem' }}>
            Evaluate environmental conditions (rainfall, temperature, soil type, moisture, sunlight) to predict tree survival odds, receive ranked species recommendations, and access plantation guidelines.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button
              className="btn btn-primary"
              onClick={() => setActiveTab('predict')}
              style={{ fontSize: '0.95rem', padding: '0.8rem 1.6rem' }}
            >
              <span>Launch Predictor</span>
              <ArrowRight size={17} />
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => setActiveTab('species')}
              style={{ fontSize: '0.95rem', padding: '0.8rem 1.4rem' }}
            >
              <span>Explore Species</span>
            </button>
          </div>
        </div>
      </div>

      {/* System Flow Diagram */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.4rem', margin: 0 }}>System Workflow</h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem'
        }}>
          <div className="glass-panel" style={{ padding: '1.25rem', textAlign: 'center', background: 'rgba(15, 28, 24, 0.5)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(52, 211, 153, 0.15)', color: 'var(--accent-mint)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
              <CloudRain size={20} />
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700 }}>1. Environmental Input</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Rainfall, Temperature, Soil, Moisture, Sunlight</div>
          </div>

          <div className="glass-panel" style={{ padding: '1.25rem', textAlign: 'center', background: 'rgba(15, 28, 24, 0.5)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
              <Cpu size={20} />
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700 }}>2. Random Forest Model</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Trained ML Preprocessing & Probability Prediction</div>
          </div>

          <div className="glass-panel" style={{ padding: '1.25rem', textAlign: 'center', background: 'rgba(15, 28, 24, 0.5)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
              <Trees size={20} />
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700 }}>3. Species Ranking</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Top 3 Recommended Species & Plantation Guidelines</div>
          </div>

          <div className="glass-panel" style={{ padding: '1.25rem', textAlign: 'center', background: 'rgba(15, 28, 24, 0.5)' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.75rem' }}>
              <Database size={20} />
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: 700 }}>4. History Storage</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>Persistent Database Audit Trail</div>
          </div>
        </div>
      </div>

      {/* Quick Climate Preset Scenarios */}
      <div>
        <div style={{ marginBottom: '1.25rem' }}>
          <h2 style={{ fontSize: '1.4rem', marginBottom: '0.35rem' }}>Quick Test Scenarios</h2>
          <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
            Select a preset scenario to populate parameters and run predictions.
          </p>
        </div>

        <div className="grid-2">
          {presets.map((preset, idx) => (
            <div
              key={idx}
              className="glass-panel glass-panel-interactive"
              style={{ padding: '1.4rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
              onClick={() => {
                onSelectPreset(preset.params);
                setActiveTab('predict');
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <h4 style={{ fontSize: '1.05rem', color: 'var(--accent-mint)' }}>{preset.name}</h4>
                  <span style={{ fontSize: '0.75rem', background: 'rgba(255, 255, 255, 0.08)', padding: '0.18rem 0.55rem', borderRadius: '9999px', color: 'var(--text-secondary)' }}>
                    {preset.params.soil_type} Soil
                  </span>
                </div>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '0.85rem' }}>
                  {preset.desc}
                </p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.65rem' }}>
                <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  <span>🌧️ {preset.params.rainfall_mm} mm</span>
                  <span>🌡️ {preset.params.temperature_c}°C</span>
                  <span>💧 {preset.params.soil_moisture_percent}%</span>
                </div>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-mint)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                  Select <ArrowRight size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
