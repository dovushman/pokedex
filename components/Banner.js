import React from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const Banner = ({ scrollY }) => {
  const bannerTranslateY = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [0, -50],
    extrapolate: 'clamp',
  });

  return (
    <Animated.View style={[styles.banner, { transform: [{ translateY: bannerTranslateY }] }]}>
      <Text style={styles.bannerText}>Pokedex</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  banner: {
    position: 'absolute',
    marginTop: 10,
    top: 0,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  bannerText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Banner;