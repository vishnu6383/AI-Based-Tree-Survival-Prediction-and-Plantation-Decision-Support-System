import React from 'react';
import { Trees, Compass, BarChart3, History, BookOpen, Activity } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, systemHealth }) {
  const isOnline = systemHealth?.status === 'healthy';

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="nav-brand" onClick={() => setActiveTab('home')} style={{ cursor: 'pointer' }}>
          <div className="brand-icon-box">
            <Trees size={22} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontSize: '1.05rem', letterSpacing: '-0.02em' }}>ArborAI</div>
            <div style={{ fontSize: '0.68rem', color: 'var(--accent-mint)', fontWeight: 500, letterSpacing: '0.04em' }}>
              TREE SURVIVAL & DECISION SUPPORT
            </div>
          </div>
        </div>

        <nav>
          <ul className="nav-links">
            <li>
              <button
                className={`nav-item ${activeTab === 'home' ? 'active' : ''}`}
                onClick={() => setActiveTab('home')}
              >
                <Compass size={16} />
                <span>Overview</span>
              </button>
            </li>
            <li>
              <button
                className={`nav-item ${activeTab === 'predict' ? 'active' : ''}`}
                onClick={() => setActiveTab('predict')}
              >
                <Trees size={16} />
                <span>Predict & Recommend</span>
              </button>
            </li>
            <li>
              <button
                className={`nav-item ${activeTab === 'species' ? 'active' : ''}`}
                onClick={() => setActiveTab('species')}
              >
                <BarChart3 size={16} />
                <span>Species Explorer</span>
              </button>
            </li>
            <li>
              <button
                className={`nav-item ${activeTab === 'history' ? 'active' : ''}`}
                onClick={() => setActiveTab('history')}
              >
                <History size={16} />
                <span>Prediction History</span>
              </button>
            </li>
            <li>
              <button
                className={`nav-item ${activeTab === 'methodology' ? 'active' : ''}`}
                onClick={() => setActiveTab('methodology')}
              >
                <BookOpen size={16} />
                <span>Methodology</span>
              </button>
            </li>
          </ul>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div className="system-status-pill">
            <div
              className="status-dot"
              style={{
                backgroundColor: isOnline ? 'var(--accent-mint)' : 'var(--accent-amber)',
                boxShadow: isOnline ? '0 0 8px var(--accent-mint)' : '0 0 8px var(--accent-amber)'
              }}
            />
            <span>{isOnline ? `FastAPI + ${systemHealth?.database_mode || 'DB'}` : 'System Ready'}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
