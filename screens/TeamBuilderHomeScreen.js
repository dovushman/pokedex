import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Dimensions,
  SafeAreaView,
  Keyboard,
  FlatList,
  TouchableOpacity,
  Text,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const { width } = Dimensions.get('window');

const TeamBuilderHomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const searchBarWidth = useRef(new Animated.Value(0)).current;
  const searchBarOpacity = useRef(new Animated.Value(0)).current;

  const toggleSearchBar = () => {
    if (!isSearchVisible) {
      setIsSearchVisible(true);
      Animated.parallel([
        Animated.timing(searchBarWidth, {
          toValue: width - 70,
          duration: 300,
          useNativeDriver: false,
        }),
        Animated.timing(searchBarOpacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  const handleClearSearch = () => {
    if (searchQuery !== '') {
      setSearchQuery('');
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
      ]).start(() => {
        setIsSearchVisible(false);
        Keyboard.dismiss();
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.classicHeader}>Team Builder</Text>
        <View style={styles.searchIconContainer}>
          <TouchableOpacity onPress={toggleSearchBar}>
            <Icon name="search" size={25} color="#fff" style={styles.searchIcon} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="plus" size={28.5} color="#fff" style={styles.addIcon} />
          </TouchableOpacity>
          <Animated.View style={[styles.searchContainer, { width: searchBarWidth, opacity: searchBarOpacity }]}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search Pokémon"
              placeholderTextColor="#999"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity onPress={handleClearSearch}>
              <Icon name="times" size={20} color="#333" style={styles.closeIcon} />
            </TouchableOpacity>
          </Animated.View>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <Text>Hello World</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e5343d',
  },
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
    right: 40,
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
  addIcon: {
    marginLeft: 10,
  },
  contentContainer: {
    padding: 16,
  },
});

export default TeamBuilderHomeScreen;