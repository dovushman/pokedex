import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, FlatList, ActivityIndicator, Animated } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Pokedex from '../components/Pokedex';
import PokemonInformation from '../components/PokemonInformation';
import Banner from '../components/Banner';
import { getPokemon } from '../services/api';

const Stack = createStackNavigator();

const HomeScreenComponent = () => {
  const [pokemonIds, setPokemonIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const limit = 20; // Number of Pokémon to fetch at a time
  const flatListRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const previousScrollY = useRef(0); // Track previous scroll position

  useEffect(() => {
    loadMorePokemon();
  }, []);

  const loadMorePokemon = async () => {
    if (loading) return;
    setLoading(true);
    try {
      const newPokemonIds = await fetchPokemonIds(offset, limit);
      setPokemonIds((prevIds) => [...prevIds, ...newPokemonIds]);
      setOffset((prevOffset) => prevOffset + limit);
    } catch (error) {
      console.error('Error loading more Pokémon:', error);
    }
    setLoading(false);
  };

  const fetchPokemonIds = async (offset, limit) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    return data.results.map(pokemon => pokemon.url.split('/').slice(-2, -1)[0]);
  };

  const renderFooter = () => {
    if (!loading) return null;
    return <ActivityIndicator style={{ margin: 16 }} />;
  };

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

  return (
    <View style={styles.container}>
      <Banner scrollY={scrollY} />
      <Animated.FlatList
        ref={flatListRef}
        contentContainerStyle={styles.contentContainer}
        data={pokemonIds}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => <Pokedex pokemonId={item} />}
        onEndReached={loadMorePokemon}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        onScroll={handleScroll}
      />
    </View>
  );
};

const HomeScreen = () => {
  return (
    <Stack.Navigator initialRouteName="HomeScreenComponent">
      <Stack.Screen name="HomeScreenComponent" component={HomeScreenComponent} options={{ headerShown: false }} />
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
    backgroundColor: '#fff',
  },
  contentContainer: {
    padding: 16,
    paddingTop: 70, // Add padding to the top to create space for the banner
  },
});

export default HomeScreen;