import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import abilitiesData from '../../assets/abilitiesData.json'; // Import abilities data
import typeMatchupsData from '../../assets/typeMatchupsData.json'; // Import type matchups data

const getAbilityDetails = (abilityName) => {
  const ability = abilitiesData.find((a) => a.name === abilityName);
  if (ability) {
    const effectEntry = ability.effect_entries.find((entry) => entry.language === 'en');
    return effectEntry ? effectEntry.effect : 'No effect description available';
  }
  return 'Ability not found';
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const getTypeMatchups = (types) => {
  const matchups = {
    attacking: {
      super_effective: new Set(),
      not_very_effective: new Set(),
      no_effect: new Set(),
    },
    defending: {
      weak_to: [],
      resistant_to: new Set(),
      immune_to: new Set(),
    },
  };

  types.forEach((type) => {
    const typeData = typeMatchupsData.find((t) => t.name === type);
    if (typeData) {
      typeData.attacking.super_effective.forEach((t) => matchups.attacking.super_effective.add(t));
      typeData.attacking.not_very_effective.forEach((t) => matchups.attacking.not_very_effective.add(t));
      typeData.attacking.no_effect.forEach((t) => matchups.attacking.no_effect.add(t));
      typeData.defending.weak_to.forEach((t) => matchups.defending.weak_to.push(t));
      typeData.defending.resistant_to.forEach((t) => matchups.defending.resistant_to.add(t));
      typeData.defending.immune_to.forEach((t) => matchups.defending.immune_to.add(t));
    }
  });

  // Calculate 4x and 2x weaknesses
  const weakToCount = {};
  matchups.defending.weak_to.forEach((type) => {
    weakToCount[type] = (weakToCount[type] || 0) + 1;
  });

  const fourTimesWeaknesses = Object.keys(weakToCount).filter((type) => weakToCount[type] > 1);
  const twoTimesWeaknesses = Object.keys(weakToCount).filter((type) => weakToCount[type] === 1);

  return { matchups, fourTimesWeaknesses, twoTimesWeaknesses };
};

const PokemonInformationBattle = ({ pokemonData }) => {
  const { matchups, fourTimesWeaknesses, twoTimesWeaknesses } = getTypeMatchups(pokemonData.types);

  return (
    <View style={styles.container}>
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Abilities</Text>
        {pokemonData.abilities && pokemonData.abilities.length > 0 ? (
          pokemonData.abilities.map((ability, index) => (
            <View key={index}>
              <Text style={[styles.infoText, styles.boldText]}>
                {capitalizeFirstLetter(ability.name)}
                {ability.is_hidden && <Text style={styles.hiddenAbility}> (Hidden)</Text>}
              </Text>
              <Text style={styles.infoEffect}>{getAbilityDetails(ability.name)}</Text>
            </View>
          ))
        ) : (
          <Text style={styles.infoText}>No abilities available</Text>
        )}
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Moves</Text>
        {pokemonData.moves && pokemonData.moves.length > 0 ? (
          pokemonData.moves.map((move, index) => (
            <Text key={index} style={styles.infoText}>
              {move.name}
              {move.method && (
                <> ({move.method}{move.method === 'level-up' ? ` at level ${move.level}` : ''})</>
              )}
            </Text>
          ))
        ) : (
          <Text style={styles.infoText}>No moves available</Text>
        )}
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Type Matchups</Text>
        <Text style={styles.infoSubtitle}>Attacking</Text>
        {matchups.attacking.super_effective.size > 0 && (
          <>
            <Text style={styles.subheading}>Super Effective</Text>
            <Text style={styles.infoText}>{Array.from(matchups.attacking.super_effective).map(capitalizeFirstLetter).join(', ')}</Text>
          </>
        )}
        {matchups.attacking.not_very_effective.size > 0 && (
          <>
            <Text style={styles.subheading}>Not Very Effective</Text>
            <Text style={styles.infoText}>{Array.from(matchups.attacking.not_very_effective).map(capitalizeFirstLetter).join(', ')}</Text>
          </>
        )}
        {matchups.attacking.no_effect.size > 0 && (
          <>
            <Text style={styles.subheading}>No Effect</Text>
            <Text style={styles.infoText}>{Array.from(matchups.attacking.no_effect).map(capitalizeFirstLetter).join(', ')}</Text>
          </>
        )}
        <Text style={[styles.infoSubtitle, styles.extraSpace]}>Defending</Text>
        {twoTimesWeaknesses.length > 0 && (
          <>
            <Text style={styles.subheading}>Weak To (2x)</Text>
            <Text style={styles.infoText}>{twoTimesWeaknesses.map(capitalizeFirstLetter).join(', ')}</Text>
          </>
        )}
        <Text style={styles.subheading}>Weak To (4x)</Text>
        {fourTimesWeaknesses.length > 0 ? (
          <Text style={styles.infoText}>{fourTimesWeaknesses.map(capitalizeFirstLetter).join(', ')}</Text>
        ) : (
          <Text style={styles.infoText}>No 4x Weaknesses</Text>
        )}
        {matchups.defending.resistant_to.size > 0 && (
          <>
            <Text style={styles.subheading}>Resistant To</Text>
            <Text style={styles.infoText}>{Array.from(matchups.defending.resistant_to).map(capitalizeFirstLetter).join(', ')}</Text>
          </>
        )}
        {matchups.defending.immune_to.size > 0 && (
          <>
            <Text style={styles.subheading}>Immune To</Text>
            <Text style={styles.infoText}>{Array.from(matchups.defending.immune_to).map(capitalizeFirstLetter).join(', ')}</Text>
          </>
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
  infoSubtitle: {
    fontSize: 20, // Increased font size for subtitles
    fontWeight: 'bold',
    marginTop: 8,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3,
  },
  subheading: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 4,
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
  boldText: {
    fontWeight: 'bold',
  },
  infoEffect: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 8,
  },
  hiddenAbility: {
    fontStyle: 'italic',
    color: 'rgba(255, 255, 255, 0.6)',
  },
  extraSpace: {
    marginTop: 16, // Add extra space above the "Defending" category
  },
});

export default PokemonInformationBattle;