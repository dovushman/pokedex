// import fs from 'fs';
// import fetch from 'node-fetch';
// import path from 'path';
// import { fileURLToPath } from 'url';

// // Convert __dirname to work with ES modules
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const POKEMON_DATA_FILE = path.join(__dirname, '../assets/pokemonData.json');
// const BATCH_SIZE = 100; // Fetch 100 Pokémon at a time
// const MAX_RETRIES = 3; // Maximum number of retries for failed requests
// const RETRY_DELAY = 1000; // Delay between retries in milliseconds

// const fetchWithRetry = async (url, options = {}, retries = MAX_RETRIES) => {
//   try {
//     const response = await fetch(url, options);
//     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
//     return response;
//   } catch (error) {
//     if (retries > 0) {
//       console.log(`Retrying... (${MAX_RETRIES - retries + 1})`);
//       await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
//       return fetchWithRetry(url, options, retries - 1);
//     } else {
//       throw error;
//     }
//   }
// };

// const fetchAndSavePokemonData = async () => {
//   try {
//     let allPokemonData = [];
//     let offset = 0;

//     // Ensure the assets directory exists
//     const assetsDir = path.dirname(POKEMON_DATA_FILE);
//     if (!fs.existsSync(assetsDir)) {
//       console.log("Creating assets directory:", assetsDir);
//       fs.mkdirSync(assetsDir, { recursive: true });
//     }

//     while (true) {
//       console.log(`Fetching Pokémon from offset ${offset}...`);
//       const response = await fetchWithRetry(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${BATCH_SIZE}`);
//       const data = await response.json();
      
//       if (data.results.length === 0) {
//         console.log("No more Pokémon found. Stopping fetch.");
//         break;
//       }

//       const batchData = await Promise.all(
//         data.results.map(async (pokemon) => {
//           const pokemonDetailsResponse = await fetchWithRetry(pokemon.url);
//           const pokemonDetails = await pokemonDetailsResponse.json();

//           // Log details for Mudkip
//           if (pokemonDetails.name.toLowerCase() === 'mudkip') {
//             console.log('Mudkip details (pokemonDetails):', JSON.stringify(pokemonDetails, null, 2));
//           }

//           // Fetch species details to get forms
//           const speciesResponse = await fetchWithRetry(pokemonDetails.species.url);
//           const speciesDetails = await speciesResponse.json();

//           // Log details for Mudkip
//           if (pokemonDetails.name.toLowerCase() === 'mudkip') {
//             console.log('Mudkip details (speciesDetails):', JSON.stringify(speciesDetails, null, 2));
//           }

//           // Fetch forms
//           const formsData = await Promise.all(
//             speciesDetails.varieties.map(async (variety) => {
//               const formDetailsResponse = await fetchWithRetry(variety.pokemon.url);
//               const formDetails = await formDetailsResponse.json();
          
//               // Fetch Pokédex entries (only in English)
//               const pokedexEntries = speciesDetails.flavor_text_entries
//                 .filter(entry => entry.language.name === 'en')
//                 .map(entry => ({
//                   version: entry.version.name,
//                   text: entry.flavor_text
//                 }));

//               // Fetch abilities (Store full ability object)
//               const abilities = formDetails.abilities.map(abilityInfo => ({
//                 id: parseInt(abilityInfo.ability.url.split("/").slice(-2, -1)[0]), // Extract ID from URL
//                 name: abilityInfo.ability.name,
//                 is_hidden: abilityInfo.is_hidden,
//                 slot: abilityInfo.slot
//               }));

//               // Fetch stats
//               const stats = formDetails.stats.map(statInfo => ({
//                 name: statInfo.stat.name,
//                 value: statInfo.base_stat
//               }));

//               const pokemonData = {
//                 id: formDetails.id,
//                 base_id: variety.is_default ? null : pokemonDetails.id,
//                 name: formDetails.name,
//                 form: variety.is_default ? null : variety.pokemon.name,
//                 types: formDetails.types.map(typeInfo => typeInfo.type.name),
//                 sprite: formDetails.sprites.other['official-artwork'].front_default,
//                 shinySprite: formDetails.sprites.other['official-artwork'].front_shiny,
//                 height: formDetails.height,
//                 weight: formDetails.weight,
//                 pokedexEntries: pokedexEntries,
//                 abilities: abilities, // Store ability objects with ID + name
//                 stats: stats // Store stats
//               };

//               // Log information for Mudkip
//               if (formDetails.name.toLowerCase() === 'mudkip') {
//                 console.log('Mudkip details (formDetails):', JSON.stringify(formDetails, null, 2));
//                 console.log('Mudkip details (pokemonData):', JSON.stringify(pokemonData, null, 2));
//               }

//               return pokemonData;
//             })
//           );

//           return formsData;
//         })
//       );

//       allPokemonData = [...allPokemonData, ...batchData.flat()];
//       offset += BATCH_SIZE;
//     }

//     // Remove duplicates
//     const uniquePokemonData = allPokemonData.reduce((acc, current) => {
//       const x = acc.find(item => item.id === current.id);
//       if (!x) {
//         return acc.concat([current]);
//       } else {
//         return acc;
//       }
//     }, []);

//     // Debugging log
//     console.log("Total Pokémon fetched:", uniquePokemonData.length);

//     // Save to file
//     console.log("Saving Pokémon data to:", POKEMON_DATA_FILE);
//     fs.writeFileSync(POKEMON_DATA_FILE, JSON.stringify(uniquePokemonData, null, 2));
//     console.log("Pokémon data saved successfully!");

//   } catch (error) {
//     console.error('Error fetching and saving Pokémon data:', error);
//   }
// };

// fetchAndSavePokemonData();

import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert __dirname to work with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POKEMON_DATA_FILE = path.join(__dirname, '../assets/pokemonData.json');
const BATCH_SIZE = 100; // Fetch 100 Pokémon at a time
const MAX_RETRIES = 3; // Maximum number of retries for failed requests
const RETRY_DELAY = 1000; // Delay between retries in milliseconds

const fetchWithRetry = async (url, options = {}, retries = MAX_RETRIES) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response;
  } catch (error) {
    if (retries > 0) {
      console.log(`Retrying... (${MAX_RETRIES - retries + 1})`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return fetchWithRetry(url, options, retries - 1);
    } else {
      throw error;
    }
  }
};

const fetchAndSavePokemonData = async () => {
  try {
    let allPokemonData = [];
    let offset = 0;
    const uniqueVersions = new Set();

    // Ensure the assets directory exists
    const assetsDir = path.dirname(POKEMON_DATA_FILE);
    if (!fs.existsSync(assetsDir)) {
      console.log("Creating assets directory:", assetsDir);
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    while (true) {
      console.log(`Fetching Pokémon from offset ${offset}...`);
      const response = await fetchWithRetry(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${BATCH_SIZE}`);
      const data = await response.json();
      
      if (data.results.length === 0) {
        console.log("No more Pokémon found. Stopping fetch.");
        break;
      }

      const batchData = await Promise.all(
        data.results.map(async (pokemon) => {
          const pokemonDetailsResponse = await fetchWithRetry(pokemon.url);
          const pokemonDetails = await pokemonDetailsResponse.json();

          // Log details for Mudkip
          if (pokemonDetails.name.toLowerCase() === 'mudkip') {
            console.log('Mudkip details (pokemonDetails):', JSON.stringify(pokemonDetails, null, 2));
          }

          // Fetch species details to get forms
          const speciesResponse = await fetchWithRetry(pokemonDetails.species.url);
          const speciesDetails = await speciesResponse.json();

          // Log details for Mudkip
          if (pokemonDetails.name.toLowerCase() === 'mudkip') {
            console.log('Mudkip details (speciesDetails):', JSON.stringify(speciesDetails, null, 2));
          }

          // Fetch forms
          const formsData = await Promise.all(
            speciesDetails.varieties.map(async (variety) => {
              const formDetailsResponse = await fetchWithRetry(variety.pokemon.url);
              const formDetails = await formDetailsResponse.json();
          
              // Fetch Pokédex entries (only in English)
              const pokedexEntries = speciesDetails.flavor_text_entries
                .filter(entry => entry.language.name === 'en')
                .map(entry => ({
                  version: entry.version.name,
                  text: entry.flavor_text
                }));

              // Add unique versions to the set
              pokedexEntries.forEach(entry => uniqueVersions.add(entry.version));

              // Fetch abilities (Store full ability object)
              const abilities = formDetails.abilities.map(abilityInfo => ({
                id: parseInt(abilityInfo.ability.url.split("/").slice(-2, -1)[0]), // Extract ID from URL
                name: abilityInfo.ability.name,
                is_hidden: abilityInfo.is_hidden,
                slot: abilityInfo.slot
              }));

              // Fetch stats
              const stats = formDetails.stats.map(statInfo => ({
                name: statInfo.stat.name,
                value: statInfo.base_stat
              }));

              const pokemonData = {
                id: formDetails.id,
                base_id: variety.is_default ? null : pokemonDetails.id,
                name: formDetails.name,
                form: variety.is_default ? null : variety.pokemon.name,
                types: formDetails.types.map(typeInfo => typeInfo.type.name),
                sprite: formDetails.sprites.other['official-artwork'].front_default,
                shinySprite: formDetails.sprites.other['official-artwork'].front_shiny,
                height: formDetails.height,
                weight: formDetails.weight,
                pokedexEntries: pokedexEntries,
                abilities: abilities, // Store ability objects with ID + name
                stats: stats // Store stats
              };

              // Log information for Mudkip
              if (formDetails.name.toLowerCase() === 'mudkip') {
                console.log('Mudkip details (formDetails):', JSON.stringify(formDetails, null, 2));
                console.log('Mudkip details (pokemonData):', JSON.stringify(pokemonData, null, 2));
              }

              return pokemonData;
            })
          );

          return formsData;
        })
      );

      allPokemonData = [...allPokemonData, ...batchData.flat()];
      offset += BATCH_SIZE;
    }

    // Remove duplicates
    const uniquePokemonData = allPokemonData.reduce((acc, current) => {
      const x = acc.find(item => item.id === current.id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    // Debugging log
    console.log("Total Pokémon fetched:", uniquePokemonData.length);

    // Save to file
    console.log("Saving Pokémon data to:", POKEMON_DATA_FILE);
    fs.writeFileSync(POKEMON_DATA_FILE, JSON.stringify(uniquePokemonData, null, 2));
    console.log("Pokémon data saved successfully!");

    // Log unique versions
    console.log("Unique Pokédex entry versions:", Array.from(uniqueVersions));

  } catch (error) {
    console.error('Error fetching and saving Pokémon data:', error);
  }
};

fetchAndSavePokemonData();