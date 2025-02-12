import React, { useState, useRef, useEffect } from "react";
import { View, Text, Image, ScrollView, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, Animated, Dimensions } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Make sure to install @expo/vector-icons
import FilterMenu from '../components/Filters/FilterMenu'; // Import FilterMenu component

const { width } = Dimensions.get('window');

const DetailsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]); // Use selectedTypes for TypeFilter
  const [filterGeneration, setFilterGeneration] = useState('');
  const [filterLegendary, setFilterLegendary] = useState(null); // null means no filter, true means legendary, false means non-legendary
  const [expandedFilter, setExpandedFilter] = useState(''); // Track which filter section is expanded
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false); // Track if the filter menu is open
  const [isAnimating, setIsAnimating] = useState(false); // Track if the animation is in progress
  const [isSearchBarVisible, setIsSearchBarVisible] = useState(false); // Track if the search bar is visible
  const slideAnim = useRef(new Animated.Value(width)).current; // Initial position of the side panel

  const pokemons = [
    { name: "Pikachu", type: "Electric", generation: 1, legendary: false, imageUrl: "https://img.pokemondb.net/artwork/large/pikachu.jpg" },
    { name: "Bulbasaur", type: "Grass/Poison", generation: 1, legendary: false, imageUrl: "https://img.pokemondb.net/artwork/large/bulbasaur.jpg" },
    { name: "Mewtwo", type: "Psychic", generation: 1, legendary: true, imageUrl: "https://img.pokemondb.net/artwork/large/mewtwo.jpg" },
    { name: "Charmander", type: "Fire", generation: 1, legendary: false, imageUrl: "https://img.pokemondb.net/artwork/large/charmander.jpg" },
    { name: "Rayquaza", type: "Dragon/Flying", generation: 3, legendary: true, imageUrl: "https://img.pokemondb.net/artwork/large/rayquaza.jpg" },
    // Add more Pokémon data here
  ];

  // Filter Pokémon based on search query and selected filters
  const filteredPokemons = pokemons.filter((pokemon) => {
    const isNameMatch = pokemon.name.toLowerCase().includes(searchQuery.toLowerCase());
    const isTypeMatch = selectedTypes.length > 0 ? selectedTypes.includes(pokemon.type.split('/')[0]) || selectedTypes.includes(pokemon.type.split('/')[1]) : true;
    const isGenerationMatch = filterGeneration ? pokemon.generation === filterGeneration : true;
    const isLegendaryMatch = filterLegendary !== null ? pokemon.legendary === filterLegendary : true;

    return isNameMatch && isTypeMatch && isGenerationMatch && isLegendaryMatch;
  });

  // Toggle the expanded filter for specific sections
  const toggleFilterSection = (filter) => {
    setExpandedFilter(expandedFilter === filter ? '' : filter); // If the section is already open, close it. If not, open it.
  };

  // Toggle the filter menu
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

  // Clear all filters
  const clearFilters = () => {
    setSelectedTypes([]);
    setFilterGeneration('');
    setFilterLegendary(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.classicHeader}>Pokédex</Text>
          <View style={styles.iconContainer}>
            <TouchableOpacity onPress={() => setIsSearchBarVisible(!isSearchBarVisible)}>
              <Ionicons name="search" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleFilterMenu} style={styles.filterIcon}>
              <Ionicons name="filter" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.classicContainer}>
          {/* Search Bar */}
          {isSearchBarVisible && (
            <TextInput
              style={styles.searchBar}
              placeholder="Search Pokémon"
              placeholderTextColor="#fff"
              onChangeText={(text) => setSearchQuery(text)}
              value={searchQuery}
            />
          )}

          {/* Active Filters */}
          <View style={styles.activeFiltersContainer}>
            {selectedTypes.length > 0 ? <Text style={styles.activeFilterText}>Type: {selectedTypes.join(', ')}</Text> : null}
            {filterGeneration ? <Text style={styles.activeFilterText}>Generation: {filterGeneration}</Text> : null}
            {filterLegendary !== null ? <Text style={styles.activeFilterText}>Legendary: {filterLegendary ? 'Yes' : 'No'}</Text> : null}
          </View>

          {/* Pokémon Cards */}
          <ScrollView contentContainerStyle={styles.scrollViewContent}>
            {filteredPokemons.length > 0 ? (
              filteredPokemons.map((pokemon, index) => (
                <View key={index} style={styles.classicCard}>
                  <Text style={styles.classicCardText}>{pokemon.name} - {pokemon.type}</Text>
                  <Image source={{ uri: pokemon.imageUrl }} style={styles.classicImage} />
                </View>
              ))
            ) : (
              <Text style={styles.noResultsText}>No results found</Text>
            )}
          </ScrollView>
        </View>
      </View>

      {/* Filter Side Panel */}
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

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#e53935',
  },
  container: {
    flex: 1,
    backgroundColor: '#e53935',
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
  iconContainer: {
    flexDirection: 'row',
  },
  filterIcon: {
    marginLeft: 16,
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
  activeFiltersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 16,
  },
  activeFilterText: {
    backgroundColor: '#d32f2f',
    color: 'white',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginHorizontal: 4,
    marginBottom: 4,
    fontSize: 14,
  },
  noResultsText: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  classicCard: {
    backgroundColor: '#d32f2f',
    padding: 16,
    marginVertical: 8,
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  classicCardText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 8,
  },
  classicImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
});

export default DetailsScreen;