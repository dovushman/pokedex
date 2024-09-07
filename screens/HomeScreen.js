import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, Animated, SafeAreaView } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Pokedex from '../components/Pokedex';
import PokemonInformation from '../components/PokemonInformation';
import Banner from '../components/Banner';

const Stack = createStackNavigator();

const HomeScreenComponent = ({ route }) => {
  const { data: pokemonData } = route.params || {}; // Add a fallback to avoid undefined

  const flatListRef = useRef(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  const previousScrollY = useRef(0); // Track previous scroll position

  useEffect(() => {
    // Log the received data
    // console.log('Received Pokemon Data:', pokemonData);
    // console.log('Is Array:', Array.isArray(pokemonData));
    // console.log('Data Length:', pokemonData ? pokemonData.length : 'undefined');
  }, [pokemonData]);

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
    <SafeAreaView style={styles.container}>
      <Banner scrollY={scrollY} />
      <Animated.FlatList
        ref={flatListRef}
        contentContainerStyle={styles.contentContainer}
        data={pokemonData || []} // Add a fallback to avoid undefined
        keyExtractor={(item) => item.id.toString()} // Ensure keyExtractor uses a unique key
        renderItem={({ item }) => <Pokedex pokemon={item} />}
        onScroll={handleScroll}
      />
    </SafeAreaView>
  );
};

// const HomeScreen = ({ route }) => {
//   return (
//     <Stack.Navigator initialRouteName="HomeScreenComponent">
//       <Stack.Screen name="HomeScreenComponent" component={HomeScreenComponent} />
//       <Stack.Screen
//         name="PokemonInformation"
//         component={PokemonInformation}
//         options={{ headerShown: false }} // Hide the header for PokemonInformation screen
//       />
//     </Stack.Navigator>
//   );
// };
const HomeScreen = ({ route }) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreenComponent">
      <Stack.Screen name="HomeScreenComponent" component={HomeScreenComponent} initialParams={route.params} />
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
});

export default HomeScreen;