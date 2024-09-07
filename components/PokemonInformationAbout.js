import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import typeColors from '../utils/typeColors'; // Import typeColors

const PokemonInformationAbout = ({ pokemonData, speciesData }) => {
  const types = pokemonData.types.map((typeInfo) => {
    const typeName = typeInfo.type.name;
    const color = typeColors[typeName];
    return (
      <View key={typeName} style={[styles.typeContainer, { backgroundColor: color }]}>
        <Text style={styles.typeText}>
          {typeName.charAt(0).toUpperCase() + typeName.slice(1)}
        </Text>
      </View>
    );
  });

  const title = speciesData.genera.find((genus) => genus.language.name === 'en').genus;
  const pokedexEntry = speciesData.flavor_text_entries.find(
    (entry) => entry.language.name === 'en'
  ).flavor_text.replace(/\f/g, ' '); // Replace form feed characters with space

  return (
    <View style={styles.container}>
      <View style={styles.typesContainer}>{types}</View>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.pokedexEntryContainer}>
        <Text style={styles.pokedexEntry}>{pokedexEntry}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.infoTitle}>Height & Weight</Text>
        <Text style={styles.heightWeight}>Height: {pokemonData.height / 10} m</Text>
        <Text style={styles.heightWeight}>Weight: {pokemonData.weight / 10} kg</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignItems: 'center',
  },
  typesContainer: {
    flexDirection: 'row',
    marginTop: 8,
  },
  typeContainer: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginHorizontal: 4,
  },
  typeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    fontSize: 18,
    fontStyle: 'italic',
    marginTop: 8,
    color: '#666',
  },
  pokedexEntryContainer: {
    width: '100%',
    marginTop: 8,
    marginBottom: 16, // Add margin to ensure it doesn't get cut off
  },
  pokedexEntry: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  card: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  heightWeight: {
    fontSize: 16,
    color: '#333',
  },
});

export default PokemonInformationAbout;