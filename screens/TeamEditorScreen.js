import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput, Modal, TouchableWithoutFeedback, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import PokemonListView from '../components/TeamBuilder/PokemonListView';
import CurrentTeam from '../components/TeamBuilder/CurrentTeam';
import PokemonDetails from '../components/TeamBuilder/PokemonDetails';
import pokemonData from '../assets/pokemonData.json';

const TeamEditorScreen = ({ navigation, route }) => {
  const { saveTeam } = route.params;
  const [isEditing, setIsEditing] = useState(false);
  const [teamName, setTeamName] = useState('Untitled Team');
  const [teamId] = useState(Date.now()); // Unique ID for the team
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleNameChange = (text) => {
    setTeamName(text);
  };

  const handleNameSubmit = () => {
    setIsEditing(false);
    saveTeam({ id: teamId, name: teamName, pokemonSprites: pokemonList });
  };

  const handleAddPokemon = (pokemonId) => {
    const pokemon = pokemonData.find(p => p.id === pokemonId);
    const uniqueId = Date.now(); // Generate a unique ID for the Pokémon
    setPokemonList((prevList) => [...prevList, { ...pokemon, uniqueId, evs: { hp: 0, attack: 0, defense: 0, 'special-attack': 0, 'special-defense': 0, speed: 0 } }]);
    setSelectedPokemon({ ...pokemon, uniqueId });
    saveTeam({ id: teamId, name: teamName, pokemonSprites: [...pokemonList, { ...pokemon, uniqueId }] });
    setIsModalVisible(false);
  };

  const openPokemonListView = () => {
    setIsModalVisible(true);
  };

  const handlePokemonChange = (index, key, value) => {
    const newPokemonList = [...pokemonList];
    newPokemonList[index] = { ...newPokemonList[index], [key]: value };
    setPokemonList(newPokemonList);
  };

  const handleSelectPokemon = (pokemon) => {
    setSelectedPokemon(pokemon);
  };

  const handleDeletePokemon = (uniqueId) => {
    const updatedPokemonList = pokemonList.filter(p => p.uniqueId !== uniqueId);
    setPokemonList(updatedPokemonList);
    if (updatedPokemonList.length > 0) {
      setSelectedPokemon(updatedPokemonList[0]); // Select the first Pokémon in the updated list
    } else {
      setSelectedPokemon(null);
    }
    saveTeam({ id: teamId, name: teamName, pokemonSprites: updatedPokemonList });
  };

  const handleEvsChange = (newEvs) => {
    const updatedPokemon = { ...selectedPokemon, evs: newEvs };
    const updatedPokemonList = pokemonList.map(p => p.uniqueId === updatedPokemon.uniqueId ? updatedPokemon : p);
    setPokemonList(updatedPokemonList);
    setSelectedPokemon(updatedPokemon);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>
        {isEditing ? (
          <TextInput
            style={styles.headerTitleInput}
            value={teamName}
            onChangeText={handleNameChange}
            onBlur={handleNameSubmit}
            autoFocus
          />
        ) : (
          <TouchableOpacity 
            onPress={handleEditPress} 
            activeOpacity={0.6} // Slight fade on press
            style={styles.editableContainer}
          >
            <Text style={styles.headerTitle}>{teamName}</Text>
            <Icon name="edit" size={16} color="#fff" style={styles.editIcon} />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView>
        {pokemonList.length > 0 && (
          <>
            <CurrentTeam team={pokemonList} onAddPokemon={openPokemonListView} onSelectPokemon={handleSelectPokemon} />
            {selectedPokemon && (
              <PokemonDetails
                pokemon={selectedPokemon}
                onNicknameChange={(key, value) => handlePokemonChange(pokemonList.indexOf(selectedPokemon), key, value)}
                onEvsChange={handleEvsChange}
                onDelete={() => handleDeletePokemon(selectedPokemon.uniqueId)} // Pass the delete function as a prop
              />
            )}
          </>
        )}
        {pokemonList.length === 0 ? (
          <View style={styles.emptyStateContainer}>
            <Text style={styles.emptyStateText}>To get started, add a Pokémon</Text>
            <TouchableOpacity style={styles.addButton} onPress={openPokemonListView}>
              <Text style={styles.addButtonText}>Add Pokémon</Text>
            </TouchableOpacity>
          </View>
        ) : (
          // Render the list of Pokémon here
          <View>
            {/* Render Pokémon list */}
          </View>
        )}
      </ScrollView>
      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <TouchableWithoutFeedback onPress={() => setIsModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <PokemonListView onSelectPokemon={handleAddPokemon} onClose={() => setIsModalVisible(false)} />
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5343d',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#e5343d',
  },
  editableContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1, // Subtle underline
    borderBottomColor: 'rgba(255, 255, 255, 0.5)', // Slight transparency
    paddingBottom: 2,
    marginLeft: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 8, // Space between text and icon
  },
  editIcon: {
    opacity: 0.7, // Slightly faded to avoid being too bold
  },
  headerTitleInput: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 16,
  },
  addButton: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    margin: 16,
  },
  addButtonText: {
    fontSize: 16,
    color: '#e5343d',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: '60%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
});

export default TeamEditorScreen;