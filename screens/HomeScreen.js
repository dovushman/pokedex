import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, Animated, SafeAreaView, TextInput, TouchableOpacity, Text, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Pokedex from '../components/Pokedex';
import PokemonInformation from './PokemonInformation';
import Banner from '../components/Banner';
import Filter from '../components/Filters/Filter';
import Dropdown from '../components/Dropdown';
import SelectedTypes from '../components/Filters/Selected/SelectedTypes'; // Import SelectedTypes component
import FilterMenu from '../components/Filters/FilterMenu'; // Import FilterMenu component
import { Keyboard } from 'react-native';

const { width } = Dimensions.get('window');
const Stack = createStackNavigator();

const HomeScreenComponent = ({ route, navigation }) => {
  const { data: pokemonData } = route.params || {}; 
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false); 
  const [isFilterVisible, setIsFilterVisible] = useState(false); 
  const [selectedTypes, setSelectedTypes] = useState([]); // Initial state is an empty array
  const [filterGeneration, setFilterGeneration] = useState('');
  const [filterLegendary, setFilterLegendary] = useState(null); // null means no filter, true means legendary, false means non-legendary
  const [expandedFilter, setExpandedFilter] = useState(''); // Track which filter section is expanded
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false); // Track if the filter menu is open
  const [isAnimating, setIsAnimating] = useState(false); // Track if the animation is in progress
  const slideAnim = useRef(new Animated.Value(width)).current; // Initial position of the side panel
  const searchBarWidth = useRef(new Animated.Value(0)).current; // Initial width of the search bar
  const searchBarOpacity = useRef(new Animated.Value(0)).current; // Initial opacity of the search bar

  const flatListRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const previousScrollY = useRef(0); // Track previous scroll position

  const handleSetSearchQuery = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const handleSetSelectedTypes = useCallback((types) => {
    setSelectedTypes(types);
  }, []);

  const removeType = (type) => {
    setSelectedTypes((prevTypes) => prevTypes.filter((t) => t !== type));
  };

  const filteredData = useMemo(() => {
    let filtered = pokemonData;

    if (searchQuery !== '') {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedTypes.length > 0) {
      filtered = filtered.filter((pokemon) => {
        return pokemon.types && selectedTypes.some(type => pokemon.types.includes(type.toLowerCase()));
      });
    }

    return filtered;
  }, [searchQuery, selectedTypes, pokemonData]);

  const handleScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
    {
      useNativeDriver: false,
      listener: (event) => {
        const currentScrollY = event.nativeEvent.contentOffset.y;
        if (currentScrollY < previousScrollY.current) {
          // Scrolling up
          Animated.timing(scrollY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
          }).start();
        }
        previousScrollY.current = currentScrollY;
      },
    }
  );

  const toggleFilterMenu = () => {
    // Only animate if the filter menu is not already animating
    if (isAnimating) return;
  
    setIsAnimating(true);
  
    if (isFilterMenuOpen) {
      // Closing animation
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 500, // Duration of the sliding animation
        useNativeDriver: true,
      }).start(() => {
        setIsFilterMenuOpen(false);  // Close the menu after the animation
        setIsAnimating(false);  // Mark animation as complete
      });
    } else {
      // Opening animation
      setIsFilterMenuOpen(true);  // Open the menu before starting animation
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500, // Duration of the sliding animation
        useNativeDriver: true,
      }).start(() => {
        setIsAnimating(false);  // Mark animation as complete
      });
    }
  };

  const toggleFilterSection = (section) => {
    setExpandedFilter((prev) => (prev === section ? '' : section));
  };

  const clearFilters = () => {
    setSelectedTypes([]);
    setFilterGeneration('');
    setFilterLegendary(null);
  };

  const toggleSearchBar = () => {
    if (isSearchVisible) {
      // Animate to close the search bar
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
      });
    } else {
      // Animate to open the search bar
      setIsSearchVisible(true);
      Animated.parallel([
        Animated.timing(searchBarWidth, {
          // toValue: width - 170, // Adjust the value as needed
          toValue: width - 65,
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
            <Icon name="search" size={25} color="#fff" style={styles.searchIcon} />
          </TouchableOpacity>
          <Animated.View style={[styles.searchContainer, { width: searchBarWidth, opacity: searchBarOpacity }]}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Pokémon"
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={handleSetSearchQuery}
            />
            <TouchableOpacity onPress={toggleSearchBar}>
              <Icon name="times" size={20} color="#333" style={styles.closeIcon} />
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity onPress={toggleFilterMenu}>
            <Icon name="filter" size={25} color="#fff" style={{ marginLeft: 15 }} />
          </TouchableOpacity>
        </View>
      </View>
      <SelectedTypes selectedTypes={selectedTypes} removeType={removeType} />
      <Animated.FlatList
        ref={flatListRef}
        contentContainerStyle={styles.contentContainer}
        data={filteredData} // Use filtered data
        keyExtractor={(item) => item.id.toString()} // Ensure keyExtractor uses a unique key
        renderItem={({ item }) => <Pokedex pokemon={item} />}
        onScroll={handleScroll}
        onScrollBeginDrag={Keyboard.dismiss} // Dismiss the keyboard when scrolling begins
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
        clearFilters={clearFilters}
      />
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
        options={{ headerShown: false }} // Hide the default header
      />
      <Stack.Screen
        name="PokemonInformation"
        component={PokemonInformation}
        options={{ headerShown: false }} // Hide the header for PokemonInformation screen
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e53935',
  },
  container: {
    flex: 1,
    backgroundColor: '#e53935',
  },
  contentContainer: {
    padding: 16,
    backgroundColor: '#e53935',
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e53935',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 }, // Ensure shadow is only at the bottom
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 15,
    marginBottom: -8, // Negative margin to make the shadow overhang
    paddingHorizontal: 16,
    zIndex: 1, // Ensure the search bar is above other elements
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
    right: 35, // Adjust to align with the search icon
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
  headerButtons: {
    flexDirection: 'row',
  },
  header: {
    backgroundColor: '#e53935',
    borderBottomWidth: 0,
    borderBottomColor: 'transparent',
    elevation: 0,
    shadowOpacity: 0,
  },
  classicHeader: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  iconContainer: {
    flexDirection: 'row',
  },
  filterWrapper: {
    backgroundColor: '#f1f1f1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    height: '75%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    alignSelf: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  searchBar: {
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    marginBottom: 16,
    color: 'white',
    fontSize: 16,
  },
});

export default HomeScreen;