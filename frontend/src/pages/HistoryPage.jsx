import React, { useState, useEffect } from 'react';
import { History, Download, Trash2, Search, Filter, RefreshCw, Database, CheckCircle2, ArrowUpDown } from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { getPredictionHistory, clearPredictionHistory } from '../services/api';

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterSpecies, setFilterSpecies] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [actionMsg, setActionMsg] = useState(null);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const records = await getPredictionHistory();
      setHistory(records);
    } catch (err) {
      console.error("Failed to load history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleClearHistory = async () => {
    if (window.confirm("Are you sure you want to clear all stored prediction records from the database?")) {
      try {
        await clearPredictionHistory();
        setHistory([]);
        setActionMsg("Prediction history successfully cleared.");
        setTimeout(() => setActionMsg(null), 3500);
      } catch (err) {
        alert("Failed to clear history: " + err.message);
      }
    }
  };

  const handleExportCSV = () => {
    if (history.length === 0) return;
    const headers = [
      "Timestamp", "Tree Species", "Survival Probability (%)", "Risk Level", "Status",
      "Rainfall (mm)", "Temperature (C)", "Soil Type", "Moisture (%)", "Sunlight (hrs)",
      "Water Availability", "Recommended Species"
    ];

    const csvRows = history.map(item => [
      `"${item.timestamp || ''}"`,
      `"${item.selected_species || ''}"`,
      item.survival_percentage || (item.survival_probability * 100).toFixed(1),
      `"${item.risk_level || ''}"`,
      `"${item.status || ''}"`,
      item.environmental_inputs?.rainfall_mm || '',
      item.environmental_inputs?.temperature_c || '',
      `"${item.environmental_inputs?.soil_type || ''}"`,
      item.environmental_inputs?.soil_moisture_percent || '',
      item.environmental_inputs?.sunlight_hours || '',
      `"${item.environmental_inputs?.water_availability || ''}"`,
      `"${(item.recommended_species || []).join('; ')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...csvRows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `tree_survival_history_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRecords = history.filter(item => {
    const matchesSpecies = filterSpecies === 'All' || item.selected_species === filterSpecies;
    const matchesSearch = !searchQuery ||
      item.selected_species?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.environmental_inputs?.soil_type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.risk_level?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSpecies && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
            <Database size={22} color="var(--accent-mint)" />
            <h1 style={{ fontSize: '2rem', margin: 0 }}>Prediction History</h1>
          </div>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
            Audit trail of environmental inference runs stored in MongoDB.
          </p>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button
            onClick={fetchHistory}
            className="btn btn-outline"
            style={{ padding: '0.55rem 0.9rem', fontSize: '0.85rem' }}
          >
            <RefreshCw size={15} /> Refresh
          </button>

          <button
            onClick={handleExportCSV}
            disabled={history.length === 0}
            className="btn btn-secondary"
            style={{ padding: '0.55rem 1rem', fontSize: '0.85rem' }}
          >
            <Download size={15} /> Export CSV
          </button>

          <button
            onClick={handleClearHistory}
            disabled={history.length === 0}
            className="btn btn-outline"
            style={{ padding: '0.55rem 0.9rem', fontSize: '0.85rem', borderColor: 'rgba(244, 63, 94, 0.3)', color: '#fca5a5' }}
          >
            <Trash2 size={15} /> Clear All
          </button>
        </div>
      </div>

      {actionMsg && (
        <div style={{
          background: 'rgba(16, 185, 129, 0.15)',
          border: '1px solid rgba(52, 211, 153, 0.4)',
          borderRadius: 'var(--radius-sm)',
          padding: '0.75rem 1rem',
          fontSize: '0.84rem',
          color: '#6ee7b7',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <CheckCircle2 size={16} /> {actionMsg}
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="glass-panel" style={{ padding: '1rem 1.5rem', display: 'flex', gap: '1.25rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: '220px' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
          <input
            type="text"
            placeholder="Search by species, soil, or risk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '2.4rem', fontSize: '0.88rem' }}
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Filter size={16} color="var(--text-muted)" />
          <select
            className="form-select"
            value={filterSpecies}
            onChange={(e) => setFilterSpecies(e.target.value)}
            style={{ minWidth: '160px', padding: '0.65rem 0.9rem', fontSize: '0.88rem' }}
          >
            <option value="All">All Species</option>
            {["Neem", "Teak", "Banyan", "Peepal", "Eucalyptus", "Sal", "Gulmohar", "Bamboo", "Mango", "Mahogany"].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginLeft: 'auto' }}>
          Showing <strong>{filteredRecords.length}</strong> of <strong>{history.length}</strong> records
        </div>
      </div>

      {/* History Table */}
      <div className="glass-panel" style={{ overflowX: 'auto', padding: '0.5rem' }}>
        {loading ? (
          <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <RefreshCw size={24} className="animate-spin" style={{ margin: '0 auto 0.75rem' }} />
            <div>Loading stored records...</div>
          </div>
        ) : filteredRecords.length > 0 ? (
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.86rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-subtle)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '1rem 0.85rem' }}>Timestamp</th>
                <th style={{ padding: '1rem 0.85rem' }}>Selected Species</th>
                <th style={{ padding: '1rem 0.85rem' }}>Survival Odds</th>
                <th style={{ padding: '1rem 0.85rem' }}>Risk Level</th>
                <th style={{ padding: '1rem 0.85rem' }}>Environment</th>
                <th style={{ padding: '1rem 0.85rem' }}>Top Recommendations</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map((item, idx) => (
                <tr
                  key={item.id || idx}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                    transition: 'background 0.2s ease'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(52, 211, 153, 0.04)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '0.85rem', color: 'var(--text-muted)', fontSize: '0.78rem', whiteSpace: 'nowrap' }}>
                    {item.timestamp ? new Date(item.timestamp).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' }) : 'Recent'}
                  </td>
                  <td style={{ padding: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {item.selected_species}
                  </td>
                  <td style={{ padding: '0.85rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--accent-mint)' }}>
                    {item.survival_percentage || (item.survival_probability * 100).toFixed(1)}%
                  </td>
                  <td style={{ padding: '0.85rem' }}>
                    <StatusBadge riskLevel={item.risk_level} status={item.status} />
                  </td>
                  <td style={{ padding: '0.85rem', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                    <div>🌧️ {item.environmental_inputs?.rainfall_mm} mm | 🌡️ {item.environmental_inputs?.temperature_c}°C</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: '2px' }}>
                      🌱 {item.environmental_inputs?.soil_type} Soil | 💧 {item.environmental_inputs?.soil_moisture_percent}% Moisture
                    </div>
                  </td>
                  <td style={{ padding: '0.85rem' }}>
                    <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                      {(item.recommended_species || []).slice(0, 3).map((sp, sIdx) => (
                        <span
                          key={sIdx}
                          style={{
                            background: 'rgba(52, 211, 153, 0.1)',
                            border: '1px solid rgba(52, 211, 153, 0.2)',
                            color: 'var(--accent-mint)',
                            fontSize: '0.75rem',
                            padding: '0.15rem 0.45rem',
                            borderRadius: '4px'
                          }}
                        >
                          {sp}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div style={{ padding: '4rem 2rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            <History size={36} style={{ margin: '0 auto 0.75rem', opacity: 0.4 }} />
            <h4 style={{ fontSize: '1.1rem', color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
              No Prediction Records Found
            </h4>
            <p style={{ fontSize: '0.85rem' }}>
              Run predictions in the Predict Dashboard and click "Save to MongoDB History".
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
