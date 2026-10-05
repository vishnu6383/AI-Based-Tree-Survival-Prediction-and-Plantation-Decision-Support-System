import React, { useState, useEffect } from 'react';
import { Sprout, Search, ArrowRight, CloudRain, Thermometer, Layers, Zap, HeartHandshake } from 'lucide-react';
import PlantationGuideModal from '../components/PlantationGuideModal';
import { fetchSpeciesCatalog } from '../services/api';

const FALLBACK_SPECIES = [
  {
    name: "Neem",
    scientific_name: "Azadirachta indica",
    family: "Meliaceae",
    optimal_rainfall_mm: [400, 1200],
    optimal_temp_c: [21, 38],
    compatible_soils: ["Red", "Sandy", "Loamy", "Black", "Alluvial"],
    min_sunlight_hours: 6.0,
    drought_tolerance: "High",
    waterlogging_tolerance: "Low",
    growth_rate: "Moderate to Fast",
    ecological_value: "Natural bio-pesticide, air purifier, soil enricher, high medicinal yield."
  },
  {
    name: "Teak",
    scientific_name: "Tectona grandis",
    family: "Lamiaceae",
    optimal_rainfall_mm: [1200, 2500],
    optimal_temp_c: [22, 36],
    compatible_soils: ["Alluvial", "Loamy", "Red", "Black"],
    min_sunlight_hours: 7.0,
    drought_tolerance: "Moderate",
    waterlogging_tolerance: "Low to Moderate",
    growth_rate: "Moderate",
    ecological_value: "High timber value, substantial carbon storage, structural forestry."
  },
  {
    name: "Banyan",
    scientific_name: "Ficus benghalensis",
    family: "Moraceae",
    optimal_rainfall_mm: [750, 3500],
    optimal_temp_c: [18, 42],
    compatible_soils: ["Alluvial", "Loamy", "Clay", "Red", "Black"],
    min_sunlight_hours: 6.0,
    drought_tolerance: "High",
    waterlogging_tolerance: "Moderate",
    growth_rate: "Fast",
    ecological_value: "Keystone ecological species, massive canopy shade, supports rich bird and bat biodiversity."
  },
  {
    name: "Peepal",
    scientific_name: "Ficus religiosa",
    family: "Moraceae",
    optimal_rainfall_mm: [600, 3000],
    optimal_temp_c: [16, 45],
    compatible_soils: ["Loamy", "Alluvial", "Clay", "Sandy", "Red"],
    min_sunlight_hours: 6.0,
    drought_tolerance: "Extremely High",
    waterlogging_tolerance: "Moderate",
    growth_rate: "Fast",
    ecological_value: "24-hour oxygen release, exceptional carbon sequestration, sacred heritage tree."
  },
  {
    name: "Eucalyptus",
    scientific_name: "Eucalyptus globulus / tereticornis",
    family: "Myrtaceae",
    optimal_rainfall_mm: [600, 1500],
    optimal_temp_c: [15, 38],
    compatible_soils: ["Sandy", "Loamy", "Red", "Alluvial"],
    min_sunlight_hours: 8.0,
    drought_tolerance: "High",
    waterlogging_tolerance: "Low",
    growth_rate: "Extremely Fast",
    ecological_value: "Commercial pulpwood, essential oil extraction, rapid biomass accumulation."
  },
  {
    name: "Sal",
    scientific_name: "Shorea robusta",
    family: "Dipterocarpaceae",
    optimal_rainfall_mm: [1400, 3000],
    optimal_temp_c: [20, 36],
    compatible_soils: ["Red", "Loamy", "Sandy"],
    min_sunlight_hours: 7.0,
    drought_tolerance: "Low to Moderate",
    waterlogging_tolerance: "Low",
    growth_rate: "Slow to Moderate",
    ecological_value: "Climax forest indicator, watershed retention, rich non-timber forest produce."
  },
  {
    name: "Gulmohar",
    scientific_name: "Delonix regia",
    family: "Fabaceae",
    optimal_rainfall_mm: [700, 1800],
    optimal_temp_c: [20, 38],
    compatible_soils: ["Loamy", "Sandy", "Alluvial", "Red"],
    min_sunlight_hours: 7.5,
    drought_tolerance: "Moderate to High",
    waterlogging_tolerance: "Low",
    growth_rate: "Fast",
    ecological_value: "Spectacular flaming red canopy, urban microclimate cooler, nectar source for pollinators."
  },
  {
    name: "Bamboo",
    scientific_name: "Bambusa balcooa / Bambusoideae",
    family: "Poaceae",
    optimal_rainfall_mm: [1200, 3500],
    optimal_temp_c: [18, 35],
    compatible_soils: ["Alluvial", "Loamy", "Red", "Clay"],
    min_sunlight_hours: 6.0,
    drought_tolerance: "Low to Moderate",
    waterlogging_tolerance: "High",
    growth_rate: "Extremely Fast",
    ecological_value: "Highest carbon sequestration per hectare, riverbank stabilization, green building material."
  },
  {
    name: "Mango",
    scientific_name: "Mangifera indica",
    family: "Anacardiaceae",
    optimal_rainfall_mm: [750, 2200],
    optimal_temp_c: [22, 37],
    compatible_soils: ["Alluvial", "Loamy", "Red", "Black"],
    min_sunlight_hours: 7.0,
    drought_tolerance: "Moderate",
    waterlogging_tolerance: "Low",
    growth_rate: "Moderate",
    ecological_value: "Nutritional fruit supply, economic livelihood, dense canopy shade."
  },
  {
    name: "Mahogany",
    scientific_name: "Swietenia macrophylla",
    family: "Meliaceae",
    optimal_rainfall_mm: [1300, 3200],
    optimal_temp_c: [22, 35],
    compatible_soils: ["Alluvial", "Loamy", "Clay", "Red"],
    min_sunlight_hours: 6.0,
    drought_tolerance: "Low to Moderate",
    waterlogging_tolerance: "Moderate to High",
    growth_rate: "Fast to Moderate",
    ecological_value: "Elite timber, soil conservation in humid zones, long-term carbon lockup."
  }
];

export default function SpeciesExplorer() {
  const [speciesList, setSpeciesList] = useState(FALLBACK_SPECIES);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGuideSpecies, setSelectedGuideSpecies] = useState(null);

  useEffect(() => {
    const fetchCatalog = async () => {
      setLoading(true);
      try {
        const data = await fetchSpeciesCatalog();
        if (data && data.length > 0) {
          setSpeciesList(data);
        }
      } catch (err) {
        console.error("Failed to fetch species catalog:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCatalog();
  }, []);

  const filteredSpecies = speciesList.filter(s =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.scientific_name && s.scientific_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (s.family && s.family.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.4rem' }}>
          Tree Species Catalog
        </h1>
        <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', maxWidth: '800px' }}>
          Explore botanical profiles, growth characteristics, optimal environmental conditions, and comprehensive plantation protocols for candidate afforestation species.
        </p>
      </div>

      {/* Search Bar & Species Cards Grid */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>Candidate Species</h3>
            <span style={{
              background: 'rgba(52, 211, 153, 0.15)',
              color: 'var(--accent-mint)',
              fontSize: '0.8rem',
              fontWeight: 600,
              padding: '0.2rem 0.6rem',
              borderRadius: '999px'
            }}>
              {filteredSpecies.length} Species
            </span>
          </div>

          <div style={{ position: 'relative', minWidth: '280px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search by name, scientific name, or family..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.4rem', fontSize: '0.88rem' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.25rem' }}>
          {filteredSpecies.map((sp) => (
            <div
              key={sp.name}
              className="glass-panel glass-panel-interactive"
              style={{ padding: '1.4rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <div>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.9rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1.25rem', margin: 0, color: 'var(--text-primary)' }}>{sp.name}</h4>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '0.2rem' }}>
                      {sp.scientific_name}
                    </div>
                  </div>
                  {sp.family && (
                    <span style={{
                      fontSize: '0.72rem',
                      padding: '0.2rem 0.55rem',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.06)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-subtle)',
                      fontWeight: 500
                    }}>
                      {sp.family}
                    </span>
                  )}
                </div>

                {/* Botanical Badges Grid */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.6rem',
                  marginBottom: '1rem',
                  background: 'rgba(0, 0, 0, 0.2)',
                  padding: '0.75rem',
                  borderRadius: '8px'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <CloudRain size={14} color="var(--accent-cyan)" />
                    <span>
                      {Array.isArray(sp.optimal_rainfall_mm)
                        ? `${sp.optimal_rainfall_mm[0]}-${sp.optimal_rainfall_mm[1]} mm`
                        : `${sp.optimal_rainfall_mm || '400-1500'} mm`}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <Thermometer size={14} color="var(--accent-amber)" />
                    <span>
                      {Array.isArray(sp.optimal_temp_c)
                        ? `${sp.optimal_temp_c[0]}-${sp.optimal_temp_c[1]} °C`
                        : `${sp.optimal_temp_c || '20-35'} °C`}
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <Zap size={14} color="var(--accent-mint)" />
                    <span>{sp.growth_rate || 'Moderate'} Growth</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <HeartHandshake size={14} color="#a78bfa" />
                    <span>{sp.drought_tolerance || 'Moderate'} Drought Tol.</span>
                  </div>
                </div>

                {/* Compatible Soils */}
                {sp.compatible_soils && sp.compatible_soils.length > 0 && (
                  <div style={{ marginBottom: '0.9rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                      <Layers size={13} /> Compatible Soils:
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                      {sp.compatible_soils.map((soil) => (
                        <span
                          key={soil}
                          style={{
                            fontSize: '0.72rem',
                            padding: '0.15rem 0.45rem',
                            borderRadius: '4px',
                            background: 'rgba(52, 211, 153, 0.08)',
                            color: '#6ee7b7',
                            border: '1px solid rgba(52, 211, 153, 0.2)'
                          }}
                        >
                          {soil}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Ecological Value */}
                {sp.ecological_value && (
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.45, marginBottom: '1.1rem' }}>
                    {sp.ecological_value}
                  </p>
                )}
              </div>

              {/* Action Button */}
              <button
                className="btn btn-secondary"
                style={{ width: '100%', padding: '0.55rem 0.9rem', fontSize: '0.82rem', display: 'flex', justifyContent: 'space-between' }}
                onClick={() => setSelectedGuideSpecies(sp)}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Sprout size={15} color="var(--accent-mint)" /> View Plantation Guide
                </span>
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Guide Modal */}
      <PlantationGuideModal
        species={selectedGuideSpecies}
        isOpen={!!selectedGuideSpecies}
        onClose={() => setSelectedGuideSpecies(null)}
      />
    </div>
  );
}

