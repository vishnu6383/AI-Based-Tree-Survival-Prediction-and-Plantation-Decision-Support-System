import React from 'react';
import { Leaf } from 'lucide-react';

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-subtle)',
      background: 'rgba(9, 17, 14, 0.95)',
      padding: '1.25rem 1.5rem',
      marginTop: '3.5rem',
      fontSize: '0.82rem',
      color: 'var(--text-muted)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
          <Leaf size={16} color="var(--accent-mint)" />
          <span style={{ fontWeight: 600 }}>ArborAI • Tree Survival & Decision Support</span>
        </div>
        <div>
          Tree Survival Prediction System
        </div>
      </div>
    </footer>
  );
}
