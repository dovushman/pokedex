import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import pokemonData from '../../assets/pokemonData.json';

const GenerationFilter = ({ selectedGeneration, setSelectedGeneration, toggleFilterSection, expandedFilter }) => {
  const [generations, setGenerations] = useState([]);

  useEffect(() => {
    // Extract unique generations from pokemonData
    const uniqueGenerations = [...new Set(pokemonData.map(pokemon => pokemon.generation))];
    setGenerations(uniqueGenerations);
    // console.log('Generations:', uniqueGenerations);
  }, []);

  const toggleGeneration = (generation) => {
    // console.log('Toggling generation:', generation);
    setSelectedGeneration((prevGeneration) => {
      const newGeneration = prevGeneration === generation ? '' : generation;
      // console.log('New Selected Generation:', newGeneration);
      return newGeneration;
    });
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
                selectedGeneration === generation ? { backgroundColor: '#d32f2f' } : {}
              ]}
              onPress={() => toggleGeneration(generation)}
            >
              <Text style={[
                styles.generationText,
                selectedGeneration === generation && { color: 'white' }
              ]}>
                Gen {generation.split('-')[1].toUpperCase()}              </Text>
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