/**
 * Botanical Image Directory & Visual Profiles
 * Local high-resolution verified botanical photography accurately representing all 10 candidate species.
 */

export const SPECIES_PHOTOS = {
  Neem: {
    // Azadirachta indica - distinctive serrated pinnate neem leaves & white floral clusters
    image: '/images/species/neem.jpg',
    banner: '/images/species/neem.jpg',
    color: '#10b981',
    category: 'Medicinal & Agroforestry',
    badge: 'High Drought Hardy'
  },
  Teak: {
    // Tectona grandis - broad ovate leathery leaves & teak timber trunk
    image: '/images/species/teak.jpg',
    banner: '/images/species/teak.jpg',
    color: '#f59e0b',
    category: 'High Value Timber',
    badge: 'Commercial Forestry'
  },
  Banyan: {
    // Ficus benghalensis - iconic massive aerial prop roots & sprawling canopy
    image: '/images/species/banyan.jpg',
    banner: '/images/species/banyan.jpg',
    color: '#059669',
    category: 'Keystone Ecology',
    badge: 'Massive Prop Roots & Shade'
  },
  Peepal: {
    // Ficus religiosa - sacred heart-shaped leaves with distinct extended drip tail
    image: '/images/species/peepal.jpg',
    banner: '/images/species/peepal.jpg',
    color: '#34d399',
    category: 'Sacred & High Oxygen',
    badge: '24hr Oxygen Release'
  },
  Eucalyptus: {
    // Eucalyptus globulus - tall blue gum tree with pendulous sickle leaves & peeling bark
    image: '/images/species/eucalyptus.jpg',
    banner: '/images/species/eucalyptus.jpg',
    color: '#06b6d4',
    category: 'Commercial Biomass',
    badge: 'Extremely Fast Growth'
  },
  Sal: {
    // Shorea robusta - cylindrical reddish-brown trunk & leathery tropical deciduous forest canopy
    image: '/images/species/sal.jpg',
    banner: '/images/species/sal.jpg',
    color: '#d97706',
    category: 'Climax Forest',
    badge: 'Watershed Retention'
  },
  Gulmohar: {
    // Delonix regia - flaming scarlet-red floral umbrella canopy with feathery leaves
    image: '/images/species/gulmohar.jpg',
    banner: '/images/species/gulmohar.jpg',
    color: '#f43f5e',
    category: 'Urban Landscape',
    badge: 'Vibrant Scarlet Floral'
  },
  Bamboo: {
    // Bambusa balcooa - tall jointed green bamboo culms & dense grove
    image: '/images/species/bamboo.jpg',
    banner: '/images/species/bamboo.jpg',
    color: '#10b981',
    category: 'Erosion Control',
    badge: 'Max Carbon Sequestration'
  },
  Mango: {
    // Mangifera indica - dense evergreen dome canopy with hanging mango fruit clusters
    image: '/images/species/mango.jpg',
    banner: '/images/species/mango.jpg',
    color: '#eab308',
    category: 'Agroforestry & Fruit',
    badge: 'Economic Fruit Yield'
  },
  Mahogany: {
    // Swietenia macrophylla - large-leaf tropical hardwood timber crown & upright seed capsules
    image: '/images/species/mahogany.jpg',
    banner: '/images/species/mahogany.jpg',
    color: '#8b5cf6',
    category: 'Elite Hardwood',
    badge: 'Tropical Carbon Sink'
  }
};

export function getSpeciesPhoto(name) {
  const key = name || 'Neem';
  return SPECIES_PHOTOS[key]?.image || `/images/species/${key.toLowerCase()}.jpg`;
}

export function getSpeciesBanner(name) {
  const key = name || 'Neem';
  return SPECIES_PHOTOS[key]?.banner || `/images/species/${key.toLowerCase()}.jpg`;
}

export function getSpeciesCategory(name) {
  return SPECIES_PHOTOS[name]?.category || 'General Forestry';
}

export function getSpeciesBadge(name) {
  return SPECIES_PHOTOS[name]?.badge || 'Afforestation Candidate';
}
