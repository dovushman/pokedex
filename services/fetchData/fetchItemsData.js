// const fs = require('fs');
// const path = require('path');

// const ITEMS_DATA_FILE = path.join(__dirname, '../../assets/itemsData.json');
// const BATCH_SIZE = 20; // Fetch 20 items at a time

// const fetchAndSaveItemsData = async () => {
//   try {
//     const fetch = await import('node-fetch').then(mod => mod.default);

//     let allItemsData = [];
//     let offset = 0;

//     // Ensure the assets directory exists
//     const assetsDir = path.dirname(ITEMS_DATA_FILE);
//     if (!fs.existsSync(assetsDir)) {
//       fs.mkdirSync(assetsDir, { recursive: true });
//     }

//     while (true) {
//       const response = await fetch(`https://pokeapi.co/api/v2/item?offset=${offset}&limit=${BATCH_SIZE}`);
//       const data = await response.json();
//       if (data.results.length === 0) break;

//       const batchData = await Promise.all(
//         data.results.map(async (item) => {
//           const itemDetailsResponse = await fetch(item.url);
//           const itemDetails = await itemDetailsResponse.json();

//           return {
//             id: itemDetails.id,
//             name: itemDetails.name,
//             category: itemDetails.category.name,
//             effect: itemDetails.effect_entries.find(entry => entry.language.name === 'en')?.short_effect || null,
//             description: itemDetails.flavor_text_entries.find(entry => entry.language.name === 'en')?.text || null,
//             price: itemDetails.cost,
//             sell_price: itemDetails.fling_power || 0
//           };
//         })
//       );

//       allItemsData = [...allItemsData, ...batchData];
//       offset += BATCH_SIZE;
//     }

//     fs.writeFileSync(ITEMS_DATA_FILE, JSON.stringify(allItemsData, null, 2));
//     console.log('Items data saved to', ITEMS_DATA_FILE);
//   } catch (error) {
//     console.error('Error fetching and saving items data:', error);
//   }
// };

// fetchAndSaveItemsData();

const fs = require('fs');
const path = require('path');

const ITEMS_DATA_FILE = path.join(__dirname, '../../assets/itemsData.json');
const BATCH_SIZE = 20; // Fetch 20 items at a time

const fetchAndSaveItemsData = async () => {
  try {
    const fetch = await import('node-fetch').then(mod => mod.default);

    let allItemsData = [];
    let offset = 0;

    // Ensure the assets directory exists
    const assetsDir = path.dirname(ITEMS_DATA_FILE);
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    while (true) {
      const response = await fetch(`https://pokeapi.co/api/v2/item?offset=${offset}&limit=${BATCH_SIZE}`);
      const data = await response.json();
      if (data.results.length === 0) break;

      await Promise.all(
        data.results.map(async (item) => {
          const itemDetailsResponse = await fetch(item.url);
          const itemDetails = await itemDetailsResponse.json();

          const itemData = {
            id: itemDetails.id,
            name: itemDetails.name,
            category: itemDetails.category.name,
            effect: itemDetails.effect_entries.find(entry => entry.language.name === 'en')?.short_effect || null,
            description: itemDetails.flavor_text_entries.find(entry => entry.language.name === 'en')?.text || null,
            price: itemDetails.cost,
            sell_price: itemDetails.fling_power || 0,
            sprite: itemDetails.sprites.default
          };

          if (itemData.category !== 'all-machines') {
            allItemsData.push(itemData);
          }
        })
      );

      offset += BATCH_SIZE;
    }

    fs.writeFileSync(ITEMS_DATA_FILE, JSON.stringify(allItemsData, null, 2));
    console.log('Items data saved to', ITEMS_DATA_FILE);
  } catch (error) {
    console.error('Error fetching and saving items data:', error);
  }
};

fetchAndSaveItemsData();