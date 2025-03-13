import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PokemonListViewStats = ({ stats }) => {
  return (
    <View style={styles.pokemonStatsContainer}>
      <View style={styles.statRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>HP:</Text>
          <Text style={styles.statValue}>{stats.hp}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Atk:</Text>
          <Text style={styles.statValue}>{stats.attack}</Text>
        </View>
      </View>
      <View style={styles.statRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Def:</Text>
          <Text style={styles.statValue}>{stats.defense}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>SpA:</Text>
          <Text style={styles.statValue}>{stats['special-attack']}</Text>
        </View>
      </View>
      <View style={styles.statRow}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>SpD:</Text>
          <Text style={styles.statValue}>{stats['special-defense']}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Spe:</Text>
          <Text style={styles.statValue}>{stats.speed}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  pokemonStatsContainer: {
    flex: 1,
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
    marginLeft: 40,
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%', // Adjust width to ensure two items per row
  },
  statLabel: {
    width: 40, // Fixed width to ensure alignment
    fontSize: 12,
    color: '#333',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  statValue: {
    fontSize: 12,
    color: '#333',
    marginLeft: -5, // Decrease the gap between label and value
  },
});

export default PokemonListViewStats;