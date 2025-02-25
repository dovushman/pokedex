const fs = require('fs');
const path = require('path');

const NATURES_DATA_FILE = path.join(__dirname, '../../assets/naturesData.json');
const BATCH_SIZE = 20; // Fetch 20 natures at a time

const fetchAndSaveNaturesData = async () => {
  try {
    const fetch = await import('node-fetch').then(mod => mod.default);

    let allNaturesData = [];
    let offset = 0;

    // Ensure the assets directory exists
    const assetsDir = path.dirname(NATURES_DATA_FILE);
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    while (true) {
      const response = await fetch(`https://pokeapi.co/api/v2/nature?offset=${offset}&limit=${BATCH_SIZE}`);
      const data = await response.json();
      if (data.results.length === 0) break;

      const batchData = await Promise.all(
        data.results.map(async (nature) => {
          const natureDetailsResponse = await fetch(nature.url);
          const natureDetails = await natureDetailsResponse.json();

          return {
            id: natureDetails.id,
            name: natureDetails.name,
            increased_stat: natureDetails.increased_stat?.name || null,
            decreased_stat: natureDetails.decreased_stat?.name || null,
            likes_flavor: natureDetails.likes_flavor?.name || null,
            hates_flavor: natureDetails.hates_flavor?.name || null
          };
        })
      );

      allNaturesData = [...allNaturesData, ...batchData];
      offset += BATCH_SIZE;
    }

    fs.writeFileSync(NATURES_DATA_FILE, JSON.stringify(allNaturesData, null, 2));
    console.log('Natures data saved to', NATURES_DATA_FILE);
  } catch (error) {
    console.error('Error fetching and saving natures data:', error);
  }
};

fetchAndSaveNaturesData();