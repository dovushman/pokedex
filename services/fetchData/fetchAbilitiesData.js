const fs = require('fs');
const path = require('path');

const ABILITIES_DATA_FILE = path.join(__dirname, '../../assets/abilitiesData.json');
const BATCH_SIZE = 20; // Fetch 20 abilities at a time

const fetchAndSaveAbilitiesData = async () => {
  try {
    const fetch = await import('node-fetch').then(mod => mod.default);

    let allAbilitiesData = [];
    let offset = 0;

    // Ensure the assets directory exists
    const assetsDir = path.dirname(ABILITIES_DATA_FILE);
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    while (true) {
      const response = await fetch(`https://pokeapi.co/api/v2/ability?offset=${offset}&limit=${BATCH_SIZE}`);
      const data = await response.json();
      if (data.results.length === 0) break;

      await Promise.all(
        data.results.map(async (ability) => {
          const abilityDetailsResponse = await fetch(ability.url);
          const abilityDetails = await abilityDetailsResponse.json();

          const abilityData = {
            id: abilityDetails.id,
            name: abilityDetails.name,
            generation: abilityDetails.generation.name,
            effect_entries: abilityDetails.effect_entries
              .filter(entry => entry.language.name === 'en')
              .map(entry => ({
                effect: entry.effect,
                short_effect: entry.short_effect,
                language: entry.language.name
              })),
            effect_changes: abilityDetails.effect_changes.map(change => ({
              version_group: change.version_group.name,
              effect_entries: change.effect_entries
                .filter(entry => entry.language.name === 'en')
                .map(entry => ({
                  effect: entry.effect,
                  language: entry.language.name
                }))
            })),
            flavor_text_entries: abilityDetails.flavor_text_entries
              .filter(entry => entry.language.name === 'en')
              .map(entry => ({
                flavor_text: entry.flavor_text,
                language: entry.language.name,
                version_group: entry.version_group.name
              })),
            pokemon: abilityDetails.pokemon.map(p => ({
              is_hidden: p.is_hidden,
              slot: p.slot,
              pokemon: p.pokemon.name
            }))
          };

          allAbilitiesData.push(abilityData);
        })
      );

      offset += BATCH_SIZE;
    }

    fs.writeFileSync(ABILITIES_DATA_FILE, JSON.stringify(allAbilitiesData, null, 2));
    console.log('Abilities data saved to', ABILITIES_DATA_FILE);
  } catch (error) {
    console.error('Error fetching and saving abilities data:', error);
  }
};

fetchAndSaveAbilitiesData();