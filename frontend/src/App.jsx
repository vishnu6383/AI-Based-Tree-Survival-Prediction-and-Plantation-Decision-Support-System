import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PredictDashboard from './pages/PredictDashboard';
import SpeciesExplorer from './pages/SpeciesExplorer';
import HistoryPage from './pages/HistoryPage';
import MethodologyPage from './pages/MethodologyPage';
import { fetchHealth } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [systemHealth, setSystemHealth] = useState(null);
  const [currentParams, setCurrentParams] = useState({
    rainfall_mm: 1200,
    temperature_c: 28.0,
    soil_type: "Loamy",
    soil_moisture_percent: 45.0,
    sunlight_hours: 7.5,
    water_availability: "Medium",
    tree_species: "Neem"
  });

  useEffect(() => {
    const checkSystem = async () => {
      const health = await fetchHealth();
      setSystemHealth(health);
    };
    checkSystem();
    const interval = setInterval(checkSystem, 15000);
    return () => clearInterval(interval);
  }, []);

  const handleSelectPreset = (presetParams) => {
    setCurrentParams(presetParams);
    setActiveTab('predict');
  };

  return (
    <div className="app-container">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        systemHealth={systemHealth}
      />

      <main className="main-content">
        {activeTab === 'home' && (
          <Home
            setActiveTab={setActiveTab}
            onSelectPreset={handleSelectPreset}
          />
        )}

        {activeTab === 'predict' && (
          <PredictDashboard
            currentParams={currentParams}
            setFormParams={setCurrentParams}
          />
        )}

        {activeTab === 'species' && (
          <SpeciesExplorer
            currentParams={currentParams}
          />
        )}

        {activeTab === 'history' && (
          <HistoryPage />
        )}

        {activeTab === 'methodology' && (
          <MethodologyPage />
        )}
      </main>

      <Footer />
    </div>
  );
}
