import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import typeColors from '../utils/typeColors';


const Pokedex = ({ pokemon, useShinySprites }) => {
  const navigation = useNavigation();

  const types = useMemo(
    () =>
      JSON.parse(pokemon.types).map((type) => (
        <Text key={type} style={[styles.type, { backgroundColor: typeColors[type] }]}>
          {type}
        </Text>
      )),
    [pokemon.types]
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('PokemonInformation', { pokemonId: pokemon.id })}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: useShinySprites ? pokemon.shinySprite : pokemon.sprite }}
          resizeMode="contain"
          cachePolicy="disk" // Caches the image to disk
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.name}>{pokemon.name}</Text>
        </View>
        <View style={styles.typesContainer}>{types}</View>
      </View>
      <Text style={styles.numberBackground}>#{pokemon.id}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12, 
    backgroundColor: '#d32f2f', // Updated to match HomeScreen color palette
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  imageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
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
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  numberBackground: {
    position: 'absolute',
    right: 7,
    bottom: 7,
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    opacity: 0.2,
  },
});

export default React.memo(Pokedex);

//Copiloit styling suggestion - pair with homescreen
/*
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import typeColors from '../utils/typeColors';

const Pokedex = ({ pokemon, useShinySprites }) => {
  const navigation = useNavigation();

  const types = useMemo(
    () =>
      JSON.parse(pokemon.types).map((type) => (
        <Text key={type} style={[styles.type, { backgroundColor: typeColors[type] }]}>
          {type}
        </Text>
      )),
    [pokemon.types]
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('PokemonInformation', { pokemonId: pokemon.id })}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: useShinySprites ? pokemon.shinySprite : pokemon.sprite }}
          resizeMode="contain"
          cachePolicy="disk"
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.number}>#{pokemon.id}</Text>
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
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.3)', // Glassmorphism background
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    backdropFilter: 'blur(10px)',
  },
  imageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
    padding: 8,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  typesContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  type: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 6,
    opacity: 0.9,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: '#FFD700',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  image: {
    width: 90,
    height: 90,
  },
  number: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.9)',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default React.memo(Pokedex);
*/

//ChatGPT styling suggestion - pair with homescreen
/*
import React, { useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import typeColors from '../utils/typeColors';

const Pokedex = ({ pokemon, useShinySprites }) => {
  const navigation = useNavigation();

  const types = useMemo(
    () =>
      JSON.parse(pokemon.types).map((type) => (
        <Text key={type} style={[styles.type, { backgroundColor: typeColors[type] }]}> {type} </Text>
      )),
    [pokemon.types]
  );

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('PokemonInformation', { pokemonId: pokemon.id })}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: useShinySprites ? pokemon.shinySprite : pokemon.sprite }}
          resizeMode="contain"
          cachePolicy="disk"
        />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.number}>#{pokemon.id}</Text>
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
    padding: 14,
    borderRadius: 16,
    marginBottom: 12,
    backgroundColor: 'rgba(0, 0, 0, 0.3)', // Adjusted for better contrast
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    backdropFilter: 'blur(10px)',
  },
  imageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
    padding: 8,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  typesContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
  type: {
    fontSize: 14,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 6,
    opacity: 0.9,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: '#FFD700', // Changed to a slightly warmer color for better contrast
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  image: {
    width: 90,
    height: 90,
  },
  number: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.9)', // Increased opacity for better readability
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});

export default React.memo(Pokedex);
*/

