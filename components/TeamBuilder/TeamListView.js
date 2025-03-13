import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useNavigation } from '@react-navigation/native';
import getPokemonSprite from '../../utils/getPokemonSprite'; // Import the utility function

const TeamListView = ({ team }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('TeamDetails', { teamId: team.id })}
    >
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{team.name}</Text>
      </View>
      <View style={styles.imageContainer}>
        {team.pokemonSprites.map((pokemonId, index) => {
          const sprite = getPokemonSprite(pokemonId);
          return (
            <Image
              key={index}
              style={styles.image}
              source={{ uri: sprite }}
              resizeMode="contain"
              cachePolicy="disk"
            />
          );
        })}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#d32f2f',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8, // Decrease the gap
    flexWrap: 'wrap', // Allow wrapping to ensure all sprites are visible
  },
  infoContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 8, // Decrease the gap
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    color: 'white',
  },
  image: {
    width: 50, // Set uniform size
    height: 50, // Set uniform size
    marginRight: 5,
    marginBottom: 5, // Add margin to ensure proper spacing
  },
});

export default React.memo(TeamListView);