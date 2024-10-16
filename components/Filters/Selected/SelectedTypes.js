import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'; // Import MaterialIcons
import typeColors from '../../../utils/typeColors'; // Import typeColors

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const SelectedTypes = ({ selectedTypes, removeType }) => {
  return (
    <View style={styles.container}>
      {selectedTypes.map((type, index) => (
        <View key={index} style={[styles.typeBadge, { backgroundColor: typeColors[type.toLowerCase()] || '#ddd' }]}>
          <Text style={styles.typeText}>{capitalizeFirstLetter(type)}</Text>
          <TouchableOpacity onPress={() => removeType(type)} style={styles.removeButton}>
            <Text>
              <MaterialIcons name="cancel" size={16} color="#fff" /> {/* Use MaterialIcons with "cancel" */}
            </Text>
          </TouchableOpacity>
        </View>
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
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 5,
    marginBottom: 5,
  },
  typeText: {
    fontSize: 14,
    marginRight: 5,
  },
  removeButton: {
    justifyContent: 'center', // Center horizontally
    alignItems: 'center', // Center vertically
  },
});

export default SelectedTypes;