import axios from 'axios';

const API_URL = 'https://pokeapi.co/api/v2';

export const getPokemon = async (pokemonName) => {
  try {
	const response = await axios.get(`${API_URL}/pokemon/${pokemonName}`);
	return response.data;
  } catch (error) {
	console.error('Error fetching Pokémon data:', error);
	throw error;
  }
};

export const getPokemonSpecies = async (pokemonName) => {
  try {
	const response = await axios.get(`${API_URL}/pokemon-species/${pokemonName}`);
	return response.data;
  } catch (error) {
	console.error('Error fetching Pokémon species data:', error);
	throw error;
  }
};
