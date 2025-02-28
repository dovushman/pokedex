const fs = require('fs');
const path = require('path');

const TYPE_MATCHUPS_DATA_FILE = path.join(__dirname, '../../assets/typeMatchupsData.json');

const fetchAndSaveTypeMatchupsData = async () => {
  try {
    const fetch = await import('node-fetch').then(mod => mod.default);

    let allTypeMatchupsData = [];

    // Ensure the assets directory exists
    const assetsDir = path.dirname(TYPE_MATCHUPS_DATA_FILE);
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    const response = await fetch('https://pokeapi.co/api/v2/type');
    const data = await response.json();

    await Promise.all(
      data.results.map(async (type) => {
        const typeDetailsResponse = await fetch(type.url);
        const typeDetails = await typeDetailsResponse.json();

        const typeData = {
          name: typeDetails.name,
          attacking: {
            super_effective: typeDetails.damage_relations.double_damage_to.map(t => t.name),
            not_very_effective: typeDetails.damage_relations.half_damage_to.map(t => t.name),
            no_effect: typeDetails.damage_relations.no_damage_to.map(t => t.name),
          },
          defending: {
            weak_to: typeDetails.damage_relations.double_damage_from.map(t => t.name),
            resistant_to: typeDetails.damage_relations.half_damage_from.map(t => t.name),
            immune_to: typeDetails.damage_relations.no_damage_from.map(t => t.name),
          }
        };

        allTypeMatchupsData.push(typeData);
      })
    );

    fs.writeFileSync(TYPE_MATCHUPS_DATA_FILE, JSON.stringify(allTypeMatchupsData, null, 2));
    console.log('Type matchups data saved to', TYPE_MATCHUPS_DATA_FILE);
  } catch (error) {
    console.error('Error fetching and saving type matchups data:', error);
  }
};

fetchAndSaveTypeMatchupsData();