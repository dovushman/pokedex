import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import eggGroupColors from '../utils/eggGroupColors';

const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, char => char.toUpperCase());
};

const EggGroupBadge = ({ eggGroup }) => {
  const color = eggGroupColors[eggGroup.toLowerCase()] || '#000'; // Default to black if color not found
  const displayText = eggGroup.toLowerCase() === 'no eggs discovered' ? capitalizeWords(eggGroup) : eggGroup;

  return (
    <View style={[styles.badge, { backgroundColor: color }]}>
      <Text style={styles.text}>{displayText}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    width: 100, // Set a fixed width
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 5,
    marginBottom: 5,
    justifyContent: 'center', // Center the text vertically
    alignItems: 'center', // Center the text horizontally
  },
  text: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default EggGroupBadge;