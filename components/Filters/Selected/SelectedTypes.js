// // import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import typeColors from '../../../utils/typeColors'; // Import typeColors

// const capitalizeFirstLetter = (string) => {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// };

// const SelectedTypes = ({ selectedTypes, removeType }) => {
//   return (
//     <View style={styles.container}>
//       {selectedTypes.map((type, index) => (
//         <View key={index} style={[styles.typeBadge, { backgroundColor: typeColors[type.toLowerCase()] || '#ddd' }]}>
//           <Text style={styles.typeText}>{capitalizeFirstLetter(type)}</Text>
//           <TouchableOpacity onPress={() => removeType(type)} style={styles.removeButton}>
//             <Text style={styles.removeButtonText}>X</Text>
//           </TouchableOpacity>
//         </View>
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
//   typeBadge: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderRadius: 15,
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//     marginRight: 5,
//     marginBottom: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 3,
//     elevation: 3,
//   },
//   typeText: {
//     fontSize: 14,
//     marginRight: 5,
//   },
//   removeButton: {
//     justifyContent: 'center', // Center horizontally
//     alignItems: 'center', // Center vertically
//     // backgroundColor: '#ccc', // Grey background
//     borderRadius: 10, // Circle shape
//     width: 20, // Circle size
//     height: 20, // Circle size
//   },
//   removeButtonText: {
//     fontSize: 14,
//     color: '#000', // Black color for the "X"
//   },
// });

// export default SelectedTypes;





import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // If using Expo for icons, you can use this
import typeColors from '../../../utils/typeColors'; // Import typeColors

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const FilterPill = ({ type, selected, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.pill, selected ? styles.selectedPill : styles.unselectedPill]}
      onPress={() => onPress(type)}
    >
      <View style={styles.pillContent}>
        <Text style={[styles.pillText, selected ? styles.selectedText : styles.unselectedText]}>
          {type}
        </Text>
        {selected && (
          <TouchableOpacity onPress={() => onPress(type)}>
            <MaterialIcons name="close" size={16} color="white" style={styles.closeIcon} />
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

const SelectedTypes = ({ selectedTypes, removeType }) => {
  return (
    <View style={styles.container}>
      {selectedTypes.map((type, index) => (
        <FilterPill
          key={index}
          type={capitalizeFirstLetter(type)}
          selected={true}
          onPress={removeType}
        />
      ))}
    </View>
  );
};

const FilterLabel = () => {
  const [selectedTypes, setSelectedTypes] = useState([]); // Initial state is an empty array

  const removeType = (type) => {
    setSelectedTypes(selectedTypes.filter(t => t !== type));
  };

  return (
    <View>
      <SelectedTypes selectedTypes={selectedTypes} removeType={removeType} />
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
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    margin: 5,
    borderWidth: 1,
  },
  selectedPill: {
    backgroundColor: '#4CAF50',
    borderColor: '#388E3C',
  },
  unselectedPill: {
    backgroundColor: '#E0E0E0',
    borderColor: '#BDBDBD',
  },
  pillText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  unselectedText: {
    color: '#424242',
  },
  pillContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeIcon: {
    marginLeft: 8,
  },
});

export default FilterLabel;