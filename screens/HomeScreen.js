// import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
// import {
//   View,
//   StyleSheet,
//   Animated,
//   Dimensions,
//   SafeAreaView,
//   Keyboard,
//   FlatList,
//   TouchableOpacity,
//   Text,
//   TextInput,
// } from 'react-native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import Ionicons from 'react-native-vector-icons/Ionicons';
// import Pokedex from '../components/Pokedex';
// import PokemonInformation from './PokemonInformation';
// import SelectedTypes from '../components/Filters/Selected/SelectedTypes';
// import SelectedGenerations from '../components/Filters/Selected/SelectedGenerations';
// import FilterMenu from '../components/Filters/FilterMenu';
// import FABMenu from '../components/FABMenu';
// import SearchBar from '../components/SearchBar';
// import NaturesList from '../components/NaturesList';
// import ItemScreen from './ItemScreen';
// import MovesScreen from './MovesScreen';

// const { width } = Dimensions.get('window');
// const Stack = createStackNavigator();

// const HomeScreenComponent = ({ route, navigation }) => {
//   const { data: initialPokemonData } = route.params || {};
//   const [pokemonData, setPokemonData] = useState(initialPokemonData || []);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [isSearchVisible, setIsSearchVisible] = useState(false);
//   const [selectedTypes, setSelectedTypes] = useState(new Set());
//   const [selectedGeneration, setSelectedGeneration] = useState('');
//   const [filterLegendary, setFilterLegendary] = useState(null);
//   const [expandedFilter, setExpandedFilter] = useState('');
//   const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
//   const [isAnimating, setIsAnimating] = useState(false);
//   const [useShinySprites, setUseShinySprites] = useState(false);

//   const slideAnim = useRef(new Animated.Value(width)).current;
//   const searchBarWidth = useRef(new Animated.Value(0)).current;
//   const searchBarOpacity = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     // console.log('Initial Pokemon Data:', initialPokemonData);
//     setPokemonData(initialPokemonData || []);
//   }, [initialPokemonData]);

//   useEffect(() => {
//     // console.log('Pokemon Data:', pokemonData);
//   }, [pokemonData]);

//   const toggleShinySprites = () => {
//     setUseShinySprites((prev) => !prev);
//   };

//   const removeType = useCallback((type) => {
//     setSelectedTypes((prevSelectedTypes) => {
//       const newSet = new Set(prevSelectedTypes);
//       newSet.delete(type);
//       return newSet;
//     });
//   }, []);

//   const removeGeneration = useCallback(() => {
//     setSelectedGeneration('');
//   }, []);

//   const filteredData = useMemo(() => {
//     if (!pokemonData) return [];
  
//     const lowercaseSearchQuery = searchQuery.toLowerCase();
//     const selectedTypesSet = new Set(selectedTypes);
  
//     // console.log('Filtering data with the following parameters:');
//     // console.log('Selected Generation:', selectedGeneration);
//     // console.log('Selected Types:', selectedTypes);
//     // console.log('Search Query:', searchQuery);
  
//     const filtered = pokemonData
//       .filter((pokemon) => {
//         // console.log('Pokemon Object:', JSON.stringify(pokemon, null, 2)); // Log the entire Pokémon object
  
//         // Check if the Pokémon's generation matches the selected generation
//         if (selectedGeneration && pokemon.generation !== selectedGeneration) {
//           return false;
//         }
  
//         // Check if the Pokémon's types match the selected types
//         if (selectedTypesSet.size > 0) {
//           const pokemonTypeSet = new Set(pokemon.types.map((t) => t.toLowerCase()));
//           if (![...selectedTypesSet].some((type) => pokemonTypeSet.has(type))) {
//             return false;
//           }
//         }
  
//         // Check if the Pokémon's name matches the search query
//         if (lowercaseSearchQuery && !pokemon.name.toLowerCase().includes(lowercaseSearchQuery)) {
//           return false;
//         }
  
//         return true;
//       });
  
//     // console.log('Filtered Data:', filtered);
//     return filtered;
//   }, [selectedTypes, searchQuery, pokemonData, selectedGeneration]);
//   // console.log('Filtered Data Length:', filteredData.length);


//   const toggleFilterMenu = () => {
//     if (isAnimating) return;

//     setIsAnimating(true);
//     const toValue = isFilterMenuOpen ? width : 0;

//     Animated.timing(slideAnim, {
//       toValue,
//       duration: 500,
//       useNativeDriver: true,
//     }).start(() => {
//       setIsFilterMenuOpen(!isFilterMenuOpen);
//       setIsAnimating(false);
//     });
//   };

//   const toggleFilterSection = (section) => {
//     setExpandedFilter((prev) => (prev === section ? '' : section));
//   };

//   const toggleSearchBar = () => {
//     if (!isSearchVisible) {
//       setIsSearchVisible(true);
//       Animated.parallel([
//         Animated.timing(searchBarWidth, {
//           toValue: width - 100,
//           duration: 300,
//           useNativeDriver: false,
//         }),
//         Animated.timing(searchBarOpacity, {
//           toValue: 1,
//           duration: 300,
//           useNativeDriver: false,
//         }),
//       ]).start();
//     }
//   };

//   const handleClearSearch = () => {
//     if (searchQuery !== '') {
//       setSearchQuery('');
//     } else {
//       Animated.parallel([
//         Animated.timing(searchBarWidth, {
//           toValue: 0,
//           duration: 300,
//           useNativeDriver: false,
//         }),
//         Animated.timing(searchBarOpacity, {
//           toValue: 0,
//           duration: 300,
//           useNativeDriver: false,
//         }),
//       ]).start(() => {
//         setIsSearchVisible(false);
//         Keyboard.dismiss();
//       });
//     }
//   };

//   useEffect(() => {
//     // console.log('Selected Generation:', selectedGeneration);
//   }, [selectedGeneration]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.headerContainer}>
//         <Text style={styles.classicHeader}>Pokédex</Text>
//         <View style={styles.searchIconContainer}>
//           <TouchableOpacity onPress={toggleSearchBar}>
//             <Icon name="search" size={25} color="#fff" style={styles.searchIcon} />
//           </TouchableOpacity>
//           <Animated.View style={[styles.searchContainer, { width: searchBarWidth, opacity: searchBarOpacity }]}>
//             <TextInput
//               style={styles.searchInput}
//               placeholder="Search Pokémon"
//               placeholderTextColor="#999"
//               value={searchQuery}
//               onChangeText={setSearchQuery}
//             />
//             <TouchableOpacity onPress={handleClearSearch}>
//               <Icon name="times" size={20} color="#333" style={styles.closeIcon} />
//             </TouchableOpacity>
//           </Animated.View>
//           <TouchableOpacity onPress={toggleShinySprites}>
//             <Ionicons
//               name="sparkles"
//               size={25}
//               color={useShinySprites ? "#FFD700" : "#fff"}
//               style={{ marginLeft: 6, marginRight: 0 }}
//             />
//           </TouchableOpacity>
//           <TouchableOpacity onPress={toggleFilterMenu}>
//             <Icon name="filter" size={25} color="#fff" style={{ marginLeft: 15 }} />
//           </TouchableOpacity>
//         </View>
//       </View>
//       <SelectedTypes selectedTypes={selectedTypes} removeType={removeType} />
//       <SelectedGenerations selectedGeneration={selectedGeneration} removeGeneration={removeGeneration} />
//       <Animated.FlatList
//         contentContainerStyle={styles.contentContainer}
//         data={filteredData}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <Pokedex
//             pokemon={item}
//             useShinySprites={useShinySprites}
//             sprite={useShinySprites ? item.shinySprite : item.sprite}
//           />
//         )}
//         onScrollBeginDrag={Keyboard.dismiss}
//       />
//       <FilterMenu
//         isFilterMenuOpen={isFilterMenuOpen}
//         isAnimating={isAnimating}
//         slideAnim={slideAnim}
//         toggleFilterMenu={toggleFilterMenu}
//         expandedFilter={expandedFilter}
//         toggleFilterSection={toggleFilterSection}
//         selectedTypes={selectedTypes}
//         setSelectedTypes={setSelectedTypes}
//         filterGeneration={selectedGeneration}
//         setFilterGeneration={setSelectedGeneration}
//         filterLegendary={filterLegendary}
//         setFilterLegendary={setFilterLegendary}
//         clearFilters={() => { }}
//       />
//       <FABMenu navigation={navigation} />
//     </SafeAreaView>
//   );
// };

// const HomeScreen = ({ route }) => {
//   return (
//     <Stack.Navigator initialRouteName="Pokedex">
//       <Stack.Screen
//         name="Pokedex"
//         component={HomeScreenComponent}
//         initialParams={route.params}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Moves"
//         component={MovesScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="PokemonInformation"
//         component={PokemonInformation}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Natures"
//         component={NaturesList}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="Items"
//         component={ItemScreen} // Add ItemScreen to the navigation stack
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#e5343d',
//   },
//   contentContainer: {
//     padding: 16,
//     backgroundColor: '#e5343d',
//   },
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     marginBottom: 16,
//   },
//   classicHeader: {
//     color: 'white',
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   searchIconContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     position: 'absolute',
//     right: 70,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     color: '#333',
//   },
//   searchIcon: {
//     marginRight: 10,
//   },
//   closeIcon: {
//     marginLeft: 10,
//   },
// });

// export default HomeScreen;

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  SafeAreaView,
  Keyboard,
  FlatList,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Pokedex from '../components/Pokedex';
import PokemonInformation from './PokemonInformation';
import SelectedTypes from '../components/Filters/Selected/SelectedTypes';
import SelectedGenerations from '../components/Filters/Selected/SelectedGenerations';
import FilterMenu from '../components/Filters/FilterMenu';
import FABMenu from '../components/FABMenu';
import SearchBar from '../components/SearchBar';
import NaturesList from '../components/NaturesList';
import ItemScreen from './ItemScreen';
import MovesScreen from './MovesScreen';
import AbilitiesScreen from './AbilitiesScreen'; // Import AbilitiesScreen

const { width } = Dimensions.get('window');
const Stack = createStackNavigator();

const HomeScreenComponent = ({ route, navigation }) => {
  const { data: initialPokemonData } = route.params || {};
  const [pokemonData, setPokemonData] = useState(initialPokemonData || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState(new Set());
  const [selectedGeneration, setSelectedGeneration] = useState('');
  const [filterLegendary, setFilterLegendary] = useState(null);
  const [expandedFilter, setExpandedFilter] = useState('');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [useShinySprites, setUseShinySprites] = useState(false);

  const slideAnim = useRef(new Animated.Value(width)).current;
  const searchBarWidth = useRef(new Animated.Value(0)).current;
  const searchBarOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setPokemonData(initialPokemonData || []);
  }, [initialPokemonData]);

  const toggleShinySprites = () => {
    setUseShinySprites((prev) => !prev);
  };

  const removeType = useCallback((type) => {
    setSelectedTypes((prevSelectedTypes) => {
      const newSet = new Set(prevSelectedTypes);
      newSet.delete(type);
      return newSet;
    });
  }, []);

  const removeGeneration = useCallback(() => {
    setSelectedGeneration('');
  }, []);

  const filteredData = useMemo(() => {
    if (!pokemonData) return [];
  
    const lowercaseSearchQuery = searchQuery.toLowerCase();
    const selectedTypesSet = new Set(selectedTypes);
  
    const filtered = pokemonData
      .filter((pokemon) => {
        if (selectedGeneration && pokemon.generation !== selectedGeneration) {
          return false;
        }
  
        if (selectedTypesSet.size > 0) {
          const pokemonTypeSet = new Set(pokemon.types.map((t) => t.toLowerCase()));
          if (![...selectedTypesSet].some((type) => pokemonTypeSet.has(type))) {
            return false;
          }
        }
  
        if (lowercaseSearchQuery && !pokemon.name.toLowerCase().includes(lowercaseSearchQuery)) {
          return false;
        }
  
        return true;
      });
  
    return filtered;
  }, [selectedTypes, searchQuery, pokemonData, selectedGeneration]);

  const toggleFilterMenu = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    const toValue = isFilterMenuOpen ? width : 0;

    Animated.timing(slideAnim, {
      toValue,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setIsFilterMenuOpen(!isFilterMenuOpen);
      setIsAnimating(false);
    });
  };

  const toggleFilterSection = (section) => {
    setExpandedFilter((prev) => (prev === section ? '' : section));
  };

  const toggleSearchBar = () => {
    if (!isSearchVisible) {
      setIsSearchVisible(true);
      Animated.parallel([
        Animated.timing(searchBarWidth, {
          toValue: width - 100,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(searchBarOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  const handleClearSearch = () => {
    if (searchQuery !== '') {
      setSearchQuery('');
    } else {
      Animated.parallel([
        Animated.timing(searchBarWidth, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(searchBarOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start(() => {
        setIsSearchVisible(false);
        Keyboard.dismiss();
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.classicHeader}>Pokédex</Text>
        <View style={styles.searchIconContainer}>
          <TouchableOpacity onPress={toggleSearchBar}>
            <Icon name="search" size={25} color="#fff" style={styles.searchIcon} />
          </TouchableOpacity>
          <Animated.View style={[styles.searchContainer, { width: searchBarWidth, opacity: searchBarOpacity }]}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Pokémon"
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity onPress={handleClearSearch}>
              <Icon name="times" size={20} color="#333" style={styles.closeIcon} />
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity onPress={toggleShinySprites}>
            <Ionicons
              name="sparkles"
              size={25}
              color={useShinySprites ? "#FFD700" : "#fff"}
              style={{ marginLeft: 6, marginRight: 0 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFilterMenu}>
            <Icon name="filter" size={25} color="#fff" style={{ marginLeft: 15 }} />
          </TouchableOpacity>
        </View>
      </View>
      <SelectedTypes selectedTypes={selectedTypes} removeType={removeType} />
      <SelectedGenerations selectedGeneration={selectedGeneration} removeGeneration={removeGeneration} />
      <Animated.FlatList
        contentContainerStyle={styles.contentContainer}
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pokedex
            pokemon={item}
            useShinySprites={useShinySprites}
            sprite={useShinySprites ? item.shinySprite : item.sprite}
          />
        )}
        onScrollBeginDrag={Keyboard.dismiss}
      />
      <FilterMenu
        isFilterMenuOpen={isFilterMenuOpen}
        isAnimating={isAnimating}
        slideAnim={slideAnim}
        toggleFilterMenu={toggleFilterMenu}
        expandedFilter={expandedFilter}
        toggleFilterSection={toggleFilterSection}
        selectedTypes={selectedTypes}
        setSelectedTypes={setSelectedTypes}
        filterGeneration={selectedGeneration}
        setFilterGeneration={setSelectedGeneration}
        filterLegendary={filterLegendary}
        setFilterLegendary={setFilterLegendary}
        clearFilters={() => { }}
      />
      <FABMenu navigation={navigation} />
    </SafeAreaView>
  );
};

const HomeScreen = ({ route }) => {
  return (
    <Stack.Navigator initialRouteName="Pokedex">
      <Stack.Screen
        name="Pokedex"
        component={HomeScreenComponent}
        initialParams={route.params}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Moves"
        component={MovesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PokemonInformation"
        component={PokemonInformation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Natures"
        component={NaturesList}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Items"
        component={ItemScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Abilities"
        component={AbilitiesScreen} // Add AbilitiesScreen to the navigation stack
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5343d',
  },
  contentContainer: {
    padding: 16,
    backgroundColor: '#e5343d',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  classicHeader: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: 'absolute',
    right: 70,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  searchIcon: {
    marginRight: 10,
  },
  closeIcon: {
    marginLeft: 10,
  },
});

export default HomeScreen;