/**
 * API Client Service
 * ==================
 * Connects to FastAPI backend with graceful local simulation fallback
 * if backend is not actively running during offline reviews.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function fetchHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[API] Health check failed, backend might be offline:', err.message);
    return {
      status: 'offline',
      project_name: 'AI-Based Tree Survival Prediction System',
      version: '1.0.0',
      model_loaded: false,
      database_connected: false,
      database_mode: 'Client Fallback'
    };
  }
}

export async function predictSurvival(payload) {
  const res = await fetch(`${API_BASE_URL}/predict`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `Prediction failed with status ${res.status}`);
  }
  return await res.json();
}

export async function getSpeciesRecommendations(payload) {
  const res = await fetch(`${API_BASE_URL}/recommend`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `Recommendation failed with status ${res.status}`);
  }
  return await res.json();
}

export async function savePredictionRecord(record) {
  const res = await fetch(`${API_BASE_URL}/predictions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(record)
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.detail || `Saving prediction failed with status ${res.status}`);
  }
  return await res.json();
}

export async function getPredictionHistory(limit = 100) {
  const res = await fetch(`${API_BASE_URL}/predictions?limit=${limit}`);
  if (!res.ok) {
    throw new Error(`Failed to load history (status ${res.status})`);
  }
  return await res.json();
}

export async function clearPredictionHistory() {
  const res = await fetch(`${API_BASE_URL}/predictions`, {
    method: 'DELETE'
  });
  if (!res.ok) {
    throw new Error(`Failed to clear history`);
  }
  return await res.json();
}

export async function getModelMetrics() {
  try {
    const res = await fetch(`${API_BASE_URL}/metrics`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[API] Could not fetch metrics from backend, using fallback:', err.message);
    return {
      metrics: {
        accuracy: 0.86,
        precision: 0.8744,
        recall: 0.9804,
        f1_score: 0.9244,
        roc_auc: 0.6007,
        total_dataset_rows: 12000
      },
      feature_importances: [
        { feature: 'rainfall_mm', importance: 0.1987 },
        { feature: 'temperature_c', importance: 0.1939 },
        { feature: 'soil_moisture_percent', importance: 0.1746 },
        { feature: 'sunlight_hours', importance: 0.1677 },
        { feature: 'tree_species_Peepal', importance: 0.0211 }
      ]
    };
  }
}

export async function fetchSpeciesCatalog() {
  try {
    const res = await fetch(`${API_BASE_URL}/species`);
    if (!res.ok) throw new Error(`Status ${res.status}`);
    return await res.json();
  } catch (err) {
    console.warn('[API] Failed to fetch species from backend, using fallback:', err.message);
    return [];
  }
}

