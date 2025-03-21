// import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';

// const Stats = ({ styles }) => {
//   return (
//     <View style={styles.tabContent}>
//       <View style={styles.evHeader}>
//         <Text style={styles.evText}>EV</Text>
//       </View>
//       {[
//         { name: 'HP', value: 35 },
//         { name: 'Atk', value: 55 },
//         { name: 'Def', value: 40 },
//         { name: 'SpA', value: 50 },
//         { name: 'SpD', value: 50 },
//         { name: 'Spe', value: 90 }
//       ].map((stat) => (
//         <View key={stat.name} style={styles.statRow}>
//           <Text style={styles.statName}>{stat.name}</Text>
//           <View style={styles.statBarContainer}>
//             <View 
//               style={[styles.statBar, { width: `${stat.value / 2}%` }]} 
//             />
//           </View>
//         </View>
//       ))}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   tabContent: {
//     backgroundColor: '#e5343d', // Adjusted background color
//     borderWidth: 1,
//     borderColor: '#a0a8b8',
//     borderBottomLeftRadius: 4,
//     borderBottomRightRadius: 4,
//     padding: 12,
//     position: 'relative',
//   },
//   evHeader: {
//     alignItems: 'flex-end',
//     marginBottom: 8,
//   },
//   evText: {
//     fontWeight: 'bold',
//     fontSize: 14,
//     color: '#fff',
//   },
//   statRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 8,
//   },
//   statName: {
//     width: 40,
//     fontSize: 14,
//     fontWeight: '500',
//     color: '#fff',
//   },
//   statBarContainer: {
//     flex: 1,
//     height: 20,
//     backgroundColor: '#f0f4f8',
//     borderRadius: 4,
//   },
//   statBar: {
//     height: '100%',
//     backgroundColor: '#ffd700',
//     borderRadius: 4,
//   },
// });

// export default Stats;

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import pokemonData from '../assets/pokemonData.json';

const formatStatName = (statName) => {
  if (statName === 'hp') {
    return 'HP';
  }
  if (statName.startsWith('special-')) {
    const parts = statName.split('-');
    return `Sp. ${capitalizeFirstLetter(parts[1])}`;
  }
  return capitalizeFirstLetter(statName);
};

const capitalizeFirstLetter = (string) => {
  if (typeof string !== 'string') return '';
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const renderStatBar = (statName, statValue, maxValue = 255) => {
  const formattedStatName = formatStatName(statName);
  const percentage = (statValue / maxValue) * 100;
  let color;

  if (statValue <= 29) {
    color = '#EC4541'; // red
  } else if (statValue <= 59) {
    color = '#ED7F0F'; // orange
  } else if (statValue <= 89) {
    color = '#F6DE53'; // yellow
  } else if (statValue <= 119) {
    color = '#A0E516'; // light green
  } else if (statValue <= 149) {
    color = '#24CD5E'; // dark green
  } else {
    color = '#56B0F2'; // blue
  }

  return (
    <View style={styles.statContainer} key={statName}>
      <Text style={styles.statName}>{formattedStatName}</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progress, { width: `${percentage}%`, backgroundColor: color }]} />
      </View>
      <Text style={styles.statValue}>{statValue}</Text>
    </View>
  );
};

const Stats = ({ pokemon, style }) => {
  const pokemonStats = pokemonData.find(p => p.id === pokemon.id)?.stats || [];

  return (
    <View style={[styles.tabContent, style]}>

      {pokemonStats.length > 0 ? (
        pokemonStats.map((stat) => renderStatBar(stat.name, stat.value))
      ) : (
        <Text>No stats available</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tabContent: {
    backgroundColor: '#e5343d', // Default background color
    // borderWidth: 1,
    // borderColor: '#a0a8b8',
    // borderBottomLeftRadius: 4,
    // borderBottomRightRadius: 4,
    padding: 12,
    position: 'relative',
  },

  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  statName: {
    width: 100,
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
  },
  progressBar: {
    flex: 1,
    height: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
    overflow: 'hidden',
    marginHorizontal: 10,
  },
  progress: {
    height: '100%',
    borderRadius: 5,
  },
  statValue: {
    width: 40,
    fontSize: 16,
    color: 'white',
    opacity: 0.8,
    textAlign: 'right',
  },
});

export default Stats;