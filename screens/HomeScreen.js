import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Pokedex from '../components/Pokedex';
import PokemonInformation from './PokemonInformation';
import SelectedTypes from '../components/Filters/Selected/SelectedTypes';
import FilterMenu from '../components/Filters/FilterMenu';
import FABMenu from '../components/FABMenu';
import SearchBar from '../components/SearchBar';

const { width } = Dimensions.get('window');
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

  const slideAnim = useRef(new Animated.Value(width)).current;

  const fabMenuItems = [
    { label: 'Pokédex', icon: 'book', route: 'Pokedex' },
    { label: 'Items', icon: 'cube', route: 'Items' },
    { label: 'Abilities', icon: 'flash', route: 'Abilities' },
    { label: 'Natures', icon: 'leaf', route: 'Natures' },
  ];

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

  const removeType = (type) => {
    setSelectedTypes((prevSelectedTypes) => prevSelectedTypes.filter((t) => t !== type));
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isSearchVisible={isSearchVisible}
        setIsSearchVisible={setIsSearchVisible}
        toggleShinySprites={toggleShinySprites}
        useShinySprites={useShinySprites}
        toggleFilterMenu={toggleFilterMenu}
      />

      <SelectedTypes selectedTypes={selectedTypes} removeType={removeType} />

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

      <FABMenu
        fabMenuItems={fabMenuItems}
        navigation={navigation}
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
});

export default HomeScreen;