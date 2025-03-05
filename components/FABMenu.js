import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const FABMenu = ({ navigation }) => {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(1)).current;
  const slideAnimations = useRef(new Array(4).fill(null).map(() => new Animated.Value(0))).current;

  const fabMenuItems = [
    { icon: 'book', route: 'Pokedex' },
    { icon: 'cube', route: 'Items' },
    { icon: 'flash', route: 'Abilities' },
    { icon: 'leaf', route: 'Natures' },
  ];

  const toggleMenu = () => {
    try {
      const toValue = isOpen ? 0 : 1;

      // Animate the main button
      Animated.spring(animation, {
        toValue,
        friction: 5,
        useNativeDriver: true,
      }).start();

      if (isOpen) {
        // Close the menu items
        Animated.stagger(
          50,
          slideAnimations.map((anim, index) => {
            return Animated.timing(anim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            });
          })
        ).start(() => {
          setIsOpen(false);
        });
      } else {
        // Open the menu items
        setIsOpen(true);
        Animated.stagger(
          50,
          slideAnimations.reverse().map((anim, index) => {
            return Animated.timing(anim, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            });
          })
        ).start(() => {
        });
      }
    } catch (error) {
      console.error('Error in toggleMenu:', error);
    }
  };

  const handleItemPress = (route) => {
    console.log('Navigating to:', route);
    try {
      toggleMenu();
      navigation.navigate(route);
    } catch (error) {
      console.error('Error in handleItemPress:', error);
    }
  };

  return (
    <View style={styles.container}>
      {fabMenuItems.map((item, index) => (
        <Animated.View
          key={index}
          style={[
            styles.itemContainer,
            {
              transform: [
                {
                  translateY: slideAnimations[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [70, 0], // Keeps items raised
                  }),
                },
                { scale: slideAnimations[index] },
              ],
              opacity: slideAnimations[index],
            },
          ]}
        >
          <Text style={styles.label}>{item.route}</Text>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => handleItemPress(item.route)}
          >
            <Icon name={item.icon} size={20} color="#fff" />
          </TouchableOpacity>
        </Animated.View>
      ))}

      <TouchableOpacity style={[styles.button, styles.mainButton]} onPress={toggleMenu}>
        <Animated.View style={styles.menuIcon}>
          <Icon name="plus" size={24} color="#fff" />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 80, // Keeps menu higher
    right: 30,
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start', // Align items to the start
    width: 200, // Increase the width to fit the text
    position: 'relative',
    marginBottom: 10, // Consistent spacing
  },
  label: {
    marginRight: 0,
    borderRadius: 10,
    paddingLeft: 50, // Add padding to the right
    color: '#FFD700',
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1, // Allow the label to take up available space
  },
  iconButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4A90E2',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
    elevation: 4,
  },
  button: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainButton: {
    backgroundColor: '#4A90E2',
    position: 'absolute',
    bottom: -60, // Keeps FAB in place
    right: 0,
  },
  menuIcon: {
    transform: [
      {
        rotate: '0deg',
      },
    ],
  },
});

export default FABMenu;