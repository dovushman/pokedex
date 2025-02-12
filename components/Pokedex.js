import React, { useMemo } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import typeColors from '../utils/typeColors'; // Import typeColors

const Pokedex = ({ pokemon }) => {
  const navigation = useNavigation();

  const types = useMemo(() => pokemon.types.map((type) => (
    <Text
      key={type}
      style={[styles.type, { backgroundColor: typeColors[type] }]}
    >
      {type}
    </Text>
  )), [pokemon.types]);

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
    // borderWidth: 1,
    // borderColor: '#ddd',
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#d32f2f',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
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
    color: 'white',
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
    color: 'white',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default React.memo(Pokedex);