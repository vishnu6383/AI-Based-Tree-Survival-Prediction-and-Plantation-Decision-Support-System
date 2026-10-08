import React, { useState, useEffect } from 'react';
import {
  Sprout,
  Search,
  ArrowRight,
  CloudRain,
  Thermometer,
  Layers,
  Zap,
  Filter,
  Sparkles,
  Award
} from 'lucide-react';
import PlantationGuideModal from '../components/PlantationGuideModal';
import { fetchSpeciesCatalog } from '../services/api';
import { getSpeciesPhoto, getSpeciesCategory, getSpeciesBadge } from '../services/speciesImages';

const FALLBACK_SPECIES = [
  {
    name: 'Mango',
    scientific_name: 'Mangifera indica',
    family: 'Anacardiaceae',
    optimal_rainfall_mm: [750, 2200],
    optimal_temp_c: [22, 38],
    compatible_soils: ['Alluvial', 'Loamy', 'Red', 'Black'],
    min_sunlight_hours: 7.0,
    drought_tolerance: 'Moderate',
    growth_rate: 'Moderate',
    ecological_value: 'High commercial fruit yield, sweet edible produce, dense canopy shade and carbon sequestration.'
  },
  {
    name: 'Guava',
    scientific_name: 'Psidium guajava',
    family: 'Myrtaceae',
    optimal_rainfall_mm: [600, 1800],
    optimal_temp_c: [20, 36],
    compatible_soils: ['Loamy', 'Alluvial', 'Red', 'Sandy', 'Clay'],
    min_sunlight_hours: 6.5,
    drought_tolerance: 'High',
    growth_rate: 'Fast',
    ecological_value: 'Prolific high-density fruit yield, extremely rich in Vitamin C and pectin, highly adaptable to diverse soils.'
  },
  {
    name: 'Banana',
    scientific_name: 'Musa acuminata',
    family: 'Musaceae',
    optimal_rainfall_mm: [1200, 2800],
    optimal_temp_c: [22, 36],
    compatible_soils: ['Loamy', 'Alluvial', 'Clay', 'Red'],
    min_sunlight_hours: 6.0,
    drought_tolerance: 'Low',
    growth_rate: 'Extremely Fast',
    ecological_value: 'Year-round food & potassium staple yield, massive organic biomass recycling, rapid 10-month harvest turnaround.'
  },
  {
    name: 'Coconut',
    scientific_name: 'Cocos nucifera',
    family: 'Arecaceae',
    optimal_rainfall_mm: [1000, 2600],
    optimal_temp_c: [24, 36],
    compatible_soils: ['Sandy', 'Alluvial', 'Loamy', 'Red'],
    min_sunlight_hours: 7.5,
    drought_tolerance: 'Moderate',
    growth_rate: 'Moderate',
    ecological_value: 'Multi-purpose lifetime economic yield (tender water, copra, oil, coir, shell), coastal windbreak and soil stabilization.'
  },
  {
    name: 'Papaya',
    scientific_name: 'Carica papaya',
    family: 'Caricaceae',
    optimal_rainfall_mm: [800, 2000],
    optimal_temp_c: [22, 38],
    compatible_soils: ['Loamy', 'Alluvial', 'Sandy', 'Red'],
    min_sunlight_hours: 7.0,
    drought_tolerance: 'Moderate',
    growth_rate: 'Extremely Fast',
    ecological_value: 'Continuous commercial fruit yield, papain enzyme extraction, rapid commercial cash flow within 8 months.'
  },
  {
    name: 'Pomegranate',
    scientific_name: 'Punica granatum',
    family: 'Lythraceae',
    optimal_rainfall_mm: [400, 1000],
    optimal_temp_c: [20, 38],
    compatible_soils: ['Loamy', 'Sandy', 'Red', 'Alluvial', 'Black'],
    min_sunlight_hours: 8.0,
    drought_tolerance: 'High',
    growth_rate: 'Moderate',
    ecological_value: 'High-value export fruit yield, antioxidant-rich arils, thrives in semi-arid and water-scarce terrains.'
  },
  {
    name: 'Lemon',
    scientific_name: 'Citrus limon',
    family: 'Rutaceae',
    optimal_rainfall_mm: [600, 1500],
    optimal_temp_c: [18, 35],
    compatible_soils: ['Loamy', 'Alluvial', 'Sandy', 'Red'],
    min_sunlight_hours: 7.0,
    drought_tolerance: 'Moderate',
    growth_rate: 'Fast',
    ecological_value: 'Continuous year-round citrus fruit yield, high ascorbic acid and essential citrus oils, pollinator magnet.'
  },
  {
    name: 'Jackfruit',
    scientific_name: 'Artocarpus heterophyllus',
    family: 'Moraceae',
    optimal_rainfall_mm: [1000, 2600],
    optimal_temp_c: [20, 36],
    compatible_soils: ['Alluvial', 'Loamy', 'Red', 'Clay'],
    min_sunlight_hours: 6.0,
    drought_tolerance: 'Moderate',
    growth_rate: 'Moderate',
    ecological_value: "World's largest edible tree fruit yield (up to 30 kg/fruit), valuable timber, highly drought-resilient once mature."
  },
  {
    name: 'Sapota',
    scientific_name: 'Manilkara zapota',
    family: 'Sapotaceae',
    optimal_rainfall_mm: [700, 1800],
    optimal_temp_c: [20, 38],
    compatible_soils: ['Alluvial', 'Sandy', 'Loamy', 'Black', 'Red'],
    min_sunlight_hours: 6.5,
    drought_tolerance: 'High',
    growth_rate: 'Moderate',
    ecological_value: 'High continuous annual sweet fruit yield (Chiku), coastal salinity tolerance, dense evergreen shade.'
  },
  {
    name: 'Amla',
    scientific_name: 'Phyllanthus emblica',
    family: 'Phyllanthaceae',
    optimal_rainfall_mm: [400, 1400],
    optimal_temp_c: [18, 42],
    compatible_soils: ['Red', 'Sandy', 'Loamy', 'Black', 'Alluvial', 'Clay'],
    min_sunlight_hours: 7.5,
    drought_tolerance: 'High',
    growth_rate: 'Fast',
    ecological_value: 'Supreme medicinal & commercial fruit yield, extreme Vitamin C content, thrives on marginal sodic/alkaline soils.'
  }
];

export default function SpeciesExplorer({ onSelectSpeciesForPrediction, setActiveTab }) {
  const [speciesList, setSpeciesList] = useState(FALLBACK_SPECIES);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSoil, setSelectedSoil] = useState('All');
  const [selectedDrought, setSelectedDrought] = useState('All');

  useEffect(() => {
    async function loadCatalog() {
      try {
        const data = await fetchSpeciesCatalog();
        if (data?.species && data.species.length > 0) {
          setSpeciesList(data.species);
        }
      } catch (err) {
        console.warn('Using fallback yielding species catalog:', err);
      }
    }
    loadCatalog();
  }, []);

  const filteredSpecies = speciesList.filter((sp) => {
    const matchesSearch =
      sp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sp.scientific_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sp.family && sp.family.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (sp.ecological_value && sp.ecological_value.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSoil =
      selectedSoil === 'All' ||
      (sp.compatible_soils && sp.compatible_soils.includes(selectedSoil));

    const matchesDrought =
      selectedDrought === 'All' ||
      (sp.drought_tolerance && sp.drought_tolerance.toLowerCase().includes(selectedDrought.toLowerCase()));

    return matchesSearch && matchesSoil && matchesDrought;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Header Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '2.5rem 2rem',
          background: 'linear-gradient(135deg, rgba(16, 36, 28, 0.9) 0%, rgba(9, 17, 14, 0.95) 100%)',
          border: '1px solid rgba(52, 211, 153, 0.25)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ maxWidth: '820px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              background: 'rgba(52, 211, 153, 0.12)',
              border: '1px solid rgba(52, 211, 153, 0.3)',
              padding: '0.35rem 0.85rem',
              borderRadius: '9999px',
              fontSize: '0.8rem',
              color: 'var(--accent-mint)',
              fontWeight: 700,
              marginBottom: '0.85rem'
            }}
          >
            <Sparkles size={14} /> HIGH-YIELD BOTANICAL CATALOG & AGROFORESTRY GUIDE
          </div>

          <h1 style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.7rem)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
            Yield-Giving Species <span className="gradient-text">Botanical Knowledge Base</span>
          </h1>

          <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, margin: 0 }}>
            Comprehensive agronomic profiles, authentic imagery, climate envelopes, and high-yield cultivation protocols for top economic fruit and crop species.
          </p>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div
        className="glass-panel"
        style={{
          padding: '1.25rem 1.5rem',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Search Input */}
        <div
          style={{
            position: 'relative',
            flex: '1 1 280px',
            minWidth: '240px'
          }}
        >
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-muted)'
            }}
          />
          <input
            type="text"
            placeholder="Search mango, guava, banana, coconut..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field"
            style={{ paddingLeft: '2.75rem', width: '100%' }}
          />
        </div>

        {/* Filter Dropdowns */}
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Layers size={15} color="var(--accent-mint)" />
            <select
              value={selectedSoil}
              onChange={(e) => setSelectedSoil(e.target.value)}
              className="select-field"
              style={{ padding: '0.55rem 0.9rem', fontSize: '0.85rem' }}
            >
              <option value="All">All Soil Types</option>
              <option value="Loamy">Loamy</option>
              <option value="Alluvial">Alluvial</option>
              <option value="Red">Red</option>
              <option value="Sandy">Sandy</option>
              <option value="Clay">Clay</option>
              <option value="Black">Black</option>
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Filter size={15} color="var(--accent-mint)" />
            <select
              value={selectedDrought}
              onChange={(e) => setSelectedDrought(e.target.value)}
              className="select-field"
              style={{ padding: '0.55rem 0.9rem', fontSize: '0.85rem' }}
            >
              <option value="All">All Drought Hardiness</option>
              <option value="High">High Drought Resilience</option>
              <option value="Moderate">Moderate Resilience</option>
              <option value="Low">Moisture Demanding</option>
            </select>
          </div>
        </div>
      </div>

      {/* Species Catalog Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}
      >
        {filteredSpecies.map((sp) => {
          const photoUrl = getSpeciesPhoto(sp.name);
          const category = getSpeciesCategory(sp.name);
          const badge = getSpeciesBadge(sp.name);

          return (
            <div
              key={sp.name}
              className="glass-panel glass-panel-interactive"
              style={{
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
                borderRadius: '16px',
                border: '1px solid rgba(52, 211, 153, 0.2)'
              }}
            >
              {/* Species Photo Header */}
              <div
                style={{
                  position: 'relative',
                  height: '200px',
                  width: '100%',
                  overflow: 'hidden',
                  background: '#0e1f18'
                }}
              >
                <img
                  src={photoUrl}
                  alt={`${sp.name} (${sp.scientific_name})`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease'
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/species/mango.jpg';
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(9, 17, 14, 0.9) 0%, rgba(9, 17, 14, 0.1) 60%, transparent 100%)'
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '0.85rem',
                    left: '0.85rem',
                    background: 'rgba(9, 17, 14, 0.85)',
                    backdropFilter: 'blur(8px)',
                    padding: '0.3rem 0.7rem',
                    borderRadius: '9999px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: 'var(--accent-mint)',
                    border: '1px solid rgba(52, 211, 153, 0.3)'
                  }}
                >
                  {category}
                </div>

                <div
                  style={{
                    position: 'absolute',
                    bottom: '0.85rem',
                    left: '1rem',
                    right: '1rem'
                  }}
                >
                  <h3
                    style={{
                      fontSize: '1.4rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      margin: 0,
                      textShadow: '0 2px 4px rgba(0,0,0,0.8)'
                    }}
                  >
                    {sp.name}
                  </h3>
                  <div
                    style={{
                      fontSize: '0.82rem',
                      color: '#a7f3d0',
                      fontStyle: 'italic'
                    }}
                  >
                    {sp.scientific_name}
                  </div>
                </div>
              </div>

              {/* Body Details */}
              <div
                style={{
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'inline-block',
                      background: 'rgba(255, 255, 255, 0.06)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '6px',
                      fontSize: '0.75rem',
                      color: 'var(--text-secondary)',
                      marginBottom: '0.75rem'
                    }}
                  >
                    🌱 {badge}
                  </div>

                  <p
                    style={{
                      fontSize: '0.85rem',
                      color: 'var(--text-secondary)',
                      lineHeight: 1.5,
                      margin: '0 0 1rem 0',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {sp.ecological_value}
                  </p>

                  {/* Microclimate envelope stats */}
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr 1fr',
                      gap: '0.5rem',
                      fontSize: '0.78rem',
                      background: 'rgba(255, 255, 255, 0.03)',
                      padding: '0.75rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)' }}>
                      <CloudRain size={13} color="var(--accent-cyan)" />
                      <span>{sp.optimal_rainfall_mm?.[0]}-{sp.optimal_rainfall_mm?.[1]} mm</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)' }}>
                      <Thermometer size={13} color="var(--accent-amber)" />
                      <span>{sp.optimal_temp_c?.[0]}-{sp.optimal_temp_c?.[1]} °C</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', gridColumn: 'span 2' }}>
                      <Layers size={13} color="var(--accent-mint)" />
                      <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        Soils: {sp.compatible_soils?.slice(0, 3).join(', ')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div
                  style={{
                    display: 'flex',
                    gap: '0.6rem',
                    borderTop: '1px solid var(--border-subtle)',
                    paddingTop: '0.9rem'
                  }}
                >
                  <button
                    onClick={() => setSelectedGuide(sp)}
                    className="btn btn-secondary"
                    style={{ flex: 1, padding: '0.55rem 0.75rem', fontSize: '0.8rem' }}
                  >
                    <Sprout size={14} color="var(--accent-mint)" />
                    <span>Cultivation Protocol</span>
                  </button>

                  <button
                    onClick={() => {
                      if (onSelectSpeciesForPrediction) {
                        onSelectSpeciesForPrediction(sp.name);
                      }
                      if (setActiveTab) {
                        setActiveTab('predict');
                      }
                    }}
                    className="btn btn-primary"
                    style={{ padding: '0.55rem 0.85rem', fontSize: '0.8rem' }}
                    title={`Analyze survival for ${sp.name}`}
                  >
                    <span>Analyze</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Plantation Guide Modal */}
      <PlantationGuideModal
        species={selectedGuide}
        isOpen={!!selectedGuide}
        onClose={() => setSelectedGuide(null)}
      />
    </div>
  );
}
