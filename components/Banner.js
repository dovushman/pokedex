import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, SafeAreaView } from 'react-native';

const Banner = ({ scrollY }) => {
  const bannerOpacity = new Animated.Value(1);

  useEffect(() => {
    const listener = scrollY.addListener(({ value }) => {
      if (value > 30) {
        bannerOpacity.setValue(0); // Make the banner invisible
      } else {
        bannerOpacity.setValue(1); // Make the banner visible
      }
    });

    return () => {
      scrollY.removeListener(listener);
    };
  }, [scrollY]);

  return (
    <Animated.View style={[styles.banner, { opacity: bannerOpacity }]}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.bannerContent}>
          <Text style={styles.bannerText}>Pokedex</Text>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#ffffff',
    zIndex: 1,
  },
  safeArea: {
    width: '100%',
    paddingTop: 20, // Adjust padding to ensure text is below the notch
  },
  bannerContent: {
    justifyContent: 'flex-end', // Align text at the bottom
    alignItems: 'center',
    height: 90, // Adjust the height as needed
  },
  bannerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Banner;