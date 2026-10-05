import React from 'react';
import {
  Sprout,
  ArrowRight,
  CloudRain,
  Thermometer,
  Layers,
  Droplets,
  Sun,
  Activity,
  Cpu,
  ShieldCheck,
  TrendingUp,
  Compass,
  Sparkles,
  TreePine,
  CheckCircle2,
  AlertOctagon,
  ChevronRight
} from 'lucide-react';

export default function Home({ setActiveTab, onSelectPreset }) {
  const problemCards = [
    {
      icon: CloudRain,
      color: 'var(--accent-cyan)',
      title: 'Rainfall Mismatch',
      subtitle: 'Water Deficit & Flood Stress',
      desc: 'Planting species outside their seasonal precipitation envelope leads to hydraulic failure or root decay.'
    },
    {
      icon: Thermometer,
      color: 'var(--accent-amber)',
      title: 'Thermal Extremes',
      subtitle: 'Heat Shock & Frost Incompatibility',
      desc: 'High ambient heat dries sapling leaf canopies, while unexpected frost stunts cell elongation in tropical cultivars.'
    },
    {
      icon: Layers,
      color: '#a78bfa',
      title: 'Soil Incompatibility',
      subtitle: 'Taxonomy & Drainage Barriers',
      desc: 'Clay compaction restricts aeration, while porous sands fail to retain vital micronutrients for taproots.'
    },
    {
      icon: Droplets,
      color: 'var(--accent-mint)',
      title: 'Soil Moisture Saturation',
      subtitle: 'Root Asphyxiation & Wilting',
      desc: 'Improper moisture percentages induce fungal root grubs or irreversible physiological wilting.'
    },
    {
      icon: Sun,
      color: '#fbbf24',
      title: 'Sunlight Deprivation',
      subtitle: 'Photoperiod Deficits',
      desc: 'Insufficient sunlight hours limit photosynthetic carbohydrate synthesis required for trunk lignification.'
    },
    {
      icon: Activity,
      color: 'var(--accent-rose)',
      title: 'Water Table Stress',
      subtitle: 'Establishment Phase Deficit',
      desc: 'Low local water availability without supplemental drip irrigation causes early-stage sapling mortality.'
    }
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Environmental Inputs',
      desc: 'Collects localized microclimate parameters including rainfall, temperature, soil taxonomy, moisture, and sunlight.',
      icon: CloudRain
    },
    {
      step: '02',
      title: 'AI Preprocessing',
      desc: 'Standardizes continuous climate variables with StandardScaler and OneHotEncodes categorical soil/species vectors.',
      icon: Layers
    },
    {
      step: '03',
      title: 'Random Forest Analysis',
      desc: 'Ensemble of 100 de-correlated decision trees models non-linear botanical survival boundaries.',
      icon: Cpu
    },
    {
      step: '04',
      title: 'Survival Probability',
      desc: 'Outputs calibrated viability percentages and classifies risk tiers (Low, Medium, High Risk).',
      icon: TrendingUp
    },
    {
      step: '05',
      title: 'Multi-Species Ranking',
      desc: 'Simultaneously evaluates all 10 candidate species to determine the Top 3 optimal matches for the site.',
      icon: Sprout
    },
    {
      step: '06',
      title: 'Plantation Guidance',
      desc: 'Generates step-by-step agronomic protocols: pit dimensions, spacing, soil amendments, and watering intervals.',
      icon: ShieldCheck
    }
  ];

  const presets = [
    {
      label: 'Arid / Semi-Drought',
      params: { rainfall_mm: 450, temperature_c: 36.0, soil_type: 'Sandy', soil_moisture_percent: 20.0, sunlight_hours: 9.0, water_availability: 'Low' }
    },
    {
      label: 'Monsoon Alluvial Basin',
      params: { rainfall_mm: 1450, temperature_c: 27.5, soil_type: 'Alluvial', soil_moisture_percent: 65.0, sunlight_hours: 7.0, water_availability: 'High' }
    },
    {
      label: 'Highland Temperate Loam',
      params: { rainfall_mm: 950, temperature_c: 22.0, soil_type: 'Loamy', soil_moisture_percent: 45.0, sunlight_hours: 6.5, water_availability: 'Medium' }
    },
    {
      label: 'Tropical Humid Red Soil',
      params: { rainfall_mm: 2200, temperature_c: 30.0, soil_type: 'Red', soil_moisture_percent: 75.0, sunlight_hours: 8.0, water_availability: 'High' }
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5rem' }}>
      {/* ------------------------------------------------------------------ */}
      {/* 1. CINEMATIC HERO SECTION                                          */}
      {/* ------------------------------------------------------------------ */}
      <section style={{
        position: 'relative',
        borderRadius: 'var(--radius-xl)',
        padding: '4.5rem 2.5rem',
        background: 'linear-gradient(135deg, rgba(8, 22, 16, 0.92) 0%, rgba(4, 12, 8, 0.96) 100%)',
        border: '1px solid rgba(52, 211, 153, 0.25)',
        boxShadow: '0 24px 70px rgba(0, 0, 0, 0.6), var(--shadow-glow-emerald)',
        overflow: 'hidden'
      }}>
        {/* Ambient background glows */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-20%',
          left: '-10%',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.12) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3.5rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Left Column: Headlines & CTAs */}
          <div>
            {/* Pill Tag */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.9rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(52, 211, 153, 0.12)',
              border: '1px solid rgba(52, 211, 153, 0.3)',
              marginBottom: '1.4rem'
            }}>
              <Sparkles size={14} color="var(--accent-mint)" />
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-mint)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                Climate Intelligence Platform
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
              lineHeight: 1.15,
              marginBottom: '1.25rem',
              letterSpacing: '-0.03em'
            }}>
              Plant Smarter. <br />
              <span className="gradient-text">Predict Survival.</span> <br />
              Grow Sustainably.
            </h1>

            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              marginBottom: '2rem',
              maxWidth: '540px'
            }}>
              An AI-powered decision-support system that analyzes microclimatic rainfall, temperature, soil taxonomy, moisture, and sunlight to determine optimal tree species and maximize afforestation survival.
            </p>

            {/* Main Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
              <button
                onClick={() => setActiveTab('predict')}
                className="btn btn-primary"
                style={{ padding: '0.85rem 1.75rem', fontSize: '1rem' }}
              >
                <Sparkles size={18} />
                <span>Predict Tree Survival</span>
                <ArrowRight size={16} />
              </button>

              <button
                onClick={() => setActiveTab('species')}
                className="btn btn-secondary"
                style={{ padding: '0.85rem 1.5rem', fontSize: '0.95rem' }}
              >
                <Sprout size={18} color="var(--accent-mint)" />
                <span>Explore Species Catalog</span>
              </button>
            </div>

            {/* Quick Climate Preset Launchers */}
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.05em', marginBottom: '0.65rem' }}>
                Quick Environmental Presets
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {presets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => onSelectPreset(preset.params)}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-secondary)',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.35rem'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(52, 211, 153, 0.12)';
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.borderColor = 'var(--accent-mint)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                    }}
                  >
                    <span>{preset.label}</span>
                    <ChevronRight size={13} color="var(--accent-mint)" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Environmental Telemetry HUD */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Center Digital Tree Globe */}
            <div style={{
              width: '280px',
              height: '280px',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, rgba(6, 182, 212, 0.1) 50%, transparent 70%)',
              border: '1px solid rgba(52, 211, 153, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 50px rgba(16, 185, 129, 0.35)',
              position: 'relative'
            }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '20px',
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 25px rgba(16, 185, 129, 0.6)',
                marginBottom: '0.6rem'
              }}>
                <TreePine size={38} color="#ffffff" strokeWidth={2.2} />
              </div>
              <div style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-display)' }}>
                Decision Support
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--accent-mint)', fontWeight: 600 }}>
                Random Forest ML Engine
              </div>
            </div>

            {/* Floating Card 1: Rainfall */}
            <div
              className="glass-panel-elevated animate-float-1"
              style={{
                position: 'absolute',
                top: '0',
                left: '0',
                padding: '0.85rem 1.15rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                border: '1px solid rgba(6, 182, 212, 0.35)'
              }}
            >
              <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(6, 182, 212, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CloudRain size={18} color="var(--accent-cyan)" />
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Rainfall</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>1,420 mm</div>
                <div style={{ fontSize: '0.68rem', color: '#67e8f9', fontWeight: 600 }}>Optimal Range</div>
              </div>
            </div>

            {/* Floating Card 2: Soil Moisture */}
            <div
              className="glass-panel-elevated animate-float-2"
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '10px',
                padding: '0.85rem 1.15rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                border: '1px solid rgba(16, 185, 129, 0.35)'
              }}
            >
              <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Droplets size={18} color="var(--accent-mint)" />
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Soil Moisture</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>62%</div>
                <div style={{ fontSize: '0.68rem', color: '#6ee7b7', fontWeight: 600 }}>Healthy Saturation</div>
              </div>
            </div>

            {/* Floating Card 3: Temperature */}
            <div
              className="glass-panel-elevated animate-float-3"
              style={{
                position: 'absolute',
                top: '20px',
                right: '0',
                padding: '0.85rem 1.15rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                border: '1px solid rgba(245, 158, 11, 0.35)'
              }}
            >
              <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(245, 158, 11, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Thermometer size={18} color="var(--accent-amber)" />
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Temperature</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>26.4°C</div>
                <div style={{ fontSize: '0.68rem', color: '#fcd34d', fontWeight: 600 }}>Suitable Thermal</div>
              </div>
            </div>

            {/* Floating Card 4: AI Confidence */}
            <div
              className="glass-panel-elevated animate-float-1"
              style={{
                position: 'absolute',
                bottom: '15px',
                right: '10px',
                padding: '0.85rem 1.15rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                border: '1px solid rgba(167, 139, 250, 0.35)'
              }}
            >
              <div style={{ width: '34px', height: '34px', borderRadius: '8px', background: 'rgba(167, 139, 250, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Cpu size={18} color="#a78bfa" />
              </div>
              <div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>AI Viability</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#ffffff' }}>87.4%</div>
                <div style={{ fontSize: '0.68rem', color: '#c4b5fd', fontWeight: 600 }}>Low Risk Pick</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. WHY DO PLANTED TREES FAIL TO SURVIVE? (Problem Breakdown)       */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 0.8rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(244, 63, 94, 0.12)',
            border: '1px solid rgba(244, 63, 94, 0.3)',
            color: '#fda4af',
            fontSize: '0.78rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            marginBottom: '0.8rem'
          }}>
            <AlertOctagon size={14} /> The Problem
          </div>
          <h2 style={{ fontSize: '2.4rem', marginBottom: '0.8rem' }}>
            Why Do Planted Trees Fail to Survive?
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '680px', margin: '0 auto' }}>
            Traditional mass-planting projects suffer up to 70% sapling mortality within 24 months due to environmental condition mismatches.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem'
        }}>
          {problemCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="glass-panel glass-panel-interactive"
                style={{ padding: '1.75rem' }}
              >
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: `1px solid ${card.color}`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                  boxShadow: `0 0 15px ${card.color}33`
                }}>
                  <Icon size={22} color={card.color} />
                </div>

                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.3rem', color: '#ffffff' }}>
                  {card.title}
                </h3>
                <div style={{ fontSize: '0.78rem', color: 'var(--accent-mint)', fontWeight: 600, marginBottom: '0.75rem' }}>
                  {card.subtitle}
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. HOW TREESENSE AI WORKS (6-Step Connected Pipeline)               */}
      {/* ------------------------------------------------------------------ */}
      <section style={{
        padding: '3.5rem 2rem',
        borderRadius: 'var(--radius-xl)',
        background: 'rgba(7, 18, 13, 0.7)',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.3rem 0.8rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            color: '#6ee7b7',
            fontSize: '0.78rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            marginBottom: '0.8rem'
          }}>
            <Cpu size={14} /> AI Decision Pipeline
          </div>
          <h2 style={{ fontSize: '2.4rem', marginBottom: '0.8rem' }}>
            How TreeSense AI Works
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto' }}>
            From microclimate telemetry ingestion to calibrated machine-learning inference and agronomic care guidance.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.75rem',
          position: 'relative'
        }}>
          {workflowSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '1.6rem',
                  position: 'relative',
                  background: 'rgba(10, 24, 18, 0.8)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-number)',
                      fontSize: '1.6rem',
                      fontWeight: 800,
                      color: 'var(--accent-mint)',
                      opacity: 0.85
                    }}>
                      {step.step}
                    </span>
                    <div style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '10px',
                      background: 'rgba(52, 211, 153, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(52, 211, 153, 0.25)'
                    }}>
                      <Icon size={18} color="var(--accent-mint)" />
                    </div>
                  </div>

                  <h4 style={{ fontSize: '1.15rem', color: '#ffffff', marginBottom: '0.5rem' }}>
                    {step.title}
                  </h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. LIVE ENVIRONMENTAL INTELLIGENCE / SIMULATION SECTION            */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <div style={{
          borderRadius: 'var(--radius-xl)',
          padding: '3rem 2.5rem',
          background: 'linear-gradient(145deg, rgba(14, 34, 25, 0.85), rgba(7, 18, 13, 0.95))',
          border: '1px solid rgba(52, 211, 153, 0.3)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2.5rem',
          alignItems: 'center'
        }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.3rem 0.8rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(6, 182, 212, 0.12)',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              color: '#67e8f9',
              fontSize: '0.78rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}>
              <Activity size={14} /> Microclimate Calibration
            </div>

            <h2 style={{ fontSize: '2.2rem', marginBottom: '1rem' }}>
              Microclimate-Aware Precision Forestry
            </h2>

            <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Every sapling species has evolved distinct root structures, stomatal conductance, and transpiration thresholds. TreeSense AI matches site-specific environmental vectors against native botanical envelopes.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2rem' }}>
              {[
                'Calibrated probabilities from 12,000 synthetic microclimate variations',
                'Transparent biological rule breakdown explaining strengths and risks',
                'Integrated MongoDB telemetry logging with resilient local JSON fallback'
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.88rem', color: '#d1fae5' }}>
                  <CheckCircle2 size={16} color="var(--accent-mint)" style={{ flexShrink: 0 }} />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setActiveTab('predict')}
              className="btn btn-primary"
              style={{ padding: '0.8rem 1.6rem' }}
            >
              <span>Launch Prediction Dashboard</span>
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Right Simulation Dashboard Preview Cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="glass-panel" style={{ padding: '1.25rem', background: 'rgba(5, 14, 10, 0.6)' }}>
              <CloudRain size={20} color="var(--accent-cyan)" style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Rainfall Envelope</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff' }}>200 – 3500 mm</div>
              <div style={{ fontSize: '0.75rem', color: '#67e8f9' }}>19.87% Model Weight</div>
            </div>

            <div className="glass-panel" style={{ padding: '1.25rem', background: 'rgba(5, 14, 10, 0.6)' }}>
              <Thermometer size={20} color="var(--accent-amber)" style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Thermal Range</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff' }}>10 – 48 °C</div>
              <div style={{ fontSize: '0.75rem', color: '#fcd34d' }}>19.39% Model Weight</div>
            </div>

            <div className="glass-panel" style={{ padding: '1.25rem', background: 'rgba(5, 14, 10, 0.6)' }}>
              <Droplets size={20} color="var(--accent-mint)" style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Moisture Saturation</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff' }}>5 – 95 %</div>
              <div style={{ fontSize: '0.75rem', color: '#6ee7b7' }}>17.46% Model Weight</div>
            </div>

            <div className="glass-panel" style={{ padding: '1.25rem', background: 'rgba(5, 14, 10, 0.6)' }}>
              <Sun size={20} color="#fbbf24" style={{ marginBottom: '0.5rem' }} />
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Sunlight Hours</div>
              <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff' }}>3 – 12 hrs/day</div>
              <div style={{ fontSize: '0.75rem', color: '#fef08a' }}>16.77% Model Weight</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
