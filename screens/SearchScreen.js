import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, Keyboard, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { FontAwesome, Foundation } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DescriptionModal from '../components/SearchScreen/DescriptionModal';
import PokemonResultsModal from '../components/SearchScreen/DescriptionResponseModal';
import ImageResponseModal from '../components/SearchScreen/ImageResponseModal';
import axios from 'axios';
import pokemonData from '../assets/pokemonData.json'; // Import pokemonData
import { useFocusEffect } from '@react-navigation/native';

const SearchScreen = ({ navigation, route }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
  const [description, setDescription] = useState("");
  const [results, setResults] = useState([]);
  const [resultsModalVisible, setResultsModalVisible] = useState(false);
  const [imageResultsModalVisible, setImageResultsModalVisible] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      if (route.params?.reopenModal) {
        setResultsModalVisible(true);
        navigation.setParams({ reopenModal: false });
      }
    }, [navigation, route.params])
  );

  useEffect(() => {
    (async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync();
      const mediaLibraryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (cameraStatus.status !== 'granted' || mediaLibraryStatus.status !== 'granted') {
        alert('Sorry, we need camera and media library permissions to make this work!');
      }
    })();
  }, []);

  const handleCaptureImage = async () => {
    console.log('Opening camera...');
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('Camera result:', result);

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      recognizePokemon(result.assets[0].uri);
    }
  };

  const handleUploadImage = async () => {
    console.log('Opening image library...');
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('Image library result:', result);

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      recognizePokemon(result.assets[0].uri);
    }
  };

  const recognizePokemon = async (imageUri) => {
    try {
      let formData = new FormData();
      formData.append('image', {
        uri: imageUri,
        name: 'pokemon.jpg',
        type: 'image/jpeg',
      });
  
      const response = await fetch('http://localhost:5001/recognize', { // Replace with your local network IP address
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const data = await response.json();
      if (response.ok) {
        console.log('Recognized Pokémon:', data.predicted_class);
        if (typeof data.predicted_class === 'string') {
          const pokemonName = data.predicted_class;
          const pokemonDataEntry = pokemonData.find((p) => p.name.toLowerCase() === pokemonName.toLowerCase());
          const recognizedPokemon = [{
            name: pokemonName,
            sprite: pokemonDataEntry ? pokemonDataEntry.sprite : null,
            types: pokemonDataEntry ? pokemonDataEntry.types : [],
            id: pokemonDataEntry ? pokemonDataEntry.id : null, // Use the actual Pokémon ID
          }];
          setResults(recognizedPokemon); // Ensure results is an array of objects with name, sprite, and types
          setImageResultsModalVisible(true); // Show the ImageResponseModal
        } else {
          console.error('Error: predicted_class is not a string');
        }
      } else {
        console.error('Error recognizing Pokémon:', data.error);
      }
    } catch (error) {
      console.error('Error recognizing Pokémon:', error);
    }
  };

  const handleDescriptionSubmit = async () => {
    Keyboard.dismiss(); // Dismiss the keyboard
    if (description.trim()) {
      try {
        const response = await axios.post('http://localhost:5001/description', { description }); // Replace with your local network IP address
        console.log('Description response:', response.data);
        if (response.data && Array.isArray(response.data.identifiedPokemon) && response.data.identifiedPokemon.length > 0) {
          const identifiedPokemonWithIds = response.data.identifiedPokemon.map((pokemon) => {
            const pokemonDataEntry = pokemonData.find((p) => p.name.toLowerCase() === pokemon.name.toLowerCase());
            return {
              ...pokemon,
              id: pokemonDataEntry ? pokemonDataEntry.id : null, // Use the actual Pokémon ID
              types: pokemonDataEntry ? pokemonDataEntry.types : [], // Ensure types is an array
            };
          });
          console.log('Setting results:', identifiedPokemonWithIds);
          setResults(identifiedPokemonWithIds); // Assuming response.data.identifiedPokemon is an array of Pokémon
          setResultsModalVisible(true);
        } else {
          console.log('No results found or identifiedPokemon is not an array');
        }
      } catch (error) {
        console.error('Error submitting description:', error);
      }
      setDescriptionModalVisible(false);
    } else {
      alert("Please enter a description.");
    }
  };

  const handleRecommendation = () => {
    alert("Explore more Pokémon with our recommendation system!");
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView
        style={styles.innerContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <Text style={styles.pageTitle}>Who's That Pokémon?</Text>
          <Text style={styles.pageDescription}>
            Looking for a specific Pokémon? Let us help! Describe a Pokémon, upload an image, or take a photo. Need a Pokémon but not sure which one? Get a recommendation that fits your needs!
          </Text>

          {/* Icons Section */}
          <View style={styles.iconsRow}>
            <TouchableOpacity key="uploadImage" style={styles.iconButton} onPress={handleUploadImage}>
              <FontAwesome name="image" size={30} color="#4A90E2" />
              <Text style={styles.iconLabel}>Upload Image</Text>
            </TouchableOpacity>
            <TouchableOpacity key="captureImage" style={styles.iconButton} onPress={handleCaptureImage}>
              <FontAwesome name="camera" size={30} color="#4A90E2" />
              <Text style={styles.iconLabel}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity key="recommend" style={styles.iconButton} onPress={handleRecommendation}>
              <Foundation name="lightbulb" size={30} color="#4A90E2" />
              <Text style={styles.iconLabel}>Recommend</Text>
            </TouchableOpacity>
          </View>

          {/* Search Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Describe a Pokémon</Text>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchBar}
                placeholder="Describe the Pokémon..."
                placeholderTextColor="#ccc"
                multiline={false} // Ensure it’s single-line so "return" submits instead of adding a new line
                value={description}
                onChangeText={setDescription}
                onSubmitEditing={handleDescriptionSubmit}
                returnKeyType="search" // This changes the return key to a search icon on mobile keyboards
                blurOnSubmit={true} // Ensures keyboard dismisses after pressing return
              />

            </View>
            <TouchableOpacity style={styles.searchButton} onPress={handleDescriptionSubmit}>
              <FontAwesome name="search" size={20} color="white" />
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>

          <DescriptionModal
            visible={descriptionModalVisible}
            onClose={() => setDescriptionModalVisible(false)}
            onDescriptionSubmit={handleDescriptionSubmit}
            description={description}
            setDescription={setDescription}
          />

          <PokemonResultsModal
            results={results}
            isVisible={resultsModalVisible}
            onClose={() => setResultsModalVisible(false)}
            onSelect={(pokemon) => {
              console.log('Selected Pokémon:', pokemon);
              setResultsModalVisible(false);
              navigation.navigate('PokemonInformation', { pokemonId: pokemon.id, reopenModal: true });
            }}
            onNoneSelected={() => {
              console.log('None of these Pokémon were selected.');
              setResultsModalVisible(false);
            }}
            navigation={navigation} // Pass navigation prop here
          />

          <ImageResponseModal
            results={results}
            isVisible={imageResultsModalVisible}
            onClose={() => setImageResultsModalVisible(false)}
            onNoneSelected={() => {
              console.log('None of these Pokémon were selected.');
              setImageResultsModalVisible(false);
            }}
            navigation={navigation} // Pass navigation prop here
          />
        </ScrollView>
      </KeyboardAvoidingView>

      {/* Disclaimer Section */}
      <Text style={styles.disclaimerText}>
        Disclaimer: This feature is in beta and updates are to come.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5343d',
  },
  innerContainer: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  pageTitle: {
    position: 'absolute',
    top: 100, // Adjusted to be lower
    alignSelf: 'center', // Center the title horizontally
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  pageDescription: {
    position: 'absolute',
    top: 150, // Adjusted to be below the title
    alignSelf: 'center', // Center the description horizontally
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    width: '90%',
  },
  iconsRow: {
    position: 'absolute',
    top: 260, // Adjusted to be below the description
    alignSelf: 'center', // Center the icons row horizontally
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  iconLabel: {
    marginTop: 5,
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
  sectionContainer: {
    position: 'absolute',
    top: 350, // Adjusted to be below the icons
    alignSelf: 'center', // Center the container horizontally
    backgroundColor: '#d32f2f',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  searchContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    width: '100%',
    marginBottom: 10,
  },
  searchBar: {
    fontSize: 16,
    color: 'black',
    maxHeight: 150,
    textAlignVertical: 'top',
  },
  searchButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4A90E2',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  searchButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 5,
  },
  disclaimerText: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
  },
});

export default SearchScreen;