import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { getPokemon } from '../services/api';

const PokemonInformation = ({ route, navigation }) => {
  const { pokemonId } = route.params;
  const [pokemonData, setPokemonData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPokemonData(pokemonId);
  }, [pokemonId]);

  const fetchPokemonData = async (id) => {
    try {
      const data = await getPokemon(id);
      setPokemonData(data);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
      setError('An error occurred while fetching Pokémon data.');
      setPokemonData(null);
    }
  };

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!pokemonData) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <Image
        style={styles.image}
        source={{ uri: pokemonData.sprites.other['official-artwork'].front_default }}
      />
      <Text style={styles.name}>{pokemonData.name}</Text>
      <Text style={styles.number}>#{pokemonData.id}</Text>
      {/* Add more detailed information here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    position: 'relative', // Ensure the container is relative
  },
  backButton: {
    position: 'absolute',
    top: 40, // Adjust based on your needs
    left: 10,
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: 'blue', // Set the text color to blue
  },
  image: {
    width: 200,
    height: 200,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginTop: 16,
  },
  number: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
});

export default PokemonInformation;