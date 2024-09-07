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