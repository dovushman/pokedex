// import AsyncStorage from '@react-native-async-storage/async-storage';

// const POKEMON_DATA_KEY = 'pokemonData';
// const BATCH_SIZE = 100; // Fetch 100 Pokémon at a time

// export const fetchAndStorePokemonData = async (setProgress) => {
//   try {
//     let allPokemonData = [];
//     let offset = 0;
//     let totalFetched = 0;
//     const totalPokemon = 1000; // Assuming there are 1000 Pokémon

//     while (true) {
//       const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${BATCH_SIZE}`);
//       const data = await response.json();
//       if (data.results.length === 0) break;

//       const batchData = await Promise.all(
//         data.results.map(async (pokemon) => {
//           const pokemonDetailsResponse = await fetch(pokemon.url);
//           const pokemonDetails = await pokemonDetailsResponse.json();
//           return {
//             id: pokemonDetails.id,
//             name: pokemonDetails.name,
//             types: pokemonDetails.types.map(typeInfo => typeInfo.type.name),
//             sprite: pokemonDetails.sprites.other['official-artwork'].front_default,
//           };
//         })
//       );

//       allPokemonData = [...allPokemonData, ...batchData];
//       totalFetched += batchData.length;
//       offset += BATCH_SIZE;

//       // Update progress
//       setProgress(Math.min(totalFetched / totalPokemon, 1)); // Ensure progress does not exceed 100%
//       console.log(`Fetched ${totalFetched} Pokémon`);
//     }

//     await AsyncStorage.setItem(POKEMON_DATA_KEY, JSON.stringify(allPokemonData));
//     console.log('All Pokémon data stored in AsyncStorage');
//   } catch (error) {
//     console.error('Error fetching and storing Pokémon data:', error);
//   }
// };

// export const getPokemonData = async () => {
//   try {
//     const pokemonData = await AsyncStorage.getItem(POKEMON_DATA_KEY);
//     return pokemonData ? JSON.parse(pokemonData) : [];
//   } catch (error) {
//     console.error('Error getting Pokémon data from storage:', error);
//     return [];
//   }
// };

const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');

const POKEMON_DATA_FILE = path.join(__dirname, '../assets/pokemonData.json');
const BATCH_SIZE = 100; // Fetch 100 Pokémon at a time

const fetchAndSavePokemonData = async () => {
  try {
    let allPokemonData = [];
    let offset = 0;

    // Ensure the assets directory exists
    const assetsDir = path.dirname(POKEMON_DATA_FILE);
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    while (true) {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${BATCH_SIZE}`);
      const data = await response.json();
      if (data.results.length === 0) break;

      const batchData = await Promise.all(
        data.results.map(async (pokemon) => {
          const pokemonDetailsResponse = await fetch(pokemon.url);
          const pokemonDetails = await pokemonDetailsResponse.json();
          return {
            id: pokemonDetails.id,
            name: pokemonDetails.name,
            types: pokemonDetails.types.map(typeInfo => typeInfo.type.name),
            sprite: pokemonDetails.sprites.other['official-artwork'].front_default,
          };
        })
      );

      allPokemonData = [...allPokemonData, ...batchData];
      offset += BATCH_SIZE;
    }

    fs.writeFileSync(POKEMON_DATA_FILE, JSON.stringify(allPokemonData, null, 2));
    console.log('Pokémon data saved to', POKEMON_DATA_FILE);
  } catch (error) {
    console.error('Error fetching and saving Pokémon data:', error);
  }
};

fetchAndSavePokemonData();