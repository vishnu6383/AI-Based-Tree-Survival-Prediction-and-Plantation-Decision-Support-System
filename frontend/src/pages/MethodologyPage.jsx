import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Cpu, Layers, CheckCircle2 } from 'lucide-react';
import { getModelMetrics } from '../services/api';

export default function MethodologyPage() {
  const [modelData, setModelData] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await getModelMetrics();
        setModelData(data);
      } catch (err) {
        console.error("Error fetching metrics:", err);
      }
    };
    fetchMetrics();
  }, []);

  const featureData = (modelData?.feature_importances || []).slice(0, 6).map(f => ({
    name: f.feature.replace('tree_species_', 'Species: ').replace('soil_type_', 'Soil: ').replace('water_availability_', 'Water: '),
    importance: parseFloat((f.importance * 100).toFixed(2))
  }));

  const metrics = modelData?.metrics || {
    accuracy: 0.86,
    precision: 0.8744,
    recall: 0.9804,
    f1_score: 0.9244
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>
          Model Architecture & Performance
        </h1>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
          Random Forest Classifier trained on environmental features using scikit-learn Pipeline.
        </p>
      </div>

      {/* Metric Highlights Grid */}
      <div className="grid-4">
        <div className="glass-panel" style={{ padding: '1.4rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.35rem' }}>
            Model Accuracy
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--accent-mint)' }}>
            {(metrics.accuracy * 100).toFixed(1)}%
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Test Split
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.4rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.35rem' }}>
            Precision
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--accent-cyan)' }}>
            {(metrics.precision * 100).toFixed(1)}%
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Positive Predictive Value
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.4rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.35rem' }}>
            Recall
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: 'var(--accent-emerald)' }}>
            {(metrics.recall * 100).toFixed(1)}%
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            True Positive Rate
          </div>
        </div>

        <div className="glass-panel" style={{ padding: '1.4rem', textAlign: 'center' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600, marginBottom: '0.35rem' }}>
            F1-Score
          </div>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', fontWeight: 700, color: '#a78bfa' }}>
            {(metrics.f1_score * 100).toFixed(1)}%
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            Harmonic Mean
          </div>
        </div>
      </div>

      {/* Feature Importance Recharts Bar Chart */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ marginBottom: '1.25rem' }}>
          <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Feature Importance Weightings (%)</h3>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
            Contribution of environmental variables in decision trees.
          </p>
        </div>

        <div style={{ height: '260px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={featureData} layout="vertical" margin={{ top: 10, right: 30, left: 70, bottom: 10 }}>
              <XAxis type="number" unit="%" tick={{ fill: '#94a89e', fontSize: 12 }} domain={[0, 'dataMax + 5']} />
              <YAxis dataKey="name" type="category" tick={{ fill: '#f3fbf6', fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f1c18',
                  borderColor: 'rgba(52, 211, 153, 0.3)',
                  borderRadius: '8px',
                  color: '#f3fbf6'
                }}
                formatter={(val) => [`${val}%`, 'Importance']}
              />
              <Bar dataKey="importance" fill="#10b981" radius={[0, 6, 6, 0]}>
                {featureData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? '#34d399' : '#10b981'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Technical Pipeline Overview */}
      <div className="grid-2">
        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-mint)', marginBottom: '0.85rem' }}>
            <Layers size={18} />
            <h3 style={{ fontSize: '1.15rem' }}>Preprocessing Pipeline</h3>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <CheckCircle2 size={15} color="var(--accent-mint)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span><strong>Numerical Features:</strong> Scaled with `StandardScaler` (Rainfall, Temperature, Moisture, Sunlight).</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <CheckCircle2 size={15} color="var(--accent-mint)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span><strong>Categorical Features:</strong> Encoded with `OneHotEncoder` (Soil Type, Water Availability, Tree Species).</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <CheckCircle2 size={15} color="var(--accent-mint)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span><strong>Pipeline:</strong> Unified `scikit-learn` Pipeline for consistent training and real-time inference.</span>
            </li>
          </ul>
        </div>

        <div className="glass-panel" style={{ padding: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', marginBottom: '0.85rem' }}>
            <Cpu size={18} />
            <h3 style={{ fontSize: '1.15rem' }}>Random Forest Model</h3>
          </div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.86rem', color: 'var(--text-secondary)' }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <CheckCircle2 size={15} color="var(--accent-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span><strong>Estimators:</strong> 150 Decision Trees with balanced class weighting.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <CheckCircle2 size={15} color="var(--accent-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span><strong>Inference:</strong> Calibrated probability estimation via `predict_proba`.</span>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <CheckCircle2 size={15} color="var(--accent-cyan)" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span><strong>Multi-Species Ranking:</strong> Evaluates and ranks candidate species under identical microclimate parameters.</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
