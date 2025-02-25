const fs = require('fs');
const path = require('path');

const TMS_DATA_FILE = path.join(__dirname, '../../assets/tmsData.json');
const BATCH_SIZE = 20; // Fetch 20 TMs at a time

const fetchAndSaveTMsData = async () => {
  try {
    const fetch = await import('node-fetch').then(mod => mod.default);

    let allTMsData = [];
    let offset = 0;

    // Ensure the assets directory exists
    const assetsDir = path.dirname(TMS_DATA_FILE);
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    while (true) {
      const response = await fetch(`https://pokeapi.co/api/v2/machine?offset=${offset}&limit=${BATCH_SIZE}`);
      const data = await response.json();
      if (data.results.length === 0) break;

      await Promise.all(
        data.results.map(async (machine) => {
          const machineDetailsResponse = await fetch(machine.url);
          const machineDetails = await machineDetailsResponse.json();

          const moveDetailsResponse = await fetch(machineDetails.move.url);
          const moveDetails = await moveDetailsResponse.json();

          const generationDetailsResponse = await fetch(machineDetails.version_group.url);
          const generationDetails = await generationDetailsResponse.json();

          const itemDetailsResponse = await fetch(machineDetails.item.url);
          const itemDetails = await itemDetailsResponse.json();

          const tmData = {
            id: machineDetails.id,
            name: machineDetails.item.name,
            move_name: moveDetails.name,
            move_type: moveDetails.type.name,
            move_attack_type: moveDetails.damage_class.name,
            move_power: moveDetails.power,
            move_accuracy: moveDetails.accuracy,
            move_pp: moveDetails.pp,
            generation: generationDetails.generation.name,
            sprite: itemDetails.sprites.default
          };

          allTMsData.push(tmData);
        })
      );

      offset += BATCH_SIZE;
    }

    fs.writeFileSync(TMS_DATA_FILE, JSON.stringify(allTMsData, null, 2));
    console.log('TMs data saved to', TMS_DATA_FILE);
  } catch (error) {
    console.error('Error fetching and saving TMs data:', error);
  }
};

fetchAndSaveTMsData();