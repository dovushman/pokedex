// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const PokemonInformationBattle = ({ pokemonData }) => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.infoSection}>
//         <Text style={styles.infoTitle}>Abilities</Text>
//         {pokemonData.abilities.map((ability, index) => (
//           <Text key={index} style={styles.infoText}>{ability.ability.name}</Text>
//         ))}
//       </View>
//       <View style={styles.infoSection}>
//         <Text style={styles.infoTitle}>Moves</Text>
//         {pokemonData.moves.map((move, index) => (
//           <Text key={index} style={styles.infoText}>
//             {move.move.name}
//             {move.method && (
//               <> ({move.method}{move.method === 'level-up' ? ` at level ${move.level}` : ''})</>
//             )}
//           </Text>
//         ))}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     width: '90%',
//     alignItems: 'center',
//   },
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
// });

// export default PokemonInformationBattle;




import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PokemonInformationBattle = ({ pokemonData }) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Abilities</Text>
        {pokemonData.abilities && pokemonData.abilities.length > 0 ? (
          pokemonData.abilities.map((ability, index) => (
            <Text key={index} style={styles.infoText}>{ability.name}</Text>
          ))
        ) : (
          <Text style={styles.infoText}>No abilities available</Text>
        )}
      </View>
      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>Moves</Text>
        {pokemonData.moves && pokemonData.moves.length > 0 ? (
          pokemonData.moves.map((move, index) => (
            <Text key={index} style={styles.infoText}>
              {move.name}
              {move.method && (
                <> ({move.method}{move.method === 'level-up' ? ` at level ${move.level}` : ''})</>
              )}
            </Text>
          ))
        ) : (
          <Text style={styles.infoText}>No moves available</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignItems: 'center',
  },
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
});

export default PokemonInformationBattle;