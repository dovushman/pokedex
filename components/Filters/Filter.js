import React from 'react';
import { View, StyleSheet } from 'react-native';
import TypeFilter from './TypeFilter';

const Filter = ({ selectedTypes, setSelectedTypes }) => {
  return (
    <View style={styles.container}>
      <TypeFilter selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes} />
      {/* Add more filter options here */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#f1f1f1',
    // Add shadow properties for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Add elevation for Android
    elevation: 5,
  },
});

export default Filter;