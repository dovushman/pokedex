// import React, { useEffect, useRef } from 'react';
// import { View, TextInput, StyleSheet, TouchableOpacity, Animated, Dimensions, Text } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';

// const { width } = Dimensions.get('window');

// const SearchBar = ({
//   searchQuery,
//   setSearchQuery,
//   isSearchVisible,
//   setIsSearchVisible,
//   toggleFilterMenu,
//   handleClearSearch, // Add handleClearSearch prop
//   extraIcons = null,
// }) => {
//   const searchBarWidth = useRef(new Animated.Value(0)).current;
//   const searchBarOpacity = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     if (isSearchVisible) {
//       Animated.parallel([
//         Animated.timing(searchBarWidth, {
//           toValue: width - 95,
//           duration: 300,
//           useNativeDriver: false,
//         }),
//         Animated.timing(searchBarOpacity, {
//           toValue: 1,
//           duration: 300,
//           useNativeDriver: false,
//         }),
//       ]).start();
//     } else {
//       Animated.parallel([
//         Animated.timing(searchBarWidth, {
//           toValue: 0,
//           duration: 300,
//           useNativeDriver: false,
//         }),
//         Animated.timing(searchBarOpacity, {
//           toValue: 0,
//           duration: 300,
//           useNativeDriver: false,
//         }),
//       ]).start();
//     }
//   }, [isSearchVisible]);

//   return (
//     <View style={styles.headerContainer}>
//       <Text style={styles.classicHeader}>Natures</Text>
//       <Animated.View style={[styles.searchContainer, { width: searchBarWidth, opacity: searchBarOpacity }]}>
//         <TextInput
//           style={styles.searchInput}
//           placeholder="Search Natures"
//           placeholderTextColor="#999"
//           value={searchQuery}
//           onChangeText={setSearchQuery}
//         />
//         <TouchableOpacity onPress={handleClearSearch}>
//           <Icon name="times" size={20} color="#333" style={styles.closeIcon} />
//         </TouchableOpacity>
//       </Animated.View>
//       <View style={styles.iconContainer}>
//         <TouchableOpacity onPress={() => setIsSearchVisible(!isSearchVisible)}>
//           <Icon
//             name="search"
//             size={25}
//             color="#fff"
//             style={[styles.searchIcon, isSearchVisible && styles.transparentSearchIcon]}
//           />
//         </TouchableOpacity>
//         {extraIcons}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   headerContainer: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     paddingHorizontal: 16,
//     marginBottom: 16,
//   },
//   classicHeader: {
//     color: 'white',
//     fontSize: 24,
//     fontWeight: 'bold',
//   },
//   searchContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     borderRadius: 20,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     position: 'absolute',
//     right: 80,
//   },
//   searchInput: {
//     flex: 1,
//     fontSize: 16,
//     color: '#333',
//   },
//   searchIcon: {
//     marginRight: 4,
//   },
//   transparentSearchIcon: {
//     opacity: 0,
//   },
//   closeIcon: {
//     marginLeft: 10,
//   },
//   iconContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: 15,
//   },
// });

// export default SearchBar;



import React, { useEffect, useRef } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Animated, Dimensions, Text } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const SearchBar = ({
  searchQuery,
  setSearchQuery,
  isSearchVisible,
  setIsSearchVisible,
  toggleFilterMenu,
  extraIcons = null,
}) => {
  const searchBarWidth = useRef(new Animated.Value(0)).current;
  const searchBarOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isSearchVisible) {
      Animated.parallel([
        Animated.timing(searchBarWidth, {
          toValue: width - 95,
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
      });
    }
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.classicHeader}>Natures</Text>
      <Animated.View style={[styles.searchContainer, { width: searchBarWidth, opacity: searchBarOpacity }]}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search Natures"
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={handleClearSearch}>
          <Icon name="times" size={20} color="#333" style={styles.closeIcon} />
        </TouchableOpacity>
      </Animated.View>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={() => setIsSearchVisible(!isSearchVisible)}>
          <Icon
            name="search"
            size={25}
            color="#fff"
            style={[styles.searchIcon, isSearchVisible && styles.transparentSearchIcon]}
          />
        </TouchableOpacity>
        {extraIcons}
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    position: 'absolute',
    right: 80,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  searchIcon: {
    marginRight: 4,
  },
  transparentSearchIcon: {
    opacity: 0,
  },
  closeIcon: {
    marginLeft: 10,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
});

export default SearchBar;