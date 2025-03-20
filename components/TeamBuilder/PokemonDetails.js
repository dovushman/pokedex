import React, { useState, useMemo } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import TopSection from './TopSection';
import BottomSection from './BottomSection';
import Moves from './Moves';
import Stats from './Stats';
import typeColors from '../../utils/typeColors';

const PokemonDetails = ({ pokemon, onNicknameChange }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [isShiny, setIsShiny] = useState(pokemon.shiny);
  const [gender, setGender] = useState(pokemon.gender);

  const handleShinyChange = (value) => {
    setIsShiny(value);
    pokemon.shiny = value;
  };

  const handleGenderChange = (value) => {
    setGender(value);
    pokemon.gender = value;
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return <BottomSection styles={styles} pokemon={pokemon} onShinyChange={handleShinyChange} onGenderChange={handleGenderChange} />;
      case 'moves':
        return <Moves styles={styles} moves={pokemon.moves} />;
      case 'stats':
        return <Stats styles={styles} stats={pokemon.stats} />;
      default:
        return null;
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TopSection 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        styles={styles} 
        pokemon={pokemon} 
        onNicknameChange={onNicknameChange} 
      />
      {renderTabContent()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5343d',
  },
  tabContent: {
    backgroundColor: '#e5343d', // Adjusted background color
    borderWidth: 1,
    borderColor: '#a0a8b8',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    padding: 12,
    position: 'relative',
  },
  detailsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
  },
  detailItem: {
    width: '25%',
    paddingHorizontal: 4,
    marginBottom: 8,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: '#fff',
  },
  detailValue: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#a0a8b8',
    borderRadius: 4,
    padding: 8,
    alignItems: 'center',
    height: 40, // Ensure consistent height
    justifyContent: 'center', // Center content vertically
  },
  detailValueText: {
    fontSize: 14,
    color: '#333',
  },
  abilityItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  typeTag: {
    position: 'absolute',
    right: 12,
    bottom: 12,
    backgroundColor: '#ffd700',
    borderWidth: 1,
    borderColor: '#d4af37',
    borderRadius: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  typeTagText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#333',
  },
  moveInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#a0a8b8',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    fontSize: 14,
    color: '#333',
  },
  evHeader: {
    alignItems: 'flex-end',
    marginBottom: 8,
  },
  evText: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#fff',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statName: {
    width: 40,
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  statBarContainer: {
    flex: 1,
    height: 20,
    backgroundColor: '#f0f4f8',
    borderRadius: 4,
  },
  statBar: {
    height: '100%',
    backgroundColor: '#ffd700',
    borderRadius: 4,
  },
});

export default PokemonDetails;