import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import typeColors from '../../utils/typeColors'; // Import typeColors

const TypeFilter = ({ selectedTypes, setSelectedTypes, toggleFilterSection, expandedFilter }) => {
  const types = Object.keys(typeColors); // Get all types from typeColors
  const toggleType = (type) => {
    setSelectedTypes((prevSelectedTypes) => {
      const newSet = new Set(prevSelectedTypes);
      if (newSet.has(type)) {
        newSet.delete(type);
      } else {
        newSet.add(type);
      }
      return newSet;
    });
  };  
  

  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  return (
    <View>
      <TouchableOpacity onPress={() => toggleFilterSection('type')} style={styles.filterToggle}>
        <Text style={styles.filterText}>Filter by Type</Text>
      </TouchableOpacity>
      {expandedFilter === 'type' && (
        <View style={styles.container}>
          {types.map((type) => (
            <TouchableOpacity
              key={type}
              style={[
                styles.typeButton,
                selectedTypes.has(type) && { backgroundColor: typeColors[type] }
              ]}
              onPress={() => toggleType(type)}
            >
              <Text style={[
                styles.typeText,
                selectedTypes.has(type) && { color: 'white' }
              ]}>
                {capitalize(type)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
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
    padding: 5,
    margin: 5,
    borderRadius: 5,
    width: 75,
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  typeText: {
    fontWeight: 'bold',
    color: '#000',
  },
  filterToggle: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#d32f2f',
    borderRadius: 12,
    marginBottom: 8,
  },
  filterText: {
    color: 'white',
    fontSize: 18,
  },
});

export default TypeFilter;