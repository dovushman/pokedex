import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PokemonInformationBattle = ({ pokemonData }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.infoTitle}>Base Stats</Text>
        <Text style={styles.stat}>HP: {pokemonData.stats[0].base_stat}</Text>
        <Text style={styles.stat}>Attack: {pokemonData.stats[1].base_stat}</Text>
        <Text style={styles.stat}>Defense: {pokemonData.stats[2].base_stat}</Text>
        <Text style={styles.stat}>Special Attack: {pokemonData.stats[3].base_stat}</Text>
        <Text style={styles.stat}>Special Defense: {pokemonData.stats[4].base_stat}</Text>
        <Text style={styles.stat}>Speed: {pokemonData.stats[5].base_stat}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.infoTitle}>Abilities</Text>
        {pokemonData.abilities.map((ability, index) => (
          <Text key={index} style={styles.ability}>{ability.ability.name}</Text>
        ))}
      </View>
      <View style={styles.card}>
        <Text style={styles.infoTitle}>Moves</Text>
        {pokemonData.moves.slice(0, 5).map((move, index) => (
          <Text key={index} style={styles.move}>{move.move.name}</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignItems: 'center',
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
  stat: {
    fontSize: 16,
    color: '#333',
  },
  ability: {
    fontSize: 16,
    color: '#333',
  },
  move: {
    fontSize: 16,
    color: '#333',
  },
});

export default PokemonInformationBattle;