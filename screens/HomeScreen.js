import React, { useState, useRef, useCallback, useMemo } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  SafeAreaView,
  Keyboard,
  FlatList,
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

const MemoizedFlatList = React.memo(FlatList, (prevProps, nextProps) => {
  return prevProps.data === nextProps.data; // Only re-render if the data has changed
});


const HomeScreenComponent = ({ route, navigation }) => {
  const { data: pokemonData } = route.params || {};
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

        const pokemonTypeSet = new Set(pokemon.types.map((t) => t.toLowerCase()));
        return [...selectedTypesSet].some((type) => pokemonTypeSet.has(type));
      })
      .filter((pokemon) =>
        lowercaseSearchQuery === '' || pokemon.name.toLowerCase().includes(lowercaseSearchQuery)
      );

    // console.log(filtered); // Debugging the filtered data
    return filtered;
  }, [selectedTypes, searchQuery, pokemonData]); // Added searchQuery to dependencies



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
      setIsAnimating(false); // Make sure the animation state is set to false when the animation completes
    });
  };



  const toggleFilterSection = (section) => {
    setExpandedFilter((prev) => (prev === section ? '' : section));
  };

  // Memoize Pokedex item rendering to optimize performance
  const PokedexItem = React.memo(({ pokemon, useShinySprites }) => {
    return <Pokedex pokemon={pokemon} useShinySprites={useShinySprites} />;
  }, (prevProps, nextProps) => {
    // Only re-render if pokemon data or shiny sprites change
    return prevProps.pokemon.id === nextProps.pokemon.id && prevProps.useShinySprites === nextProps.useShinySprites;
  });


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

      {/* Memoized FlatList */}
      <Animated.View style={{ flex: 1 }}>
        <MemoizedFlatList
          data={filteredData}
          contentContainerStyle={styles.contentContainer}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <PokedexItem pokemon={item} useShinySprites={useShinySprites} />}
          initialNumToRender={10}
          maxToRenderPerBatch={5}
          windowSize={10}
        />

      </Animated.View>

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
});

export default HomeScreen;
