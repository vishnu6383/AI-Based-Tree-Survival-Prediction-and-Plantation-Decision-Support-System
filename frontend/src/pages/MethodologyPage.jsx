import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Cpu,
  Layers,
  Database,
  CheckCircle2,
  TrendingUp,
  BarChart3,
  GitBranch,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { getModelMetrics } from '../services/api';

export default function MethodologyPage() {
  const [metricsData, setMetricsData] = useState({

    metrics: {
      accuracy: 0.86,
      precision: 0.8744,
      recall: 0.9804,
      f1_score: 0.9244,
      roc_auc: 0.6007,
      confusion_matrix: {
        true_negative: 10,
        false_positive: 295,
        false_negative: 41,
        true_positive: 2054
      }
    },
    feature_importances: [
      { feature: 'rainfall_mm', importance: 0.1987 },
      { feature: 'temperature_c', importance: 0.1939 },
      { feature: 'soil_moisture_percent', importance: 0.1746 },
      { feature: 'sunlight_hours', importance: 0.1677 },
      { feature: 'tree_species_Peepal', importance: 0.0211 },
      { feature: 'soil_type_Clay', importance: 0.0165 },
      { feature: 'tree_species_Banyan', importance: 0.0160 },
      { feature: 'water_availability_Medium', importance: 0.0155 },
      { feature: 'water_availability_Low', importance: 0.0154 },
      { feature: 'soil_type_Red', importance: 0.0154 }
    ]
  });

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const data = await getModelMetrics();
        if (data && data.metrics) {
          setMetricsData(data);
        }
      } catch (err) {
        console.warn('Using default metrics data:', err);
      }
    };
    fetchMetrics();
  }, []);

  const metrics = metricsData.metrics || {};
  const cm = metrics.confusion_matrix || {
    true_negative: 10,
    false_positive: 295,
    false_negative: 41,
    true_positive: 2054
  };


  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
      {/* Header */}
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
          <BookOpen size={14} /> AI Research & Model Transparency
        </div>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '0.4rem' }}>
          Machine Learning Methodology & Evaluation
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '780px' }}>
          Comprehensive architectural specifications, mathematical feature importances, confusion matrix validation, and decision-support pipeline documentation.
        </p>
      </div>

      {/* 5 Metric KPI Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(190px, 1fr))',
        gap: '1.25rem'
      }}>
        <div className="glass-panel" style={{ padding: '1.4rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Model Accuracy</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent-mint)', fontFamily: 'var(--font-number)' }}>
            {(metrics.accuracy * 100).toFixed(1)}%
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Overall correct classifications</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.4rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Precision</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent-cyan)', fontFamily: 'var(--font-number)' }}>
            {(metrics.precision * 100).toFixed(1)}%
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Accuracy of positive calls</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.4rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Recall (Sensitivity)</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#a78bfa', fontFamily: 'var(--font-number)' }}>
            {(metrics.recall * 100).toFixed(1)}%
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Captures viable trees</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.4rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>F1-Score</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fcd34d', fontFamily: 'var(--font-number)' }}>
            {(metrics.f1_score * 100).toFixed(1)}%
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Harmonic mean P & R</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.4rem' }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>ROC-AUC Metric</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-number)' }}>
            {(metrics.roc_auc || 0.6007).toFixed(4)}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Probability threshold curve</div>
        </div>
      </div>

      {/* 2-Column: Feature Importance Chart + Confusion Matrix */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '2rem'
      }}>
        {/* Feature Importance */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <BarChart3 size={20} color="var(--accent-mint)" />
            <h3 style={{ fontSize: '1.3rem', color: '#ffffff', margin: 0 }}>
              Top Feature Importances
            </h3>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Gini impurity reduction weights extracted directly from the Random Forest ensemble estimators.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
            {metricsData.feature_importances?.slice(0, 7).map((f, idx) => {
              const pct = (f.importance * 100).toFixed(1);
              const cleanName = f.feature
                .replace('_', ' ')
                .replace('mm', '(mm)')
                .replace('c', '(°C)')
                .replace('percent', '(%)')
                .replace('hours', '(hrs)');

              return (
                <div key={idx}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.3rem' }}>
                    <span style={{ color: '#ffffff', fontWeight: 600 }}>{cleanName}</span>
                    <span style={{ color: 'var(--accent-mint)', fontWeight: 700 }}>{pct}%</span>
                  </div>
                  <div style={{ width: '100%', height: '7px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${Math.min(100, f.importance * 450)}%`,
                      height: '100%',
                      background: idx < 4 ? 'linear-gradient(90deg, #10b981, #06b6d4)' : 'rgba(52, 211, 153, 0.4)',
                      borderRadius: '4px'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Confusion Matrix & Dataset Split */}
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <Cpu size={20} color="var(--accent-cyan)" />
            <h3 style={{ fontSize: '1.3rem', color: '#ffffff', margin: 0 }}>
              Confusion Matrix Validation
            </h3>
          </div>
          <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            Evaluated on stratified 20% test holdout (2,400 unseen microclimate samples).
          </p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '0.85rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
              <div style={{ fontSize: '0.72rem', color: 'var(--accent-mint)', fontWeight: 700, textTransform: 'uppercase' }}>True Positive (TP)</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-number)' }}>
                {cm.true_positive || 2054}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Correctly predicted viable</div>
            </div>

            <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', background: 'rgba(244, 63, 94, 0.12)', border: '1px solid rgba(244, 63, 94, 0.3)' }}>
              <div style={{ fontSize: '0.72rem', color: '#fda4af', fontWeight: 700, textTransform: 'uppercase' }}>False Positive (FP)</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-number)' }}>
                {cm.false_positive || 295}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Type I Error</div>
            </div>

            <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
              <div style={{ fontSize: '0.72rem', color: '#fcd34d', fontWeight: 700, textTransform: 'uppercase' }}>False Negative (FN)</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-number)' }}>
                {cm.false_negative || 41}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Type II Error (Low Rate)</div>
            </div>

            <div style={{ padding: '1.25rem', borderRadius: 'var(--radius-md)', background: 'rgba(6, 182, 212, 0.12)', border: '1px solid rgba(6, 182, 212, 0.3)' }}>
              <div style={{ fontSize: '0.72rem', color: '#67e8f9', fontWeight: 700, textTransform: 'uppercase' }}>True Negative (TN)</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-number)' }}>
                {cm.true_negative || 10}
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Correctly flagged unviable</div>
            </div>
          </div>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            * Dataset Size: <strong>12,000 samples</strong> (9,600 training, 2,400 testing). Stratified split ensures balanced class representations across all 10 candidate species.
          </div>
        </div>
      </div>

      {/* Model Pipeline Flow Diagram */}
      <section className="glass-panel" style={{ padding: '2.5rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.6rem', color: '#ffffff', marginBottom: '0.4rem' }}>
            End-to-End Decision Architecture Flow
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
            Sequential data flow from environmental sensor inputs to probability inference and agronomic dispatch.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: '1rem',
          textAlign: 'center'
        }}>
          {[
            { step: '1', title: 'Environmental Inputs', sub: '6 Telemetry Fields' },
            { step: '2', title: 'StandardScaler', sub: 'Continuous Features' },
            { step: '3', title: 'OneHotEncoder', sub: 'Categorical Vectors' },
            { step: '4', title: 'Random Forest', sub: '100 Estimators' },
            { step: '5', title: 'predict_proba', sub: 'Calibrated P(Y=1)' },
            { step: '6', title: 'Risk Tiering', sub: 'Low/Med/High' },
            { step: '7', title: 'Species Ranking', sub: 'Top 3 Selection' },
            { step: '8', title: 'Guidance Matrix', sub: 'Agronomic Specs' }
          ].map((s, idx) => (
            <div
              key={idx}
              style={{
                padding: '1.1rem 0.6rem',
                borderRadius: 'var(--radius-sm)',
                background: 'rgba(5, 14, 10, 0.75)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <div style={{
                width: '24px',
                height: '24px',
                borderRadius: '50%',
                background: 'rgba(52, 211, 153, 0.2)',
                color: 'var(--accent-mint)',
                fontSize: '0.75rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '0.45rem'
              }}>
                {s.step}
              </div>
              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.2rem' }}>
                {s.title}
              </div>
              <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                {s.sub}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

