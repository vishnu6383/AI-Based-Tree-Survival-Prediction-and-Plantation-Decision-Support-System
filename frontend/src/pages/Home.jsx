import React, { useState } from 'react';
import {
  Sprout,
  ArrowRight,
  CloudRain,
  Thermometer,
  Layers,
  Droplets,
  Sun,
  Activity,
  Cpu,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  TreePine,
  CheckCircle2,
  AlertOctagon,
  ChevronRight,
  Compass,
  Award,
  Zap,
  Globe,
  BarChart3,
  Scale,
  Leaf,
  Info,
  ChevronDown,
  ChevronUp,
  XCircle,
  HelpCircle
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import PlantationGuideModal from '../components/PlantationGuideModal';
import { getSpeciesPhoto } from '../services/speciesImages';

export default function Home({ setActiveTab, onSelectPreset }) {
  // Mini interactive climate simulator on hero
  const [heroRain, setHeroRain] = useState(1250);
  const [heroTemp, setHeroTemp] = useState(28);
  const [heroMoist, setHeroMoist] = useState(55);
  const [heroSpecies, setHeroSpecies] = useState('Neem');
  const [selectedGuideSpecies, setSelectedGuideSpecies] = useState(null);

  // Carbon & Impact Simulator States
  const [impactSaplings, setImpactSaplings] = useState(1500);
  const [impactSpecies, setImpactSpecies] = useState('Neem');

  // Eco-Region Bio-Zone Selector State
  const [selectedRegionIdx, setSelectedRegionIdx] = useState(0);

  // Species Filter Category State
  const [speciesFilter, setSpeciesFilter] = useState('all');

  // Interactive Pipeline Step State
  const [activePipelineStep, setActivePipelineStep] = useState(0);

  // FAQ Accordion State
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  // Dynamic quick calculation for hero preview
  const calculateHeroViability = () => {
    let score = 75;
    if (heroSpecies === 'Neem') {
      if (heroRain >= 400 && heroRain <= 1200) score += 15;
      if (heroTemp >= 21 && heroTemp <= 38) score += 8;
      if (heroMoist > 75) score -= 20; // dislikes waterlogging
    } else if (heroSpecies === 'Teak') {
      if (heroRain >= 1200 && heroRain <= 2500) score += 15;
      if (heroTemp >= 22 && heroTemp <= 36) score += 8;
    } else if (heroSpecies === 'Bamboo') {
      if (heroRain >= 1200) score += 18;
      if (heroMoist >= 50) score += 10;
    } else if (heroSpecies === 'Peepal') {
      score += 15; // highly resilient
    } else if (heroSpecies === 'Gulmohar') {
      if (heroTemp >= 20 && heroTemp <= 38) score += 12;
      if (heroMoist > 80) score -= 15;
    } else if (heroSpecies === 'Banyan') {
      if (heroRain >= 750) score += 14;
    } else if (heroSpecies === 'Mango') {
      if (heroRain >= 1000 && heroRain <= 2500) score += 12;
      if (heroMoist > 70) score -= 10;
    } else if (heroSpecies === 'Mahogany') {
      if (heroRain >= 1500) score += 16;
      if (heroMoist < 30) score -= 15;
    }
    return Math.min(96.5, Math.max(22.0, score));
  };

  const heroViability = calculateHeroViability();
  const heroRisk = heroViability >= 68 ? 'Low Risk' : heroViability >= 45 ? 'Medium Risk' : 'High Risk';
  const heroStatus = heroViability >= 68 ? 'High Viability' : heroViability >= 45 ? 'Moderate Viability' : 'Low Viability';

  // Dynamic Insight Tip for Playground
  const getHeroInsight = () => {
    if (heroSpecies === 'Neem' && heroMoist > 70) {
      return '⚠️ High soil moisture detected. Neem prefers well-drained sandy loam and may suffer root fungal necrosis in saturated soil.';
    }
    if (heroSpecies === 'Teak' && heroRain < 800) {
      return '⚠️ Low rainfall alert. Teak requires minimum 1200mm annual precipitation for optimal bole girth development.';
    }
    if (heroSpecies === 'Bamboo' && heroRain >= 1200) {
      return '✨ Ideal humid parameters! Bamboo will achieve rapid culm elongation and maximum carbon sequestration.';
    }
    if (heroSpecies === 'Peepal') {
      return '✨ Exceptional hardiness! Ficus religiosa tolerates broad thermal swings and variable soil compaction.';
    }
    return `✨ Parameter calibration matches botanical envelope for ${heroSpecies}. Tap below for comprehensive ML evaluation.`;
  };

  // 5 Indian Eco-Regions
  const ecoRegions = [
    {
      name: 'Arid Thar & Semi-Arid Scrub',
      state: 'Rajasthan / Gujarat',
      icon: '🏜️',
      rain: '350 mm',
      temp: '38°C',
      soil: 'Sandy',
      moisture: '20%',
      topSpecies: ['Neem', 'Peepal', 'Gulmohar'],
      survivalRate: '88.4%',
      strategy: 'Drip micro-irrigation + deep taproot excavation (60x60x60 cm).'
    },
    {
      name: 'Western Ghats Wet Evergreen',
      state: 'Kerala / Karnataka / Goa',
      icon: '🌧️',
      rain: '2800 mm',
      temp: '26°C',
      soil: 'Laterite / Red',
      moisture: '80%',
      topSpecies: ['Bamboo', 'Mahogany', 'Teak'],
      survivalRate: '94.2%',
      strategy: 'Slope erosion contour trenching + mycorrhizal root inoculation.'
    },
    {
      name: 'Indo-Gangetic Alluvial Basin',
      state: 'UP / Bihar / Punjab / WB',
      icon: '🌾',
      rain: '1350 mm',
      temp: '28°C',
      soil: 'Alluvial',
      moisture: '60%',
      topSpecies: ['Banyan', 'Peepal', 'Mango'],
      survivalRate: '96.1%',
      strategy: 'Wide canopy spacing (10m) + organic vermicompost enrichment.'
    },
    {
      name: 'Deccan Plateau Semi-Arid',
      state: 'Telangana / Maharashtra / AP',
      icon: '⛰️',
      rain: '750 mm',
      temp: '32°C',
      soil: 'Black Cotton / Clay',
      moisture: '35%',
      topSpecies: ['Neem', 'Teak', 'Sal'],
      survivalRate: '89.7%',
      strategy: 'Clay aeration with sand amendments + biochar mulching.'
    },
    {
      name: 'Subtropical Himalayan Foothills',
      state: 'Uttarakhand / Himachal',
      icon: '🌲',
      rain: '1600 mm',
      temp: '21°C',
      soil: 'Loamy',
      moisture: '55%',
      topSpecies: ['Sal', 'Bamboo', 'Teak'],
      survivalRate: '92.5%',
      strategy: 'Terrace bunding + cold-hardy windbreak planting.'
    }
  ];

  // 10 Botanical Cultivars
  const allSpeciesCatalog = [
    { name: 'Neem', scientific: 'Azadirachta indica', category: 'drought', tag: 'Drought Resilient', badge: 'Medicinal & Agroforestry', rain: '400–1200 mm', carbon: '22 kg/yr', soil: 'Sandy / Loamy' },
    { name: 'Teak', scientific: 'Tectona grandis', category: 'timber', tag: 'High Timber Yield', badge: 'Commercial Forestry', rain: '1200–2500 mm', carbon: '35 kg/yr', soil: 'Alluvial / Loamy' },
    { name: 'Banyan', scientific: 'Ficus benghalensis', category: 'keystone', tag: 'Keystone Ecology', badge: 'Massive Canopy Shade', rain: '750–3500 mm', carbon: '48 kg/yr', soil: 'Alluvial / Loamy' },
    { name: 'Peepal', scientific: 'Ficus religiosa', category: 'keystone', tag: '24hr Oxygen Release', badge: 'Sacred Heritage', rain: '600–3000 mm', carbon: '45 kg/yr', soil: 'Loamy / Clay' },
    { name: 'Gulmohar', scientific: 'Delonix regia', category: 'drought', tag: 'Scarlet Floral', badge: 'Urban Landscape', rain: '700–1800 mm', carbon: '18 kg/yr', soil: 'Sandy / Alluvial' },
    { name: 'Bamboo', scientific: 'Bambusa balcooa', category: 'carbon', tag: 'Max Carbon Sink', badge: 'Erosion Stabilizer', rain: '1200–3500 mm', carbon: '60 kg/yr', soil: 'Red / Loamy' },
    { name: 'Eucalyptus', scientific: 'Eucalyptus tereticornis', category: 'timber', tag: 'Rapid Biomass', badge: 'Pulpwood & Agroforestry', rain: '600–1500 mm', carbon: '38 kg/yr', soil: 'Sandy / Loamy' },
    { name: 'Sal', scientific: 'Shorea robusta', category: 'timber', tag: 'Dense Hardwood', badge: 'Tropical Moist Forest', rain: '1000–3000 mm', carbon: '42 kg/yr', soil: 'Loamy / Red' },
    { name: 'Mango', scientific: 'Mangifera indica', category: 'keystone', tag: 'Fruit & Canopy', badge: 'Horticulture & Shading', rain: '1000–2500 mm', carbon: '28 kg/yr', soil: 'Alluvial / Loamy' },
    { name: 'Mahogany', scientific: 'Swietenia macrophylla', category: 'carbon', tag: 'Luxury Hardwood', badge: 'Rainforest Canopy', rain: '1500–3500 mm', carbon: '52 kg/yr', soil: 'Alluvial / Loamy' }
  ];

  const filteredSpecies = speciesFilter === 'all'
    ? allSpeciesCatalog
    : allSpeciesCatalog.filter(sp => sp.category === speciesFilter);

  const problemCards = [
    {
      icon: CloudRain,
      color: 'var(--accent-cyan)',
      title: 'Rainfall Mismatch',
      subtitle: 'Water Deficit & Root Inundation',
      desc: 'Planting species outside their native precipitation limits causes cavitation in saplings or anaerobic root rot during floods.',
      stat: '38% Loss'
    },
    {
      icon: Thermometer,
      color: 'var(--accent-amber)',
      title: 'Thermal Extremes',
      subtitle: 'Heat Desiccation & Frost Shock',
      desc: 'High ambient heat exceeds stomatal thermal limits, while unseasonal cold snaps halt cambial cell division.',
      stat: '27% Loss'
    },
    {
      icon: Layers,
      color: '#a855f7',
      title: 'Soil Classification Conflict',
      subtitle: 'Taxonomy & Drainage Barriers',
      desc: 'Dense clay restricts taproot aeration, while porous sandy soils fail to hold exchangeable potassium and moisture.',
      stat: '24% Loss'
    },
    {
      icon: Droplets,
      color: 'var(--accent-mint)',
      title: 'Soil Moisture Stress',
      subtitle: 'Turgor Loss & Fungal Pathogens',
      desc: 'Inadequate or oversaturated soil moisture induces pathogen vulnerability and irreversible vascular collapse.',
      stat: '31% Loss'
    },
    {
      icon: Sun,
      color: '#fbbf24',
      title: 'Sunlight Deficits',
      subtitle: 'Photosynthetic Starvation',
      desc: 'Insufficient sunlight hours limit carbohydrate accumulation, leaving young tree boles fragile and stunted.',
      stat: '19% Loss'
    },
    {
      icon: Activity,
      color: 'var(--accent-rose)',
      title: 'Water Table Stress',
      subtitle: 'Establishment Phase Drought',
      desc: 'Low sub-surface water availability during the critical 18-month root development window leads to catastrophic die-off.',
      stat: '42% Loss'
    }
  ];

  const workflowSteps = [
    {
      step: '01',
      title: 'Environmental Ingestion',
      subtitle: 'Site-Specific Telemetry',
      desc: 'Ingests rainfall (mm), ambient temperature (°C), soil classification taxonomy, soil moisture percentage, and daily sunlight hours.',
      icon: CloudRain,
      metric: '6 Environmental Vectors'
    },
    {
      step: '02',
      title: 'Pipeline Preprocessing',
      subtitle: 'Scaling & One-Hot Encoding',
      desc: 'Continuous environmental variables are normalized via StandardScaler, while categorical soil types are mapped into sparse binary matrices.',
      icon: Layers,
      metric: 'Zero Feature Bias'
    },
    {
      step: '03',
      title: 'Random Forest Inference',
      subtitle: '100 Ensemble Trees',
      desc: '100 de-correlated decision trees evaluate non-linear multi-factorial botanical thresholds without overfitting.',
      icon: Cpu,
      metric: '100 Decision Trees'
    },
    {
      step: '04',
      title: 'Calibrated Probability',
      subtitle: 'Risk Stratification',
      desc: 'Outputs soft probability scores via predict_proba and stratifies survival risk into High Viability, Moderate Viability, or Low Viability.',
      icon: TrendingUp,
      metric: '86.0% Test Accuracy'
    },
    {
      step: '05',
      title: 'Multi-Species Ranking',
      subtitle: 'Top 3 Recommendations',
      desc: 'Simultaneously tests all 10 candidate tree cultivars against site telemetry to rank the top 3 best-suited species.',
      icon: Sprout,
      metric: '10 Cultivars Screened'
    },
    {
      step: '06',
      title: 'Agronomic Guidance',
      subtitle: 'Field Plantation Protocol',
      desc: 'Generates precision excavation pit dimensions, inter-tree spacing, soil amendments, and quarterly irrigation schedules.',
      icon: ShieldCheck,
      metric: 'Field Ready Protocols'
    }
  ];

  const presets = [
    {
      label: 'Arid / Semi-Drought',
      params: { rainfall_mm: 450, temperature_c: 36.0, soil_type: 'Sandy', soil_moisture_percent: 20.0, sunlight_hours: 9.0, water_availability: 'Low', tree_species: 'Neem' }
    },
    {
      label: 'Monsoon River Basin',
      params: { rainfall_mm: 1450, temperature_c: 27.5, soil_type: 'Alluvial', soil_moisture_percent: 65.0, sunlight_hours: 7.0, water_availability: 'High', tree_species: 'Teak' }
    },
    {
      label: 'Highland Temperate Loam',
      params: { rainfall_mm: 950, temperature_c: 22.0, soil_type: 'Loamy', soil_moisture_percent: 45.0, sunlight_hours: 6.5, water_availability: 'Medium', tree_species: 'Peepal' }
    },
    {
      label: 'Tropical Humid Rainforest',
      params: { rainfall_mm: 2200, temperature_c: 30.0, soil_type: 'Red', soil_moisture_percent: 75.0, sunlight_hours: 8.0, water_availability: 'High', tree_species: 'Bamboo' }
    }
  ];

  // Afforestation Carbon Impact Calculations
  const calcCarbonTonnes = Math.round((impactSaplings * 0.864 * 32 * 10) / 1000);
  const calcSavedTrees = Math.round(impactSaplings * 0.864);
  const calcWaterLitres = (impactSaplings * 0.864 * 1250).toLocaleString();
  const calcCapitalSaved = (impactSaplings * 0.58 * 140).toLocaleString();

  // Knowledge FAQs
  const reforestationFaqs = [
    {
      q: 'Why do traditional tree planting drives experience up to 70% sapling mortality?',
      a: 'Most tree-planting programs rely on uniform nursery stock planted across uncharacterized soil profiles. A lack of microclimatic calibration (e.g. planting high-transpiration Teak in low water table sandy soils, or drought-tolerant Neem in flood-prone clay) triggers fatal root asphyxiation, moisture starvation, or pathogen infection.'
    },
    {
      q: 'How does the Random Forest model handle multi-variable climate interactions?',
      a: 'Unlike linear models or single decision trees that overfit, our ensemble of 100 decision trees splits data across randomized sub-samples of rainfall, temperature, soil taxonomy, moisture, and sunlight. This captures complex non-linear botanical boundaries—such as high heat tolerance being preserved only when soil moisture exceeds 45%.'
    },
    {
      q: 'What is the role of pit dimensions and soil amendments in the recommendation engine?',
      a: 'Even with high survival probability, mechanical establishment requires tailored soil aeration. Large taproot species like Neem or Teak require 60x60x60 cm excavation pits with vermicompost and mycorrhizal fungi to overcome soil compaction and anchor the sapling within the first 120 days.'
    },
    {
      q: 'Can TreeSense AI recommend species for urban avenue greening vs commercial timber?',
      a: 'Yes. The system evaluates both ecological hardiness and secondary utility. You can filter for drought-resilient urban shade species (like Gulmohar and Peepal), high-density timber species (like Teak and Sal), or ultra-rapid carbon sequestration cultivars (like Bamboo).'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '5.5rem' }}>
      {/* ------------------------------------------------------------------ */}
      {/* 1. CINEMATIC HERO SECTION WITH LIVE INTERACTIVE CLIMATE WIDGET     */}
      {/* ------------------------------------------------------------------ */}
      <section style={{
        position: 'relative',
        borderRadius: 'var(--radius-xl)',
        padding: '4.5rem 2.5rem',
        background: 'linear-gradient(135deg, rgba(8, 26, 18, 0.95) 0%, rgba(3, 10, 7, 0.98) 100%)',
        border: '1px solid rgba(52, 211, 153, 0.35)',
        boxShadow: '0 30px 90px rgba(0, 0, 0, 0.75), var(--shadow-glow-emerald)',
        overflow: 'hidden'
      }}>
        {/* Animated Aurora Glow Orbs in Background */}
        <div style={{
          position: 'absolute',
          top: '-25%',
          right: '-10%',
          width: '550px',
          height: '550px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.25) 0%, transparent 70%)',
          filter: 'blur(45px)',
          pointerEvents: 'none'
        }} className="animate-aurora" />

        <div style={{
          position: 'absolute',
          bottom: '-25%',
          left: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, transparent 70%)',
          filter: 'blur(45px)',
          pointerEvents: 'none'
        }} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '3.5rem',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2
        }}>
          {/* Left Column: Headlines & Direct CTAs */}
          <div>
            {/* Glowing Badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.55rem',
              padding: '0.45rem 1.1rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(52, 211, 153, 0.14)',
              border: '1px solid rgba(52, 211, 153, 0.4)',
              boxShadow: '0 0 25px rgba(16, 185, 129, 0.3)',
              marginBottom: '1.5rem'
            }}>
              <span className="pulse-beacon" />
              <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#6ee7b7', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                Next-Gen Climate Intelligence Engine
              </span>
            </div>

            <h1 style={{
              fontSize: 'clamp(2.5rem, 4.8vw, 3.8rem)',
              lineHeight: 1.12,
              marginBottom: '1.4rem',
              letterSpacing: '-0.035em'
            }}>
              Plant Smarter. <br />
              <span className="gradient-text-hero">Predict Survival.</span> <br />
              Restore Earth.
            </h1>

            <p style={{
              fontSize: '1.08rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.65,
              marginBottom: '2.2rem',
              maxWidth: '560px'
            }}>
              An AI-powered environmental decision-support system that analyzes microclimatic rainfall, temperature, soil taxonomy, moisture, and sunlight to eliminate afforestation sapling mortality and restore healthy tree canopies.
            </p>

            {/* Main Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
              <button
                onClick={() => setActiveTab('predict')}
                className="btn btn-primary"
                style={{ padding: '0.95rem 1.9rem', fontSize: '1.02rem', borderRadius: 'var(--radius-md)' }}
              >
                <Sparkles size={19} />
                <span>Start Environmental Analysis</span>
                <ArrowRight size={17} />
              </button>

              <button
                onClick={() => setActiveTab('species')}
                className="btn btn-secondary"
                style={{ padding: '0.95rem 1.6rem', fontSize: '0.98rem', borderRadius: 'var(--radius-md)' }}
              >
                <Sprout size={19} color="var(--accent-mint)" />
                <span>Explore 10 Cultivars</span>
              </button>
            </div>

            {/* Quick Climate Preset Launchers */}
            <div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.06em', marginBottom: '0.75rem' }}>
                Quick Agro-Climatic Presets
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
                {presets.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      onSelectPreset(preset.params);
                      setActiveTab('predict');
                    }}
                    style={{
                      padding: '0.45rem 0.9rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-color)',
                      color: 'var(--text-secondary)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(52, 211, 153, 0.16)';
                      e.currentTarget.style.color = '#ffffff';
                      e.currentTarget.style.borderColor = 'var(--accent-mint)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                      e.currentTarget.style.borderColor = 'var(--border-color)';
                    }}
                  >
                    <span>{preset.label}</span>
                    <ChevronRight size={13} color="var(--accent-mint)" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Live Simulator Card */}
          <div className="glass-panel-elevated animate-float-slow" style={{
            padding: '2.2rem',
            border: '1px solid rgba(52, 211, 153, 0.4)',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), 0 0 35px rgba(16, 185, 129, 0.25)'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid var(--border-subtle)',
              paddingBottom: '0.9rem',
              marginBottom: '1.25rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Zap size={19} color="var(--accent-neon)" />
                <span style={{ fontSize: '1rem', fontWeight: 800, color: '#ffffff' }}>
                  Live Microclimate Playground
                </span>
              </div>
              <span style={{
                fontSize: '0.74rem',
                fontWeight: 800,
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(6, 182, 212, 0.18)',
                color: '#67e8f9',
                border: '1px solid rgba(6, 182, 212, 0.35)'
              }}>
                Instant ML Test
              </span>
            </div>

            {/* Target Species Selector */}
            <div style={{ marginBottom: '1.1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.45rem', fontWeight: 600 }}>
                <span>Select Test Species:</span>
                <span style={{ color: 'var(--accent-mint)', fontWeight: 700 }}>{heroSpecies}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                {['Neem', 'Teak', 'Banyan', 'Peepal', 'Bamboo', 'Mango'].map((sp) => (
                  <button
                    key={sp}
                    type="button"
                    onClick={() => setHeroSpecies(sp)}
                    style={{
                      padding: '0.35rem 0.75rem',
                      borderRadius: '8px',
                      background: heroSpecies === sp ? 'rgba(52, 211, 153, 0.28)' : 'rgba(255, 255, 255, 0.04)',
                      color: heroSpecies === sp ? '#6ee7b7' : 'var(--text-secondary)',
                      border: heroSpecies === sp ? '1px solid var(--accent-mint)' : '1px solid var(--border-subtle)',
                      fontSize: '0.8rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    {sp}
                  </button>
                ))}
              </div>
            </div>

            {/* Sliders */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.95rem', marginBottom: '1.4rem' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><CloudRain size={14} color="var(--accent-cyan)" /> Annual Rainfall</span>
                  <span style={{ color: '#ffffff', fontWeight: 700 }}>{heroRain} mm</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="3500"
                  step="50"
                  value={heroRain}
                  onChange={(e) => setHeroRain(Number(e.target.value))}
                  className="slider-premium"
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Thermometer size={14} color="var(--accent-amber)" /> Temperature</span>
                  <span style={{ color: '#ffffff', fontWeight: 700 }}>{heroTemp} °C</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="48"
                  step="1"
                  value={heroTemp}
                  onChange={(e) => setHeroTemp(Number(e.target.value))}
                  className="slider-premium"
                />
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '0.3rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}><Droplets size={14} color="var(--accent-mint)" /> Soil Moisture</span>
                  <span style={{ color: '#ffffff', fontWeight: 700 }}>{heroMoist}%</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="90"
                  step="2"
                  value={heroMoist}
                  onChange={(e) => setHeroMoist(Number(e.target.value))}
                  className="slider-premium"
                />
              </div>
            </div>

            {/* Calculated Viability Outcome Box */}
            <div style={{
              padding: '1.2rem',
              borderRadius: 'var(--radius-md)',
              background: 'linear-gradient(135deg, rgba(6, 22, 15, 0.95), rgba(10, 32, 24, 0.9))',
              border: '1px solid rgba(52, 211, 153, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.9rem'
            }}>
              <div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Estimated Viability Score
                </div>
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '2.2rem',
                  fontWeight: 800,
                  color: heroViability >= 68 ? 'var(--accent-mint)' : heroViability >= 45 ? '#fbbf24' : '#f87171',
                  lineHeight: 1.1
                }}>
                  {heroViability.toFixed(1)}%
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                  {heroStatus}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <StatusBadge riskLevel={heroRisk} status={heroStatus} size="sm" />
              </div>
            </div>

            {/* Micro Live Insight Tip */}
            <div style={{
              padding: '0.65rem 0.85rem',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-subtle)',
              fontSize: '0.76rem',
              color: 'var(--text-secondary)',
              lineHeight: 1.45,
              marginBottom: '1.2rem'
            }}>
              {getHeroInsight()}
            </div>

            <button
              onClick={() => {
                onSelectPreset({
                  rainfall_mm: heroRain,
                  temperature_c: heroTemp,
                  soil_type: 'Loamy',
                  soil_moisture_percent: heroMoist,
                  sunlight_hours: 7.5,
                  water_availability: 'Medium',
                  tree_species: heroSpecies
                });
                setActiveTab('predict');
              }}
              className="btn btn-primary"
              style={{ width: '100%', padding: '0.85rem', fontSize: '0.92rem' }}
            >
              <span>Launch Full Random Forest Inference</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 2. LIVE IMPACT & ML TELEMETRY STAT STRIP                           */}
      {/* ------------------------------------------------------------------ */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.4rem'
      }}>
        <div className="glow-card-border">
          <div className="glow-card-inner">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em' }}>Dataset Scale</span>
              <BarChart3 size={20} color="var(--accent-cyan)" />
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#ffffff', fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>
              12,000+
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>Microclimate training records across agro-climatic zones</div>
          </div>
        </div>

        <div className="glow-card-border">
          <div className="glow-card-inner">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em' }}>Model Accuracy</span>
              <Award size={20} color="var(--accent-mint)" />
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent-mint)', fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>
              86.0%
            </div>
            <div style={{ fontSize: '0.84rem', color: '#6ee7b7' }}>Random Forest cross-validated multi-class accuracy</div>
          </div>
        </div>

        <div className="glow-card-border">
          <div className="glow-card-inner">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em' }}>Viability Recall</span>
              <TrendingUp size={20} color="#a855f7" />
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#c084fc', fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>
              98.04%
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>Zero false rejection of genuinely viable tree species</div>
          </div>
        </div>

        <div className="glow-card-border">
          <div className="glow-card-inner">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em' }}>Species Catalog</span>
              <Sprout size={20} color="#fbbf24" />
            </div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fef08a', fontFamily: 'var(--font-display)', letterSpacing: '-0.03em' }}>
              10
            </div>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>Botanical afforestation cultivars with field protocols</div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 3. INTERACTIVE REFORESTATION & CARBON IMPACT SIMULATOR              */}
      {/* ------------------------------------------------------------------ */}
      <section style={{
        padding: '3.5rem 2.5rem',
        borderRadius: 'var(--radius-xl)',
        background: 'linear-gradient(135deg, rgba(8, 24, 17, 0.9) 0%, rgba(4, 14, 10, 0.95) 100%)',
        border: '1px solid rgba(52, 211, 153, 0.35)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.6)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.8rem',
              fontWeight: 800,
              color: 'var(--accent-mint)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              marginBottom: '0.4rem'
            }}>
              <Scale size={15} /> Impact Forecaster
            </div>
            <h2 style={{ fontSize: '2.2rem', color: '#ffffff', margin: 0 }}>
              Afforestation Ecological Impact Simulator
            </h2>
            <p style={{ fontSize: '0.98rem', color: 'var(--text-secondary)', marginTop: '0.4rem', maxWidth: '640px' }}>
              Simulate how AI precision species matching prevents dead-sapling waste and supercharges carbon sequestration across project scales.
            </p>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            padding: '0.55rem 1rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(52, 211, 153, 0.1)',
            border: '1px solid rgba(52, 211, 153, 0.3)'
          }}>
            <Leaf size={18} color="var(--accent-mint)" />
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#6ee7b7' }}>
              Baseline Survival: 86.4%
            </span>
          </div>
        </div>

        {/* Interactive Controls */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          alignItems: 'center',
          marginBottom: '2.5rem'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
              <label style={{ fontSize: '0.92rem', fontWeight: 700, color: '#ffffff' }}>
                Plantation Project Scale (Saplings):
              </label>
              <span style={{
                fontFamily: 'var(--font-number)',
                fontSize: '1.3rem',
                fontWeight: 800,
                color: 'var(--accent-mint)'
              }}>
                {impactSaplings.toLocaleString()} saplings
              </span>
            </div>
            <input
              type="range"
              min="100"
              max="20000"
              step="100"
              value={impactSaplings}
              onChange={(e) => setImpactSaplings(Number(e.target.value))}
              className="slider-premium"
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
              <span>Community (100)</span>
              <span>Farm (5,000)</span>
              <span>District Forest (20,000)</span>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.92rem', fontWeight: 700, color: '#ffffff', marginBottom: '0.6rem' }}>
              Target Dominant Cultivar:
            </label>
            <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
              {['Neem', 'Teak', 'Bamboo', 'Banyan', 'Mahogany'].map(sp => (
                <button
                  key={sp}
                  onClick={() => setImpactSpecies(sp)}
                  style={{
                    padding: '0.45rem 0.95rem',
                    borderRadius: 'var(--radius-sm)',
                    background: impactSpecies === sp ? 'rgba(52, 211, 153, 0.25)' : 'rgba(255, 255, 255, 0.04)',
                    color: impactSpecies === sp ? '#6ee7b7' : 'var(--text-secondary)',
                    border: impactSpecies === sp ? '1px solid var(--accent-mint)' : '1px solid var(--border-subtle)',
                    fontSize: '0.84rem',
                    fontWeight: 700,
                    cursor: 'pointer'
                  }}
                >
                  {sp}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Calculation Output Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem'
        }}>
          <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(10, 30, 20, 0.75)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, marginBottom: '0.4rem' }}>
              Successfully Rooted Trees
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: 'var(--accent-mint)', fontFamily: 'var(--font-display)' }}>
              {calcSavedTrees.toLocaleString()}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Trees reaching maturity (vs 70% loss in guesswork planting)
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(10, 30, 20, 0.75)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, marginBottom: '0.4rem' }}>
              CO₂ Sequestered (10-Yr)
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#67e8f9', fontFamily: 'var(--font-display)' }}>
              {calcCarbonTonnes.toLocaleString()} MT
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Metric Tons of atmospheric carbon sink capacity
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(10, 30, 20, 0.75)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, marginBottom: '0.4rem' }}>
              Annual Aquifer Recharge
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#fef08a', fontFamily: 'var(--font-display)' }}>
              {calcWaterLitres} L
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Sub-surface rainwater percolation capacity
            </div>
          </div>

          <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(10, 30, 20, 0.75)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 800, marginBottom: '0.4rem' }}>
              Reforestation Capital Saved
            </div>
            <div style={{ fontSize: '2.2rem', fontWeight: 800, color: '#c084fc', fontFamily: 'var(--font-display)' }}>
              ₹{calcCapitalSaved}
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
              Prevented losses on replanting dead saplings
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 4. REGIONAL BIO-ZONE CLIMATE MATRIX (Interactive Tabs)            */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.35rem 0.9rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(6, 182, 212, 0.12)',
            border: '1px solid rgba(6, 182, 212, 0.35)',
            color: '#67e8f9',
            fontSize: '0.78rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.8rem'
          }}>
            <Globe size={14} /> Agro-Climatic Zones
          </div>
          <h2 style={{ fontSize: '2.3rem', marginBottom: '0.8rem' }}>
            Regional Biome Suitability Matrix
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '660px', margin: '0 auto' }}>
            Select an agro-climatic zone to see how microclimate vectors determine tree survival and optimal soil preparation techniques.
          </p>
        </div>

        {/* Region Tabs */}
        <div style={{
          display: 'flex',
          gap: '0.65rem',
          overflowX: 'auto',
          paddingBottom: '0.75rem',
          marginBottom: '2rem'
        }}>
          {ecoRegions.map((region, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedRegionIdx(idx)}
              style={{
                padding: '0.85rem 1.4rem',
                borderRadius: 'var(--radius-md)',
                background: selectedRegionIdx === idx ? 'rgba(52, 211, 153, 0.22)' : 'rgba(255, 255, 255, 0.04)',
                border: selectedRegionIdx === idx ? '1px solid var(--accent-mint)' : '1px solid var(--border-color)',
                color: selectedRegionIdx === idx ? '#ffffff' : 'var(--text-secondary)',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                transition: 'all 0.2s ease',
                boxShadow: selectedRegionIdx === idx ? '0 0 20px rgba(16, 185, 129, 0.3)' : 'none'
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{region.icon}</span>
              <span>{region.name}</span>
            </button>
          ))}
        </div>

        {/* Active Region Detail Card */}
        {(() => {
          const region = ecoRegions[selectedRegionIdx];
          return (
            <div className="glass-panel-elevated" style={{
              padding: '2.5rem',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center'
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.8rem' }}>
                  <span style={{ fontSize: '2rem' }}>{region.icon}</span>
                  <div>
                    <h3 style={{ fontSize: '1.6rem', color: '#ffffff', margin: 0 }}>
                      {region.name}
                    </h3>
                    <div style={{ fontSize: '0.84rem', color: 'var(--accent-mint)', fontWeight: 600 }}>
                      Coverage: {region.state}
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', margin: '1.5rem 0' }}>
                  <div style={{ background: 'rgba(0,0,0,0.35)', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Mean Rainfall</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#67e8f9' }}>{region.rain}</div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.35)', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Avg Temperature</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fbbf24' }}>{region.temp}</div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.35)', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Soil Taxonomy</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#ffffff' }}>{region.soil}</div>
                  </div>
                  <div style={{ background: 'rgba(0,0,0,0.35)', padding: '0.85rem', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Moisture Level</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--accent-mint)' }}>{region.moisture}</div>
                  </div>
                </div>

                <div style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  <strong style={{ color: '#ffffff' }}>Agronomic Strategy:</strong> {region.strategy}
                </div>
              </div>

              {/* Right Side of Region Card: Top Species Badges */}
              <div style={{
                background: 'rgba(6, 20, 14, 0.85)',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(52, 211, 153, 0.3)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Top Afforestation Cultivars
                  </span>
                  <span style={{
                    fontSize: '0.78rem',
                    fontWeight: 800,
                    padding: '0.25rem 0.65rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'rgba(16, 185, 129, 0.2)',
                    color: '#6ee7b7',
                    border: '1px solid rgba(16, 185, 129, 0.4)'
                  }}>
                    {region.survivalRate} Predicted Viability
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
                  {region.topSpecies.map((sp, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--radius-sm)',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-subtle)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <span style={{
                          width: '24px',
                          height: '24px',
                          borderRadius: '50%',
                          background: 'rgba(52, 211, 153, 0.2)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.74rem',
                          fontWeight: 800,
                          color: 'var(--accent-mint)'
                        }}>
                          0{idx + 1}
                        </span>
                        <span style={{ fontSize: '0.95rem', fontWeight: 700, color: '#ffffff' }}>{sp}</span>
                      </div>
                      <span style={{ fontSize: '0.76rem', color: 'var(--accent-mint)', fontWeight: 600 }}>Optimal Match</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => {
                    const rainVal = parseInt(region.rain);
                    const tempVal = parseInt(region.temp);
                    const moistVal = parseInt(region.moisture);
                    onSelectPreset({
                      rainfall_mm: rainVal,
                      temperature_c: tempVal,
                      soil_type: region.soil.split(' ')[0],
                      soil_moisture_percent: moistVal,
                      sunlight_hours: 7.5,
                      water_availability: moistVal > 50 ? 'High' : 'Medium',
                      tree_species: region.topSpecies[0]
                    });
                    setActiveTab('predict');
                  }}
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '0.8rem', fontSize: '0.9rem' }}
                >
                  <Sparkles size={16} />
                  <span>Analyze {region.name} Zone</span>
                </button>
              </div>
            </div>
          );
        })()}
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 5. FEATURED SPECIES SHOWCASE WITH CATEGORY FILTERS & PROTOCOL MODAL*/}
      {/* ------------------------------------------------------------------ */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
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
              marginBottom: '0.35rem'
            }}>
              <TreePine size={14} /> Botanical Selection
            </div>
            <h2 style={{ fontSize: '2.2rem', color: '#ffffff', margin: 0 }}>
              10 Candidate Afforestation Cultivars
            </h2>
          </div>

          {/* Filter Chips */}
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {[
              { id: 'all', label: 'All Cultivars (10)' },
              { id: 'drought', label: 'Drought Resilient' },
              { id: 'carbon', label: 'High Carbon Sink' },
              { id: 'timber', label: 'Timber & Commercial' },
              { id: 'keystone', label: 'Ecological Keystones' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setSpeciesFilter(tab.id)}
                style={{
                  padding: '0.45rem 0.9rem',
                  borderRadius: 'var(--radius-full)',
                  background: speciesFilter === tab.id ? 'rgba(52, 211, 153, 0.22)' : 'rgba(255, 255, 255, 0.04)',
                  border: speciesFilter === tab.id ? '1px solid var(--accent-mint)' : '1px solid var(--border-color)',
                  color: speciesFilter === tab.id ? '#ffffff' : 'var(--text-secondary)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '1.5rem'
        }}>
          {filteredSpecies.map((sp) => {
            const photo = getSpeciesPhoto(sp.name);
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
                  <div style={{ position: 'relative', height: '175px', background: '#071811' }}>
                    <img
                      src={photo}
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
                      background: 'linear-gradient(to top, rgba(8, 22, 16, 0.95) 0%, rgba(8, 22, 16, 0.3) 60%, rgba(0,0,0,0.3) 100%)'
                    }} />

                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      fontSize: '0.74rem',
                      fontWeight: 700,
                      padding: '0.25rem 0.7rem',
                      borderRadius: 'var(--radius-full)',
                      background: 'rgba(0,0,0,0.75)',
                      color: 'var(--accent-mint)',
                      border: '1px solid rgba(52, 211, 153, 0.35)',
                      backdropFilter: 'blur(6px)'
                    }}>
                      {sp.tag}
                    </span>
                  </div>

                  <div style={{ padding: '1.3rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                      <h3 style={{ fontSize: '1.3rem', color: '#ffffff', margin: '0 0 0.15rem 0' }}>
                        {sp.name}
                      </h3>
                      <span style={{ fontSize: '0.74rem', color: '#67e8f9', fontWeight: 700 }}>
                        {sp.carbon} CO₂
                      </span>
                    </div>

                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic', marginBottom: '0.85rem' }}>
                      {sp.scientific}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <CloudRain size={13} color="var(--accent-cyan)" />
                        <span>Rainfall: {sp.rain}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <Layers size={13} color="#a855f7" />
                        <span>Optimal Soils: {sp.soil}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ padding: '0 1.3rem 1.3rem 1.3rem', display: 'flex', gap: '0.6rem' }}>
                  <button
                    onClick={() => setSelectedGuideSpecies(sp.name)}
                    className="btn btn-outline"
                    style={{ flex: 1, padding: '0.6rem 0.5rem', fontSize: '0.8rem', textAlign: 'center' }}
                  >
                    Field Protocol
                  </button>

                  <button
                    onClick={() => {
                      onSelectPreset({
                        rainfall_mm: 1200,
                        temperature_c: 28,
                        soil_type: 'Loamy',
                        soil_moisture_percent: 50,
                        sunlight_hours: 7.5,
                        water_availability: 'Medium',
                        tree_species: sp.name
                      });
                      setActiveTab('predict');
                    }}
                    className="btn btn-primary"
                    style={{ flex: 1.2, padding: '0.6rem 0.5rem', fontSize: '0.8rem', display: 'flex', justifyContent: 'center' }}
                  >
                    <span>Analyze</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 6. WHY TRADITIONAL PLANTING FAILS VS AI-GUIDED REFORESTATION       */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.9rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(244, 63, 94, 0.14)',
            border: '1px solid rgba(244, 63, 94, 0.35)',
            color: '#fda4af',
            fontSize: '0.78rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.8rem'
          }}>
            <AlertOctagon size={14} /> Afforestation Dilemma
          </div>
          <h2 style={{ fontSize: '2.4rem', marginBottom: '0.8rem' }}>
            Why Do Planted Trees Fail to Survive?
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '680px', margin: '0 auto' }}>
            Traditional mass-planting projects suffer up to 70% sapling mortality within 24 months due to uncalibrated environmental mismatches.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem'
        }}>
          {problemCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                className="glass-panel glass-panel-interactive"
                style={{ padding: '1.8rem', position: 'relative' }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: `1px solid ${card.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: `0 0 18px ${card.color}33`
                  }}>
                    <Icon size={22} color={card.color} />
                  </div>

                  <span style={{
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    padding: '0.25rem 0.65rem',
                    borderRadius: '6px',
                    background: 'rgba(244, 63, 94, 0.16)',
                    color: '#fda4af',
                    border: '1px solid rgba(244, 63, 94, 0.35)'
                  }}>
                    {card.stat}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.25rem', marginBottom: '0.3rem', color: '#ffffff' }}>
                  {card.title}
                </h3>
                <div style={{ fontSize: '0.8rem', color: 'var(--accent-mint)', fontWeight: 600, marginBottom: '0.75rem' }}>
                  {card.subtitle}
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Side-by-Side Comparison Box */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          {/* Traditional Guesswork */}
          <div style={{
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            background: 'rgba(25, 8, 12, 0.8)',
            border: '1px solid rgba(244, 63, 94, 0.35)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
              <XCircle size={22} color="var(--accent-rose)" />
              <h4 style={{ fontSize: '1.2rem', color: '#fda4af', margin: 0 }}>
                Traditional Guesswork Reforestation
              </h4>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent-rose)' }}>✕</span>
                <span><strong>High 60–75% Sapling Mortality:</strong> Random nursery saplings planted without soil or climate testing.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent-rose)' }}>✕</span>
                <span><strong>Wasted Capital & Labor:</strong> Millions of rupees spent on dead seedlings and emergency replanting drives.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent-rose)' }}>✕</span>
                <span><strong>No Field Care Guidance:</strong> Uniform excavation pits causing root circling and windthrow.</span>
              </li>
            </ul>
          </div>

          {/* AI Guided Solution */}
          <div style={{
            padding: '2rem',
            borderRadius: 'var(--radius-lg)',
            background: 'rgba(8, 26, 18, 0.9)',
            border: '1px solid rgba(52, 211, 153, 0.45)',
            boxShadow: '0 0 25px rgba(16, 185, 129, 0.15)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.2rem' }}>
              <CheckCircle2 size={22} color="var(--accent-mint)" />
              <h4 style={{ fontSize: '1.2rem', color: '#6ee7b7', margin: 0 }}>
                TreeSense AI Decision-Support
              </h4>
            </div>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent-mint)' }}>✓</span>
                <span><strong>98.04% Viability Recall:</strong> Precision multi-factor modeling eliminates microclimate mismatches.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent-mint)' }}>✓</span>
                <span><strong>Simultaneous 10-Species Ranking:</strong> Automatically surfaces the Top 3 best-adapted afforestation species.</span>
              </li>
              <li style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                <span style={{ color: 'var(--accent-mint)' }}>✓</span>
                <span><strong>Precision Field Protocols:</strong> Custom pit dimensions, spacing, mycorrhizae, and irrigation schedules.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 7. HOW TREESENSE AI WORKS (6-Step Connected Pipeline)               */}
      {/* ------------------------------------------------------------------ */}
      <section style={{
        padding: '4rem 2.5rem',
        borderRadius: 'var(--radius-xl)',
        background: 'linear-gradient(135deg, rgba(8, 22, 16, 0.85) 0%, rgba(4, 12, 8, 0.95) 100%)',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.35rem 0.9rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(16, 185, 129, 0.14)',
            border: '1px solid rgba(16, 185, 129, 0.35)',
            color: '#6ee7b7',
            fontSize: '0.78rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.8rem'
          }}>
            <Cpu size={14} /> Machine Learning Architecture
          </div>
          <h2 style={{ fontSize: '2.4rem', marginBottom: '0.8rem' }}>
            How TreeSense AI Works
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto' }}>
            From microclimate telemetry ingestion to calibrated probability estimation and agronomic care guidance.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.75rem'
        }}>
          {workflowSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: '1.75rem',
                  background: 'rgba(10, 26, 19, 0.9)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: '1px solid rgba(52, 211, 153, 0.25)'
                }}
              >
                <div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '1rem'
                  }}>
                    <span style={{
                      fontFamily: 'var(--font-number)',
                      fontSize: '1.6rem',
                      fontWeight: 800,
                      color: 'var(--accent-mint)',
                      opacity: 0.9
                    }}>
                      {step.step}
                    </span>
                    <div style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '10px',
                      background: 'rgba(52, 211, 153, 0.14)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid rgba(52, 211, 153, 0.3)'
                    }}>
                      <Icon size={19} color="var(--accent-mint)" />
                    </div>
                  </div>

                  <h4 style={{ fontSize: '1.2rem', color: '#ffffff', marginBottom: '0.2rem' }}>
                    {step.title}
                  </h4>
                  <div style={{ fontSize: '0.78rem', color: 'var(--accent-cyan)', fontWeight: 600, marginBottom: '0.75rem' }}>
                    {step.subtitle}
                  </div>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                    {step.desc}
                  </p>
                </div>

                <div style={{
                  marginTop: '1.25rem',
                  paddingTop: '0.85rem',
                  borderTop: '1px solid var(--border-subtle)',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  color: '#6ee7b7'
                }}>
                  ✦ {step.metric}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 8. INTERACTIVE KNOWLEDGE HUB & FAQS                                */}
      {/* ------------------------------------------------------------------ */}
      <section>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.35rem 0.9rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(251, 191, 36, 0.12)',
            border: '1px solid rgba(251, 191, 36, 0.35)',
            color: '#fef08a',
            fontSize: '0.78rem',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            marginBottom: '0.8rem'
          }}>
            <HelpCircle size={14} /> Knowledge Hub
          </div>
          <h2 style={{ fontSize: '2.3rem', marginBottom: '0.8rem' }}>
            Afforestation Science & Diagnostics
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto' }}>
            Key insights into microclimatic calibration and agronomic establishment protocols.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '880px', margin: '0 auto' }}>
          {reforestationFaqs.map((faq, idx) => {
            const isOpen = openFaqIdx === idx;
            return (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  borderRadius: 'var(--radius-md)',
                  border: isOpen ? '1px solid rgba(52, 211, 153, 0.5)' : '1px solid var(--border-color)',
                  overflow: 'hidden',
                  transition: 'all 0.25s ease'
                }}
              >
                <button
                  onClick={() => setOpenFaqIdx(isOpen ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '1.3rem 1.6rem',
                    background: 'none',
                    border: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    cursor: 'pointer',
                    textAlign: 'left'
                  }}
                >
                  <span style={{ fontSize: '1.05rem', fontWeight: 700, color: isOpen ? '#6ee7b7' : '#ffffff' }}>
                    {faq.q}
                  </span>
                  {isOpen ? <ChevronUp size={20} color="var(--accent-mint)" /> : <ChevronDown size={20} color="var(--text-secondary)" />}
                </button>

                {isOpen && (
                  <div style={{
                    padding: '0 1.6rem 1.4rem 1.6rem',
                    fontSize: '0.92rem',
                    color: 'var(--text-secondary)',
                    lineHeight: 1.65,
                    borderTop: '1px solid var(--border-subtle)'
                  }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* 9. BOTTOM CALL-TO-ACTION FINALE CARD                               */}
      {/* ------------------------------------------------------------------ */}
      <section style={{
        borderRadius: 'var(--radius-xl)',
        padding: '4.5rem 2.5rem',
        background: 'linear-gradient(135deg, rgba(16, 46, 34, 0.95) 0%, rgba(6, 18, 13, 0.98) 100%)',
        border: '1px solid rgba(52, 211, 153, 0.45)',
        boxShadow: '0 25px 80px rgba(0, 0, 0, 0.65), var(--shadow-glow-emerald)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '680px', margin: '0 auto' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 30px rgba(16, 185, 129, 0.55)',
            margin: '0 auto 1.5rem auto'
          }}>
            <Sprout size={34} color="#ffffff" strokeWidth={2.4} />
          </div>

          <h2 style={{ fontSize: '2.6rem', color: '#ffffff', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
            Ready to Optimize Your Afforestation Project?
          </h2>

          <p style={{ fontSize: '1.08rem', color: 'var(--text-secondary)', lineHeight: 1.65, marginBottom: '2.4rem' }}>
            Input your local microclimate conditions now and generate calibrated Random Forest survival probabilities, multi-species rankings, and agronomic care protocols.
          </p>

          <button
            onClick={() => {
              setActiveTab('predict');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn btn-primary"
            style={{ padding: '1.05rem 2.6rem', fontSize: '1.1rem', borderRadius: 'var(--radius-md)' }}
          >
            <Sparkles size={21} />
            <span>Launch Tree Survival Predictor</span>
            <ArrowRight size={19} />
          </button>
        </div>
      </section>

      {/* Plantation Guide Modal */}
      {selectedGuideSpecies && (
        <PlantationGuideModal
          species={selectedGuideSpecies}
          onClose={() => setSelectedGuideSpecies(null)}
        />
      )}
    </div>
  );
}
