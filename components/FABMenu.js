import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FABMenu = ({ fabMenuItems, navigation }) => {
  const [isFabMenuOpen, setIsFabMenuOpen] = useState(false);
  const stackAnim = useRef(new Animated.Value(0)).current;
  const fabIconRotation = useRef(new Animated.Value(0)).current;
  const totalItems = fabMenuItems.length;

  const openFabMenu = () => {
    setIsFabMenuOpen(true);
    Animated.parallel([
      Animated.timing(stackAnim, {
        toValue: totalItems,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fabIconRotation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const closeFabMenu = () => {
    Animated.parallel([
      Animated.timing(stackAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fabIconRotation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setIsFabMenuOpen(false);
    });
  };

  const toggleFabMenu = () => {
    if (isFabMenuOpen) {
      closeFabMenu();
    } else {
      openFabMenu();
    }
  };

  const fabIconRotate = fabIconRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '135deg'],
  });

  return (
    <>
      <View style={styles.innerFabs}>
        {fabMenuItems.map((item, index) => {
          const translateY = stackAnim.interpolate({
            inputRange: [0, totalItems],
            outputRange: [0, -(index + 1) * 10], // Adjust this value to control the spacing
            extrapolate: 'clamp',
          });

          const opacity = stackAnim.interpolate({
            inputRange: [0, totalItems],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={item.label}
              style={[
                styles.innerFab,
                {
                  transform: [{ translateY }],
                  opacity,
                },
              ]}
            >
              <TouchableOpacity onPress={() => navigation.navigate(item.route)}>
                <Ionicons name={item.icon} size={24} color="#fff" />
              </TouchableOpacity>
            </Animated.View>
          );
        })}
      </View>

      <TouchableOpacity style={styles.fab} onPress={toggleFabMenu}>
        <Animated.View style={{ transform: [{ rotate: fabIconRotate }] }}>
          <Ionicons name="add" size={30} color="#fff" />
        </Animated.View>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 15,
    right: 30,
    backgroundColor: '#007AFF',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  innerFabs: {
    position: 'absolute',
    bottom: 20,
    right: 37,
  },
  innerFab: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default FABMenu;