import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import getPokemonSprite from '../../utils/getPokemonSprite';

const getBaseFormName = (name) => {
  const baseName = name.split('-')[0];
  return baseName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const CurrentTeam = ({ team, onAddPokemon, onSelectPokemon }) => {
  return (
    <View style={styles.teamContainer}>
      <ScrollView horizontal style={styles.scrollView}>
        <View style={styles.teamContent}>
          {team.map((pokemon) => (
            <TouchableOpacity key={pokemon.uniqueId} style={styles.pokemonItem} onPress={() => onSelectPokemon(pokemon)}>
              <Image source={{ uri: getPokemonSprite(pokemon.id) }} style={styles.pokemonSprite} />
              <Text style={styles.pokemonName}>{getBaseFormName(pokemon.name)}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.addButton} onPress={onAddPokemon}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  teamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 16,
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  teamContent: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  pokemonItem: {
    alignItems: 'center',
    marginHorizontal: 4,
    position: 'relative',
  },
  pokemonSprite: {
    width: 50,
    height: 50,
  },
  pokemonName: {
    fontSize: 10,
    color: '#fff',
    marginTop: 4,
    textAlign: 'center',
  },
  addButton: {
    width: 50,
    height: 50,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default CurrentTeam;