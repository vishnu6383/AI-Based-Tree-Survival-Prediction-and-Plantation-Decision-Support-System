/**
 * Botanical Image Directory & Visual Profiles
 * Local high-resolution verified botanical photography representing all 10 high-yield fruit & crop species.
 */

export const SPECIES_PHOTOS = {
  Mango: {
    // Mangifera indica - dense evergreen canopy with hanging golden-ripe mango clusters
    image: '/images/species/mango.jpg',
    banner: '/images/species/mango.jpg',
    color: '#eab308',
    category: 'King of Fruits & Agroforestry',
    badge: 'High Economic Fruit Yield'
  },
  Guava: {
    // Psidium guajava - prolific yellow-green guavas with high Vitamin C
    image: '/images/species/guava.jpg',
    banner: '/images/species/guava.jpg',
    color: '#84cc16',
    category: 'High-Density Horticulture',
    badge: 'Rapid Vitamin C Yield'
  },
  Banana: {
    // Musa acuminata - large vibrant fronds with large banana bunch and purple flower
    image: '/images/species/banana.jpg',
    banner: '/images/species/banana.jpg',
    color: '#fbbf24',
    category: 'High-Turnover Food Crop',
    badge: 'Fast 10-Mo Harvest & Biomass'
  },
  Coconut: {
    // Cocos nucifera - laden with coconuts in clusters beneath breezy palm fronds
    image: '/images/species/coconut.jpg',
    banner: '/images/species/coconut.jpg',
    color: '#059669',
    category: 'Perennial Multi-Yield Palm',
    badge: 'Water, Oil, Copra & Coir'
  },
  Papaya: {
    // Carica papaya - dense clusters of ripe orange-yellow papayas along the central trunk
    image: '/images/species/papaya.jpg',
    banner: '/images/species/papaya.jpg',
    color: '#f97316',
    category: 'Fast-Bearing Cash Crop',
    badge: '8-Month Quick ROI & Papain'
  },
  Pomegranate: {
    // Punica granatum - ruby-red pomegranates hanging from slender sunlit branches
    image: '/images/species/pomegranate.jpg',
    banner: '/images/species/pomegranate.jpg',
    color: '#ef4444',
    category: 'Semi-Arid Export Fruit',
    badge: 'Drought Hardy & High Value'
  },
  Lemon: {
    // Citrus limon - bright yellow lemons with lush citrus green foliage
    image: '/images/species/lemon.jpg',
    banner: '/images/species/lemon.jpg',
    color: '#facc15',
    category: 'Year-Round Citrus Crop',
    badge: 'Continuous Citrus Harvest'
  },
  Jackfruit: {
    // Artocarpus heterophyllus - giant edible jackfruits attached to main trunk
    image: '/images/species/jackfruit.jpg',
    banner: '/images/species/jackfruit.jpg',
    color: '#15803d',
    category: 'Massive Yield Superfood',
    badge: 'Up to 30kg Edible Fruit / Pod'
  },
  Sapota: {
    // Manilkara zapota - heavy bearing sweet chiku / sapota fruits
    image: '/images/species/sapota.jpg',
    banner: '/images/species/sapota.jpg',
    color: '#b45309',
    category: 'Sweet Perennial Fruit',
    badge: 'Continuous High Sugar Yield'
  },
  Amla: {
    // Phyllanthus emblica - clusters of translucent green amla berries on feathery branches
    image: '/images/species/amla.jpg',
    banner: '/images/species/amla.jpg',
    color: '#10b981',
    category: 'Therapeutic Super-Hardy',
    badge: 'Supreme Vitamin C & Sodic Hardy'
  }
};

export function getSpeciesPhoto(name) {
  const key = name || 'Mango';
  return SPECIES_PHOTOS[key]?.image || `/images/species/${key.toLowerCase()}.jpg`;
}

export function getSpeciesBanner(name) {
  const key = name || 'Mango';
  return SPECIES_PHOTOS[key]?.banner || `/images/species/${key.toLowerCase()}.jpg`;
}

export function getSpeciesCategory(name) {
  return SPECIES_PHOTOS[name]?.category || 'Fruit & Yield Agroforestry';
}

export function getSpeciesBadge(name) {
  return SPECIES_PHOTOS[name]?.badge || 'High Yield';
}

export function getSpeciesColor(name) {
  return SPECIES_PHOTOS[name]?.color || '#10b981';
}
