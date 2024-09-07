import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import typeColors from '../utils/typeColors'; // Import typeColors

const Pokedex = ({ pokemon }) => {
  const navigation = useNavigation();

  const types = pokemon.types.map((type) => (
    <Text
      key={type}
      style={[styles.type, { backgroundColor: typeColors[type] }]}
    >
      {type}
    </Text>
  ));

  return (
    <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('PokemonInformation', { pokemonId: pokemon.id })}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: pokemon.sprite }}
        />
        <Text style={styles.number}>#{pokemon.id}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{pokemon.name}</Text>
        <View style={styles.typesContainer}>{types}</View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  imageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 12,
  },
  number: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    marginRight: 4,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: '#333',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default Pokedex;