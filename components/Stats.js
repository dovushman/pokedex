import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import pokemonData from '../assets/pokemonData.json';

const formatStatName = (statName) => {
  if (statName === 'hp') {
    return 'HP';
  }
  if (statName.startsWith('special-')) {
    const parts = statName.split('-');
    return `Sp. ${capitalizeFirstLetter(parts[1])}`;
  }
  return capitalizeFirstLetter(statName);
};

const capitalizeFirstLetter = (string) => {
  if (typeof string !== 'string') return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const calculateStatValue = (baseStat, ev) => {
  return baseStat + Math.floor(ev / 4);
};

const renderStatBar = (statName, baseStat, ev, maxValue = 255) => {
  const formattedStatName = formatStatName(statName);
  const statValue = baseStat; // Keep the original stat value for display
  const evStatValue = calculateStatValue(baseStat, ev); // Calculate the stat value based on EVs
  const percentage = (evStatValue / maxValue) * 100;
  let color;

  if (evStatValue <= 29) {
    color = '#EC4541'; // red
  } else if (evStatValue <= 59) {
    color = '#ED7F0F'; // orange
  } else if (evStatValue <= 89) {
    color = '#F6DE53'; // yellow
  } else if (evStatValue <= 119) {
    color = '#A0E516'; // light green
  } else if (evStatValue <= 149) {
    color = '#24CD5E'; // dark green
  } else {
    color = '#56B0F2'; // blue
  }

  return (
    <View style={styles.statContainer} key={statName}>
      <Text style={styles.statName}>{formattedStatName}</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${percentage}%`, backgroundColor: color }]} />
      </View>
      <Text style={styles.statValue}>{statValue}</Text>
    </View>
  );
};

const Stats = ({ pokemon, style, evs = {} }) => {
  const pokemonStats = pokemonData.find(p => p.id === pokemon.id)?.stats || [];

  return (
    <View style={[styles.tabContent, style]}>
      {pokemonStats.length > 0 ? (
        pokemonStats.map((stat) => renderStatBar(stat.name, stat.value, evs[stat.name] || 0))
      ) : (
        <Text>No stats available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContent: {
    backgroundColor: '#e5343d', // Default background color
    padding: 12,
    position: 'relative',
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statName: {
    width: 100,
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
  },
  progressBar: {
    flex: 1,
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  progress: {
    height: '100%',
    borderRadius: 5,
  },
  statValue: {
    width: 40,
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
    textAlign: 'right',
  },
});

export default Stats;