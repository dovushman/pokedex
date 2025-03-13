// import React, { useRef, useEffect, useState } from 'react';
// import { View, Image, StyleSheet, TouchableOpacity, Text, ScrollView } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome5';
// import pokemonData from '../../assets/pokemonData.json';

// const getBaseFormName = (name) => {
//   // Split the name by '-' and take the first part for base form names
//   const baseName = name.split('-')[0];
//   return baseName
//     .split(' ')
//     .map(word => word.charAt(0).toUpperCase() + word.slice(1))
//     .join(' ');
// };

// const CurrentTeam = ({ team, onAddPokemon }) => {
//   const lastItemRef = useRef(null);
//   const [showRightIndicator, setShowRightIndicator] = useState(false);
//   const [showLeftIndicator, setShowLeftIndicator] = useState(false);

//   const handleScroll = (event) => {
//     const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
//     setShowRightIndicator(contentOffset.x + layoutMeasurement.width < contentSize.width);
//     setShowLeftIndicator(contentOffset.x > 0);
//   };

//   return (
//     <View style={styles.teamContainer}>
//       {showLeftIndicator && (
//         <Icon name="chevron-left" size={24} color="#ccc" style={styles.leftIndicator} />
//       )}
//       <ScrollView
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         onScroll={handleScroll}
//         scrollEventThrottle={16}
//         style={styles.scrollView}
//       >
//         <View style={styles.teamContent}>
//           {team.map((pokemonId, index) => {
//             const pokemon = pokemonData.find(p => p.id === pokemonId);
//             const isLast = index === team.length - 1;

//             if (!pokemon) {
//               return null;
//             }

//             return (
//               <View
//                 key={index}
//                 style={styles.pokemonItem}
//                 ref={isLast ? lastItemRef : null}
//               >
//                 <Image
//                   source={{ uri: pokemon.sprite }}
//                   style={styles.pokemonSprite}
//                 />
//                 <Text style={styles.pokemonName}>{getBaseFormName(pokemon.name)}</Text>
//               </View>
//             );
//           })}
//           {team.length < 6 && (
//             <TouchableOpacity
//               style={styles.addButton}
//               onPress={onAddPokemon}
//               ref={team.length === 0 ? lastItemRef : null}
//             >
//               <Icon name="plus" size={24} color="#fff" />
//             </TouchableOpacity>
//           )}
//         </View>
//       </ScrollView>
//       {showRightIndicator && (
//         <Icon name="chevron-right" size={24} color="#ccc" style={styles.rightIndicator} />
//       )}
//       <View style={styles.horizontalSeparator} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   teamContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginVertical: 16,
//     paddingHorizontal: 16,
//     position: 'relative',
//   },
//   scrollView: {
//     flex: 1,
//   },
//   teamContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   pokemonItem: {
//     alignItems: 'center',
//     marginHorizontal: 4, // Reduced margin to move sprites closer together
//     position: 'relative',
//   },
//   pokemonSprite: {
//     width: 50,
//     height: 50,
//   },
//   pokemonName: {
//     fontSize: 10, // Reduced font size
//     color: '#fff',
//     marginTop: 4,
//     textAlign: 'center',
//   },
//   addButton: {
//     width: 50,
//     height: 50,
//     marginHorizontal: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   horizontalSeparator: {
//     position: 'absolute',
//     left: 0,
//     right: 0,
//     bottom: -8,
//     height: 1,
//     backgroundColor: '#ccc',
//   },
//   rightIndicator: {
//     position: 'absolute',
//     right: 0,
//     top: '50%',
//     transform: [{ translateY: -12 }],
//   },
//   leftIndicator: {
//     position: 'absolute',
//     left: 0,
//     top: '50%',
//     transform: [{ translateY: -12 }],
//   },
// });

// export default CurrentTeam;


import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import getPokemonSprite from '../../utils/getPokemonSprite';

const getBaseFormName = (name) => {
  const baseName = name.split('-')[0];
  return baseName
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

const CurrentTeam = ({ team, onAddPokemon, onSelectPokemon }) => {
  return (
    <View style={styles.teamContainer}>
      <ScrollView horizontal style={styles.scrollView}>
        <View style={styles.teamContent}>
          {team.map((pokemon, index) => (
            <TouchableOpacity key={index} style={styles.pokemonItem} onPress={() => onSelectPokemon(pokemon)}>
              <Image source={{ uri: getPokemonSprite(pokemon.id) }} style={styles.pokemonSprite} />
              <Text style={styles.pokemonName}>{getBaseFormName(pokemon.name)}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.addButton} onPress={onAddPokemon}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  teamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
    paddingHorizontal: 16,
    position: 'relative',
  },
  scrollView: {
    flex: 1,
  },
  teamContent: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  pokemonItem: {
    alignItems: 'center',
    marginHorizontal: 4,
    position: 'relative',
  },
  pokemonSprite: {
    width: 50,
    height: 50,
  },
  pokemonName: {
    fontSize: 10,
    color: '#fff',
    marginTop: 4,
    textAlign: 'center',
  },
  addButton: {
    width: 50,
    height: 50,
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    fontSize: 24,
    color: '#fff',
  },
});

export default CurrentTeam;