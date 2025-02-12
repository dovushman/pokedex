// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import { MaterialIcons } from '@expo/vector-icons'; // If using Expo for icons, you can use this
// import typeColors from '../../../utils/typeColors'; // Import typeColors

// const capitalizeFirstLetter = (string) => {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// };

// const FilterPill = ({ type, onPress }) => {
//   return (
//     <View style={[styles.pill, styles.selectedPill]}>
//       <Text style={styles.selectedText}>{capitalizeFirstLetter(type)}</Text>
//       <TouchableOpacity onPress={() => onPress(type.toLowerCase())}>
//         <MaterialIcons name="close" size={16} color="white" style={styles.closeIcon} />
//       </TouchableOpacity>
//     </View>
//   );
// };


// const SelectedTypes = ({ selectedTypes, removeType }) => {
//   console.log('SelectedTypes:', selectedTypes); // Add logging to check the selectedTypes array
//   return (
//     <View style={styles.container}>
//       {selectedTypes.map((type, index) => (
//         <FilterPill
//           key={index}
//           type={capitalizeFirstLetter(type)}
//           onPress={removeType}
//         />
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//     marginBottom: 10,
//   },
//   pill: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingVertical: 8,
//     paddingHorizontal: 12,
//     borderRadius: 20,
//     margin: 5,
//     borderWidth: 1,
//   },
//   selectedPill: {
//     backgroundColor: '#4CAF50',
//     borderColor: '#388E3C',
//   },
//   selectedText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   closeIcon: {
//     marginLeft: 8,
//   },
// });

// export default SelectedTypes;


import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // If using Expo for icons, you can use this
import typeColors from '../../../utils/typeColors'; // Import typeColors

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const FilterPill = ({ type, onPress }) => {
  const backgroundColor = typeColors[type.toLowerCase()] || '#4CAF50'; // Default color if type not found
  return (
    <View style={[styles.pill, { backgroundColor }]}>
      <Text style={styles.selectedText}>{capitalizeFirstLetter(type)}</Text>
      <TouchableOpacity onPress={() => onPress(type.toLowerCase())}>
        <MaterialIcons name="close" size={16} color="white" style={styles.closeIcon} />
      </TouchableOpacity>
    </View>
  );
};

const SelectedTypes = ({ selectedTypes, removeType }) => {
  console.log('SelectedTypes:', selectedTypes); // Add logging to check the selectedTypes array
  return (
    <View style={styles.container}>
      {selectedTypes.map((type, index) => (
        <FilterPill
          key={index}
          type={capitalizeFirstLetter(type)}
          onPress={removeType}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    margin: 5,
    borderWidth: 1,
    borderColor: '#d32f2f', // Default border color
  },
  selectedText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  closeIcon: {
    marginLeft: 8,
  },
});

export default SelectedTypes;