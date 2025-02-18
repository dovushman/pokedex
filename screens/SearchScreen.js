// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, ScrollView, TextInput } from 'react-native';
// import { FontAwesome, Foundation } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';
// import DescriptionModal from '../components/DescriptionModal';
// import axios from 'axios';

// const SearchScreen = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
//   const [description, setDescription] = useState("");

//   const handleCaptureImage = async () => {
//     let result = await ImagePicker.launchCameraAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setSelectedImage(result.assets[0].uri);
//     }
//   };

//   const handleUploadImage = async () => {
//     let result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setSelectedImage(result.assets[0].uri);
//     }
//   };

//   const handleDescriptionSubmit = async () => {
//     if (description.trim()) {
//       try {
//         const response = await axios.post('http://localhost:5001/description', { description });
//         console.log('Description response:', response.data);
//       } catch (error) {
//         console.error('Error submitting description:', error);
//       }
//       setDescriptionModalVisible(false);
//     } else {
//       alert("Please enter a description.");
//     }
//   };

//   const handleRecommendation = () => {
//     alert("Explore more Pokémon with our recommendation system!");
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.pageTitle}>Who's That Pokémon?</Text>
//       <Text style={styles.pageDescription}>
//         Looking for a specific Pokémon? Let us help! Describe a Pokémon, upload an image, or take a photo. Need a Pokémon but not sure which one? Get a recommendation for a that fits your needs!
//       </Text>

//       {/* Icons Section */}
//       <View style={styles.iconsRow}>
//         <TouchableOpacity style={styles.iconButton} onPress={handleUploadImage}>
//           <FontAwesome name="image" size={30} color="#4A90E2" />
//           <Text style={styles.iconLabel}>Upload Image</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.iconButton} onPress={handleCaptureImage}>
//           <FontAwesome name="camera" size={30} color="#4A90E2" />
//           <Text style={styles.iconLabel}>Take Photo</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.iconButton} onPress={handleRecommendation}>
//           <Foundation name="lightbulb" size={30} color="#4A90E2" />
//           <Text style={styles.iconLabel}>Recommend</Text>
//         </TouchableOpacity>
//       </View>

//       {/* Search Section */}
//       <View style={styles.sectionContainer}>
//         <Text style={styles.sectionTitle}>Describe a Pokémon</Text>
//         <View style={styles.searchContainer}>
//           <TextInput 
//             style={styles.searchBar} 
//             placeholder="Describe the Pokémon..." 
//             placeholderTextColor="#ccc"
//             multiline={true}
//             value={description}
//             onChangeText={setDescription}
//           />
//         </View>
//         <TouchableOpacity style={styles.searchButton} onPress={handleDescriptionSubmit}>
//           <FontAwesome name="search" size={20} color="white" />
//           <Text style={styles.searchButtonText}>Search</Text>
//         </TouchableOpacity>
//       </View>

//       <DescriptionModal 
//         visible={descriptionModalVisible} 
//         onClose={() => setDescriptionModalVisible(false)} 
//         onDescriptionSubmit={handleDescriptionSubmit}
//         description={description}
//         setDescription={setDescription}
//       />

//       {/* Disclaimer Section */}
//       <Text style={styles.disclaimerText}>
//         Disclaimer: This feature is in beta and updates are to come.
//       </Text>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#e5343d',
//     paddingVertical: 30,
//     paddingHorizontal: 20,
//   },
//   pageTitle: {
//     position: 'absolute',
//     top: 100, // Adjusted to be lower
//     left: 10,
//     right: 0,
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: 'white',
//     textAlign: 'center',
//   },
//   pageDescription: {
//     position: 'absolute',
//     top: 150, // Adjusted to be below the title
//     left: 37.5,
//     right: 0,
//     fontSize: 16,
//     color: 'white',
//     textAlign: 'center',
//     marginBottom: 20,
//     width: '90%',
//   },
//   iconsRow: {
//     position: 'absolute',
//     top: 260, // Adjusted to be below the description
//     left: 20,
//     right: 20,
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//     marginBottom: 10,
//   },
//   iconButton: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 10,
//     paddingHorizontal: 5,
//   },
//   iconLabel: {
//     marginTop: 5,
//     fontSize: 14,
//     color: 'white',
//     textAlign: 'center',
//   },
//   sectionContainer: {
//     position: 'absolute',
//     top: 350, // Adjusted to be below the icons
//     left: 37.5,
//     right: 0,
//     backgroundColor: '#d32f2f',
//     borderRadius: 15,
//     padding: 20,
//     width: '90%',
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     shadowOffset: { width: 0, height: 3 },
//     elevation: 4,
//     alignItems: 'center',
//   },
//   sectionTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     color: 'white',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   searchContainer: {
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 10,
//     width: '100%',
//     marginBottom: 10,
//   },
//   searchBar: {
//     fontSize: 16,
//     color: 'black',
//     maxHeight: 150,
//     textAlignVertical: 'top',
//   },
//   searchButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#4A90E2',
//     borderRadius: 25,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     marginTop: 10,
//   },
//   searchButtonText: {
//     color: 'white',
//     fontSize: 16,
//     marginLeft: 5,
//   },
//   disclaimerText: {
//     position: 'absolute',
//     bottom: 20,
//     left: 20,
//     right: 20,
//     fontSize: 14,
//     color: 'white',
//     textAlign: 'center',
//   },
// });

// export default SearchScreen;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
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
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Who's That Pokémon?</Text>
      <Text style={styles.pageDescription}>
        Looking for a specific Pokémon? Let us help! Describe a Pokémon, upload an image, or take a photo. Need a Pokémon but not sure which one? Get a recommendation for a that fits your needs!
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