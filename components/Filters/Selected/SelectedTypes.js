import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 
import typeColors from '../../../utils/typeColors'; 

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const FilterPill = ({ type, onPress }) => {
  const backgroundColor = typeColors[type.toLowerCase()] || '#4CAF50'; 
  return (
    <View style={[styles.pill, { backgroundColor }]}>
      <Text style={styles.selectedText}>{capitalizeFirstLetter(type)}</Text>
      <TouchableOpacity onPress={() => onPress(type.toLowerCase())}>
        <MaterialIcons name="close" size={16} color="white" style={styles.closeIcon} />
      </TouchableOpacity>
    </View>
  );
};

const SelectedTypes = memo(({ selectedTypes, removeType }) => {
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
});

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
    borderColor: '#d32f2f', 
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