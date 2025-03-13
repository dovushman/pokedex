import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

const Moves = ({ styles }) => {
  return (
    <View style={styles.tabContent}>
      {[1, 2, 3, 4].map((index) => (
        <TextInput
          key={index}
          style={styles.moveInput}
          placeholder={`Move ${index}`}
          value=""
          editable={false}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContent: {
    backgroundColor: '#e5343d', // Adjusted background color
    borderWidth: 1,
    borderColor: '#a0a8b8',
    borderBottomLeftRadius: 4,
    borderBottomRightRadius: 4,
    padding: 12,
    position: 'relative',
  },
  moveInput: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#a0a8b8',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    fontSize: 14,
    color: '#333',
  },
});

export default Moves;