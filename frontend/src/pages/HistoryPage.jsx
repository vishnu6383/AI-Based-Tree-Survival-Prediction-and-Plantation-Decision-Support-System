import React, { useState, useEffect } from 'react';
import {
  History,
  Download,
  Trash2,
  Search,
  Filter,
  ArrowUpDown,
  Calendar,
  Layers,
  Sprout,
  Activity,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  FileSpreadsheet,
  RefreshCw,
  Sparkles
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { getPredictionHistory, clearPredictionHistory } from '../services/api';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState('ALL');
  const [sortField, setSortField] = useState('timestamp');
  const [sortAsc, setSortAsc] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const data = await getPredictionHistory(200);
      setHistory(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load history:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleClear = async () => {
    try {
      await clearPredictionHistory();
      setHistory([]);
      setShowClearConfirm(false);
    } catch (err) {
      console.error('Failed to clear history:', err);
    }
  };

  const handleExportCSV = () => {
    if (history.length === 0) return;

    const headers = [
      'ID',
      'Timestamp',
      'Species',
      'Rainfall (mm)',
      'Temperature (°C)',
      'Soil Type',
      'Soil Moisture (%)',
      'Sunlight (hrs)',
      'Water Availability',
      'Survival Probability',
      'Survival Percentage',
      'Risk Level',
      'Status'
    ];

    const rows = history.map((item) => [
      item.id || '',
      item.timestamp || '',
      item.selected_species || item.tree_species || '',
      item.environmental_inputs?.rainfall_mm || '',
      item.environmental_inputs?.temperature_c || '',
      item.environmental_inputs?.soil_type || '',
      item.environmental_inputs?.soil_moisture_percent || '',
      item.environmental_inputs?.sunlight_hours || '',
      item.environmental_inputs?.water_availability || '',
      item.survival_probability || '',
      item.survival_percentage || '',
      item.risk_level || '',
      item.status || ''
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.map(val => `"${val}"`).join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `TreeSense_AI_Prediction_History_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter & Sort
  const filtered = history.filter((item) => {
    const spName = item.selected_species || item.tree_species || '';
    const matchesSearch =
      spName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.risk_level && item.risk_level.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.environmental_inputs?.soil_type && item.environmental_inputs.soil_type.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (filterRisk !== 'ALL') {
      return item.risk_level?.toLowerCase().includes(filterRisk.toLowerCase());
    }

    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    let valA = a[sortField];
    let valB = b[sortField];

    if (sortField === 'survival_percentage' || sortField === 'survival_probability') {
      valA = Number(valA || 0);
      valB = Number(valB || 0);
    } else if (sortField === 'timestamp') {
      valA = new Date(valA || 0).getTime();
      valB = new Date(valB || 0).getTime();
    }

    if (valA < valB) return sortAsc ? -1 : 1;
    if (valA > valB) return sortAsc ? 1 : -1;
    return 0;
  });

  // Calculate Summary Statistics
  const totalAudits = history.length;
  const highViabilityCount = history.filter(
    (h) => h.survival_probability >= 0.68 || h.survival_percentage >= 68
  ).length;
  const avgSurvival =
    totalAudits > 0
      ? (
          history.reduce((acc, h) => acc + (h.survival_percentage || h.survival_probability * 100 || 0), 0) /
          totalAudits
        ).toFixed(1)
      : 0;
  const highRiskCount = history.filter(
    (h) => h.risk_level?.toLowerCase().includes('high') || (h.survival_percentage < 45 && h.survival_percentage > 0)
  ).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Header & Export Actions */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        gap: '1.5rem'
      }}>
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
            <History size={14} /> Telemetry Audit Logging
          </div>
          <h1 style={{ fontSize: '2.4rem', marginBottom: '0.4rem' }}>
            Prediction Audit History
          </h1>
          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '780px' }}>
            Persistent historical audit log stored in MongoDB with local JSON store synchronization. Review, filter, and export microclimate decision runs.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={fetchHistory}
            className="btn btn-secondary"
            style={{ padding: '0.65rem 1.1rem', fontSize: '0.86rem' }}
            title="Refresh database records"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleExportCSV}
            disabled={history.length === 0}
            className="btn btn-secondary"
            style={{ padding: '0.65rem 1.1rem', fontSize: '0.86rem' }}
          >
            <Download size={15} color="var(--accent-mint)" />
            <span>Export CSV</span>
          </button>

          {history.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="btn btn-outline"
              style={{ padding: '0.65rem 1rem', fontSize: '0.86rem', color: '#fda4af', borderColor: 'rgba(244, 63, 94, 0.4)' }}
            >
              <Trash2 size={15} />
              <span>Clear History</span>
            </button>
          )}
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: '1.25rem'
      }}>
        <div className="glass-panel" style={{ padding: '1.4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Total Predictions</span>
            <Activity size={18} color="var(--accent-cyan)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-number)' }}>
            {totalAudits}
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Logged inference runs</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>High Viability</span>
            <CheckCircle2 size={18} color="var(--accent-mint)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-mint)', fontFamily: 'var(--font-number)' }}>
            {highViabilityCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#6ee7b7' }}>Low Risk / Optimal matches</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Avg Survival Rate</span>
            <TrendingUp size={18} color="#a78bfa" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-number)' }}>
            {avgSurvival}%
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Across all microclimates</div>
        </div>

        <div className="glass-panel" style={{ padding: '1.4rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>High Risk Alerts</span>
            <AlertTriangle size={18} color="var(--accent-amber)" />
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fcd34d', fontFamily: 'var(--font-number)' }}>
            {highRiskCount}
          </div>
          <div style={{ fontSize: '0.75rem', color: '#fde68a' }}>Flagged for caution</div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
        padding: '1.25rem',
        borderRadius: 'var(--radius-lg)',
        background: 'rgba(7, 18, 13, 0.7)',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '260px' }}>
          <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search records by species, soil, or risk tier..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.5rem', fontSize: '0.88rem' }}
          />
        </div>

        {/* Risk Filter Buttons */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {['ALL', 'Low Risk', 'Medium Risk', 'High Risk'].map((r) => (
            <button
              key={r}
              onClick={() => setFilterRisk(r)}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: 'var(--radius-full)',
                background: filterRisk === r ? 'rgba(52, 211, 153, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                color: filterRisk === r ? '#6ee7b7' : 'var(--text-secondary)',
                border: filterRisk === r ? '1px solid rgba(52, 211, 153, 0.4)' : '1px solid var(--border-subtle)',
                fontSize: '0.78rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Historical Records Table (Desktop) & Card List (Mobile) */}
      {sorted.length > 0 ? (
        <div className="glass-panel" style={{ overflow: 'hidden', padding: 0 }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
              <thead>
                <tr style={{ background: 'rgba(5, 14, 10, 0.85)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>
                    Timestamp
                  </th>
                  <th style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>
                    Species
                  </th>
                  <th style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>
                    Environment Profile
                  </th>
                  <th style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase', cursor: 'pointer' }}
                    onClick={() => {
                      setSortField('survival_percentage');
                      setSortAsc(!sortAsc);
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span>Survival %</span>
                      <ArrowUpDown size={13} color="var(--accent-mint)" />
                    </div>
                  </th>
                  <th style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)', fontWeight: 700, fontSize: '0.75rem', textTransform: 'uppercase' }}>
                    Risk Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((row, idx) => {
                  const spName = row.selected_species || row.tree_species || 'Unknown';
                  const dateStr = row.timestamp ? new Date(row.timestamp).toLocaleString() : 'Recent';
                  const env = row.environmental_inputs || {};
                  const survPct = row.survival_percentage || (row.survival_probability * 100).toFixed(1);

                  return (
                    <tr
                      key={row.id || idx}
                      style={{
                        borderBottom: '1px solid var(--border-subtle)',
                        transition: 'background 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(52, 211, 153, 0.05)'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <td style={{ padding: '1rem 1.25rem', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                        {dateStr}
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '0.92rem' }}>{spName}</div>
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', fontSize: '0.76rem' }}>
                          <span style={{ padding: '0.15rem 0.45rem', borderRadius: '4px', background: 'rgba(6, 182, 212, 0.12)', color: '#67e8f9' }}>
                            {env.rainfall_mm || 1200} mm
                          </span>
                          <span style={{ padding: '0.15rem 0.45rem', borderRadius: '4px', background: 'rgba(245, 158, 11, 0.12)', color: '#fcd34d' }}>
                            {env.temperature_c || 28}°C
                          </span>
                          <span style={{ padding: '0.15rem 0.45rem', borderRadius: '4px', background: 'rgba(167, 139, 250, 0.12)', color: '#c4b5fd' }}>
                            {env.soil_type || 'Loamy'}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <span style={{
                          fontFamily: 'var(--font-number)',
                          fontSize: '1.1rem',
                          fontWeight: 800,
                          color: row.survival_probability >= 0.68 ? 'var(--accent-mint)' : '#ffffff'
                        }}>
                          {survPct}%
                        </span>
                      </td>
                      <td style={{ padding: '1rem 1.25rem' }}>
                        <StatusBadge riskLevel={row.risk_level} status={row.status} size="sm" />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Empty State */
        <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '16px',
            background: 'rgba(52, 211, 153, 0.1)',
            border: '1px solid rgba(52, 211, 153, 0.25)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto'
          }}>
            <FileSpreadsheet size={28} color="var(--accent-mint)" />
          </div>
          <h3 style={{ fontSize: '1.3rem', color: '#ffffff', marginBottom: '0.4rem' }}>
            No Audit Records Found
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', maxWidth: '400px', margin: '0 auto' }}>
            Run predictions on the Predict Dashboard to populate the database audit history.
          </p>
        </div>
      )}

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="modal-backdrop" onClick={() => setShowClearConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#ffffff', marginBottom: '0.6rem' }}>
              Clear Prediction History?
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.5rem' }}>
              This will remove all stored prediction audit records from both MongoDB and the local fallback store. This action cannot be undone.
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
              <button
                onClick={() => setShowClearConfirm(false)}
                className="btn btn-secondary"
                style={{ padding: '0.55rem 1rem', fontSize: '0.86rem' }}
              >
                Cancel
              </button>
              <button
                onClick={handleClear}
                className="btn btn-primary"
                style={{ padding: '0.55rem 1.2rem', fontSize: '0.86rem', background: '#e11d48' }}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
