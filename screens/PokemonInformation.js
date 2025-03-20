// import React, { useState, useEffect, useRef } from 'react';
// import { Animated, View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Image } from 'expo-image';
// import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons for the arrow icon
// import pokemonData from '../assets/pokemonData.json';
// import PokemonInformationBattle from '../components/PokemonInformation/PokemonInformationBattle';
// import PokemonInformationAbout from '../components/PokemonInformation/PokemonInformationAbout';
// import { LinearGradient } from 'expo-linear-gradient';
// import typeColors from '../utils/typeColors'; // Import typeColors

// const capitalizeFirstLetter = (string) => {
//   return string.charAt(0).toUpperCase() + string.slice(1);
// };

// const getTypeColor = (type) => {
//   const colors = {
//     fire: ['#F08030', '#F7B780'], water: ['#6890F0', '#90CAF9'], grass: ['#78C850', '#A5D6A7'], electric: ['#F8D030', '#FFF59D'],
//     ice: ['#98D8D8', '#B2EBF2'], fighting: ['#C03028', '#E57373'], poison: ['#A040A0', '#CE93D8'], ground: ['#E0C068', '#D7CCC8'],
//     flying: ['#A890F0', '#BBDEFB'], psychic: ['#F85888', '#F06292'], bug: ['#A8B820', '#AED581'], rock: ['#B8A038', '#D4C152'],
//     ghost: ['#705898', '#9575CD'], dragon: ['#7038F8', '#81D4FA'], dark: ['#705848', '#A1887F'], steel: ['#B8B8D0', '#CFD8DC'],
//     fairy: ['#EE99AC', '#F8BBD0'], normal: ['#A8A878', '#CFCFCF']
//   };
//   return colors[type] || ['#A8A878', '#CFCFCF'];
// };

// const PokemonInformation = ({ route, navigation }) => {
//   const { pokemonId } = route.params;
//   const [pokemonDataState, setPokemonDataState] = useState(null);
//   const [error, setError] = useState(null);
//   const [section, setSection] = useState('about');
//   const [selectedForm, setSelectedForm] = useState('default');
//   const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
//   const [formOptions, setFormOptions] = useState([]); // State for form options
//   const [hasMultipleForms, setHasMultipleForms] = useState(false); // State to check if Pokémon has multiple forms
//   const underlinePosition = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     fetchPokemonData(pokemonId, selectedForm);
//   }, [pokemonId, selectedForm]);

//   const fetchPokemonData = async (id, form) => {
//     try {
//       if (!pokemonData) {
//         throw new Error('Pokemon data is not loaded');
//       }
//       const data = pokemonData.find(pokemon => pokemon.id === id);
//       if (!data) throw new Error('Pokemon not found');
  
//       setPokemonDataState(data);
  
//       // Check for forms and set the forms state
//       const baseId = data.base_id || data.id;
//       const formItems = pokemonData
//         .filter(pokemon => pokemon.base_id === baseId || pokemon.id === baseId)
//         .map(pokemon => ({
//           label: capitalizeFirstLetter(pokemon.form || pokemon.name),
//           value: pokemon.form || 'default',
//         }));
  
//       setFormOptions(formItems);
//       setHasMultipleForms(formItems.length > 1);
//       setSelectedForm(formItems[0]?.value || 'default');
//     } catch (error) {
//       console.error('Error fetching Pokemon data:', error);
//       setError(error.message); // Set error message
//     }
//   };

//   const handleTabPress = (newSection) => {
//     setSection(newSection);
//     Animated.timing(underlinePosition, {
//       toValue: newSection === 'about' ? 0 : 1,
//       duration: 300,
//       useNativeDriver: false,
//     }).start();
//   };

//   const handleFormChange = (form) => {
//     setSelectedForm(form);
//     setModalVisible(false);
//   };

//   if (error) {
//     return <Text>Error: {error}</Text>; // Display error message
//   }

//   if (!pokemonDataState) {
//     return <Text>Loading...</Text>;
//   }

//   const gradientColors = pokemonDataState.types.length > 0
//     ? getTypeColor(pokemonDataState.types[0])
//     : ['#A8A878', '#CFCFCF'];

//   const types = pokemonDataState.types && pokemonDataState.types.length > 0 ? (
//     pokemonDataState.types.map((type) => {
//       const typeName = type;
//       const color = typeColors[typeName];
//       return (
//         <View key={typeName} style={[styles.typeContainer, { backgroundColor: color }]}>
//           <Text style={styles.typeText}>
//             {typeName.charAt(0).toUpperCase() + typeName.slice(1)}
//           </Text>
//         </View>
//       );
//     })
//   ) : (
//     <Text>No types available</Text>
//   );

//   const underlineLeft = underlinePosition.interpolate({
//     inputRange: [0, 1],
//     outputRange: ['10%', '60%'],
//   });

//   return (
//     <LinearGradient
//       colors={gradientColors}
//       style={styles.gradient}
//     >
//       <SafeAreaView style={styles.safeArea}>
//         <View style={styles.headerContainer}>
//           <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
//             <Text style={styles.backButtonText}>&#x2190; Back</Text>
//           </TouchableOpacity>
//           <Text style={styles.headerTitle}>{capitalizeFirstLetter(pokemonDataState.name)}</Text>
//           {hasMultipleForms && (
//             <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.formButton}>
//               <Ionicons name="chevron-down-outline" size={24} color="white" />
//             </TouchableOpacity>
//           )}
//         </View>

//         <FlatList
//           data={[{ key: 'content' }]}
//           renderItem={() => (
//             <View style={styles.contentContainer}>
//               <Text style={styles.number}>#{pokemonDataState.id}</Text>
//               <Image style={styles.image} source={{ uri: pokemonDataState.sprite }} />

//               <View style={styles.typesContainer}>{types}</View>

//               <View style={styles.tabs}>
//                 <TouchableOpacity
//                   onPress={() => handleTabPress('about')}
//                   style={[styles.tab, section === 'about' && styles.activeTab]}>
//                   <Text style={styles.tabText}>About</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() => handleTabPress('battle')}
//                   style={[styles.tab, section === 'battle' && styles.activeTab]}>
//                   <Text style={styles.tabText}>Battle</Text>
//                 </TouchableOpacity>
//                 <Animated.View style={[styles.activeUnderline, { left: underlineLeft }]} />
//               </View>

//               {section === 'about' ? (
//                 <PokemonInformationAbout pokemonData={pokemonDataState} />
//               ) : (
//                 <PokemonInformationBattle pokemonData={pokemonDataState} />
//               )}

//             </View>
//           )}
//           keyExtractor={(item) => item.key}
//           contentContainerStyle={styles.container}
//         />

//         <Modal
//           animationType="slide"
//           transparent={true}
//           visible={modalVisible}
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <View style={styles.modalContainer}>
//             <View style={styles.modalContent}>
//               {formOptions.map((option) => (
//                 <TouchableOpacity key={option.value} onPress={() => handleFormChange(option.value)} style={styles.modalOption}>
//                   <Text style={styles.modalOptionText}>{option.label}</Text>
//                 </TouchableOpacity>
//               ))}
//             </View>
//           </View>
//         </Modal>
//       </SafeAreaView>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   gradient: {
//     flex: 1,
//   },
//   safeArea: {
//     flex: 1,
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center', // Center the content horizontally
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     backgroundColor: 'transparent',
//   },
//   backButton: {
//     position: 'absolute', // Position the back button absolutely
//     left: 16, // Align it to the left
//     padding: 10,
//   },
//   backButtonText: {
//     fontSize: 18,
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   headerTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   formButton: {
//     position: 'absolute', // Position the form button absolutely
//     right: 16, // Align it to the right
//     padding: 10,
//   },
//   contentContainer: {
//     alignItems: 'center',
//     padding: 20,
//   },
//   number: {
//     fontSize: 24, // Increased font size
//     fontWeight: 'bold',
//     color: 'rgba(255, 255, 255, 0.9)', // Brighter color
//     textShadowColor: 'rgba(0, 0, 0, 0.5)', // Stronger shadow
//     textShadowOffset: { width: 2, height: 2 },
//     textShadowRadius: 5,
//     marginBottom: 0,
//     marginTop: -20, // Increased margin
//   },
//   image: {
//     width: 250, // increased size
//     height: 250,
//     marginBottom: 5, // Further reduced margin
//     borderRadius: 10,
//     //removed border
//   },
//   typesContainer: {
//     flexDirection: 'row',
//     marginTop: 5, // Adjusted margin
//     marginBottom: 10, // Adjusted margin
//   },
//   typeContainer: {
//     borderRadius: 12,
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     marginHorizontal: 4,
//   },
//   typeText: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: '#fff',
//   },
//   tabs: {
//     flexDirection: 'row',
//     justifyContent: 'space-evenly',  // Distribute tabs evenly across the screen
//     borderRadius: 20,
//     marginVertical: 12,
//     padding: 4,
//   },
//   tab: {
//     flex: 1, // Make tabs take equal space
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 20,
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   activeTab: {
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 3,  // For Android shadow
//   },
//   tabText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   activeUnderline: {
//     position: 'absolute',
//     bottom: 0,
//     height: 3,
//     backgroundColor: 'white',
//     borderRadius: 2,
//     width: '30%',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     width: '80%',
//     backgroundColor: 'white',
//     borderRadius: 10,
//     padding: 20,
//     alignItems: 'center',
//   },
//   modalOption: {
//     paddingVertical: 10,
//     width: '100%',
//     alignItems: 'center',
//   },
//   modalOptionText: {
//     fontSize: 18,
//     color: 'black',
//   },
// });

// export default PokemonInformation;



import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, Text, StyleSheet, TouchableOpacity, FlatList, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons for the arrow icon
import pokemonData from '../assets/pokemonData.json';
import PokemonInformationBattle from '../components/PokemonInformation/PokemonInformationBattle';
import PokemonInformationAbout from '../components/PokemonInformation/PokemonInformationAbout';
import { LinearGradient } from 'expo-linear-gradient';
import typeColors from '../utils/typeColors'; // Import typeColors

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const getTypeColor = (type) => {
  const colors = {
    fire: ['#F08030', '#F7B780'], water: ['#6890F0', '#90CAF9'], grass: ['#78C850', '#A5D6A7'], electric: ['#F8D030', '#FFF59D'],
    ice: ['#98D8D8', '#B2EBF2'], fighting: ['#C03028', '#E57373'], poison: ['#A040A0', '#CE93D8'], ground: ['#E0C068', '#D7CCC8'],
    flying: ['#A890F0', '#BBDEFB'], psychic: ['#F85888', '#F06292'], bug: ['#A8B820', '#AED581'], rock: ['#B8A038', '#D4C152'],
    ghost: ['#705898', '#9575CD'], dragon: ['#7038F8', '#81D4FA'], dark: ['#705848', '#A1887F'], steel: ['#B8B8D0', '#CFD8DC'],
    fairy: ['#EE99AC', '#F8BBD0'], normal: ['#A8A878', '#CFCFCF']
  };
  return colors[type] || ['#A8A878', '#CFCFCF'];
};

const PokemonInformation = ({ route, navigation }) => {
  const { pokemonId } = route.params;
  const [pokemonDataState, setPokemonDataState] = useState(null);
  const [error, setError] = useState(null);
  const [section, setSection] = useState('about');
  const [selectedForm, setSelectedForm] = useState('default');
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [formOptions, setFormOptions] = useState([]); // State for form options
  const [hasMultipleForms, setHasMultipleForms] = useState(false); // State to check if Pokémon has multiple forms
  const underlinePosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    fetchPokemonData(pokemonId, selectedForm);
  }, [pokemonId, selectedForm]);

  const fetchPokemonData = async (id, form) => {
    try {
      if (!pokemonData) {
        throw new Error('Pokemon data is not loaded');
      }
      const data = pokemonData.find(pokemon => pokemon.id === id && (pokemon.form === form || !pokemon.form));
      if (!data) throw new Error('Pokemon not found');
  
      setPokemonDataState(data);
  
      // Check for forms and set the forms state
      const baseId = data.base_id || data.id;
      const formItems = pokemonData
        .filter(pokemon => pokemon.base_id === baseId || pokemon.id === baseId)
        .map(pokemon => ({
          label: capitalizeFirstLetter(pokemon.form || pokemon.name),
          value: pokemon.form || 'default',
        }));
  
      setFormOptions(formItems);
      setHasMultipleForms(formItems.length > 1);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
      setError(error.message); // Set error message
    }
  };

  const handleTabPress = (newSection) => {
    setSection(newSection);
    Animated.timing(underlinePosition, {
      toValue: newSection === 'about' ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleFormChange = (form) => {
    setSelectedForm(form);
    setModalVisible(false);
    fetchPokemonData(pokemonId, form); // Fetch data for the selected form
  };

  if (error) {
    return <Text>Error: {error}</Text>; // Display error message
  }

  if (!pokemonDataState) {
    return <Text>Loading...</Text>;
  }

  const gradientColors = pokemonDataState.types.length > 0
    ? getTypeColor(pokemonDataState.types[0])
    : ['#A8A878', '#CFCFCF'];

  const types = pokemonDataState.types && pokemonDataState.types.length > 0 ? (
    pokemonDataState.types.map((type) => {
      const typeName = type;
      const color = typeColors[typeName];
      return (
        <View key={typeName} style={[styles.typeContainer, { backgroundColor: color }]}>
          <Text style={styles.typeText}>
            {typeName.charAt(0).toUpperCase() + typeName.slice(1)}
          </Text>
        </View>
      );
    })
  ) : (
    <Text>No types available</Text>
  );

  const underlineLeft = underlinePosition.interpolate({
    inputRange: [0, 1],
    outputRange: ['10%', '60%'],
  });

  return (
    <LinearGradient
      colors={gradientColors}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Text style={styles.backButtonText}>&#x2190; Back</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{capitalizeFirstLetter(pokemonDataState.name)}</Text>
          {hasMultipleForms && (
            <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.formButton}>
              <Ionicons name="chevron-down-outline" size={24} color="white" />
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={[{ key: 'content' }]}
          renderItem={() => (
            <View style={styles.contentContainer}>
              <Text style={styles.number}>#{pokemonDataState.id}</Text>
              <Image style={styles.image} source={{ uri: pokemonDataState.sprite }} />

              <View style={styles.typesContainer}>{types}</View>

              <View style={styles.tabs}>
                <TouchableOpacity
                  onPress={() => handleTabPress('about')}
                  style={[styles.tab, section === 'about' && styles.activeTab]}>
                  <Text style={styles.tabText}>About</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handleTabPress('battle')}
                  style={[styles.tab, section === 'battle' && styles.activeTab]}>
                  <Text style={styles.tabText}>Battle</Text>
                </TouchableOpacity>
                <Animated.View style={[styles.activeUnderline, { left: underlineLeft }]} />
              </View>

              {section === 'about' ? (
                <PokemonInformationAbout pokemonData={pokemonDataState} />
              ) : (
                <PokemonInformationBattle pokemonData={pokemonDataState} />
              )}

            </View>
          )}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.container}
        />

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {formOptions.map((option) => (
                <TouchableOpacity key={option.value} onPress={() => handleFormChange(option.value)} style={styles.modalOption}>
                  <Text style={styles.modalOptionText}>{option.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center the content horizontally
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'transparent',
  },
  backButton: {
    position: 'absolute', // Position the back button absolutely
    left: 16, // Align it to the left
    padding: 10,
  },
  backButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  formButton: {
    position: 'absolute', // Position the form button absolutely
    right: 16, // Align it to the right
    padding: 10,
  },
  contentContainer: {
    alignItems: 'center',
    padding: 20,
  },
  number: {
    fontSize: 24, // Increased font size
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.9)', // Brighter color
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Stronger shadow
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginBottom: 0,
    marginTop: -20, // Increased margin
  },
  image: {
    width: 250, // increased size
    height: 250,
    marginBottom: 5, // Further reduced margin
    borderRadius: 10,
    //removed border
  },
  typesContainer: {
    flexDirection: 'row',
    marginTop: 5, // Adjusted margin
    marginBottom: 10, // Adjusted margin
  },
  typeContainer: {
    borderRadius: 12,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginHorizontal: 4,
  },
  typeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',  // Distribute tabs evenly across the screen
    borderRadius: 20,
    marginVertical: 12,
    padding: 4,
  },
  tab: {
    flex: 1, // Make tabs take equal space
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  activeTab: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,  // For Android shadow
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  activeUnderline: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    backgroundColor: 'white',
    borderRadius: 2,
    width: '30%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalOption: {
    paddingVertical: 10,
    width: '100%',
    alignItems: 'center',
  },
  modalOptionText: {
    fontSize: 18,
    color: 'black',
  },
});

export default PokemonInformation;