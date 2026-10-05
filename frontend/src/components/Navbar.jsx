import React, { useState, useEffect } from 'react';
import { Sprout, Activity, Compass, History, BookOpen, Menu, X, ArrowUpRight, Sparkles } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, systemHealth }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'predict', label: 'Predict & Recommend', icon: Activity },
    { id: 'species', label: 'Species Catalog', icon: Sprout },
    { id: 'history', label: 'Audit History', icon: History },
    { id: 'methodology', label: 'AI Methodology', icon: BookOpen },
  ];

  const handleNavClick = (tabId) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isHealthy = systemHealth?.status === 'healthy';

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      transition: 'all 0.3s ease',
      background: scrolled ? 'rgba(5, 13, 9, 0.88)' : 'rgba(6, 17, 12, 0.72)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: scrolled ? '1px solid rgba(52, 211, 153, 0.2)' : '1px solid var(--border-subtle)',
      boxShadow: scrolled ? '0 10px 30px rgba(0, 0, 0, 0.5)' : 'none',
      padding: '0.85rem 1.5rem'
    }}>
      <div style={{
        maxWidth: '1320px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.5rem'
      }}>
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.85rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            textAlign: 'left',
            padding: 0
          }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(16, 185, 129, 0.45)',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <Sprout size={22} color="#ffffff" strokeWidth={2.4} />
          </div>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: '#ffffff'
            }}>
              TreeSense <span style={{ color: 'var(--accent-mint)', fontWeight: 700 }}>AI</span>
            </div>
            <div style={{
              fontSize: '0.72rem',
              color: 'var(--text-secondary)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              fontWeight: 600,
              marginTop: '-2px'
            }}>
              Climate Intelligence Platform
            </div>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav style={{ display: 'none', alignItems: 'center', gap: '0.4rem' }} className="desktop-nav">
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.55rem 0.95rem',
                  borderRadius: 'var(--radius-sm)',
                  background: isActive ? 'rgba(52, 211, 153, 0.14)' : 'transparent',
                  color: isActive ? '#6ee7b7' : 'var(--text-secondary)',
                  border: isActive ? '1px solid rgba(52, 211, 153, 0.35)' : '1px solid transparent',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.88rem',
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#ffffff';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <Icon size={16} color={isActive ? 'var(--accent-mint)' : 'currentColor'} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA & System Status */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Health Pulse */}
          <div
            title={`System: ${systemHealth?.status || 'Active'} | Database: ${systemHealth?.database_mode || 'Online'}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.4rem 0.75rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(0, 0, 0, 0.35)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.76rem',
              color: 'var(--text-secondary)',
              fontWeight: 500
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: isHealthy ? '#10b981' : '#f59e0b',
                boxShadow: isHealthy ? '0 0 8px #10b981' : '0 0 8px #f59e0b',
                display: 'inline-block'
              }}
            />
            <span style={{ display: 'none' }} className="desktop-status-text">
              {isHealthy ? 'AI Engine Ready' : 'Connecting...'}
            </span>
          </div>

          {/* Primary Action Button */}
          <button
            onClick={() => handleNavClick('predict')}
            className="btn btn-primary"
            style={{
              padding: '0.55rem 1.15rem',
              fontSize: '0.86rem',
              borderRadius: 'var(--radius-sm)',
              display: 'none'
            }}
            className="desktop-cta btn btn-primary"
          >
            <Sparkles size={15} />
            <span>Analyze Survival</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              cursor: 'pointer'
            }}
            className="mobile-toggle-btn"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div style={{
          marginTop: '1rem',
          padding: '1.25rem',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(8, 20, 15, 0.96)',
          border: '1px solid rgba(52, 211, 153, 0.3)',
          boxShadow: '0 16px 40px rgba(0, 0, 0, 0.8)',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          {navLinks.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0.8rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: isActive ? 'rgba(52, 211, 153, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                  color: isActive ? '#6ee7b7' : 'var(--text-primary)',
                  border: isActive ? '1px solid rgba(52, 211, 153, 0.4)' : '1px solid transparent',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textAlign: 'left'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Icon size={18} color={isActive ? 'var(--accent-mint)' : 'var(--text-secondary)'} />
                  {item.label}
                </div>
                <ArrowUpRight size={16} color="var(--text-muted)" />
              </button>
            );
          })}

          <button
            onClick={() => handleNavClick('predict')}
            className="btn btn-primary"
            style={{ width: '100%', marginTop: '0.5rem', padding: '0.8rem' }}
          >
            <Sparkles size={16} /> Start Prediction
          </button>
        </div>
      )}

      {/* Inline media queries for navbar visibility */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: flex !important; }
          .desktop-cta { display: inline-flex !important; }
          .desktop-status-text { display: inline !important; }
          .mobile-toggle-btn { display: none !important; }
        }
      `}</style>
    </header>
  );
}
