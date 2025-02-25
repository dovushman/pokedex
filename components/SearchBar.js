import React, { useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Animated, StyleSheet, Keyboard, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  isSearchVisible,
  setIsSearchVisible,
  toggleFilterMenu,
}) => {
  const searchBarWidth = useRef(new Animated.Value(0)).current;
  const searchBarOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isSearchVisible) {
      Animated.parallel([
        Animated.timing(searchBarWidth, {
          toValue: width - 100,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(searchBarOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(searchBarWidth, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(searchBarOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  }, [isSearchVisible]);

  const toggleSearchBar = () => {
    console.log('toggleSearchBar called');
    setIsSearchVisible((prev) => !prev);
  };

  const handleCloseSearch = () => {
    console.log('handleCloseSearch called');
    console.log('searchQuery:', searchQuery);
    if (searchQuery !== '') {
      console.log('Clearing search query');
      setSearchQuery('');
    } else {
      console.log('Closing search bar');
      setIsSearchVisible(false);
      Keyboard.dismiss();
    }
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.classicHeader}>Pokédex</Text>
      <View style={styles.searchIconContainer}>
        <TouchableOpacity onPress={toggleSearchBar}>
          <Icon name="search" size={25} color="#fff" style={styles.searchIcon} />
        </TouchableOpacity>
        <Animated.View style={[styles.searchContainer, { width: searchBarWidth, opacity: searchBarOpacity }]}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Pokémon"
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <TouchableOpacity onPress={() => {
            console.log('Close button pressed');
            handleCloseSearch();
          }}>
            <Icon name="times" size={20} color="#333" style={styles.closeIcon} />
          </TouchableOpacity>
        </Animated.View>
        <TouchableOpacity onPress={toggleFilterMenu}>
          <Icon name="filter" size={25} color="#fff" style={{ marginLeft: 15 }} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  classicHeader: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: 'absolute',
    right: 70,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  searchIcon: {
    marginRight: 10,
  },
  closeIcon: {
    marginLeft: 10,
  },
});

export default SearchBar;