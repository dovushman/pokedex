import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';

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

const EvIvEditor = ({ pokemon, onEvsChange }) => {
  const [evs, setEvs] = useState(pokemon.evs || { hp: 0, attack: 0, defense: 0, 'special-attack': 0, 'special-defense': 0, speed: 0 });
  const [ivs, setIvs] = useState(pokemon.ivs || { hp: 31, attack: 31, defense: 31, 'special-attack': 31, 'special-defense': 31, speed: 31 });
  const maxEVs = 508;
  const maxPerStat = 252;

  useEffect(() => {
    setEvs(pokemon.evs || { hp: 0, attack: 0, defense: 0, 'special-attack': 0, 'special-defense': 0, speed: 0 });
  }, [pokemon]);

  const getRemainingEVs = () => {
    return maxEVs - Object.values(evs).reduce((a, b) => a + b, 0);
  };

  const handleEvChange = (stat, value) => {
    const newValue = Math.min(Math.max(value, 0), maxPerStat);
    let newEvs = { ...evs, [stat]: newValue };
    let totalEvs = Object.values(newEvs).reduce((a, b) => a + b, 0);

    if (totalEvs > maxEVs) {
      const excess = totalEvs - maxEVs;
      newEvs[stat] = Math.max(newValue - excess, 0);
    }

    setEvs(newEvs);
    onEvsChange(newEvs);
  };

  const handleSliderChange = (stat, value) => {
    const remainingEVs = getRemainingEVs();
    const currentStatValue = evs[stat];
    const maxAllowed = Math.min(maxPerStat, currentStatValue + remainingEVs);
    const newValue = Math.min(Math.round(value), maxAllowed);

    setEvs(prevEvs => ({
      ...prevEvs,
      [stat]: newValue,
    }));
  };

  const handleSliderComplete = (stat, value) => {
    handleEvChange(stat, evs[stat]);
  };

  const handleIvChange = (stat, value) => {
    const newIvs = { ...ivs, [stat]: Math.min(Math.max(value, 0), 31) };
    setIvs(newIvs);
    pokemon.ivs = newIvs;
  };

  const remainingEVs = getRemainingEVs();

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.statHeader}></Text>
        <Text style={styles.evHeader}>EVs</Text>
        <Text style={styles.remainingText}>Remaining EVs: {remainingEVs}</Text>
        <Text style={styles.ivHeader}>IVs</Text>
      </View>
      {Object.keys(evs).map((stat) => (
        <View key={stat} style={styles.statContainer}>
          <Text style={styles.statName}>{formatStatName(stat)}</Text>
          <View style={styles.evIvContainer}>
            <View style={styles.evIvLabelContainer}>
              <TextInput
                style={styles.evInput}
                keyboardType="numeric"
                value={String(evs[stat])}
                onChangeText={(value) => handleEvChange(stat, parseInt(value) || 0)}
              />
            </View>
            <Slider
              style={styles.evSlider}
              minimumValue={0}
              maximumValue={maxPerStat} // Always 252 for visual length
              step={1}
              value={evs[stat]}
              onValueChange={(value) => handleSliderChange(stat, value)}
              onSlidingComplete={(value) => handleSliderComplete(stat, value)}
            />
            <View style={styles.evIvLabelContainer}>
              <TextInput
                style={styles.ivInput}
                keyboardType="numeric"
                value={String(ivs[stat])}
                onChangeText={(value) => handleIvChange(stat, parseInt(value) || 0)}
                onBlur={() => handleIvChange(stat, ivs[stat])}
              />
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e5343d',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    padding: 12,
    position: 'relative',
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginBottom: 8,
  },
  statHeader: {
    width: 100,
  },
  evHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
    marginLeft: 5, // Move EVs header 5 units to the right
  },
  ivHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'right',
    marginLeft: 70, // Move IVs header 40 units to the right
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
  evIvContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  evIvLabelContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  evIvLabel: {
    fontSize: 12,
    color: 'white',
    marginBottom: 4,
  },
  evInput: {
    width: 40,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 5,
    textAlign: 'center',
  },
  evSlider: {
    flex: 1,
    marginRight: 10,
  },
  ivInput: {
    width: 40,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 5,
    textAlign: 'center',
  },
  remainingText: {
    fontSize: 10, // Smaller font size
    color: 'white',
    textAlign: 'center',
    marginHorizontal: 10,
  },
});

export default EvIvEditor;