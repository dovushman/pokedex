import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Button, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import DropDownPicker from 'react-native-dropdown-picker';
import { getPokemon, getPokemonSpecies } from '../services/api';
import { speakDexEntry } from '../services/textToSpeech';
import PokemonInformationBattle from '../components/PokemonInformationBattle';
import PokemonInformationAbout from '../components/PokemonInformationAbout';

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const PokemonInformation = ({ route, navigation }) => {
  const { pokemonId } = route.params;
  const [pokemonData, setPokemonData] = useState(null);
  const [speciesData, setSpeciesData] = useState(null);
  const [error, setError] = useState(null);
  const [section, setSection] = useState('about');
  const [selectedForm, setSelectedForm] = useState('default');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchPokemonData(pokemonId, selectedForm);
  }, [pokemonId, selectedForm]);

  const fetchPokemonData = async (id, form) => {
    try {
      const data = await getPokemon(id, form);
      setPokemonData(data);
      const species = await getPokemonSpecies(id);
      setSpeciesData(species);
    } catch (error) {
      setError(error);
    }
  };

  if (error) {
    return <Text>{error}</Text>;
  }

  if (!pokemonData || !speciesData) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <FlatList
        data={[{ key: 'content' }]}
        renderItem={() => (
          <View style={styles.contentContainer}>
            <Text style={styles.name}>{pokemonData.name}</Text>
            <Text style={styles.number}>#{pokemonData.id}</Text>
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={{ uri: pokemonData.sprites.other['official-artwork'].front_default }}
                contentFit="contain"
              />
            </View>
            {items.length > 1 && (
              <View style={styles.dropdownContainer}>
                <DropDownPicker
                  open={open}
                  value={selectedForm}
                  items={items}
                  setOpen={setOpen}
                  setValue={setSelectedForm}
                  setItems={setItems}
                  style={styles.dropdown}
                  dropDownContainerStyle={styles.dropdown}
                />
              </View>
            )}
            <View style={styles.sectionButtons}>
              <TouchableOpacity onPress={() => setSection('about')} style={styles.sectionButton}>
                <Text style={styles.sectionButtonText}>About</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setSection('battle')} style={styles.sectionButton}>
                <Text style={styles.sectionButtonText}>Battle</Text>
              </TouchableOpacity>
            </View>
            <Button
              title="Read Dex Entry"
              onPress={() => {
                if (speciesData) {
                  const dexEntry = speciesData.flavor_text_entries.find(entry => entry.language.name === 'en').flavor_text;
                  console.log('Button pressed, dex entry:', dexEntry);
                  speakDexEntry(dexEntry);
                }
              }}
            />
            {section === 'about' ? (
              <PokemonInformationAbout pokemonData={pokemonData} speciesData={speciesData} />
            ) : (
              <PokemonInformationBattle pokemonData={pokemonData} />
            )}
          </View>
        )}
        keyExtractor={(item) => item.key}
        contentContainerStyle={styles.container}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 70,
    left: 25,
    padding: 0,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 16,
    color: 'blue',
  },
  dropdownContainer: {
    margin: 10,
  },
  dropdown: {
    backgroundColor: '#fafafa',
  },
  sectionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  sectionButton: {
    padding: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  sectionButtonText: {
    fontSize: 16,
    color: '#000',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  number: {
    fontSize: 18,
    color: '#666',
  },
  imageContainer: {
    marginVertical: 20,
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default PokemonInformation;