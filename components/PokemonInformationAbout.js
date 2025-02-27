import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import typeColors from '../utils/typeColors'; // Import typeColors

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
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const renderStatBar = (statName, statValue, maxValue = 255) => {
  const formattedStatName = formatStatName(statName);
  const percentage = (statValue / maxValue) * 100;
  let color;

  if (statValue <= 29) {
    color = '#EC4541'; // red
  } else if (statValue <= 59) {
    color = '#ED7F0F'; // orange
  } else if (statValue <= 89) {
    color = '#F6DE53'; // yellow
  } else if (statValue <= 119) {
    color = '#A0E516'; // light green
  } else if (statValue <= 149) {
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

const PokemonInformationAbout = ({ pokemonData, speciesData }) => {
  if (!pokemonData || !speciesData) {
    return <Text>Loading...</Text>;
  }

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
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Height & Weight</Text>
        <Text style={styles.infoText}>Height: {pokemonData.height / 10} m</Text>
        <Text style={styles.infoText}>Weight: {pokemonData.weight / 10} kg</Text>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Base Stats</Text>
        {pokemonData.stats.map((stat) => renderStatBar(stat.stat.name, stat.base_stat))}
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Abilities</Text>
        {pokemonData.abilities.map((ability, index) => (
          <Text key={index} style={styles.infoText}>{capitalizeFirstLetter(ability.ability.name)}</Text>
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
    fontSize: 20,
    fontStyle: 'italic',
    marginTop: 8,
    color: 'white',
    opacity: 0.8,
  },
  pokedexEntryContainer: {
    maxWidth: '90%', // Limit maximum width for better readability
    width: '100%',
    alignSelf: 'center',
  },
  pokedexEntry: {
    fontSize: 16, 
    color: 'white',
    textAlign: 'left', // Align text to left for better flow
    lineHeight: 22, // Improve readability
  },
  infoSection: {
    width: '100%',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3,
  },
  infoText: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
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

export default PokemonInformationAbout;