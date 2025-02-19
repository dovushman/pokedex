import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  SafeAreaView,
  TextInput,
  Keyboard,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createStackNavigator } from '@react-navigation/stack';
import Pokedex from '../components/Pokedex';
import PokemonInformation from './PokemonInformation';
import SelectedTypes from '../components/Filters/Selected/SelectedTypes';
import FilterMenu from '../components/Filters/FilterMenu';

const { width } = Dimensions.get('window');
const totalItems = 4;  // Number of items in the FAB menu
const Stack = createStackNavigator();

const HomeScreenComponent = ({ route, navigation }) => {
  const { data: pokemonData } = route.params || {};
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [filterGeneration, setFilterGeneration] = useState('');
  const [filterLegendary, setFilterLegendary] = useState(null);
  const [expandedFilter, setExpandedFilter] = useState('');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [useShinySprites, setUseShinySprites] = useState(false);
  const [isFabMenuOpen, setIsFabMenuOpen] = useState(false);

  const slideAnim = useRef(new Animated.Value(width)).current;
  const searchBarWidth = useRef(new Animated.Value(0)).current;
  const searchBarOpacity = useRef(new Animated.Value(0)).current;
  const stackAnim = useRef(new Animated.Value(0)).current;

  const fabMenuItems = [
    { label: 'Pokédex', icon: 'book', route: 'Pokedex' },
    { label: 'Items', icon: 'cube', route: 'Items' },
    { label: 'Abilities', icon: 'flash', route: 'Abilities' },
    { label: 'Natures', icon: 'leaf', route: 'Natures' },
  ];

  const openFabMenu = () => {
    setIsFabMenuOpen(true);
    Animated.timing(stackAnim, {
      toValue: totalItems - 1,
      duration: (totalItems - 1) * 600,
      useNativeDriver: true,
    }).start();
  };

  const closeFabMenu = () => {
    Animated.timing(stackAnim, {
      toValue: 0,
      duration: (totalItems - 1) * 600,
      useNativeDriver: true,
    }).start(() => {
      setIsFabMenuOpen(false);
    });
  };

  const toggleFabMenu = () => {
    if (isFabMenuOpen) {
      closeFabMenu();
    } else {
      openFabMenu();
    }
  };

  const handleSetSearchQuery = useCallback((query) => {
    setSearchQuery(query);
  }, []);

  const toggleShinySprites = () => {
    setUseShinySprites((prev) => !prev);
  };

  const filteredData = useMemo(() => {
    let filtered = pokemonData;
    if (searchQuery !== '') {
      filtered = filtered.filter((pokemon) =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(
        (pokemon) =>
          pokemon.types &&
          selectedTypes.some((type) => pokemon.types.includes(type.toLowerCase()))
      );
    }
    return filtered;
  }, [searchQuery, selectedTypes, pokemonData]);

  const toggleFilterMenu = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    if (isFilterMenuOpen) {
      Animated.timing(slideAnim, {
        toValue: width,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setIsFilterMenuOpen(false);
        setIsAnimating(false);
      });
    } else {
      setIsFilterMenuOpen(true);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setIsAnimating(false);
      });
    }
  };

  const toggleFilterSection = (section) => {
    setExpandedFilter((prev) => (prev === section ? '' : section));
  };

  const toggleSearchBar = () => {
    if (isSearchVisible) return;
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
              onChangeText={handleSetSearchQuery}
            />
            <TouchableOpacity onPress={handleCloseSearch}>
              <Icon name="times" size={20} color="#333" style={styles.closeIcon} />
            </TouchableOpacity>
          </Animated.View>
          <TouchableOpacity onPress={toggleShinySprites}>
            <Ionicons
              name="sparkles"
              size={25}
              color={useShinySprites ? '#FFD700' : '#fff'}
              style={{ marginLeft: 6, marginRight: 0 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleFilterMenu}>
            <Icon name="filter" size={25} color="#fff" style={{ marginLeft: 15 }} />
          </TouchableOpacity>
        </View>
      </View>

      <SelectedTypes selectedTypes={selectedTypes} removeType={() => {}} />

      <Animated.FlatList
        data={filteredData}
        contentContainerStyle={styles.contentContainer}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Pokedex pokemon={item} useShinySprites={useShinySprites} />}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: new Animated.Value(0) } } }],
          { useNativeDriver: false }
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
        clearFilters={() => {}}
      />

      <TouchableOpacity style={styles.fab} onPress={toggleFabMenu}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {isFabMenuOpen && (
        <TouchableWithoutFeedback onPress={closeFabMenu}>
          <View style={styles.overlay}>
            <View style={styles.fabMenu}>
            {fabMenuItems.map((item, index) => {
  const translateY = stackAnim.interpolate({
    inputRange: [0, totalItems - 1],
    outputRange: [0, -(index + 1) * 60], // Each item moves up more than the previous
    extrapolate: 'clamp',
  });

  const opacity = stackAnim.interpolate({
    inputRange: [0, index, totalItems - 1],
    outputRange: [0, 1, 1], // Items fade in as they rise
    extrapolate: 'clamp',
  });

  return (
    <Animated.View
      key={item.label}
      style={[
        styles.fabMenuItem,
        {
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <Text style={styles.fabMenuText}>{item.label}</Text>
      <View style={styles.fabMenuIcon}>
        <Ionicons name={item.icon} size={24} color="#fff" />
      </View>
    </Animated.View>
  );
})}

            </View>
          </View>
        </TouchableWithoutFeedback>
      )}
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
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
  },
  fabMenu: {
    position: 'absolute',
    bottom: 100,
    right: 37, // Adjust this value to move the menu to the left
    width: 180,
  },
  fabMenuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end', // Align items to the end to center icons with the main FAB
    paddingVertical: 8,
    width: '100%',
    position: 'absolute',
  },
  fabMenuText: {
    fontSize: 16,
    color: '#fff',
    marginRight: 15, // Adjust this value to ensure proper spacing between text and icon
  },
  fabMenuIcon: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
