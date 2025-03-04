import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const FABMenu = ({ items }) => {
  const [isOpen, setIsOpen] = useState(false);
  const animation = useRef(new Animated.Value(1)).current;
  const slideAnimations = useRef(items.map(() => new Animated.Value(0))).current;

  const toggleMenu = () => {
    const toValue = isOpen ? 0 : 1;

    Animated.spring(animation, {
      toValue,
      friction: 5,
      useNativeDriver: true,
    }).start();

    if (isOpen) {
      Animated.stagger(
        50,
        slideAnimations.map((anim) =>
          Animated.timing(anim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          })
        )
      ).start(() => setIsOpen(false));
    } else {
      setIsOpen(true);
      Animated.stagger(
        50,
        slideAnimations.reverse().map((anim) =>
          Animated.timing(anim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          })
        )
      ).start();
    }
  };

  return (
    <View style={styles.container}>
      {items.map((item, index) => (
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
          <Text style={styles.menuText}>{item.label}</Text>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => console.log(item.route)}
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
    justifyContent: 'flex-end',
    width: 160,
    position: 'relative',
    marginBottom: 10, // Consistent spacing
  },
  menuText: {
    color: '#222', // Darker but softer than black
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left',
    flex: 1,
    marginRight: 12,
    
    // 🔹 Option 1: Add Background
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Light background with transparency
    paddingVertical: 4,
    paddingHorizontal: 6,
    borderRadius: 4,
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
