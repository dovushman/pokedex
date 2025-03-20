import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import pokemonSprites from '../assets/pokemonSprites.json'; // Import JSON directly

const ShowdownSpriteTest = () => {
  const [sprites, setSprites] = useState([]);

  useEffect(() => {
    console.log('Fetching sprites...');
    setSprites(pokemonSprites); // Directly use the imported JSON
    console.log('Parsed sprites data:', pokemonSprites);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {sprites.map(sprite => (
        <View key={sprite.name} style={styles.spriteContainer}>
          <Image
            style={styles.sprite}
            source={{ uri: sprite.url }}
            contentFit="contain"
            cachePolicy="disk"
          />
          <Text>{sprite.name}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      padding: 10,
    },
    spriteContainer: {
      width: 80, // Set a fixed width
      height: 80, // Set a fixed height
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f0f0f0', // Optional: Helps visualize the container
    },
    sprite: {
      ...StyleSheet.absoluteFillObject, // Makes the image fill the entire container
    },
  });
  
  

export default ShowdownSpriteTest;
