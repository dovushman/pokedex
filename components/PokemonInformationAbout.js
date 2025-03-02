import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView } from 'react-native';
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

const renderEvolutionRequirement = (requirement) => {
  const { details } = requirement;
  const detailElements = [];

  if (details.min_level && details.trigger && details.trigger.name === 'level-up') {
    detailElements.push(<Text key="level-up">Evolves at Level {details.min_level}</Text>);
  } else {
    if (details.min_level) {
      detailElements.push(<Text key="level">Min Level: {details.min_level}</Text>);
    }
    if (details.trigger) {
      detailElements.push(<Text key="trigger">Trigger: {details.trigger.name}</Text>);
    }
  }
  if (details.item) {
    detailElements.push(<Text key="item">Item: {details.item.name}</Text>);
  }
  if (details.held_item) {
    detailElements.push(<Text key="held_item">Held Item: {details.held_item.name}</Text>);
  }
  if (details.known_move) {
    detailElements.push(<Text key="known_move">Known Move: {details.known_move.name}</Text>);
  }
  if (details.known_move_type) {
    detailElements.push(<Text key="known_move_type">Known Move Type: {details.known_move_type.name}</Text>);
  }
  if (details.location) {
    detailElements.push(<Text key="location">Location: {details.location.name}</Text>);
  }
  if (details.min_happiness) {
    detailElements.push(<Text key="min_happiness">Min Happiness: {details.min_happiness}</Text>);
  }
  if (details.min_beauty) {
    detailElements.push(<Text key="min_beauty">Min Beauty: {details.min_beauty}</Text>);
  }
  if (details.min_affection) {
    detailElements.push(<Text key="min_affection">Min Affection: {details.min_affection}</Text>);
  }
  if (details.needs_overworld_rain) {
    detailElements.push(<Text key="needs_overworld_rain">Needs Overworld Rain</Text>);
  }
  if (details.party_species) {
    detailElements.push(<Text key="party_species">Party Species: {details.party_species.name}</Text>);
  }
  if (details.party_type) {
    detailElements.push(<Text key="party_type">Party Type: {details.party_type.name}</Text>);
  }
  if (details.relative_physical_stats !== null) {
    detailElements.push(<Text key="relative_physical_stats">Relative Physical Stats: {details.relative_physical_stats}</Text>);
  }
  if (details.time_of_day) {
    detailElements.push(<Text key="time_of_day">Time of Day: {details.time_of_day}</Text>);
  }
  if (details.trade_species) {
    detailElements.push(<Text key="trade_species">Trade Species: {details.trade_species.name}</Text>);
  }
  if (details.turn_upside_down) {
    detailElements.push(<Text key="turn_upside_down">Turn Upside Down</Text>);
  }

  return detailElements;
};

const renderEvolutionChain = (chain) => {
  if (!chain) return null;

  return chain.map((evolution, index) => (
    <View key={index} style={styles.evolutionRequirement}>
      <Text style={styles.infoText}>{capitalizeFirstLetter(evolution.species)}</Text>
      {renderEvolutionRequirement(evolution)}
      {evolution.evolves_to && evolution.evolves_to.length > 0 && (
        <View style={styles.evolutionChain}>
          {renderEvolutionChain(evolution.evolves_to)}
        </View>
      )}
    </View>
  ));
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

  const genderRatioText = pokemonData.genderRatio
    ? `Male: ${pokemonData.genderRatio.male}%, Female: ${pokemonData.genderRatio.female}%`
    : 'Genderless';

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
          <Text style={styles.infoText}>{pokemonData.eggGroups ? capitalizeArray(pokemonData.eggGroups).join(', ') : 'N/A'}</Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Experience Group</Text>
          <Text style={styles.infoText}>{pokemonData.experienceGroup ? capitalizeFirstLetter(pokemonData.experienceGroup) : 'N/A'}</Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Evolution Line</Text>
          <Text style={styles.infoText}>{pokemonData.evolutionLine ? capitalizeArray(pokemonData.evolutionLine).join(' -> ') : 'N/A'}</Text>
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Evolution Requirements</Text>
          {pokemonData.evolutionRequirements && pokemonData.evolutionRequirements.length > 0 ? (
            renderEvolutionChain(pokemonData.evolutionRequirements)
          ) : (
            <Text style={styles.infoText}>N/A</Text>
          )}
        </View>
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Gender Differences</Text>
          {pokemonData.genderRatio ? (
            <>
              <Text style={styles.infoText}>{genderRatioText}</Text>
            </>
          ) : (
            <Text style={styles.infoText}>Genderless</Text>
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
  evolutionRequirement: {
    marginBottom: 8,
  },
  evolutionChain: {
    marginLeft: 20,
  },
});

export default PokemonInformationAbout;