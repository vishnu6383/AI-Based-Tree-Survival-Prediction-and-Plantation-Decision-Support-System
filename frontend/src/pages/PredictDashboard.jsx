import React, { useState, useEffect } from 'react';
import {
  Trees, CloudRain, Thermometer, Layers, Droplets, Sun, Sparkles,
  CheckCircle2, AlertTriangle, RefreshCw, Sprout, ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import RadialGauge from '../components/RadialGauge';
import StatusBadge from '../components/StatusBadge';
import SpeciesCard from '../components/SpeciesCard';
import PlantationGuideModal from '../components/PlantationGuideModal';
import { predictSurvival, getSpeciesRecommendations, savePredictionRecord } from '../services/api';

const SOIL_OPTIONS = ["Red", "Black", "Loamy", "Sandy", "Clay", "Alluvial"];
const WATER_OPTIONS = ["Low", "Medium", "High"];
const SPECIES_OPTIONS = [
  "Neem", "Teak", "Banyan", "Peepal", "Eucalyptus",
  "Sal", "Gulmohar", "Bamboo", "Mango", "Mahogany"
];

export default function PredictDashboard({ currentParams, setFormParams }) {
  const [formData, setFormData] = useState(currentParams || {
    rainfall_mm: 1200,
    temperature_c: 28.0,
    soil_type: "Loamy",
    soil_moisture_percent: 45.0,
    sunlight_hours: 7.5,
    water_availability: "Medium",
    tree_species: "Neem"
  });

  const [loading, setLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [selectedGuideSpecies, setSelectedGuideSpecies] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  // Sync external preset selections
  useEffect(() => {
    if (currentParams) {
      setFormData(currentParams);
    }
  }, [currentParams]);

  const handleInputChange = (field, value) => {
    const updated = { ...formData, [field]: value };
    setFormData(updated);
    if (setFormParams) setFormParams(updated);
  };

  const handleRunInference = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    try {
      // 1. Run single-species prediction (automatically saved in backend database history)
      const predRes = await predictSurvival(formData);
      setPredictionResult(predRes);

      // Trigger celebratory confetti for high survival score
      if (predRes.survival_probability >= 0.70) {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      }

      // 2. Fetch top 3 species recommendations
      const recPayload = {
        rainfall_mm: formData.rainfall_mm,
        temperature_c: formData.temperature_c,
        soil_type: formData.soil_type,
        soil_moisture_percent: formData.soil_moisture_percent,
        sunlight_hours: formData.sunlight_hours,
        water_availability: formData.water_availability
      };
      const recRes = await getSpeciesRecommendations(recPayload);
      setRecommendations(recRes);

      // 3. Ensure full record with recommended species is updated in history
      try {
        await savePredictionRecord({
          environmental_inputs: formData,
          selected_species: formData.tree_species,
          survival_probability: predRes.survival_probability,
          survival_percentage: predRes.survival_percentage,
          prediction: predRes.survival_prediction,
          status: predRes.status,
          risk_level: predRes.risk_level,
          recommended_species: recRes?.top_species?.map(s => s.name) || [],
          recommendation_reason: predRes.recommendation_reason
        });
      } catch (saveErr) {
        console.warn("Client history sync:", saveErr);
      }

    } catch (err) {
      console.error("Inference Error:", err);
      setErrorMessage(err.message || "Failed to execute prediction. Please verify inputs.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Page Header */}
      <div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>
          Tree Survival Prediction & Decision Support
        </h1>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
          Configure environmental parameters to calculate survival probability and receive species recommendations.
        </p>
      </div>

      {errorMessage && (
        <div style={{
          background: 'rgba(244, 63, 94, 0.15)',
          border: '1px solid rgba(244, 63, 94, 0.4)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.25rem',
          color: '#fca5a5',
          fontSize: '0.88rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <AlertTriangle size={18} />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Main Grid: Inputs Form & Live Results */}
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 480px) 1fr', gap: '2rem', alignItems: 'start' }}>
        
        {/* Environmental Input Form */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-mint)' }}>
              <Trees size={20} />
              <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Environmental Parameters</h3>
            </div>
            <button
              type="button"
              className="btn btn-outline"
              style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
              onClick={() => {
                setFormData({
                  rainfall_mm: 1200,
                  temperature_c: 28.0,
                  soil_type: "Loamy",
                  soil_moisture_percent: 45.0,
                  sunlight_hours: 7.5,
                  water_availability: "Medium",
                  tree_species: "Neem"
                });
              }}
            >
              Reset
            </button>
          </div>

          <form onSubmit={handleRunInference} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            
            {/* Target Tree Species Selector */}
            <div className="form-group">
              <label className="form-label">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sprout size={15} color="var(--accent-mint)" /> Candidate Species to Evaluate
                </span>
              </label>
              <select
                className="form-select"
                value={formData.tree_species}
                onChange={(e) => handleInputChange('tree_species', e.target.value)}
              >
                {SPECIES_OPTIONS.map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Rainfall Slider */}
            <div className="form-group">
              <div className="form-label">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <CloudRain size={15} color="var(--accent-cyan)" /> Annual Rainfall
                </span>
                <span className="form-value-badge">{formData.rainfall_mm} mm</span>
              </div>
              <input
                type="range"
                min="200"
                max="3500"
                step="25"
                value={formData.rainfall_mm}
                onChange={(e) => handleInputChange('rainfall_mm', parseFloat(e.target.value))}
                className="form-range"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                <span>200 mm (Dry)</span>
                <span>1800 mm</span>
                <span>3500 mm (Wet)</span>
              </div>
            </div>

            {/* Temperature Slider */}
            <div className="form-group">
              <div className="form-label">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Thermometer size={15} color="#fb7185" /> Average Temperature
                </span>
                <span className="form-value-badge">{formData.temperature_c}°C</span>
              </div>
              <input
                type="range"
                min="10"
                max="48"
                step="0.5"
                value={formData.temperature_c}
                onChange={(e) => handleInputChange('temperature_c', parseFloat(e.target.value))}
                className="form-range"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                <span>10°C</span>
                <span>28°C</span>
                <span>48°C</span>
              </div>
            </div>

            {/* Soil Type Dropdown */}
            <div className="form-group">
              <label className="form-label">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Layers size={15} color="var(--accent-amber)" /> Soil Classification
                </span>
              </label>
              <select
                className="form-select"
                value={formData.soil_type}
                onChange={(e) => handleInputChange('soil_type', e.target.value)}
              >
                {SOIL_OPTIONS.map(soil => (
                  <option key={soil} value={soil}>{soil} Soil</option>
                ))}
              </select>
            </div>

            {/* Soil Moisture Slider */}
            <div className="form-group">
              <div className="form-label">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Droplets size={15} color="var(--accent-cyan)" /> Soil Moisture
                </span>
                <span className="form-value-badge">{formData.soil_moisture_percent}%</span>
              </div>
              <input
                type="range"
                min="5"
                max="95"
                step="1"
                value={formData.soil_moisture_percent}
                onChange={(e) => handleInputChange('soil_moisture_percent', parseFloat(e.target.value))}
                className="form-range"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                <span>5%</span>
                <span>50%</span>
                <span>95%</span>
              </div>
            </div>

            {/* Sunlight Hours Slider */}
            <div className="form-group">
              <div className="form-label">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sun size={15} color="#fbbf24" /> Daily Sunlight
                </span>
                <span className="form-value-badge">{formData.sunlight_hours} hrs/day</span>
              </div>
              <input
                type="range"
                min="3"
                max="12"
                step="0.5"
                value={formData.sunlight_hours}
                onChange={(e) => handleInputChange('sunlight_hours', parseFloat(e.target.value))}
                className="form-range"
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                <span>3 hrs</span>
                <span>7.5 hrs</span>
                <span>12 hrs</span>
              </div>
            </div>

            {/* Water Availability Dropdown */}
            <div className="form-group">
              <label className="form-label">
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Droplets size={15} color="var(--accent-mint)" /> Water Availability
                </span>
              </label>
              <select
                className="form-select"
                value={formData.water_availability}
                onChange={(e) => handleInputChange('water_availability', e.target.value)}
              >
                {WATER_OPTIONS.map(opt => (
                  <option key={opt} value={opt}>{opt}</option>
                ))}
              </select>
            </div>

            {/* Submit Inference Button */}
            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.9rem', marginTop: '0.5rem' }}
            >
              {loading ? (
                <>
                  <RefreshCw size={18} className="animate-spin" />
                  <span>Calculating Prediction...</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Predict Tree Survival</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Prediction Results & Decision Support */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
          
          {predictionResult ? (
            <>
              {/* Main Scorecard */}
              <div className="glass-panel" style={{ padding: '2rem', position: 'relative', overflow: 'hidden' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                      <Sprout size={20} color="var(--accent-mint)" />
                      <h2 style={{ fontSize: '1.5rem', margin: 0 }}>{predictionResult.tree_species}</h2>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                      {predictionResult.scientific_name}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <StatusBadge
                      riskLevel={predictionResult.risk_level}
                      status={predictionResult.status}
                    />
                  </div>
                </div>

                {/* Gauge & Analysis layout */}
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(180px, 220px) 1fr', gap: '2rem', alignItems: 'center' }}>
                  <div>
                    <RadialGauge percentage={predictionResult.survival_percentage} />
                  </div>

                  <div>
                    <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                      Evaluation Summary
                    </h4>
                    <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55, marginBottom: '1rem' }}>
                      {predictionResult.recommendation_reason}
                    </p>

                    {/* Rule Strengths / Warnings pills */}
                    {predictionResult.rule_breakdown?.strengths?.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '0.75rem' }}>
                        {predictionResult.rule_breakdown.strengths.slice(0, 2).map((str, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#6ee7b7' }}>
                            <CheckCircle2 size={14} style={{ flexShrink: 0 }} />
                            <span>{str}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {predictionResult.rule_breakdown?.warnings?.length > 0 && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                        {predictionResult.rule_breakdown.warnings.slice(0, 2).map((warn, idx) => (
                          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem', color: '#fca5a5' }}>
                            <AlertTriangle size={14} style={{ flexShrink: 0 }} />
                            <span>{warn}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Status Bar */}
                <div style={{
                  marginTop: '1.75rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}>
                  <button
                    className="btn btn-secondary"
                    style={{ padding: '0.55rem 1rem', fontSize: '0.84rem' }}
                    onClick={() => setSelectedGuideSpecies(predictionResult)}
                  >
                    <Sprout size={15} color="var(--accent-mint)" /> View Plantation Protocol
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.82rem', color: 'var(--accent-mint)' }}>
                    <CheckCircle2 size={15} />
                    <span>Saved to History</span>
                  </div>
                </div>
              </div>

              {/* Top 3 Species Recommendations */}
              {recommendations?.top_species && (
                <div>
                  <div style={{ marginBottom: '1rem' }}>
                    <h3 style={{ fontSize: '1.3rem', margin: 0 }}>
                      Top Recommended Species
                    </h3>
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      Ranked by survival probability under the specified environment.
                    </p>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
                    {recommendations.top_species.map((sp) => (
                      <SpeciesCard
                        key={sp.name}
                        species={sp}
                        onOpenGuide={(speciesObj) => setSelectedGuideSpecies(speciesObj)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Empty State */
            <div className="glass-panel" style={{
              padding: '4rem 2rem',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1.25rem'
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(52, 211, 153, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-mint)'
              }}>
                <Trees size={32} />
              </div>
              <div style={{ maxWidth: '420px' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.4rem' }}>Ready for Prediction</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                  Select your environmental conditions and click <strong>"Predict Tree Survival"</strong> to see results.
                </p>
              </div>
              <button
                className="btn btn-primary"
                onClick={handleRunInference}
                style={{ marginTop: '0.5rem' }}
              >
                <Sparkles size={16} /> Run Prediction
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Full Plantation Guide Modal */}
      <PlantationGuideModal
        species={selectedGuideSpecies}
        isOpen={!!selectedGuideSpecies}
        onClose={() => setSelectedGuideSpecies(null)}
      />
    </div>
  );
}
