import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import TopSection from './TopSection';
import BottomSection from './BottomSection';
import Moves from './Moves';
import Stats from './Stats';

const PokemonDetails = ({ pokemon, onNicknameChange }) => {
  const [activeTab, setActiveTab] = useState('details');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return <BottomSection styles={styles} pokemon={pokemon} />;
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
  header: {
    padding: 10,
  },
  topSection: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  spriteContainer: {
    width: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 10,
  },
  sprite: {
    width: 150,
    height: 150,
  },
  rightContent: {
    width: '60%',
    justifyContent: 'space-between',
    paddingRight: 10, // Added padding to the right side
  },
  fieldsContainer: {
    marginBottom: 10,
    paddingRight: 10, // Added padding to the right side
  },
  fieldWrapper: {
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
    color: '#fff',
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#a0a8b8',
    borderRadius: 4,
    padding: 8,
    fontSize: 14,
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e5343d',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  actionButtonText: {
    fontSize: 12,
    marginLeft: 4,
    color: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#c0c8d8',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
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