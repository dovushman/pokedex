import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import typeColors from '../utils/typeColors'; // Import typeColors
import EvolutionLine from './EvolutionLine'; // Import EvolutionLine
import EggGroupBadge from './EggGroupBadge'; // Import EggGroupBadge

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

const capitalizeArray = (array) => {
  return array.map(item => capitalizeFirstLetter(item));
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

const buildEvolutionTree = (evolutionLine) => {
  if (!evolutionLine || evolutionLine.length === 0) return null;

  // Special case for Eevee and its evolutions
  const eeveeEvolutions = [
    "vaporeon", "jolteon", "flareon", "espeon", "umbreon", "leafeon", "glaceon", "sylveon"
  ];
  if (evolutionLine[0].toLowerCase() === 'eevee' || eeveeEvolutions.includes(evolutionLine[0].toLowerCase())) {
    return ["eevee", eeveeEvolutions];
  }

  const evolutionMap = {};
  evolutionLine.forEach((evolution, index) => {
    if (index === 0) return; // Skip the first stage (base Pokémon)
    const previousEvolution = evolutionLine[index - 1];
    if (!evolutionMap[previousEvolution]) {
      evolutionMap[previousEvolution] = [];
    }
    evolutionMap[previousEvolution].push(evolution);
  });

  const traverseEvolution = (current) => {
    if (!evolutionMap[current]) return current;
    const evolutions = evolutionMap[current].map(traverseEvolution);
    return evolutions.length > 1 ? [current, evolutions] : [current, ...evolutions];
  };

  const result = traverseEvolution(evolutionLine[0]); // Start from the base Pokémon
  return Array.isArray(result) ? result.flat() : result; // Flatten the result to match the desired format
};

const renderGenderRatioBar = (maleRatio, femaleRatio) => {
  return (
    <View style={styles.genderRatioContainer}>
      <View style={[styles.genderRatioBar, { width: `${maleRatio}%`, backgroundColor: '#56B0F2' }]} />
      <View style={[styles.genderRatioBar, { width: `${femaleRatio}%`, backgroundColor: '#FF77DE' }]} />
    </View>
  );
};

const PokemonInformationAbout = ({ pokemonData }) => {
  if (!pokemonData) {
    return <Text>Loading...</Text>;
  }

  const dropdownItems = pokemonData.pokedexEntries
    .map(entry => ({
      label: capitalizeFirstLetter(entry.version),
      value: entry.version
    }))
    .reverse(); // Reverse the order to show most recent first

  const [selectedVersion, setSelectedVersion] = useState(dropdownItems[0]?.value || '');
  const [open, setOpen] = useState(false);

  const selectedPokedexEntry = pokemonData.pokedexEntries.find(entry => entry.version === selectedVersion);

  const pokedexEntryText = selectedPokedexEntry
    ? selectedPokedexEntry.text.replace(/\f/g, ' ').replace(/\n/g, ' ')
    : 'No Pokedex entry available';

  const genderRatioText = (pokemonData.genderRatio && pokemonData.genderRatio.male !== null && pokemonData.genderRatio.female !== null)
    ? `Male: ${pokemonData.genderRatio.male}%, Female: ${pokemonData.genderRatio.female}%`
    : 'Gender Unknown';

  const showEvolutionLine = pokemonData.evolutionLine && pokemonData.evolutionLine.length > 1;

  // Adjust the evolution line structure for branching evolutions
  const finalEvolutionLine = buildEvolutionTree(pokemonData.evolutionLine);

  return (
    <TouchableWithoutFeedback onPress={() => setOpen(false)}>
      <ScrollView
        style={styles.container}
        onScroll={() => setOpen(false)}
        scrollEventThrottle={16} // Adjust as needed
      >
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
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Egg Group</Text>
          <View style={styles.eggGroupContainer}>
            {pokemonData.eggGroups ? (
              pokemonData.eggGroups.map((eggGroup) => (
                <EggGroupBadge key={eggGroup} eggGroup={capitalizeFirstLetter(eggGroup)} />
              ))
            ) : (
              <Text style={styles.infoText}>N/A</Text>
            )}
          </View>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Experience Group</Text>
          <Text style={styles.infoText}>{pokemonData.experienceGroup ? capitalizeFirstLetter(pokemonData.experienceGroup) : 'N/A'}</Text>
        </View>
        {showEvolutionLine && finalEvolutionLine && (
          <EvolutionLine 
            evolutionLine={finalEvolutionLine} 
          />
        )}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Gender Differences</Text>
          {pokemonData.genderRatio && pokemonData.genderRatio.male !== null && pokemonData.genderRatio.female !== null ? (
            <>
              <Text style={styles.infoText}>{genderRatioText}</Text>
              {renderGenderRatioBar(pokemonData.genderRatio.male, pokemonData.genderRatio.female)}
            </>
          ) : (
            <Text style={styles.infoText}>Gender Unknown</Text>
          )}
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
  },
  dropdownWrapper: {
    width: '80%', // Adjust width as needed
    marginBottom: 20,
    zIndex: 10, // Ensure it's above other elements
    alignSelf: 'center', // Center horizontally
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
    alignSelf: 'center', // Center horizontally
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
  genderRatioContainer: {
    flexDirection: 'row',
    height: 10,
    borderRadius: 5,
    overflow: 'hidden',
    marginTop: 8,
  },
  genderRatioBar: {
    height: '100%',
  },
  eggGroupContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default PokemonInformationAbout;