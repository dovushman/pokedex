import pokemonData from '../assets/pokemonData.json';

const getPokemonSprite = (pokemonId) => {
  const pokemon = pokemonData.find((p) => p.id === pokemonId);
  return pokemon ? pokemon.sprite : null;
};

export default getPokemonSprite;