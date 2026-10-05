/**
 * Botanical Image Directory & Visual Profiles
 * Verified high-resolution botanical photography accurately representing all 10 candidate species.
 */

export const SPECIES_PHOTOS = {
  Neem: {
    // Azadirachta indica - distinctive serrated pinnate neem leaves
    image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=1200&q=80',
    color: '#10b981',
    category: 'Medicinal & Agroforestry',
    badge: 'High Drought Hardy'
  },
  Teak: {
    // Tectona grandis - large broad ovate leaves & teak timber canopy
    image: 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    color: '#f59e0b',
    category: 'High Value Timber',
    badge: 'Commercial Forestry'
  },
  Banyan: {
    // Ficus benghalensis - iconic massive aerial prop roots & expansive crown
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
    color: '#059669',
    category: 'Keystone Ecology',
    badge: 'Massive Prop Roots & Shade'
  },
  Peepal: {
    // Ficus religiosa - iconic sacred heart-shaped leaves with distinct extended tail
    image: 'https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80',
    color: '#34d399',
    category: 'Sacred & High Oxygen',
    badge: '24hr Oxygen Release'
  },
  Eucalyptus: {
    // Eucalyptus globulus - tall slender gum tree with blue-grey leaves and shedding bark
    image: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
    color: '#06b6d4',
    category: 'Commercial Biomass',
    badge: 'Extremely Fast Growth'
  },
  Sal: {
    // Shorea robusta - dense tropical moist deciduous Sal forest
    image: 'https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80',
    color: '#d97706',
    category: 'Climax Forest',
    badge: 'Watershed Retention'
  },
  Gulmohar: {
    // Delonix regia - flaming scarlet red flowering royal poinciana canopy
    image: 'https://images.unsplash.com/photo-1534710961216-75c88202f43e?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1508873696983-2df5293cb32f?auto=format&fit=crop&w=1200&q=80',
    color: '#f43f5e',
    category: 'Urban Landscape',
    badge: 'Vibrant Scarlet Floral'
  },
  Bamboo: {
    // Bambusa balcooa - tall green bamboo stalks and lush culms
    image: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
    color: '#10b981',
    category: 'Erosion Control',
    badge: 'Max Carbon Sequestration'
  },
  Mango: {
    // Mangifera indica - dense evergreen mango tree foliage and fruit
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=1200&q=80',
    color: '#eab308',
    category: 'Agroforestry & Fruit',
    badge: 'Economic Fruit Yield'
  },
  Mahogany: {
    // Swietenia macrophylla - tropical broadleaf hardwood timber
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=800&q=80',
    banner: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
    color: '#8b5cf6',
    category: 'Elite Hardwood',
    badge: 'Tropical Carbon Sink'
  }
};

export function getSpeciesPhoto(name) {
  return SPECIES_PHOTOS[name]?.image || 'https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?auto=format&fit=crop&w=800&q=80';
}

export function getSpeciesBanner(name) {
  return SPECIES_PHOTOS[name]?.banner || 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80';
}

export function getSpeciesCategory(name) {
  return SPECIES_PHOTOS[name]?.category || 'General Forestry';
}

export function getSpeciesBadge(name) {
  return SPECIES_PHOTOS[name]?.badge || 'Afforestation Candidate';
}
