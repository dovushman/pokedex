import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { FontAwesome, Ionicons, Foundation } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';
import DescriptionModal from '../components/DescriptionModal'; // Import the DescriptionModal

const SearchScreen = () => {
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSelectImage = async () => {
    // Request permission to access media library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your photos!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);

      // Create a form data object to send the image
      const formData = new FormData();
      formData.append('image', {
        uri: result.uri,
        type: 'image/jpeg', // or the appropriate type based on the selected image
        name: 'upload.jpg', // or the appropriate name based on the selected image
      });

      try {
        const uploadResponse = await axios.post('http://localhost:5001/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Image upload response:', uploadResponse.data);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleCaptureImage = async () => {
    // Request permission to access camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("You've refused to allow this app to access your camera!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setSelectedImage(result.uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Who's That Pokemon!</Text>
      <View style={styles.row}>
        <TouchableOpacity style={styles.card} onPress={handleSelectImage}>
          <FontAwesome name="image" size={80} color="#000" style={styles.icon} />
          <Text style={styles.cardText}>Upload Image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.card} onPress={handleCaptureImage}>
          <FontAwesome name="camera" size={80} color="#000" style={styles.icon} />
          <Text style={styles.cardText}>Camera</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity style={styles.card} onPress={() => setDescriptionModalVisible(true)}>
          <Ionicons name="text" size={80} color="#000" style={styles.icon} />
          <Text style={styles.cardText}>Description</Text>
        </TouchableOpacity>
        <View style={styles.card}>
          <Foundation name="lightbulb" size={80} color="#000" style={styles.icon} />
          <Text style={styles.cardText}>Recommend</Text>
        </View>
      </View>

      {selectedImage && (
        <View style={styles.imageContainer}>
          <Image source={{ uri: selectedImage }} style={styles.image} />
        </View>
      )}

      <DescriptionModal
        visible={descriptionModalVisible}
        onClose={() => setDescriptionModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 150,
    height: 150,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
  },
  icon: {
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    textAlign: 'center',
  },
  imageContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
});

export default SearchScreen;
