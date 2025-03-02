// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const capitalizeFirstLetter = (string) => {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// };

// const capitalizeArray = (array) => {
//   return array.map(item => capitalizeFirstLetter(item));
// };
// /*
// const renderEvolutionRequirement = (requirement) => {
//   const { details } = requirement;
//   const detailElements = [];

//   if (details.min_level && details.trigger && details.trigger.name === 'level-up') {
//     detailElements.push(<Text key="level-up">Evolves at Level {details.min_level}</Text>);
//   } else {
//     if (details.min_level) {
//       detailElements.push(<Text key="level">Min Level: {details.min_level}</Text>);
//     }
//     if (details.trigger) {
//       detailElements.push(<Text key="trigger">Trigger: {details.trigger.name}</Text>);
//     }
//   }
//   if (details.item) {
//     detailElements.push(<Text key="item">Item: {details.item.name}</Text>);
//   }
//   if (details.held_item) {
//     detailElements.push(<Text key="held_item">Held Item: {details.held_item.name}</Text>);
//   }
//   if (details.known_move) {
//     detailElements.push(<Text key="known_move">Known Move: {details.known_move.name}</Text>);
//   }
//   if (details.known_move_type) {
//     detailElements.push(<Text key="known_move_type">Known Move Type: {details.known_move_type.name}</Text>);
//   }
//   if (details.location) {
//     detailElements.push(<Text key="location">Location: {details.location.name}</Text>);
//   }
//   if (details.min_happiness) {
//     detailElements.push(<Text key="min_happiness">Min Happiness: {details.min_happiness}</Text>);
//   }
//   if (details.min_beauty) {
//     detailElements.push(<Text key="min_beauty">Min Beauty: {details.min_beauty}</Text>);
//   }
//   if (details.min_affection) {
//     detailElements.push(<Text key="min_affection">Min Affection: {details.min_affection}</Text>);
//   }
//   if (details.needs_overworld_rain) {
//     detailElements.push(<Text key="needs_overworld_rain">Needs Overworld Rain</Text>);
//   }
//   if (details.party_species) {
//     detailElements.push(<Text key="party_species">Party Species: {details.party_species.name}</Text>);
//   }
//   if (details.party_type) {
//     detailElements.push(<Text key="party_type">Party Type: {details.party_type.name}</Text>);
//   }
//   if (details.relative_physical_stats !== null) {
//     detailElements.push(<Text key="relative_physical_stats">Relative Physical Stats: {details.relative_physical_stats}</Text>);
//   }
//   if (details.time_of_day) {
//     detailElements.push(<Text key="time_of_day">Time of Day: {details.time_of_day}</Text>);
//   }
//   if (details.trade_species) {
//     detailElements.push(<Text key="trade_species">Trade Species: {details.trade_species.name}</Text>);
//   }
//   if (details.turn_upside_down) {
//     detailElements.push(<Text key="turn_upside_down">Turn Upside Down</Text>);
//   }

//   return detailElements;
// };

// const renderEvolutionChain = (chain) => {
//   if (!chain) return null;

//   return chain.map((evolution, index) => (
//     <View key={index} style={styles.evolutionRequirement}>
//       <Text style={styles.infoText}>{capitalizeFirstLetter(evolution.species)}</Text>
//       {renderEvolutionRequirement(evolution)}
//       {evolution.evolves_to && evolution.evolves_to.length > 0 && (
//         <View style={styles.evolutionChain}>
//           {renderEvolutionChain(evolution.evolves_to)}
//         </View>
//       )}
//     </View>
//   ));
// };
// */
// const EvolutionLine = ({ evolutionRequirements, evolutionLine }) => {
//   return (
//     <>
//       <View style={styles.infoSection}>
//         <Text style={styles.infoTitle}>Evolution Line</Text>
//         <Text style={styles.infoText}>{evolutionLine ? capitalizeArray(evolutionLine).join(' -> ') : 'N/A'}</Text>
//       </View>
//       {/* <View style={styles.infoSection}>
//         <Text style={styles.infoTitle}>Evolution Requirements</Text>
//         {evolutionRequirements && evolutionRequirements.length > 0 ? (
//           renderEvolutionChain(evolutionRequirements)
//         ) : (
//           <Text style={styles.infoText}>N/A</Text>
//         )}
//       </View> */}
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   infoSection: {
//     width: '100%',
//     paddingVertical: 16,
//     borderBottomWidth: 1,
//     borderBottomColor: 'rgba(255, 255, 255, 0.3)',
//   },
//   infoTitle: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     marginBottom: 8,
//     color: 'white',
//     textShadowColor: 'rgba(0, 0, 0, 0.25)',
//     textShadowOffset: { width: -1, height: 1 },
//     textShadowRadius: 3,
//   },
//   infoText: {
//     fontSize: 16,
//     color: 'white',
//     opacity: 0.8,
//   },
//   evolutionRequirement: {
//     marginBottom: 8,
//   },
//   evolutionChain: {
//     marginLeft: 20,
//   },
// });

// export default EvolutionLine;

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library
import pokemonData from '../assets/pokemonData.json'; // Adjust the path as necessary

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const capitalizeArray = (array) => {
  return array.map(item => capitalizeFirstLetter(item));
};

const EvolutionLine = ({ evolutionLine }) => {
  const [evolutionSprites, setEvolutionSprites] = useState({});

  useEffect(() => {
    if (evolutionLine) {
      const sprites = {};
      evolutionLine.forEach(pokemonName => {
        const pokemon = pokemonData.find(p => p.name.toLowerCase() === pokemonName.toLowerCase());
        if (pokemon) {
          sprites[pokemonName] = pokemon.sprite;
        }
      });
      setEvolutionSprites(sprites);
    }
  }, [evolutionLine]);

  return (
    <View style={styles.infoSection}>
      <Text style={styles.infoTitle}>Evolution Line</Text>
      {evolutionLine ? (
        <View style={styles.evolutionContainer}>
          {evolutionLine.map((pokemonName, index) => (
            <React.Fragment key={index}>
              <View style={styles.evolutionItem}>
                <Image
                  style={styles.evolutionImage}
                  source={{ uri: evolutionSprites[pokemonName] }}
                />
                <Text style={styles.infoText}>{capitalizeFirstLetter(pokemonName)}</Text>
              </View>
              {index < evolutionLine.length - 1 && (
                <Icon name="arrow-right" size={20} color="white" style={styles.arrowIcon} />
              )}
            </React.Fragment>
          ))}
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
  },
  evolutionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center horizontally
  },
  evolutionItem: {
    alignItems: 'center',
    marginRight: 12,
  },
  evolutionImage: {
    width: 70,
    height: 70,
    marginBottom: 4,
  },
  arrowIcon: {
    marginHorizontal: 8,
  },
});

export default EvolutionLine;