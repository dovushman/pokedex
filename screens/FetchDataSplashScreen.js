import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Progress from 'react-native-progress';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setupPokemonDatabase, getPokemons } from '../services/database/pokemonDatabase';

const FetchDataSplashScreen = ({ navigation }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if the database has already been initialized
        const isDatabaseInitialized = await AsyncStorage.getItem('isDatabaseInitialized');
        if (!isDatabaseInitialized) {
          // Initialize and populate the database
          await setupPokemonDatabase();
          // Set the flag in AsyncStorage
          await AsyncStorage.setItem('isDatabaseInitialized', 'true');
        }

        // Fetch the data from the database
        const data = await getPokemons();

        // Simulate progress
        for (let i = 0; i <= 100; i++) {
          setProgress(i / 100);
          await new Promise(resolve => setTimeout(resolve, 10));
        }

        // Navigate to HomeScreen and pass the data
        navigation.replace('MainTabs', { screen: 'Home', params: { data } });
      } catch (error) {
        console.error('Error initializing database:', error);
      }
    };

    fetchData();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#0000ff" />
      <Text style={styles.text}>PocketDex is booting up, this is a one-time process</Text>
      <Progress.Bar progress={progress} width={200} />
      <Text style={styles.progressText}>{`Progress: ${(progress * 100).toFixed(2)}%`}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f1f1f1',
  },
  text: {
    marginTop: 20,
    fontSize: 18,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  progressText: {
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FetchDataSplashScreen;