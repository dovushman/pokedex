import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getPokemon, getPokemonSpecies } from '../services/api';
import PokemonInformationBattle from '../components/PokemonInformationBattle';
import PokemonInformationAbout from '../components/PokemonInformationAbout';

const PokemonInformation = ({ route, navigation }) => {
  const { pokemonId } = route.params;
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [error, setError] = useState(null);
  const [section, setSection] = useState('about'); // State to manage the current section

  useEffect(() => {
    fetchPokemonData(pokemonId);
  }, [pokemonId]);

  const fetchPokemonData = async (id) => {
    try {
      const data = await getPokemon(id);
      setPokemonData(data);
      const species = await getPokemonSpecies(id);
      setSpeciesData(species);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error('Error fetching Pokémon data:', error);
      setError('An error occurred while fetching Pokémon data.');
      setPokemonData(null);
      setSpeciesData(null);
    }
  };

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!pokemonData || !speciesData) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Back</Text>
        </TouchableOpacity>
        <Text style={styles.name}>{pokemonData.name}</Text>
        <Text style={styles.number}>#{pokemonData.id}</Text>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: pokemonData.sprites.other['official-artwork'].front_default }}
          />
        </View>
        <View style={styles.sectionButtons}>
          <TouchableOpacity onPress={() => setSection('about')} style={styles.sectionButton}>
            <Text style={styles.sectionButtonText}>About</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setSection('battle')} style={styles.sectionButton}>
            <Text style={styles.sectionButtonText}>Battle</Text>
          </TouchableOpacity>
        </View>
        {section === 'about' ? (
          <PokemonInformationAbout pokemonData={pokemonData} speciesData={speciesData} />
        ) : (
          <PokemonInformationBattle pokemonData={pokemonData} />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  backButton: {
    position: 'absolute',
    top: 10, // Adjust based on your needs
    left: 10,
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: 'blue', // Set the text color to blue
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20, // Add margin to push the image down
    marginBottom: 16,
  },
  image: {
    width: 240, // Adjust the size as needed
    height: 240, // Adjust the size as needed
    resizeMode: 'contain', // Maintain aspect ratio and fit within the container
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginTop: 16,
    color: '#333',
  },
  number: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    color: '#666',
  },
  sectionButtons: {
    flexDirection: 'row',
    marginTop: 16,
  },
  sectionButton: {
    marginHorizontal: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#ddd',
    borderRadius: 8,
  },
  sectionButtonText: {
    fontSize: 16,
    color: '#333',
  },
});

export default PokemonInformation;
``