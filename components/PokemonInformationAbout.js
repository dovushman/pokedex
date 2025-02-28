import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
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

const PokemonInformationAbout = ({ pokemonData }) => {
  const [selectedVersion, setSelectedVersion] = useState(pokemonData.pokedexEntries[0]?.version || '');
  const [open, setOpen] = useState(false);

  if (!pokemonData) {
    return <Text>Loading...</Text>;
  }

  const selectedPokedexEntry = pokemonData.pokedexEntries.find(entry => entry.version === selectedVersion);

  const pokedexEntryText = selectedPokedexEntry
    ? selectedPokedexEntry.text.replace(/\f/g, ' ').replace(/\n/g, ' ')
    : 'No Pokedex entry available';

  const dropdownItems = pokemonData.pokedexEntries.map(entry => ({
    label: capitalizeFirstLetter(entry.version),
    value: entry.version
  }));

  return (
    <View style={styles.container}>
      <View style={styles.dropdownWrapper}>
        <DropDownPicker
          open={open}
          value={selectedVersion}
          items={dropdownItems}
          setOpen={setOpen}
          setValue={setSelectedVersion}
          style={styles.dropdown}
          dropDownContainerStyle={styles.dropdownContainer}
          textStyle={styles.dropdownText}
          placeholderStyle={styles.dropdownPlaceholder}
          containerStyle={styles.dropdownContainerStyle}
          listMode="SCROLLVIEW" // Improve readability on open
        />
      </View>
      <View style={styles.pokedexEntryContainer}>
        <Text style={styles.pokedexEntry}>{pokedexEntryText}</Text>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Height & Weight</Text>
        <Text style={styles.infoText}>Height: {pokemonData.height / 10} m</Text>
        <Text style={styles.infoText}>Weight: {pokemonData.weight / 10} kg</Text>
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Base Stats</Text>
        {pokemonData.stats && pokemonData.stats.length > 0 ? (
          pokemonData.stats.map((stat) => renderStatBar(stat.name, stat.value))
        ) : (
          <Text>No stats available</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignItems: 'center',
  },
  dropdownWrapper: {
    width: '80%', // Adjust width as needed
    marginBottom: 20,
    zIndex: 10, // Ensure it's above other elements
  },
  dropdown: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 0,
    borderRadius: 10,
  },
  dropdownContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 0,
    borderRadius: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: 'black', // Improved readability
  },
  dropdownPlaceholder: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  dropdownContainerStyle: {
    borderRadius: 10,
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