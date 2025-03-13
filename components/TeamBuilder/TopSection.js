import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { capitalizeWords } from '../../utils/capitalize';

const TopSection = ({ activeTab, setActiveTab, pokemon, onNicknameChange }) => {
  const [nickname, setNickname] = useState(pokemon.nickname || '');

  const handleNicknameChange = (text) => {
    setNickname(text);
    onNicknameChange(text);
  };

  const capitalizedPokemonName = capitalizeWords(pokemon.name);

  return (
    <View style={styles.topSection}>
      <View style={styles.spriteContainer}>
        <Image
          source={{ uri: pokemon.sprite }}
          style={styles.sprite}
          resizeMode="contain"
        />
      </View>
      <View style={styles.rightContent}>
        <View style={styles.fieldsContainer}>
          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>Pokémon</Text>
            <TextInput
              style={styles.input}
              value={capitalizedPokemonName}
              editable={false}
            />
          </View>
          <View style={styles.fieldWrapper}>
            <Text style={styles.label}>Nickname</Text>
            <TextInput
              style={styles.input}
              value={nickname}
              onChangeText={handleNicknameChange}
              placeholder={`${capitalizedPokemonName}`}
              placeholderTextColor="#ccc"
            />
          </View>
        </View>
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="download" size={16} color="#fff" />
            <Text style={styles.actionButtonText}>Import/Export</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="trash-2" size={16} color="#fff" />
            <Text style={styles.actionButtonText}>Delete</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.tabs}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'details' && styles.activeTab]} 
            onPress={() => setActiveTab('details')}
          >
            <Text style={styles.tabText}>Details</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'moves' && styles.activeTab]} 
            onPress={() => setActiveTab('moves')}
          >
            <Text style={styles.tabText}>Moves</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'stats' && styles.activeTab]} 
            onPress={() => setActiveTab('stats')}
          >
            <Text style={styles.tabText}>Stats</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default TopSection;