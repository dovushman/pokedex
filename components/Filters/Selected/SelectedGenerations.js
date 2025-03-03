import React, { memo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const FilterPill = ({ generation, onPress }) => {
  return (
    <View style={styles.pill}>
      <Text style={styles.selectedText}>Gen {generation}</Text>
      <TouchableOpacity onPress={() => onPress(generation)}>
        <MaterialIcons name="close" size={16} color="white" style={styles.closeIcon} />
      </TouchableOpacity>
    </View>
  );
};

const SelectedGenerations = memo(({ selectedGenerations, removeGeneration }) => {
  return (
    <View style={styles.container}>
      {Array.from(selectedGenerations).map((generation) => (
        <FilterPill key={generation} generation={generation} onPress={removeGeneration} />
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
    backgroundColor: '#d32f2f',
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

export default SelectedGenerations;