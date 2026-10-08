import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  CloudRain,
  Thermometer,
  Layers,
  Droplets,
  Sun,
  Activity,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  BookmarkCheck,
  Sprout,
  ArrowRight,
  TrendingUp,
  Cpu,
  Compass,
  Award,
  Check,
  Clock,
  Zap,
  Info
} from 'lucide-react';
import RadialGauge from '../components/RadialGauge';
import StatusBadge from '../components/StatusBadge';
import SpeciesCard from '../components/SpeciesCard';
import PlantationGuideModal from '../components/PlantationGuideModal';
import { predictSurvival, getSpeciesRecommendations, savePredictionRecord } from '../services/api';

const ALL_SPECIES = [
  'Mango',
  'Guava',
  'Banana',
  'Coconut',
  'Papaya',
  'Pomegranate',
  'Lemon',
  'Jackfruit',
  'Sapota',
  'Amla'
];

const SOIL_TYPES = [
  { value: 'Loamy', label: 'Loamy (Balanced, fertile, moisture retentive)' },
  { value: 'Alluvial', label: 'Alluvial (River basin, high organic matter)' },
  { value: 'Red', label: 'Red (Iron-rich, porous, well-draining)' },
  { value: 'Black', label: 'Black (Regur, moisture heavy, deep clay)' },
  { value: 'Clay', label: 'Clay (Dense, slow drainage, high nutrient retention)' },
  { value: 'Sandy', label: 'Sandy (Light, rapid drainage, low moisture)' }
];

export default function PredictDashboard({ currentParams, setFormParams }) {
  const [params, setParams] = useState(
    currentParams || {
      rainfall_mm: 1200,
      temperature_c: 28.0,
      soil_type: 'Loamy',
      soil_moisture_percent: 50.0,
      sunlight_hours: 7.5,
      water_availability: 'Medium',
      tree_species: 'Mango'
    }
  );

  const [loading, setLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState('');
  const [predictionResult, setPredictionResult] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [selectedGuideSpecies, setSelectedGuideSpecies] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Sync with currentParams if changed from outside
  useEffect(() => {
    if (currentParams) {
      setParams(currentParams);
    }
  }, [currentParams]);

  const handleChange = (field, value) => {
    const updated = { ...params, [field]: value };
    setParams(updated);
    if (setFormParams) setFormParams(updated);
    setSavedSuccess(false);
    setErrorMessage(null);
  };

  const handlePredict = async () => {
    setLoading(true);
    setErrorMessage(null);
    setPredictionResult(null);

    // Realistic multi-stage telemetry message
    setLoadingStage('Analyzing environmental compatibility...');
    const t1 = setTimeout(() => setLoadingStage('Running Random Forest inference...'), 350);
    const t2 = setTimeout(() => setLoadingStage('Generating plantation recommendations...'), 700);

    try {
      const payload = {
        rainfall_mm: Number(params.rainfall_mm),
        temperature_c: Number(params.temperature_c),
        soil_type: params.soil_type,
        soil_moisture_percent: Number(params.soil_moisture_percent),
        sunlight_hours: Number(params.sunlight_hours),
        water_availability: params.water_availability,
        tree_species: params.tree_species
      };

      // Concurrent Predict + Multi-species Recommendations
      const [predData, recData] = await Promise.all([
        predictSurvival(payload),
        getSpeciesRecommendations(payload)
      ]);

      setPredictionResult(predData);
      setRecommendations(recData);

      // Automatically save to database/fallback history
      try {
        await savePredictionRecord({
          environmental_inputs: payload,
          selected_species: predData.tree_species,
          survival_probability: predData.survival_probability,
          survival_percentage: predData.survival_percentage,
          prediction: predData.survival_prediction,
          status: predData.status,
          risk_level: predData.risk_level,
          recommended_species: recData?.top_3_recommendations?.map(s => s.name) || [],
          recommendation_reason: predData.recommendation_reason,
          notes: 'Auto-saved by TreeSense AI Engine'
        });
        setSavedSuccess(true);
      } catch (saveErr) {
        console.warn('Could not auto-save prediction record:', saveErr);
      }
    } catch (err) {
      console.error('Prediction failed:', err);
      setErrorMessage(err.message || 'Unable to complete AI inference. Please verify inputs.');
    } finally {
      clearTimeout(t1);
      clearTimeout(t2);
      setLoading(false);
      setLoadingStage('');
    }
  };

  const handlePreset = (presetParams) => {
    setParams({ ...params, ...presetParams });
    if (setFormParams) setFormParams({ ...params, ...presetParams });
  };

  // Environmental DNA calculation (0 to 100 normalized score for each dimension)
  const normRain = Math.min(100, Math.round((params.rainfall_mm / 3500) * 100));
  const normTemp = Math.min(100, Math.round(((params.temperature_c - 10) / 38) * 100));
  const normMoist = Math.round(params.soil_moisture_percent);
  const normSun = Math.min(100, Math.round((params.sunlight_hours / 12) * 100));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Page Title & Breadcrumb */}
      <div>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.45rem',
          fontSize: '0.78rem',
          fontWeight: 700,
          color: 'var(--accent-mint)',
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          marginBottom: '0.4rem'
        }}>
          <Activity size={14} /> AI Decision Support Engine
        </div>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '0.4rem' }}>
          Tree Survival Prediction & Decision Dashboard
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '780px' }}>
          Configure localized environmental parameters to predict species viability via Random Forest classification and generate optimal multi-species afforestation recommendations.
        </p>
      </div>

      {/* Main 2-Column Dashboard Grid */}
      <div
        className="dashboard-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(360px, 480px) 1fr',
          gap: '2rem',
          alignItems: 'start'
        }}
      >
        {/* ================================================================ */}
        {/* LEFT COLUMN: ENVIRONMENTAL INPUT PANEL                           */}
        {/* ================================================================ */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div>
              <h3 style={{ fontSize: '1.25rem', margin: 0, color: '#ffffff' }}>
                Environmental Conditions
              </h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                Configure localized microclimate
              </div>
            </div>

            <button
              onClick={() => handlePreset({ rainfall_mm: 1200, temperature_c: 28.0, soil_type: 'Loamy', soil_moisture_percent: 50.0, sunlight_hours: 7.5, water_availability: 'Medium' })}
              title="Reset to default parameters"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid var(--border-subtle)',
                color: 'var(--text-secondary)',
                borderRadius: '8px',
                padding: '0.4rem 0.6rem',
                fontSize: '0.75rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <RotateCcw size={13} /> Reset
            </button>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handlePredict(); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.4rem' }}>
            {/* Tree Species Selector */}
            <div className="form-group">
              <label className="form-label">
                <span>Target Tree Species</span>
                <span style={{ color: 'var(--accent-mint)', fontSize: '0.78rem' }}>10 Candidates</span>
              </label>
              <select
                value={params.tree_species}
                onChange={(e) => handleChange('tree_species', e.target.value)}
                className="form-select"
                style={{ fontWeight: 600 }}
              >
                {ALL_SPECIES.map((sp) => (
                  <option key={sp} value={sp} style={{ background: '#091a13', color: '#ffffff' }}>
                    {sp}
                  </option>
                ))}
              </select>
            </div>

            {/* Rainfall Slider + Input */}
            <div className="form-group">
              <div className="form-label">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CloudRain size={15} color="var(--accent-cyan)" /> Annual Rainfall
                </span>
                <span style={{ fontFamily: 'var(--font-number)', fontWeight: 700, color: '#ffffff', fontSize: '0.95rem' }}>
                  {params.rainfall_mm} mm
                </span>
              </div>
              <input
                type="range"
                min="200"
                max="3500"
                step="25"
                value={params.rainfall_mm}
                onChange={(e) => handleChange('rainfall_mm', Number(e.target.value))}
                className="slider-premium"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                <span>200 mm (Arid)</span>
                <span>1800 mm (Monsoon)</span>
                <span>3500 mm (Rainforest)</span>
              </div>
            </div>

            {/* Temperature Slider + Input */}
            <div className="form-group">
              <div className="form-label">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Thermometer size={15} color="var(--accent-amber)" /> Ambient Temperature
                </span>
                <span style={{ fontFamily: 'var(--font-number)', fontWeight: 700, color: '#ffffff', fontSize: '0.95rem' }}>
                  {params.temperature_c} °C
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="48"
                step="0.5"
                value={params.temperature_c}
                onChange={(e) => handleChange('temperature_c', Number(e.target.value))}
                className="slider-premium"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                <span>10°C (Cool)</span>
                <span>28°C (Optimal)</span>
                <span>48°C (Extreme Heat)</span>
              </div>
            </div>

            {/* Soil Type Selector */}
            <div className="form-group">
              <label className="form-label">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Layers size={15} color="#a78bfa" /> Soil Classification
                </span>
              </label>
              <select
                value={params.soil_type}
                onChange={(e) => handleChange('soil_type', e.target.value)}
                className="form-select"
              >
                {SOIL_TYPES.map((soil) => (
                  <option key={soil.value} value={soil.value} style={{ background: '#091a13', color: '#ffffff' }}>
                    {soil.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Soil Moisture Slider */}
            <div className="form-group">
              <div className="form-label">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Droplets size={15} color="var(--accent-mint)" /> Soil Moisture Saturation
                </span>
                <span style={{ fontFamily: 'var(--font-number)', fontWeight: 700, color: '#ffffff', fontSize: '0.95rem' }}>
                  {params.soil_moisture_percent}%
                </span>
              </div>
              <input
                type="range"
                min="5"
                max="95"
                step="1"
                value={params.soil_moisture_percent}
                onChange={(e) => handleChange('soil_moisture_percent', Number(e.target.value))}
                className="slider-premium"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                <span>5% (Dry)</span>
                <span>50% (Moist)</span>
                <span>95% (Waterlogged)</span>
              </div>
            </div>

            {/* Daily Sunlight Hours */}
            <div className="form-group">
              <div className="form-label">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sun size={15} color="#fbbf24" /> Sunlight Exposure
                </span>
                <span style={{ fontFamily: 'var(--font-number)', fontWeight: 700, color: '#ffffff', fontSize: '0.95rem' }}>
                  {params.sunlight_hours} hrs/day
                </span>
              </div>
              <input
                type="range"
                min="3"
                max="12"
                step="0.5"
                value={params.sunlight_hours}
                onChange={(e) => handleChange('sunlight_hours', Number(e.target.value))}
                className="slider-premium"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                <span>3.0 hrs (Shade)</span>
                <span>7.5 hrs (Full Sun)</span>
                <span>12.0 hrs (Intense)</span>
              </div>
            </div>

            {/* Water Availability Segmented Control */}
            <div className="form-group">
              <label className="form-label">
                <span>Water Table / Accessibility</span>
              </label>
              <div className="segmented-control">
                {['Low', 'Medium', 'High'].map((level) => (
                  <button
                    type="button"
                    key={level}
                    onClick={() => handleChange('water_availability', level)}
                    className={`segmented-btn ${params.water_availability === level ? 'active' : ''}`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Environmental DNA Visual Bar */}
            <div style={{
              padding: '0.9rem',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(5, 14, 10, 0.75)',
              border: '1px solid var(--border-subtle)'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--text-muted)',
                textTransform: 'uppercase',
                marginBottom: '0.6rem'
              }}>
                <span>Environmental Profile</span>
                <span style={{ color: 'var(--accent-mint)' }}>Live Telemetry</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.76rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Rainfall Index</span>
                  <span style={{ color: 'var(--accent-cyan)' }}>{normRain}%</span>
                </div>
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${normRain}%`, height: '100%', background: 'var(--accent-cyan)', transition: 'width 0.2s ease' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.2rem' }}>
                  <span style={{ color: 'var(--text-secondary)' }}>Thermal Index</span>
                  <span style={{ color: 'var(--accent-amber)' }}>{normTemp}%</span>
                </div>
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.06)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${normTemp}%`, height: '100%', background: 'var(--accent-amber)', transition: 'width 0.2s ease' }} />
                </div>
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div style={{
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                background: 'rgba(244, 63, 94, 0.12)',
                border: '1px solid rgba(244, 63, 94, 0.35)',
                color: '#fda4af',
                fontSize: '0.84rem'
              }}>
                {errorMessage}
              </div>
            )}

            {/* Primary Predict Action Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{
                width: '100%',
                padding: '0.95rem',
                fontSize: '1rem',
                borderRadius: 'var(--radius-md)'
              }}
            >
              {loading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <span className="pulse-dot" />
                  <span>{loadingStage || 'Analyzing Survival...'}</span>
                </div>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Analyze Survival & Recommend</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* ================================================================ */}
        {/* RIGHT COLUMN: PREDICTION RESULTS & DECISION INTELLIGENCE         */}
        {/* ================================================================ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {predictionResult ? (
            <>
              {/* Main Score Hero Card */}
              <div className="glass-panel-elevated" style={{ padding: '2.2rem', position: 'relative', overflow: 'hidden' }}>
                {/* Background glow accent */}
                <div style={{
                  position: 'absolute',
                  top: '-30%',
                  right: '-10%',
                  width: '300px',
                  height: '300px',
                  borderRadius: '50%',
                  background: predictionResult.survival_probability >= 0.68
                    ? 'radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)'
                    : 'radial-gradient(circle, rgba(245, 158, 11, 0.18) 0%, transparent 70%)',
                  pointerEvents: 'none'
                }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                      Prediction Output
                    </div>
                    <h2 style={{ fontSize: '1.8rem', color: '#ffffff', margin: '0.1rem 0' }}>
                      {predictionResult.tree_species}
                    </h2>
                    <div style={{ fontSize: '0.86rem', color: 'var(--accent-mint)', fontStyle: 'italic' }}>
                      {predictionResult.scientific_name}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    <StatusBadge riskLevel={predictionResult.risk_level} status={predictionResult.status} />
                    {savedSuccess && (
                      <span style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '0.75rem',
                        color: 'var(--accent-mint)',
                        padding: '0.3rem 0.6rem',
                        borderRadius: 'var(--radius-full)',
                        background: 'rgba(52, 211, 153, 0.1)',
                        border: '1px solid rgba(52, 211, 153, 0.25)'
                      }}>
                        <Check size={12} /> Logged to DB
                      </span>
                    )}
                  </div>
                </div>

                {/* Center Animated Gauge */}
                <div style={{ margin: '1rem 0 1.5rem 0' }}>
                  <RadialGauge
                    percentage={predictionResult.survival_percentage}
                    riskLevel={predictionResult.risk_level}
                    status={predictionResult.status}
                    size={240}
                  />
                </div>

                {/* AI Decision Summary Table Box */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                  gap: '0.75rem',
                  padding: '1.25rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(5, 14, 10, 0.8)',
                  border: '1px solid var(--border-color)',
                  marginBottom: '1.5rem'
                }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Viability Score</div>
                    <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--accent-mint)' }}>
                      {predictionResult.survival_percentage}%
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Risk Tier</div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: '#ffffff' }}>
                      {predictionResult.risk_level}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Model Decision</div>
                    <div style={{ fontSize: '1rem', fontWeight: 700, color: predictionResult.survival_prediction === 1 ? '#6ee7b7' : '#fda4af' }}>
                      {predictionResult.survival_prediction === 1 ? 'Suitable' : 'High Risk'}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>ML Architecture</div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                      Random Forest
                    </div>
                  </div>
                </div>

                {/* AI Explanation Text */}
                <div style={{
                  padding: '1.15rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(16, 185, 129, 0.07)',
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-mint)', marginBottom: '0.4rem' }}>
                    <Info size={15} /> AI Reasoning & Environmental Analysis
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.55 }}>
                    {predictionResult.recommendation_reason}
                  </p>
                </div>

                {/* Strengths & Warnings Pills */}
                {predictionResult.rule_breakdown && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    {predictionResult.rule_breakdown.strengths?.map((str, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#a7f3d0' }}>
                        <CheckCircle2 size={15} color="var(--accent-mint)" style={{ flexShrink: 0 }} />
                        <span>{str}</span>
                      </div>
                    ))}
                    {predictionResult.rule_breakdown.warnings?.map((warn, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', color: '#fcd34d' }}>
                        <AlertTriangle size={15} color="var(--accent-amber)" style={{ flexShrink: 0 }} />
                        <span>{warn}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* View Full Protocol Button */}
                <button
                  onClick={() => setSelectedGuideSpecies({ name: predictionResult.tree_species, ...predictionResult })}
                  className="btn btn-secondary"
                  style={{ width: '100%', padding: '0.75rem' }}
                >
                  <Sprout size={16} color="var(--accent-mint)" />
                  <span>View Plantation Protocol for {predictionResult.tree_species}</span>
                  <ArrowRight size={15} />
                </button>
              </div>

              {/* TOP 3 SPECIES RECOMMENDATIONS */}
              {recommendations?.top_3_recommendations && (
                <div>
                  <div style={{ marginBottom: '1.25rem' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      fontSize: '0.75rem',
                      fontWeight: 700,
                      color: 'var(--accent-mint)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.04em'
                    }}>
                      <Award size={14} /> Multi-Species Decision Matrix
                    </div>
                    <h3 style={{ fontSize: '1.4rem', color: '#ffffff', margin: '0.2rem 0' }}>
                      Best Species for This Environment
                    </h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      AI-ranked candidate tree species evaluated under your exact microclimate parameters.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                    {recommendations.top_3_recommendations.map((rec) => (
                      <SpeciesCard
                        key={rec.name}
                        species={rec}
                        onOpenGuide={(sp) => setSelectedGuideSpecies(sp)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Empty State: Invitation to Predict */
            <div className="glass-panel" style={{
              padding: '4rem 2rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '480px'
            }}>
              <div style={{
                width: '68px',
                height: '68px',
                borderRadius: '20px',
                background: 'rgba(52, 211, 153, 0.1)',
                border: '1px solid rgba(52, 211, 153, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '1.25rem'
              }}>
                <Sprout size={32} color="var(--accent-mint)" />
              </div>

              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem', color: '#ffffff' }}>
                Ready for Environmental Analysis
              </h3>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '420px', marginBottom: '2rem', lineHeight: 1.6 }}>
                Adjust the environmental sliders on the left panel or choose a quick climate preset, then click <strong>Analyze Survival</strong> to calculate survival probabilities and top species recommendations.
              </p>

              <button
                onClick={handlePredict}
                className="btn btn-primary"
                style={{ padding: '0.8rem 1.6rem' }}
              >
                <Sparkles size={16} /> Run Analysis on Current Parameters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Plantation Guide Modal */}
      <PlantationGuideModal
        species={selectedGuideSpecies}
        isOpen={!!selectedGuideSpecies}
        onClose={() => setSelectedGuideSpecies(null)}
      />
    </div>
  );
}
