import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import pokemonData from '../../assets/pokemonData.json';
import abilitiesData from '../../assets/abilitiesData.json';
import { capitalizeWords } from '../../utils/capitalize';

const Ability = ({ pokemon }) => {
  const [showAbilities, setShowAbilities] = useState(false);
  const [abilities, setAbilities] = useState([]);
  const [selectedAbility, setSelectedAbility] = useState('');

  useEffect(() => {
    console.log(`Selected Pokémon: ${pokemon.name}`);
    const selectedPokemon = pokemonData.find((p) => p.name === pokemon.name);
    if (selectedPokemon) {
      const abilitiesList = selectedPokemon.abilities.map((ability) => {
        const abilityData = abilitiesData.find((a) => a.id === ability.id);
        if (abilityData) {
          console.log(`Ability: ${abilityData.name}`);
          console.log(`Short Effect: ${abilityData.effect_entries[0]?.short_effect || 'No short effect available'}`);
          return abilityData;
        }
        return null;
      }).filter(Boolean);
      setAbilities(abilitiesList);
      setSelectedAbility(capitalizeWords(abilitiesList[0]?.name || ''));
    }
  }, [pokemon]);

  const handleAbilityPress = () => {
    console.log('Ability box pressed');
    setShowAbilities(!showAbilities);
  };

  const handleAbilitySelect = (abilityName) => {
    setSelectedAbility(capitalizeWords(abilityName));
    setShowAbilities(false);
  };

  const getAbilities = () => {
    return abilities.map((ability) => (
      <TouchableOpacity key={ability.id} style={styles.abilityContainer} onPress={() => handleAbilitySelect(ability.name)}>
        <Text style={styles.abilityName}>{capitalizeWords(ability.name)}</Text>
        <Text style={styles.abilityEffect}>{ability.effect_entries[0]?.short_effect || 'No short effect available'}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.halfWidth}>
      <Text style={styles.detailLabel}>Ability</Text>
      <TouchableOpacity onPress={handleAbilityPress} style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={selectedAbility}
          editable={false}
          pointerEvents="none" // This ensures the TextInput is not focusable
        />
      </TouchableOpacity>
      {showAbilities && (
        <ScrollView style={styles.abilitiesContainer}>
          {getAbilities()}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  halfWidth: {
    width: '48%',
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: '#fff',
  },
  inputContainer: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#a0a8b8',
    borderRadius: 4,
  },
  input: {
    padding: 8,
    fontSize: 14,
    color: '#333',
  },
  abilitiesContainer: {
    marginTop: 20,
    marginLeft: -192,
    width: '210%', // Take up the full width
    maxHeight: 200, // Limit the height to make it scrollable if needed
  },
  abilityContainer: {
    marginBottom: 10,
    width: '100%', // Take up the full width
    backgroundColor: '#D32F30',
    padding: 10,
    borderRadius: 8,
  },
  abilityName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left', // Align text to the left
  },
  abilityEffect: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'left', // Align text to the left
  },
});

export default Ability;