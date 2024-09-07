import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import * as Progress from 'react-native-progress';

const FetchDataSplashScreen = ({ navigation }) => {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = require('../assets/pokemonData.json');
        // console.log('Fetched Data:', data); // Add this log
  
        for (let i = 0; i <= 100; i++) {
          setProgress(i / 100);
          await new Promise(resolve => setTimeout(resolve, 10));
        }
  
        navigation.replace('MainTabs', { screen: 'Home', params: { data } });
      } catch (error) {
        console.error('Error fetching data:', error);
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