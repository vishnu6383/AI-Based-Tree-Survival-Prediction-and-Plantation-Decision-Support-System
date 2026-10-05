import React, { useState, useEffect } from 'react';
import {
  Sprout,
  Search,
  ArrowRight,
  CloudRain,
  Thermometer,
  Layers,
  Zap,
  HeartHandshake,
  Filter,
  TreePine,
  Sparkles
} from 'lucide-react';
import PlantationGuideModal from '../components/PlantationGuideModal';
import { fetchSpeciesCatalog } from '../services/api';
import { getSpeciesPhoto, getSpeciesCategory, getSpeciesBadge } from '../services/speciesImages';

const FALLBACK_SPECIES = [
  {
    name: 'Neem',
    scientific_name: 'Azadirachta indica',
    family: 'Meliaceae',
    optimal_rainfall_mm: [400, 1200],
    optimal_temp_c: [21, 38],
    compatible_soils: ['Red', 'Sandy', 'Loamy', 'Black', 'Alluvial'],
    min_sunlight_hours: 6.0,
    drought_tolerance: 'High',
    growth_rate: 'Moderate to Fast',
    ecological_value: 'Natural bio-pesticide, air purifier, soil enricher, and high medicinal yield.'
  },
  {
    name: 'Teak',
    scientific_name: 'Tectona grandis',
    family: 'Lamiaceae',
    optimal_rainfall_mm: [1200, 2500],
    optimal_temp_c: [22, 36],
    compatible_soils: ['Alluvial', 'Loamy', 'Red', 'Black'],
    min_sunlight_hours: 7.0,
    drought_tolerance: 'Moderate',
    growth_rate: 'Moderate',
    ecological_value: 'High timber commercial value, substantial long-term carbon storage.'
  },
  {
    name: 'Banyan',
    scientific_name: 'Ficus benghalensis',
    family: 'Moraceae',
    optimal_rainfall_mm: [750, 3500],
    optimal_temp_c: [18, 42],
    compatible_soils: ['Alluvial', 'Loamy', 'Clay', 'Red', 'Black'],
    min_sunlight_hours: 6.0,
    drought_tolerance: 'High',
    growth_rate: 'Fast',
    ecological_value: 'Keystone biodiversity host, massive canopy microclimate cooling, supports rich bird fauna.'
  },
  {
    name: 'Peepal',
    scientific_name: 'Ficus religiosa',
    family: 'Moraceae',
    optimal_rainfall_mm: [600, 3000],
    optimal_temp_c: [16, 45],
    compatible_soils: ['Loamy', 'Alluvial', 'Clay', 'Sandy', 'Red'],
    min_sunlight_hours: 6.0,
    drought_tolerance: 'Extremely High',
    growth_rate: 'Fast',
    ecological_value: '24-hour oxygen release, exceptional carbon capture, sacred heritage tree.'
  },
  {
    name: 'Eucalyptus',
    scientific_name: 'Eucalyptus globulus / tereticornis',
    family: 'Myrtaceae',
    optimal_rainfall_mm: [600, 1500],
    optimal_temp_c: [15, 38],
    compatible_soils: ['Sandy', 'Loamy', 'Red', 'Alluvial'],
    min_sunlight_hours: 8.0,
    drought_tolerance: 'High',
    growth_rate: 'Extremely Fast',
    ecological_value: 'Commercial pulpwood, essential oil extraction, rapid industrial biomass accumulation.'
  },
  {
    name: 'Sal',
    scientific_name: 'Shorea robusta',
    family: 'Dipterocarpaceae',
    optimal_rainfall_mm: [1400, 3000],
    optimal_temp_c: [20, 36],
    compatible_soils: ['Red', 'Loamy', 'Sandy'],
    min_sunlight_hours: 7.0,
    drought_tolerance: 'Low to Moderate',
    growth_rate: 'Slow to Moderate',
    ecological_value: 'Climax forest indicator, high watershed retention, non-timber produce.'
  },
  {
    name: 'Gulmohar',
    scientific_name: 'Delonix regia',
    family: 'Fabaceae',
    optimal_rainfall_mm: [700, 1800],
    optimal_temp_c: [20, 38],
    compatible_soils: ['Loamy', 'Sandy', 'Alluvial', 'Red'],
    min_sunlight_hours: 7.5,
    drought_tolerance: 'Moderate to High',
    growth_rate: 'Fast',
    ecological_value: 'Spectacular flaming red canopy, urban microclimate cooler, nectar source for pollinators.'
  },
  {
    name: 'Bamboo',
    scientific_name: 'Bambusa balcooa / Bambusoideae',
    family: 'Poaceae',
    optimal_rainfall_mm: [1200, 3500],
    optimal_temp_c: [18, 35],
    compatible_soils: ['Alluvial', 'Loamy', 'Red', 'Clay'],
    min_sunlight_hours: 6.0,
    drought_tolerance: 'Low to Moderate',
    growth_rate: 'Extremely Fast',
    ecological_value: 'Highest carbon sequestration per hectare, riverbank stabilization, sustainable building material.'
  },
  {
    name: 'Mango',
    scientific_name: 'Mangifera indica',
    family: 'Anacardiaceae',
    optimal_rainfall_mm: [750, 2200],
    optimal_temp_c: [22, 37],
    compatible_soils: ['Alluvial', 'Loamy', 'Red', 'Black'],
    min_sunlight_hours: 7.0,
    drought_tolerance: 'Moderate',
    growth_rate: 'Moderate',
    ecological_value: 'Nutritional fruit supply, rural agroforestry economic livelihood, dense canopy shade.'
  },
  {
    name: 'Mahogany',
    scientific_name: 'Swietenia macrophylla',
    family: 'Meliaceae',
    optimal_rainfall_mm: [1300, 3200],
    optimal_temp_c: [22, 35],
    compatible_soils: ['Alluvial', 'Loamy', 'Clay', 'Red'],
    min_sunlight_hours: 6.0,
    drought_tolerance: 'Low to Moderate',
    growth_rate: 'Fast to Moderate',
    ecological_value: 'Elite hardwood timber, tropical soil conservation, long-term carbon lockup.'
  }
];

export default function SpeciesExplorer() {
  const [speciesList, setSpeciesList] = useState(FALLBACK_SPECIES);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
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
        console.error('Failed to fetch species catalog:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCatalog();
  }, []);

  const filterTabs = [
    { id: 'all', label: 'All 10 Species' },
    { id: 'fast', label: 'Fast Growth' },
    { id: 'drought', label: 'Drought Hardy' },
    { id: 'timber', label: 'Commercial Timber' },
    { id: 'carbon', label: 'High Carbon Sink' }
  ];

  const filteredSpecies = speciesList.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.scientific_name && s.scientific_name.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (s.family && s.family.toLowerCase().includes(searchTerm.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeFilter === 'fast') {
      return s.growth_rate?.toLowerCase().includes('fast');
    }
    if (activeFilter === 'drought') {
      return s.drought_tolerance?.toLowerCase().includes('high');
    }
    if (activeFilter === 'timber') {
      return ['Teak', 'Mahogany', 'Sal', 'Eucalyptus'].includes(s.name);
    }
    if (activeFilter === 'carbon') {
      return ['Bamboo', 'Peepal', 'Banyan', 'Mahogany'].includes(s.name);
    }

    return true;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Header */}
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
          <Sprout size={14} /> Botanical Knowledge Base
        </div>
        <h1 style={{ fontSize: '2.4rem', marginBottom: '0.4rem' }}>
          Tree Species Botanical Catalog
        </h1>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', maxWidth: '780px' }}>
          Explore comprehensive botanical profiles, growth characteristics, optimal environmental envelopes, compatible soil taxonomies, and agronomic care protocols for candidate afforestation species.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        padding: '1.25rem',
        borderRadius: 'var(--radius-lg)',
        background: 'rgba(7, 18, 13, 0.7)',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          {/* Search Box */}
          <div style={{ position: 'relative', flex: 1, minWidth: '280px' }}>
            <Search size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search species by common name, scientific name, or family..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="form-input"
              style={{ paddingLeft: '2.6rem', fontSize: '0.9rem', borderRadius: 'var(--radius-md)' }}
            />
          </div>

          <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)' }}>
            Showing <strong style={{ color: 'var(--accent-mint)' }}>{filteredSpecies.length}</strong> of {speciesList.length} species
          </div>
        </div>

        {/* Filter Category Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-full)',
                background: activeFilter === tab.id ? 'rgba(52, 211, 153, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                color: activeFilter === tab.id ? '#6ee7b7' : 'var(--text-secondary)',
                border: activeFilter === tab.id ? '1px solid rgba(52, 211, 153, 0.45)' : '1px solid var(--border-subtle)',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Botanical Cards Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
        gap: '1.5rem'
      }}>
        {filteredSpecies.map((sp) => {
          const photoUrl = getSpeciesPhoto(sp.name);
          const category = getSpeciesCategory(sp.name);
          const badge = getSpeciesBadge(sp.name);

          return (
            <div
              key={sp.name}
              className="glass-panel glass-panel-interactive"
              style={{
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                {/* Photo & Badge Header */}
                <div style={{ position: 'relative', height: '170px', background: '#071811' }}>
                  <img
                    src={photoUrl}
                    alt={sp.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover'
                    }}
                  />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(12, 28, 21, 0.96) 0%, rgba(12, 28, 21, 0.3) 60%, rgba(0,0,0,0.3) 100%)'
                  }} />

                  {/* Category Pill on Image */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(0, 0, 0, 0.65)',
                    color: 'var(--accent-mint)',
                    border: '1px solid rgba(52, 211, 153, 0.3)',
                    backdropFilter: 'blur(8px)'
                  }}>
                    {category}
                  </div>

                  {/* Botanical Badge Tag */}
                  <div style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '12px',
                    fontSize: '0.7rem',
                    fontWeight: 600,
                    padding: '0.2rem 0.55rem',
                    borderRadius: '4px',
                    background: 'rgba(16, 185, 129, 0.15)',
                    color: '#a7f3d0',
                    border: '1px solid rgba(16, 185, 129, 0.3)',
                    backdropFilter: 'blur(6px)'
                  }}>
                    {badge}
                  </div>
                </div>

                {/* Card Content */}
                <div style={{ padding: '1.25rem' }}>
                  {/* Title & Family */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.85rem' }}>
                    <div>
                      <h3 style={{ fontSize: '1.35rem', margin: 0, color: '#ffffff', fontFamily: 'var(--font-display)' }}>
                        {sp.name}
                      </h3>
                      <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '0.15rem' }}>
                        {sp.scientific_name}
                      </div>
                    </div>
                    {sp.family && (
                      <span style={{
                        fontSize: '0.72rem',
                        padding: '0.2rem 0.55rem',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        color: 'var(--text-secondary)',
                        border: '1px solid var(--border-subtle)'
                      }}>
                        {sp.family}
                      </span>
                    )}
                  </div>

                  {/* Botanical Badges Grid */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '0.55rem',
                    marginBottom: '1rem',
                    background: 'rgba(5, 14, 10, 0.65)',
                    padding: '0.75rem',
                    borderRadius: 'var(--radius-sm)'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      <CloudRain size={14} color="var(--accent-cyan)" />
                      <span>
                        {Array.isArray(sp.optimal_rainfall_mm)
                          ? `${sp.optimal_rainfall_mm[0]}–${sp.optimal_rainfall_mm[1]} mm`
                          : `${sp.optimal_rainfall_mm || '400–1500'} mm`}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      <Thermometer size={14} color="var(--accent-amber)" />
                      <span>
                        {Array.isArray(sp.optimal_temp_c)
                          ? `${sp.optimal_temp_c[0]}–${sp.optimal_temp_c[1]} °C`
                          : `${sp.optimal_temp_c || '20–35'} °C`}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      <Zap size={14} color="var(--accent-mint)" />
                      <span>{sp.growth_rate || 'Moderate'} Growth</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      <HeartHandshake size={14} color="#a78bfa" />
                      <span>{sp.drought_tolerance || 'Moderate'} Drought</span>
                    </div>
                  </div>

                  {/* Compatible Soils */}
                  {sp.compatible_soils && sp.compatible_soils.length > 0 && (
                    <div style={{ marginBottom: '0.85rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.74rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>
                        <Layers size={13} /> Compatible Soil Taxonomies:
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
                        {sp.compatible_soils.map((soil) => (
                          <span
                            key={soil}
                            style={{
                              fontSize: '0.72rem',
                              padding: '0.15rem 0.5rem',
                              borderRadius: '4px',
                              background: 'rgba(52, 211, 153, 0.08)',
                              color: '#a7f3d0',
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
                    <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5, marginBottom: '1.25rem' }}>
                      {sp.ecological_value}
                    </p>
                  )}
                </div>
              </div>

              {/* View Protocol CTA Button */}
              <div style={{ padding: '0 1.25rem 1.25rem 1.25rem' }}>
                <button
                  className="btn btn-secondary"
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.95rem',
                    fontSize: '0.84rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderRadius: 'var(--radius-sm)'
                  }}
                  onClick={() => setSelectedGuideSpecies(sp)}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                    <Sprout size={15} color="var(--accent-mint)" /> View Plantation Guide
                  </span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          );
        })}
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
