import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import DropDownPicker from 'react-native-dropdown-picker';
import { LinearGradient } from 'expo-linear-gradient';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import pokemonData from '../assets/pokemonData.json';
import PokemonInformationBattle from '../components/PokemonInformationBattle';
import PokemonInformationAbout from '../components/PokemonInformationAbout';
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
  const [selectedForm, setSelectedForm] = useState('default');
  const [open, setOpen] = useState(false);
  const [forms, setForms] = useState([]);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'about', title: 'About' },
    { key: 'battle', title: 'Battle' },
  ]);

  useEffect(() => {
    fetchPokemonData(pokemonId, selectedForm);
  }, [pokemonId, selectedForm]);

  const fetchPokemonData = async (id, form) => {
    try {
      if (!pokemonData) {
        throw new Error('Pokemon data is not loaded');
      }
      const data = pokemonData.find(pokemon => pokemon.id === id);
      if (!data) throw new Error('Pokemon not found');
      setPokemonDataState(data);
    } catch (error) {
      console.error('Error fetching Pokemon data:', error);
      setError(error.message); // Set error message
    }
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

  const renderScene = SceneMap({
    about: () => <PokemonInformationAbout pokemonData={pokemonDataState} />,
    battle: () => <PokemonInformationBattle pokemonData={pokemonDataState} />,
  });

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={styles.indicator}
      style={styles.tabBar}
      labelStyle={styles.tabLabel}
    />
  );

  return (
    <LinearGradient
      colors={gradientColors}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.safeArea}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Text style={styles.backButtonText}>&#x2190; Back</Text>
        </TouchableOpacity>
        
        <FlatList
          data={[{ key: 'content' }]}
          renderItem={() => (
            <View style={styles.contentContainer}>
              <Text style={styles.name}>{capitalizeFirstLetter(pokemonDataState.name)}</Text>
              <Text style={styles.number}>#{pokemonDataState.id}</Text>
              <Image style={styles.image} source={{ uri: pokemonDataState.sprite }} />
              
              <View style={styles.typesContainer}>{types}</View>

              {forms.length > 1 && (
                <View style={styles.dropdownWrapper}>
                  <DropDownPicker
                    open={open}
                    value={selectedForm}
                    items={forms}
                    setOpen={setOpen}
                    setValue={setSelectedForm}
                    setItems={setForms}
                    style={styles.dropdown}
                    dropDownContainerStyle={styles.dropdownContainer}
                    textStyle={styles.dropdownText}
                    placeholderStyle={styles.dropdownPlaceholder}
                    containerStyle={styles.dropdownContainerStyle}
                    listMode="SCROLLVIEW" // Improve readability on open
                  />
                </View>
              )}

              <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: Dimensions.get('window').width }}
                renderTabBar={renderTabBar}
                style={styles.tabView}
              />
            </View>
          )}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.container}
        />
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
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  contentContainer: {
    alignItems: 'center',
    padding: 20,
  },
  name: {
    fontSize: 36, // Increased font size
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.3)', // Refined shadow
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    marginBottom: 5,
  },
  number: {
    fontSize: 24, // Increased font size
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.9)', // Brighter color
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Stronger shadow
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    marginBottom: 10,
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
  dropdownWrapper: {
    width: '80%', // Adjust width as needed
    marginBottom: 20,
    zIndex: 10, // Ensure it's above other elements
  },
  dropdown: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 0,
    borderRadius: 10,
  },
  dropdownContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 0,
    borderRadius: 10,
  },
  dropdownText: {
    fontSize: 16,
    color: 'black', // Improved readability
  },
  dropdownPlaceholder: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  dropdownContainerStyle: {
    borderRadius: 10,
  },
  tabBar: {
    backgroundColor: 'transparent',
  },
  tabLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  indicator: {
    backgroundColor: 'white',
    height: 4,
  },
  tabView: {
    width: '100%',
  },
});

export default PokemonInformation;






// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Image } from 'expo-image';
// import DropDownPicker from 'react-native-dropdown-picker';
// import pokemonData from '../assets/pokemonData.json';
// import PokemonInformationBattle from '../components/PokemonInformationBattle';
// import PokemonInformationAbout from '../components/PokemonInformationAbout';
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
//   const [open, setOpen] = useState(false);
//   const [forms, setForms] = useState([]);

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
//     } catch (error) {
//       console.error('Error fetching Pokemon data:', error);
//       setError(error.message); // Set error message
//     }
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

//   return (
//     <LinearGradient
//       colors={gradientColors}
//       style={styles.gradient}
//     >
//       <SafeAreaView style={styles.safeArea}>
//         <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//           <Text style={styles.backButtonText}>&#x2190; Back</Text>
//         </TouchableOpacity>
        
//         <FlatList
//           data={[{ key: 'content' }]}
//           renderItem={() => (
//             <View style={styles.contentContainer}>
//               <Text style={styles.name}>{capitalizeFirstLetter(pokemonDataState.name)}</Text>
//               <Text style={styles.number}>#{pokemonDataState.id}</Text>
//               <Image style={styles.image} source={{ uri: pokemonDataState.sprite }} />
              
//               <View style={styles.typesContainer}>{types}</View>

//               {forms.length > 1 && (
//                 <View style={styles.dropdownWrapper}>
//                   <DropDownPicker
//                     open={open}
//                     value={selectedForm}
//                     items={forms}
//                     setOpen={setOpen}
//                     setValue={setSelectedForm}
//                     setItems={setForms}
//                     style={styles.dropdown}
//                     dropDownContainerStyle={styles.dropdownContainer}
//                     textStyle={styles.dropdownText}
//                     placeholderStyle={styles.dropdownPlaceholder}
//                     containerStyle={styles.dropdownContainerStyle}
//                     listMode="SCROLLVIEW" // Improve readability on open
//                   />
//                 </View>
//               )}

//               <View style={styles.tabs}>
//                 <TouchableOpacity onPress={() => setSection('about')} style={[styles.tab, section === 'about' && styles.activeTab]}>
//                   <Text style={styles.tabText}>About</Text>
//                   {section === 'about' && <View style={styles.activeUnderline} />}
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => setSection('battle')} style={[styles.tab, section === 'battle' && styles.activeTab]}>
//                   <Text style={styles.tabText}>Battle</Text>
//                   {section === 'battle' && <View style={styles.activeUnderline} />}
//                 </TouchableOpacity>
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
//   backButton: {
//     position: 'absolute',
//     top: 50,
//     left: 20,
//     zIndex: 1,
//   },
//   backButtonText: {
//     fontSize: 18,
//     color: 'white',
//     fontWeight: 'bold',
//   },
//   contentContainer: {
//     alignItems: 'center',
//     padding: 20,
//   },
//   name: {
//     fontSize: 36, // Increased font size
//     fontWeight: 'bold',
//     color: 'white',
//     textShadowColor: 'rgba(0, 0, 0, 0.3)', // Refined shadow
//     textShadowOffset: { width: 1, height: 1 },
//     textShadowRadius: 5,
//     marginBottom: 5,
//   },
//   number: {
//     fontSize: 24, // Increased font size
//     fontWeight: 'bold',
//     color: 'rgba(255, 255, 255, 0.9)', // Brighter color
//     textShadowColor: 'rgba(0, 0, 0, 0.5)', // Stronger shadow
//     textShadowOffset: { width: 2, height: 2 },
//     textShadowRadius: 5,
//     marginBottom: 10,
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
//     justifyContent: 'center',
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     borderRadius: 20, // More pronounced border radius
//     marginVertical: 12,
//     padding: 4,
//   },
//   tab: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 20, // Match the tabs container
//     position: 'relative', // For underline positioning
//   },
//   activeTab: {
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 3,
//     elevation: 3, // For Android shadow
//   },
//   tabText: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: 'white',
//   },
//   activeUnderline: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: 3,
//     backgroundColor: 'white',
//     borderRadius: 2,
//   },
//   dropdownWrapper: {
//     width: '80%', // Adjust width as needed
//     marginBottom: 20,
//     zIndex: 10, // Ensure it's above other elements
//   },
//   dropdown: {
//     backgroundColor: 'rgba(255, 255, 255, 0.2)',
//     borderWidth: 0,
//     borderRadius: 10,
//   },
//   dropdownContainer: {
//     backgroundColor: 'rgba(255, 255, 255, 0.8)',
//     borderWidth: 0,
//     borderRadius: 10,
//   },
//   dropdownText: {
//     fontSize: 16,
//     color: 'black', // Improved readability
//   },
//   dropdownPlaceholder: {
//     color: 'rgba(255, 255, 255, 0.7)',
//   },
//   dropdownContainerStyle: {
//     borderRadius: 10,
//   },
// });

// export default PokemonInformation;