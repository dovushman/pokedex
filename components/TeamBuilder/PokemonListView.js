import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TouchableWithoutFeedback, TextInput } from 'react-native';
import pokemonData from '../../assets/pokemonData.json';
import { Image } from 'expo-image';
import { capitalizeWords } from '../../utils/capitalize';
import PokemonListViewStats from './PokemonListViewStats';

const PokemonListView = ({ onSelectPokemon, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPokemonData = pokemonData.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => {
    const abilityNames = item.abilities.map((ability) => capitalizeWords(ability.name));
    const typeNames = item.types.map(capitalizeWords).join(', ');

    const stats = item.stats.reduce((acc, stat) => {
      acc[stat.name] = stat.value;
      return acc;
    }, {});

    return (
      <TouchableOpacity style={styles.pokemonContainer} onPress={() => onSelectPokemon(item.id)}>
        <View style={styles.pokemonInfo}>
          <Image source={{ uri: item.sprite }} style={styles.pokemonSprite} />
          <View style={styles.pokemonDetails}>
            <Text style={styles.pokemonName}>{capitalizeWords(item.name)}</Text>
            <Text style={styles.pokemonType}>Type: {typeNames}</Text>
            {abilityNames.map((ability, index) => (
              <Text key={index} style={styles.pokemonAbility}>{ability}</Text>
            ))}
          </View>
        </View>
        <PokemonListViewStats stats={stats} />
      </TouchableOpacity>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.container}>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Pokémon"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FlatList
          data={filteredPokemonData}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.listContainer}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchBar: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    margin: 8,
  },
  listContainer: {
    padding: 8,
  },
  pokemonContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 8,
    marginBottom: 8,
    position: 'relative',
    alignItems: 'center',
  },
  pokemonInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pokemonSprite: {
    width: 40,
    height: 40,
    marginRight: 8,
  },
  pokemonDetails: {
    flexDirection: 'column',
  },
  pokemonName: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  pokemonType: {
    fontSize: 12,
  },
  pokemonAbility: {
    fontSize: 12,
  },
});

export default PokemonListView;