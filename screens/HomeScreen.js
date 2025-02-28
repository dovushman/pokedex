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
import FilterMenu from '../components/Filters/FilterMenu';
import FABMenu from '../components/FABMenu';
import SearchBar from '../components/SearchBar';

const { width } = Dimensions.get('window');
const Stack = createStackNavigator();

const MemoizedFlatList = React.memo(FlatList, (prevProps, nextProps) => {
  return prevProps.data === nextProps.data; // Only re-render if the data has changed
});

const HomeScreenComponent = ({ route, navigation }) => {
  const { data: initialPokemonData } = route.params || {};
  const [pokemonData, setPokemonData] = useState(initialPokemonData || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState(new Set());
  const [filterGeneration, setFilterGeneration] = useState('');
  const [filterLegendary, setFilterLegendary] = useState(null);
  const [expandedFilter, setExpandedFilter] = useState('');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false); // state for menu visibility
  const [isAnimating, setIsAnimating] = useState(false); // state for preventing multiple animations
  const [useShinySprites, setUseShinySprites] = useState(false);

  const slideAnim = useRef(new Animated.Value(width)).current;
  const searchBarWidth = useRef(new Animated.Value(0)).current;
  const searchBarOpacity = useRef(new Animated.Value(0)).current;

  const fabMenuItems = [
    { label: 'Pokédex', icon: 'book', route: 'Pokedex' },
    { label: 'Items', icon: 'cube', route: 'Items' },
    { label: 'Abilities', icon: 'flash', route: 'Abilities' },
    { label: 'Natures', icon: 'leaf', route: 'Natures' },
  ];

  const toggleShinySprites = () => {
    setUseShinySprites((prev) => !prev);
  };

  // Remove selected type from the Set (optimized)
  const removeType = useCallback((type) => {
    setSelectedTypes((prevSelectedTypes) => {
      const newSet = new Set(prevSelectedTypes);
      newSet.delete(type); // O(1) deletion
      return newSet;
    });
  }, []);

  const filteredData = useMemo(() => {
    if (!pokemonData) return [];

    const lowercaseSearchQuery = searchQuery.toLowerCase();
    const selectedTypesSet = new Set(selectedTypes);

    const filtered = pokemonData
      .filter((pokemon) => {
        if (selectedTypesSet.size === 0) return true;

        const pokemonTypeSet = new Set(JSON.parse(pokemon.types).map((t) => t.toLowerCase()));
        return [...selectedTypesSet].some((type) => pokemonTypeSet.has(type));
      })
      .filter((pokemon) =>
        lowercaseSearchQuery === '' || pokemon.name.toLowerCase().includes(lowercaseSearchQuery)
      );

    return filtered;
  }, [selectedTypes, searchQuery, pokemonData]);

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

  const handleCloseSearch = () => {
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
            <TouchableOpacity onPress={handleCloseSearch}>
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
        filterGeneration={filterGeneration}
        setFilterGeneration={setFilterGeneration}
        filterLegendary={filterLegendary}
        setFilterLegendary={setFilterLegendary}
        clearFilters={() => { }}
      />
      <FABMenu fabMenuItems={fabMenuItems} navigation={navigation} />
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
        name="PokemonInformation"
        component={PokemonInformation}
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


//Copilot styling - pair with pokedex
/*
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
import FilterMenu from '../components/Filters/FilterMenu';
import FABMenu from '../components/FABMenu';
import SearchBar from '../components/SearchBar';

const { width } = Dimensions.get('window');
const Stack = createStackNavigator();

const HomeScreenComponent = ({ route, navigation }) => {
  const { data: initialPokemonData } = route.params || {};
  const [pokemonData, setPokemonData] = useState(initialPokemonData || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState(new Set());
  const [filterGeneration, setFilterGeneration] = useState('');
  const [filterLegendary, setFilterLegendary] = useState(null);
  const [expandedFilter, setExpandedFilter] = useState('');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [useShinySprites, setUseShinySprites] = useState(false);

  const slideAnim = useRef(new Animated.Value(width)).current;
  const searchBarWidth = useRef(new Animated.Value(0)).current;
  const searchBarOpacity = useRef(new Animated.Value(0)).current;

  const fabMenuItems = [
    { label: 'Pokédex', icon: 'book', route: 'Pokedex' },
    { label: 'Items', icon: 'cube', route: 'Items' },
    { label: 'Abilities', icon: 'flash', route: 'Abilities' },
    { label: 'Natures', icon: 'leaf', route: 'Natures' },
  ];

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

  const filteredData = useMemo(() => {
    if (!pokemonData) return [];

    const lowercaseSearchQuery = searchQuery.toLowerCase();
    const selectedTypesSet = new Set(selectedTypes);

    const filtered = pokemonData
      .filter((pokemon) => {
        if (selectedTypesSet.size === 0) return true;

        const pokemonTypeSet = new Set(JSON.parse(pokemon.types).map((t) => t.toLowerCase()));
        return [...selectedTypesSet].some((type) => pokemonTypeSet.has(type));
      })
      .filter((pokemon) =>
        lowercaseSearchQuery === '' || pokemon.name.toLowerCase().includes(lowercaseSearchQuery)
      );

    return filtered;
  }, [selectedTypes, searchQuery, pokemonData]);

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

  const handleCloseSearch = () => {
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
            <TouchableOpacity onPress={handleCloseSearch}>
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
        filterGeneration={filterGeneration}
        setFilterGeneration={setFilterGeneration}
        filterLegendary={filterLegendary}
        setFilterLegendary={setFilterLegendary}
        clearFilters={() => { }}
      />
      <FABMenu fabMenuItems={fabMenuItems} navigation={navigation} />
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
        name="PokemonInformation"
        component={PokemonInformation}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Glassmorphism background
    backdropFilter: 'blur(10px)', // Glassmorphism effect
  },
  contentContainer: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  classicHeader: {
    color: '#333',
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: 'absolute',
    right: 70,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
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
*/

//ChatGPT styling - pair with pokedex

/*
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
import FilterMenu from '../components/Filters/FilterMenu';
import FABMenu from '../components/FABMenu';
import SearchBar from '../components/SearchBar';

const { width } = Dimensions.get('window');
const Stack = createStackNavigator();

const HomeScreenComponent = ({ route, navigation }) => {
  const { data: initialPokemonData } = route.params || {};
  const [pokemonData, setPokemonData] = useState(initialPokemonData || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState(new Set());
  const [useShinySprites, setUseShinySprites] = useState(false);

  const slideAnim = useRef(new Animated.Value(width)).current;
  const searchBarWidth = useRef(new Animated.Value(0)).current;
  const searchBarOpacity = useRef(new Animated.Value(0)).current;

  const fabMenuItems = [
    { label: 'Pokédex', icon: 'book', route: 'Pokedex' },
    { label: 'Items', icon: 'cube', route: 'Items' },
    { label: 'Abilities', icon: 'flash', route: 'Abilities' },
    { label: 'Natures', icon: 'leaf', route: 'Natures' },
  ];

  const filteredData = useMemo(() => {
    if (!pokemonData) return [];
    const lowercaseSearchQuery = searchQuery.toLowerCase();
    return pokemonData.filter(
      (pokemon) => pokemon.name.toLowerCase().includes(lowercaseSearchQuery)
    );
  }, [searchQuery, pokemonData]);

  const toggleSearchBar = () => {
    if (!isSearchVisible) {
      setIsSearchVisible(true);
      Animated.parallel([
        Animated.timing(searchBarWidth, {
          toValue: width - 80,
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.classicHeader}>Pokédex</Text>
        <View style={styles.searchIconContainer}>
          <TouchableOpacity onPress={toggleSearchBar}>
            <Icon name="search" size={22} color="#333" />
          </TouchableOpacity>
          <Animated.View
            style={[styles.searchContainer, { width: searchBarWidth, opacity: searchBarOpacity }]}
          >
            <TextInput
              style={styles.searchInput}
              placeholder="Search Pokémon"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="times" size={18} color="#666" />
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity onPress={() => setUseShinySprites((prev) => !prev)}>
            <Ionicons name="sparkles" size={22} color={useShinySprites ? "#FFD700" : "#333"} />
          </TouchableOpacity>
        </View>
      </View>
      <SelectedTypes selectedTypes={selectedTypes} />
      <FlatList
        contentContainerStyle={styles.contentContainer}
        data={filteredData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pokedex pokemon={item} useShinySprites={useShinySprites} />
        )}
        onScrollBeginDrag={Keyboard.dismiss}
      />
      <FABMenu fabMenuItems={fabMenuItems} navigation={navigation} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  contentContainer: {
    padding: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  classicHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  searchIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginLeft: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
});

export default HomeScreenComponent;
*/

