// import axios from 'axios';
// import * as ImagePicker from 'expo-image-picker';

// export const handleSelectImage = async () => {
//   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//   if (status !== 'granted') {
//     alert('Sorry, we need camera roll permissions to make this work!');
//     return null;
//   }

//   let result = await ImagePicker.launchImageLibraryAsync({
//     mediaTypes: ImagePicker.MediaTypeOptions.Images,
//     allowsEditing: true,
//     aspect: [4, 3],
//     quality: 1,
//   });

//   console.log('Image Picker Result:', result); // Log the result

//   if (!result.canceled) {
//     const formData = new FormData();
//     formData.append('image', {
//       uri: result.uri,
//       name: 'photo.jpg',
//       type: 'image/jpeg',
//     });

//     try {
//       const response = await axios.post('http://localhost:5001/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log('Image uploaded successfully:', response.data);
//       return result.uri; // Return the URI of the selected image
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       return null;
//     }
//   } else {
//     console.log('Image Picker was canceled');
//     return null;
//   }
// };
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

export const handleSelectImage = async () => {
  // Request media permissions
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    alert('Sorry, we need camera roll permissions to make this work!');
    return null;
  }

  // Open image picker
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: [ImagePicker.MediaType.Image], // Correct usage here
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  console.log('Image Picker Result:', result); // Log the result

  if (!result.canceled) {
    // Prepare the FormData to send to the backend
    const formData = new FormData();
    const imageUri = result.assets[0].uri;

    // Convert image URI to a proper file object
    const localUri = imageUri; // No need to modify the URI
    const filename = localUri.split('/').pop();
    const fileType = filename.split('.').pop(); // Extract file extension

    formData.append('image', {
      uri: localUri,
      name: filename,
      type: `image/${fileType}`,
    });

    // Make the upload request
    try {
      const response = await axios.post('http://localhost:5001/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Image uploaded successfully:', response.data);
      return result.assets[0].uri; // Return URI to set it in the UI
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  } else {
    console.log('Image Picker was canceled');
    return null;
  }
};



// // ImageUpload.js
// import axios from 'axios';
// import * as ImagePicker from 'expo-image-picker';

// export const handleSelectImage = async () => {
//   const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//   if (status !== 'granted') {
//     alert('Sorry, we need camera roll permissions to make this work!');
//     return null;
//   }

//   let result = await ImagePicker.launchImageLibraryAsync({
//     mediaTypes: [ImagePicker.MediaType.Images], // Updated to use an array
//     allowsEditing: true,
//     aspect: [4, 3],
//     quality: 1,
//   });

//   console.log('Image Picker Result:', result); // Log the result

//   if (!result.canceled) {
//     const formData = new FormData();
//     formData.append('image', {
//       uri: result.assets[0].uri, // Updated to use the correct URI
//       name: 'photo.jpg',
//       type: 'image/jpeg',
//     });

//     try {
//       const response = await axios.post('http://localhost:5001/upload', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });
//       console.log('Image uploaded successfully:', response.data);
//       return result.assets[0].uri; // Return the URI of the selected image
//     } catch (error) {
//       console.error('Error uploading image:', error);
//       return null;
//     }
//   } else {
//     console.log('Image Picker was canceled');
//     return null;
//   }
// };