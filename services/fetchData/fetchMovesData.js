// const fs = require('fs');
// const path = require('path');

// const MOVES_DATA_FILE = path.join(__dirname, '../../assets/movesData.json');
// const BATCH_SIZE = 100; // Fetch 100 moves at a time

// const fetchAndSaveMovesData = async () => {
//   try {
//     const fetch = await import('node-fetch').then(mod => mod.default);

//     let allMovesData = [];
//     let offset = 0;

//     // Ensure the assets directory exists
//     const assetsDir = path.dirname(MOVES_DATA_FILE);
//     if (!fs.existsSync(assetsDir)) {
//       fs.mkdirSync(assetsDir, { recursive: true });
//     }

//     while (true) {
//       const response = await fetch(`https://pokeapi.co/api/v2/move?offset=${offset}&limit=${BATCH_SIZE}`);
//       const data = await response.json();
//       if (data.results.length === 0) break;

//       const batchData = await Promise.all(
//         data.results.map(async (move) => {
//           const moveDetailsResponse = await fetch(move.url);
//           const moveDetails = await moveDetailsResponse.json();

//           // Fetch generation-specific details
//           const generationDetails = moveDetails.effect_changes.map(change => ({
//             generation: change.version_group.name,
//             effect: change.effect_entries.map(entry => entry.effect).join(' ')
//           }));

//           // Fetch past values for power, accuracy, etc.
//           const pastValues = moveDetails.past_values.map(pastValue => ({
//             generation: pastValue.version_group.name,
//             power: pastValue.power,
//             accuracy: pastValue.accuracy,
//             effect_chance: pastValue.effect_chance,
//             pp: pastValue.pp,
//             effect: pastValue.effect_entries.map(entry => entry.effect).join(' ')
//           }));

//           // Fetch the effect and description
//           const effect = moveDetails.effect_entries.find(entry => entry.language.name === 'en')?.effect || null;
//           const description = moveDetails.flavor_text_entries.find(entry => entry.language.name === 'en')?.flavor_text || null;

//           return {
//             id: moveDetails.id,
//             move_name: moveDetails.name,
//             type: moveDetails.type.name,
//             power: moveDetails.power,
//             damage_class: moveDetails.damage_class.name,
//             accuracy: moveDetails.accuracy,
//             pp: moveDetails.pp,
//             effect_chance: moveDetails.effect_chance,
//             priority: moveDetails.priority,
//             secondary_effects: moveDetails.meta?.ailment?.name || null,
//             effect: effect,
//             description: description,
//             generation_details: generationDetails,
//             past_values: pastValues
//           };
//         })
//       );

//       allMovesData = [...allMovesData, ...batchData];
//       offset += BATCH_SIZE;
//     }

//     fs.writeFileSync(MOVES_DATA_FILE, JSON.stringify(allMovesData, null, 2));
//     console.log('Moves data saved to', MOVES_DATA_FILE);
//   } catch (error) {
//     console.error('Error fetching and saving moves data:', error);
//   }
// };

// fetchAndSaveMovesData();
const fs = require('fs');
const path = require('path');

const MOVES_DATA_FILE = path.join(__dirname, '../../assets/movesData.json');
const BATCH_SIZE = 100; // Fetch 100 moves at a time

const fetchAndSaveMovesData = async () => {
  try {
    const fetch = await import('node-fetch').then(mod => mod.default);

    let allMovesData = [];
    let offset = 0;

    // Ensure the assets directory exists
    const assetsDir = path.dirname(MOVES_DATA_FILE);
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    while (true) {
      const response = await fetch(`https://pokeapi.co/api/v2/move?offset=${offset}&limit=${BATCH_SIZE}`);
      const data = await response.json();
      if (data.results.length === 0) break;

      const batchData = await Promise.all(
        data.results.map(async (move) => {
          const moveDetailsResponse = await fetch(move.url);
          const moveDetails = await moveDetailsResponse.json();

          // Fetch generation-specific details
          const generationDetails = moveDetails.effect_changes.map(change => ({
            generation: change.version_group.name,
            effect: change.effect_entries.map(entry => entry.effect).join(' ')
          }));

          // Fetch past values for power, accuracy, etc.
          const pastValues = moveDetails.past_values.map(pastValue => ({
            generation: pastValue.version_group.name,
            power: pastValue.power,
            accuracy: pastValue.accuracy,
            effect_chance: pastValue.effect_chance,
            pp: pastValue.pp,
            effect: pastValue.effect_entries.map(entry => entry.effect).join(' ')
          }));

          // Fetch the effect and description
          const effect = moveDetails.effect_entries.find(entry => entry.language.name === 'en')?.effect || null;
          const description = moveDetails.effect_entries.find(entry => entry.language.name === 'en')?.short_effect || null;

          // Fetch flavor text entries
          const flavorTextEntries = moveDetails.flavor_text_entries
            .filter(entry => entry.language.name === 'en')
            .map(entry => ({
              version_group: entry.version_group.name,
              flavor_text: entry.flavor_text
            }));

          const moveData = {
            id: moveDetails.id,
            move_name: moveDetails.name,
            type: moveDetails.type.name,
            power: moveDetails.power,
            damage_class: moveDetails.damage_class.name,
            accuracy: moveDetails.accuracy,
            pp: moveDetails.pp,
            effect_chance: moveDetails.effect_chance,
            priority: moveDetails.priority,
            secondary_effects: moveDetails.meta?.ailment?.name || null,
            effect: effect,
            description: description,
            generation_details: generationDetails,
            past_values: pastValues,
            flavor_text_entries: flavorTextEntries
          };

          return moveData;
        })
      );

      allMovesData = [...allMovesData, ...batchData];
      offset += BATCH_SIZE;
    }

    fs.writeFileSync(MOVES_DATA_FILE, JSON.stringify(allMovesData, null, 2));
    console.log('Moves data saved to', MOVES_DATA_FILE);
  } catch (error) {
    console.error('Error fetching and saving moves data:', error);
  }
};

fetchAndSaveMovesData();




// const fs = require('fs');
// const path = require('path');

// const MOVES_DATA_FILE = path.join(__dirname, '../../assets/movesData.json');
// const BATCH_SIZE = 100; // Fetch 100 moves at a time

// const fetchAndSaveMovesData = async () => {
//   try {
//     const fetch = await import('node-fetch').then(mod => mod.default);

//     let allMovesData = [];
//     let offset = 0;

//     // Ensure the assets directory exists
//     const assetsDir = path.dirname(MOVES_DATA_FILE);
//     if (!fs.existsSync(assetsDir)) {
//       fs.mkdirSync(assetsDir, { recursive: true });
//     }

//     while (true) {
//       const response = await fetch(`https://pokeapi.co/api/v2/move?offset=${offset}&limit=${BATCH_SIZE}`);
//       const data = await response.json();
//       if (data.results.length === 0) break;

//       const batchData = await Promise.all(
//         data.results.map(async (move) => {
//           const moveDetailsResponse = await fetch(move.url);
//           const moveDetails = await moveDetailsResponse.json();

//           // Fetch generation-specific details
//           const generationDetails = moveDetails.effect_changes.map(change => ({
//             generation: change.version_group.name,
//             effect: change.effect_entries.map(entry => entry.effect).join(' ')
//           }));

//           // Fetch past values for power, accuracy, etc.
//           const pastValues = moveDetails.past_values.map(pastValue => ({
//             generation: pastValue.version_group.name,
//             power: pastValue.power,
//             accuracy: pastValue.accuracy,
//             effect_chance: pastValue.effect_chance,
//             pp: pastValue.pp,
//             effect: pastValue.effect_entries.map(entry => entry.effect).join(' ')
//           }));

//           // Fetch the effect and description
//           const effect = moveDetails.effect_entries.find(entry => entry.language.name === 'en')?.effect || null;
//           const description = moveDetails.effect_entries.find(entry => entry.language.name === 'en')?.short_effect || null;

//           return {
//             id: moveDetails.id,
//             move_name: moveDetails.name,
//             type: moveDetails.type.name,
//             power: moveDetails.power,
//             damage_class: moveDetails.damage_class.name,
//             accuracy: moveDetails.accuracy,
//             pp: moveDetails.pp,
//             effect_chance: moveDetails.effect_chance,
//             priority: moveDetails.priority,
//             secondary_effects: moveDetails.meta?.ailment?.name || null,
//             effect: effect,
//             description: description,
//             generation_details: generationDetails,
//             past_values: pastValues
//           };
//         })
//       );

//       allMovesData = [...allMovesData, ...batchData];
//       offset += BATCH_SIZE;
//     }

//     fs.writeFileSync(MOVES_DATA_FILE, JSON.stringify(allMovesData, null, 2));
//     console.log('Moves data saved to', MOVES_DATA_FILE);
//   } catch (error) {
//     console.error('Error fetching and saving moves data:', error);
//   }
// };

// fetchAndSaveMovesData();