import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library
import pokemonData from '../assets/pokemonData.json'; // Adjust the path as necessary

const capitalizeFirstLetter = (string) => {
  if (typeof string !== 'string') {
    console.error('capitalizeFirstLetter: expected a string but received:', string);
    return '';
  }
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const capitalizeArray = (array) => {
  return array.map(item => capitalizeFirstLetter(item));
};

const EvolutionLine = ({ evolutionLine }) => {
  const [evolutionSprites, setEvolutionSprites] = useState({});

  useEffect(() => {
    if (evolutionLine) {
      console.log('Evolution Line:', evolutionLine); // Log the evolution line
      const sprites = {};
      const fetchSprites = (line) => {
        line.forEach(pokemonName => {
          if (Array.isArray(pokemonName)) {
            fetchSprites(pokemonName);
          } else {
            const pokemon = pokemonData.find(p => p.name.toLowerCase() === pokemonName.toLowerCase());
            if (pokemon) {
              sprites[pokemonName] = pokemon.sprite;
            }
          }
        });
      };
      fetchSprites(evolutionLine);
      setEvolutionSprites(sprites);
    }
  }, [evolutionLine]);

  const renderEvolutionItem = (pokemonName, index, isBranching) => (
    <View key={pokemonName} style={styles.evolutionItem}>
      <Image
        style={styles.evolutionImage}
        source={{ uri: evolutionSprites[pokemonName] }}
      />
    </View>
  );

  const renderBranchingEvolution = (branchingEvolutions) => (
    <View style={styles.branchingContainer}>
      {branchingEvolutions.map((pokemonName, index) => (
        <View key={pokemonName} style={styles.branchingItem}>
          {Array.isArray(pokemonName)
            ? renderBranchingEvolution(pokemonName)
            : renderEvolutionItem(pokemonName, index, true)}
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.infoSection}>
      <Text style={styles.infoTitle}>Evolution Line</Text>
      {evolutionLine ? (
        <View style={styles.evolutionContainer}>
          {evolutionLine.map((pokemonName, index) => {
            if (Array.isArray(pokemonName)) {
              return (
                <View key={index} style={styles.evolutionItem}>
                  {renderBranchingEvolution(pokemonName)}
                </View>
              );
            }
            return (
              <View key={pokemonName} style={styles.evolutionItem}>
                {renderEvolutionItem(pokemonName, index, false)}
                {index < evolutionLine.length - 1 && (
                  <Icon name="arrow-right" size={20} color="white" style={styles.arrowIcon} />
                )}
              </View>
            );
          })}
        </View>
      ) : (
        <Text style={styles.infoText}>N/A</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  infoSection: {
    width: '100%',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.3)',
  },
  infoTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 3,
  },
  infoText: {
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
    marginLeft: 8, // Add margin to separate text from image
  },
  evolutionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center horizontally
    flexWrap: 'nowrap', // Prevent wrapping for branching evolutions
    flex: 1, // Allow the container to expand
    marginLeft: 20, // Shift the evolution line to the right
  },
  evolutionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  evolutionImage: {
    width: 65,
    height: 65,
  },
  arrowIcon: {
    marginHorizontal: 8,
  },
  branchingContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  branchingItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowIconUp: {
    transform: [{ rotate: '-45deg' }],
    marginHorizontal: 8,
  },
  arrowIconDown: {
    transform: [{ rotate: '45deg' }],
    marginHorizontal: 8,
  },
});

export default EvolutionLine;