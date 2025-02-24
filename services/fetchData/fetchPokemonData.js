// const fs = require('fs');
// const fetch = require('node-fetch');
// const path = require('path');

// const POKEMON_DATA_FILE = path.join(__dirname, '../assets/pokemonData.json');
// const BATCH_SIZE = 100; // Fetch 100 Pokémon at a time

// const fetchAndSavePokemonData = async () => {
//   try {
//     let allPokemonData = [];
//     let offset = 0;

//     // Ensure the assets directory exists
//     const assetsDir = path.dirname(POKEMON_DATA_FILE);
//     if (!fs.existsSync(assetsDir)) {
//       fs.mkdirSync(assetsDir, { recursive: true });
//     }

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
//             shinySprite: pokemonDetails.sprites.other['official-artwork'].front_shiny,
//           };
//         })
//       );

//       allPokemonData = [...allPokemonData, ...batchData];
//       offset += BATCH_SIZE;
//     }

//     fs.writeFileSync(POKEMON_DATA_FILE, JSON.stringify(allPokemonData, null, 2));
//     console.log('Pokémon data saved to', POKEMON_DATA_FILE);
//   } catch (error) {
//     console.error('Error fetching and saving Pokémon data:', error);
//   }
// };

// fetchAndSavePokemonData();

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

          // Fetch species details to get forms
          const speciesResponse = await fetch(pokemonDetails.species.url);
          const speciesDetails = await speciesResponse.json();

          // Fetch forms
          const formsData = await Promise.all(
            speciesDetails.varieties.map(async (variety) => {
              const formDetailsResponse = await fetch(variety.pokemon.url);
              const formDetails = await formDetailsResponse.json();
              return {
                id: formDetails.id,
                base_id: variety.is_default ? null : pokemonDetails.id,
                name: formDetails.name,
                form: variety.is_default ? null : variety.pokemon.name,
                types: formDetails.types.map(typeInfo => typeInfo.type.name),
                sprite: formDetails.sprites.other['official-artwork'].front_default,
                shinySprite: formDetails.sprites.other['official-artwork'].front_shiny,
              };
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

    fs.writeFileSync(POKEMON_DATA_FILE, JSON.stringify(uniquePokemonData, null, 2));
    console.log('Pokémon data saved to', POKEMON_DATA_FILE);
  } catch (error) {
    console.error('Error fetching and saving Pokémon data:', error);
  }
};

fetchAndSavePokemonData();