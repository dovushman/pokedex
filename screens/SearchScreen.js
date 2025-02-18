import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
import { FontAwesome, Foundation } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import DescriptionModal from '../components/DescriptionModal';
import axios from 'axios';

const SearchScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
  const [description, setDescription] = useState("");

  const handleCaptureImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleUploadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleDescriptionSubmit = async () => {
    if (description.trim()) {
      try {
        const response = await axios.post('http://localhost:5001/description', { description });
        console.log('Description response:', response.data);
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.pageTitle}>Pokédex Search</Text>
      <Text style={styles.pageDescription}>
        Search for Pokémon-related information. Describe a Pokémon, upload an image, take a photo, or get recommendations.
      </Text>

      {/* Icons Section */}
      <View style={styles.iconsRow}>
        <TouchableOpacity style={styles.iconButton} onPress={handleUploadImage}>
          <FontAwesome name="image" size={30} color="#4A90E2" />
          <Text style={styles.iconLabel}>Upload Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleCaptureImage}>
          <FontAwesome name="camera" size={30} color="#4A90E2" />
          <Text style={styles.iconLabel}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={handleRecommendation}>
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
            multiline={true}
            value={description}
            onChangeText={setDescription}
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
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#e5343d',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
  },
  pageDescription: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
    width: '90%',
  },
  sectionContainer: {
    backgroundColor: '#d32f2f',
    borderRadius: 15,
    padding: 20,
    width: '90%',
    marginBottom: 10,
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
  iconsRow: {
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
});

export default SearchScreen;