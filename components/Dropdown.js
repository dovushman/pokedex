import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Dropdown = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.dropdownHeader}>
        <Text style={styles.dropdownTitle}>{title}</Text>
        <Icon name={isOpen ? 'chevron-up' : 'chevron-down'} size={20} color="#000" />
      </TouchableOpacity>
      {isOpen && <View style={styles.dropdownContent}>{children}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ddd',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  dropdownTitle: {
    fontSize: 16,
  },
  dropdownContent: {
    backgroundColor: '#f1f1f1',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    padding: 10,
  },
});

export default Dropdown;