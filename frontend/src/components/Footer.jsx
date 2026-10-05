import React from 'react';
import { Sprout, HeartHandshake } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      background: 'rgba(4, 10, 7, 0.95)',
      backdropFilter: 'blur(20px)',
      padding: '3rem 1.5rem 2rem 1.5rem',
      marginTop: 'auto'
    }}>
      <div style={{
        maxWidth: '1320px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2.5rem',
        marginBottom: '2.5rem'
      }}>
        {/* Col 1: Brand & Mission */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.9rem' }}>
            <div style={{
              width: '36px',
              height: '36px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 15px rgba(16, 185, 129, 0.4)'
            }}>
              <Sprout size={20} color="#ffffff" strokeWidth={2.4} />
            </div>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 800,
              color: '#ffffff'
            }}>
              TreeSense <span style={{ color: 'var(--accent-mint)' }}>AI</span>
            </span>
          </div>

          <p style={{
            fontSize: '0.86rem',
            color: 'var(--text-secondary)',
            lineHeight: 1.6,
            maxWidth: '520px'
          }}>
            AI-powered decision-support platform optimizing afforestation and agroforestry initiatives through calibrated Random Forest survival modeling and botanical compatibility protocols.
          </p>
        </div>

        {/* Col 2: Navigation Modules */}
        <div>
          <h4 style={{ fontSize: '0.95rem', color: '#ffffff', marginBottom: '1rem', letterSpacing: '0.02em' }}>
            Platform Modules
          </h4>
          <ul style={{ listStyle: 'none', display: 'flex', flexWrap: 'wrap', gap: '1rem 2rem' }}>
            {[
              { id: 'home', label: 'Platform Overview' },
              { id: 'predict', label: 'Survival Predictor & Recommender' },
              { id: 'species', label: 'Botanical Species Catalog' },
              { id: 'history', label: 'Prediction Audit History' },
              { id: 'methodology', label: 'ML Methodology & Research' }
            ].map((link) => (
              <li key={link.id}>
                <button
                  onClick={() => {
                    setActiveTab(link.id);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-secondary)',
                    fontSize: '0.86rem',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'color 0.2s ease',
                    textAlign: 'left'
                  }}
                  onMouseEnter={(e) => e.target.style.color = 'var(--accent-mint)'}
                  onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{
        maxWidth: '1320px',
        margin: '0 auto',
        paddingTop: '1.5rem',
        borderTop: '1px solid var(--border-subtle)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        fontSize: '0.8rem',
        color: 'var(--text-muted)'
      }}>
        <div>
          © {new Date().getFullYear()} TreeSense AI. Climate Intelligence Platform.
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span>Crafted for Sustainable Afforestation</span>
          <HeartHandshake size={14} color="var(--accent-mint)" />
        </div>
      </div>
    </footer>
  );
}
