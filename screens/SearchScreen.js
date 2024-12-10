// // SearchScreen.js
// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import { FontAwesome, Ionicons, Foundation } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';
// import { handleSelectImage } from '../components/ImageUpload'; // Import the image upload function
// import DescriptionModal from '../components/DescriptionModal'; // Import the DescriptionModal

// const SearchScreen = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);

//   const handleCaptureImage = async () => {
//     let result = await ImagePicker.launchCameraAsync({
//       mediaTypes: [ImagePicker.MediaType.Images], // Updated to use an array
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setSelectedImage(result.uri);
//       // You can also upload the image here if needed
//       // handleSelectImage(result.uri);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Who's That Pokemon!</Text>
//       <View style={styles.row}>
//         {/* <TouchableOpacity style={styles.card} onPress={handleSelectImage}>
//           <FontAwesome name="image" size={80} color="#000" style={styles.icon} />
//           <Text style={styles.cardText}>Upload Image</Text>
//         </TouchableOpacity> */}
//         <TouchableOpacity style={[styles.card, { zIndex: 1 }]} onPress={handleSelectImage}>
//   <FontAwesome name="image" size={80} color="#000" style={styles.icon} />
//   <Text style={styles.cardText}>Upload Image</Text>
// </TouchableOpacity>
//         <TouchableOpacity style={styles.card} onPress={handleCaptureImage}>
//           <FontAwesome name="camera" size={80} color="#000" style={styles.icon} />
//           <Text style={styles.cardText}>Camera</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.row}>
//         <TouchableOpacity style={styles.card} onPress={() => setDescriptionModalVisible(true)}>
//           <Ionicons name="text" size={80} color="#000" style={styles.icon} />
//           <Text style={styles.cardText}>Description</Text>
//         </TouchableOpacity>
//         <View style={styles.card}>
//           <Foundation name="lightbulb" size={80} color="#000" style={styles.icon} />
//           <Text style={styles.cardText}>Recommend</Text>
//         </View>
//       </View>

//       {selectedImage && (
//         <View style={styles.imageContainer}>
//           <Image source={{ uri: selectedImage }} style={styles.image} />
//         </View>
//       )}

//       <DescriptionModal
//         visible={descriptionModalVisible}
//         onClose={() => setDescriptionModalVisible(false)}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       justifyContent: 'center',
//       alignItems: 'center',
//       backgroundColor: '#fff',
//     },
//     title: {
//       fontSize: 24,
//       fontWeight: 'bold',
//       marginBottom: 20,
//     },
//     row: {
//       flexDirection: 'row',
//       justifyContent: 'space-around',
//       width: '100%',
//       marginBottom: 20,
//     },
//     card: {
//       justifyContent: 'center',
//       alignItems: 'center',
//       width: 150,
//       height: 150,
//       backgroundColor: '#f0f0f0',
//       borderRadius: 10,
//       padding: 10,
//       position: 'relative',
//     },
//     icon: {
//       marginBottom: 10,
//     },
//     cardText: {
//       fontSize: 16,
//       textAlign: 'center',
//     },
//     imageContainer: {
//       marginTop: 20,
//       alignItems: 'center',
//     },
//     image: {
//       width: 200,
//       height: 200,
//       borderRadius: 10,
//     },
//   });


// export default SearchScreen;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { FontAwesome, Ionicons, Foundation } from '@expo/vector-icons';
import { handleSelectImage } from '../components/ImageUpload'; // Import the image upload function
import DescriptionModal from '../components/DescriptionModal'; // Import the DescriptionModal
import axios from 'axios';

const SearchScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);
  const [description, setDescription] = useState(""); // State to hold the description text

  const handleCaptureImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: [ImagePicker.MediaType.Images], // Updated to use an array
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const handleUploadImage = async () => {
    const uri = await handleSelectImage();
    if (uri) {
      setSelectedImage(uri);
    }
  };

  const handleDescriptionSubmit = async () => {
    if (description.trim()) {
      try {
        const response = await axios.post('http://localhost:5001/description', { description });
        console.log('Description response:', response.data);

        // Handle response (e.g., show identified Pokémon list or other data)
        // You can show identified Pokémon or some confirmation here
      } catch (error) {
        console.error('Error submitting description:', error);
      }
    } else {
      alert("Please enter a description.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Who's That Pokemon!</Text>
      <View style={styles.row}>
        <TouchableOpacity style={[styles.card, { zIndex: 1 }]} onPress={handleUploadImage}>
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
        description={description}
        setDescription={setDescription}
        onSubmit={handleDescriptionSubmit} // Pass the submit function
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
    position: 'relative',
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





// // SearchScreen.js
// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
// import { FontAwesome, Ionicons, Foundation } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';
// import { handleSelectImage } from '../components/ImageUpload'; // Import the image upload function
// import DescriptionModal from '../components/DescriptionModal'; // Import the DescriptionModal

// const SearchScreen = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [descriptionModalVisible, setDescriptionModalVisible] = useState(false);

//   const handleCaptureImage = async () => {
//     let result = await ImagePicker.launchCameraAsync({
//       mediaTypes: [ImagePicker.MediaType.Images], // Updated to use an array
//       allowsEditing: true,
//       aspect: [4, 3],
//       quality: 1,
//     });

//     if (!result.canceled) {
//       setSelectedImage(result.assets[0].uri);
//     }
//   };

//   const handleUploadImage = async () => {
//     const uri = await handleSelectImage();
//     if (uri) {
//       setSelectedImage(uri);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Who's That Pokemon!</Text>
//       <View style={styles.row}>
//         <TouchableOpacity style={[styles.card, { zIndex: 1 }]} onPress={handleUploadImage}>
//           <FontAwesome name="image" size={80} color="#000" style={styles.icon} />
//           <Text style={styles.cardText}>Upload Image</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.card} onPress={handleCaptureImage}>
//           <FontAwesome name="camera" size={80} color="#000" style={styles.icon} />
//           <Text style={styles.cardText}>Camera</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.row}>
//         <TouchableOpacity style={styles.card} onPress={() => setDescriptionModalVisible(true)}>
//           <Ionicons name="text" size={80} color="#000" style={styles.icon} />
//           <Text style={styles.cardText}>Description</Text>
//         </TouchableOpacity>
//         <View style={styles.card}>
//           <Foundation name="lightbulb" size={80} color="#000" style={styles.icon} />
//           <Text style={styles.cardText}>Recommend</Text>
//         </View>
//       </View>

//       {selectedImage && (
//         <View style={styles.imageContainer}>
//           <Image source={{ uri: selectedImage }} style={styles.image} />
//         </View>
//       )}

//       <DescriptionModal
//         visible={descriptionModalVisible}
//         onClose={() => setDescriptionModalVisible(false)}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//   },
//   row: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     width: '100%',
//     marginBottom: 20,
//   },
//   card: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 150,
//     height: 150,
//     backgroundColor: '#f0f0f0',
//     borderRadius: 10,
//     padding: 10,
//     position: 'relative',
//   },
//   icon: {
//     marginBottom: 10,
//   },
//   cardText: {
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   imageContainer: {
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   image: {
//     width: 200,
//     height: 200,
//     borderRadius: 10,
//   },
// });

// export default SearchScreen;