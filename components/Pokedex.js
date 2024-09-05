import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getPokemon } from '../services/api';

const typeColors = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};

const Pokedex = ({ pokemonId }) => {
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    if (pokemonId) {
      fetchPokemonData(pokemonId);
    } else {
      setPokemonData(null);
    }
  }, [pokemonId]);

  const fetchPokemonData = async (id) => {
    try {
      const data = await getPokemon(id);
      setPokemonData(data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
      if (error.response && error.response.status === 404) {
        setError('Pokémon not found. Please check the ID and try again.');
      } else {
        setError('An error occurred while fetching Pokémon data.');
      }
      setPokemonData(null);
    }
  };

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!pokemonData) {
    return <Text>Loading...</Text>;
  }

  const types = pokemonData.types.map((typeInfo) => (
    <Text
      key={typeInfo.type.name}
      style={[styles.type, { backgroundColor: typeColors[typeInfo.type.name] }]}
    >
      {typeInfo.type.name}
    </Text>
  ));

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('PokemonInformation', { pokemonId })}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: pokemonData.sprites.other['official-artwork'].front_default }}
        />
        <Text style={styles.number}>#{pokemonData.id}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{pokemonData.name}</Text>
        <View style={styles.typesContainer}>{types}</View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
  },
  imageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 8,
  },
  number: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  typesContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  type: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: '#fff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  image: {
    width: 60,
    height: 60,
  },
});

export default Pokedex;