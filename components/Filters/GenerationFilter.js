import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const GenerationFilter = ({ selectedGeneration, setSelectedGeneration, toggleFilterSection, expandedFilter }) => {
  const generations = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  const toggleGeneration = (generation) => {
    setSelectedGeneration((prevGeneration) => (prevGeneration === generation ? '' : generation));
  };

  return (
    <View>
      <TouchableOpacity onPress={() => toggleFilterSection('generation')} style={styles.filterToggle}>
        <Text style={styles.filterText}>Filter by Generation</Text>
      </TouchableOpacity>
      {expandedFilter === 'generation' && (
        <View style={styles.container}>
          {generations.map((generation) => (
            <TouchableOpacity
              key={generation}
              style={[
                styles.generationButton,
                selectedGeneration === generation && { backgroundColor: '#d32f2f' }
              ]}
              onPress={() => toggleGeneration(generation)}
            >
              <Text style={[
                styles.generationText,
                selectedGeneration === generation && { color: 'white' }
              ]}>
                Gen {generation}
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
  generationButton: {
    padding: 5,
    margin: 5,
    borderRadius: 5,
    width: 75,
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  generationText: {
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

export default GenerationFilter;