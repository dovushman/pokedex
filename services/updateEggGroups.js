
//file logs egg groups and updates wrong ones on pokemon json.


import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapping of old egg group names to new egg group names
const eggGroupMapping = {
  humanshape: 'humanlike',
  plant: 'grass',
  ground: 'field',
  indeterminate: 'amorphous',
  'no-eggs': 'no eggs discovered', // Map no-eggs to undiscovered
  // Add other mappings as needed
};

// Read the pokemonData.json file
const filePath = path.join(__dirname, '../assets', 'pokemonData.json');
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the file:', err);
    return;
  }

  // Parse the JSON data
  const pokemonData = JSON.parse(data);

  // Update egg groups using the mapping
  pokemonData.forEach(pokemon => {
    if (pokemon.eggGroups) {
      pokemon.eggGroups = pokemon.eggGroups.map(eggGroup => {
        return eggGroupMapping[eggGroup.toLowerCase()] || eggGroup;
      });
    }
  });

  // Write the updated data back to the file
  fs.writeFile(filePath, JSON.stringify(pokemonData, null, 2), 'utf8', err => {
    if (err) {
      console.error('Error writing the file:', err);
      return;
    }
    console.log('Egg groups updated successfully.');
  });

  // Extract all unique egg groups
  const eggGroups = new Set();
  pokemonData.forEach(pokemon => {
    if (pokemon.eggGroups) {
      pokemon.eggGroups.forEach(eggGroup => eggGroups.add(eggGroup));
    }
  });

  // Log the unique egg groups
  console.log('Unique Egg Groups:', Array.from(eggGroups));
});