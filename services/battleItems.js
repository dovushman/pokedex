const fs = require('fs');
const path = require('path');
const { capitalizeWords } = require('../utils/capitalize');

const itemsData = require('../assets/itemsData.json');

const excludedCategories = [
  'revival',
  'tm-materials',
  'healing',
  'vitamins',
  'stat-boosts',
  'spelunking',
  'flutes',
  'collectibles',
  'mulch',
  'dex-completion',
  'loot',
  'all-mail',
  'training',
  'event-items',
  'gameplay',
  'data-cards',
  'miracle-shooter',
  'species-specific',
  'unused',
  'curry-ingredients',
  'dynamax-crystals',
  'tera-shard',
  'sandwich-ingredients',
  'picnic',
  'species-candies',
  'nature-mints',
  'plot-advancement'
];

const allowedPlotAdvancementItems = ['blue-orb', 'red-orb'];

const battleItems = itemsData
  .filter(item => 
    !excludedCategories.includes(item.category.toLowerCase()) ||
    (item.category.toLowerCase() === 'plot-advancement' && allowedPlotAdvancementItems.includes(item.name.toLowerCase()))
  )
  .map(item => {
    if (item.name !== 'Up-Grade') {
      item.name = capitalizeWords(item.name.replace(/-/g, ' '));
    }
    return item;
  })
  .sort((a, b) => a.name.localeCompare(b.name)); // Sort items alphabetically by name

const outputPath = path.join(__dirname, '../assets/battleItems.json');
fs.writeFileSync(outputPath, JSON.stringify(battleItems, null, 2), 'utf-8');

console.log(`Filtered and sorted battle items have been written to ${outputPath}`);