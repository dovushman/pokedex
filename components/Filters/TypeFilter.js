import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import typeColors from '../../utils/typeColors'; // Import typeColors

const TypeFilter = ({ selectedTypes, setSelectedTypes }) => {
  const types = Object.keys(typeColors); // Get all types from typeColors

  const toggleType = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter(t => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <View style={styles.container}>
      {types.map((type) => (
        <TouchableOpacity
          key={type}
          style={[
            styles.typeButton,
            selectedTypes.includes(type) && { backgroundColor: typeColors[type] }
          ]}
          onPress={() => toggleType(type)}
        >
          <Text style={styles.typeText}>{capitalize(type)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    padding: 10,
  },
  typeButton: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    width: 75,
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  typeText: {
    color: '#fff',
  },
});

export default TypeFilter;