import React, { useRef, useEffect, useState, useMemo, useCallback } from 'react';
import { View, StyleSheet, Animated, SafeAreaView, TextInput, TouchableOpacity, Text, Modal } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import Pokedex from '../components/Pokedex';
import PokemonInformation from './PokemonInformation';
import Banner from '../components/Banner';
import Filter from '../components/Filters/Filter';
import Dropdown from '../components/Dropdown';
import SelectedTypes from '../components/Filters/Selected/SelectedTypes'; // Import SelectedTypes component
import { PanGestureHandler, State } from 'react-native-gesture-handler';

const Stack = createStackNavigator();

const HomeScreenComponent = ({ route, navigation }) => {
  const { data: pokemonData } = route.params || {}; 
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false); 
  const [isFilterVisible, setIsFilterVisible] = useState(false); 
  const [selectedTypes, setSelectedTypes] = useState([]); // Change to array

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

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={() => setIsSearchVisible((prev) => !prev)}>
            <Icon name="search" size={25} color="#000" style={{ marginRight: 15 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setIsFilterVisible((prev) => !prev)}>
            <Icon name="filter" size={25} color="#000" style={{ marginRight: 15 }} />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, setIsSearchVisible, setIsFilterVisible]);

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

  const handleGesture = ({ nativeEvent }) => {
    if (nativeEvent.state === State.END) {
      if (nativeEvent.translationY > 100) {
        setIsFilterVisible(false);
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {isSearchVisible && (
        <View style={styles.searchWrapper}>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Pokémon"
              value={searchQuery}
              onChangeText={handleSetSearchQuery}
            />
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Icon name="times" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      )}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isFilterVisible}
        onRequestClose={() => setIsFilterVisible(false)}
      >
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setIsFilterVisible(false)} />
        <PanGestureHandler onGestureEvent={handleGesture} onHandlerStateChange={handleGesture}>
          <Animated.View style={styles.modalContent}>
            <View style={styles.handle} />
            <TouchableOpacity onPress={() => setIsFilterVisible(false)} style={styles.closeButton}>
              <Icon name="times" size={20} color="#000" />
            </TouchableOpacity>
            <Filter selectedTypes={selectedTypes} setSelectedTypes={handleSetSelectedTypes} />
          </Animated.View>
        </PanGestureHandler>
      </Modal>
      <SelectedTypes selectedTypes={selectedTypes} removeType={removeType} />
      <Animated.FlatList
        ref={flatListRef}
        contentContainerStyle={styles.contentContainer}
        data={filteredData} // Use filtered data
        keyExtractor={(item) => item.id.toString()} // Ensure keyExtractor uses a unique key
        renderItem={({ item }) => <Pokedex pokemon={item} />}
        onScroll={handleScroll}
      />
    </SafeAreaView>
  );
};

const HomeScreen = ({ route }) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreenComponent">
      <Stack.Screen
        name="Pokedex"
        component={HomeScreenComponent}
        initialParams={route.params}
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
  container: {
    flex: 1,
    backgroundColor: '#f1f1f1',
  },
  contentContainer: {
    padding: 16,
    paddingTop: 30, // Add padding to the top to create space for the banner
    marginTop: 30, // Adjust margin to reduce the gap
  },
  searchWrapper: {
    backgroundColor: '#f1f1f1', // Grey background
    paddingBottom: 10, // Add some padding to the bottom
    // Add shadow properties for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Add elevation for Android
    elevation: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    margin: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  headerButtons: {
    flexDirection: 'row',
  },
  filterWrapper: {
    backgroundColor: '#f1f1f1', // Grey background
    padding: 16,
    // Add shadow properties for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Add elevation for Android
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    justifyContent: 'flex-end', // Align modal content to the bottom
  },
  modalContent: {
    height: '75%', // Take up 75% of the screen height
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
  },
  handle: {
    width: 40,
    height: 5,
    backgroundColor: '#ccc',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginVertical: 10,
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
});

export default HomeScreen;