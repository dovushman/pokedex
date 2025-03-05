// import React, { useEffect, useState } from 'react';
// import { Text, View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
// import naturesData from '../assets/naturesData.json';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import SearchBar from '../components/SearchBar';

// const NaturesList = () => {
//     const [natures, setNatures] = useState([]);
//     const [filterIncreasedStat, setFilterIncreasedStat] = useState('');
//     const [filterDecreasedStat, setFilterDecreasedStat] = useState('');
//     const [searchQuery, setSearchQuery] = useState('');
//     const [isSearchVisible, setIsSearchVisible] = useState(false);

//     useEffect(() => {
//         const sortedNatures = naturesData.sort((a, b) => a.name.localeCompare(b.name));
//         setNatures(sortedNatures);
//     }, []);

//     const handleClearSearch = () => {
//         setSearchQuery('');
//     };

//     const filteredNatures = natures.filter(nature =>
//         (filterIncreasedStat === '' || nature.increased_stat.toLowerCase().includes(filterIncreasedStat.toLowerCase())) &&
//         (filterDecreasedStat === '' || nature.decreased_stat.toLowerCase().includes(filterDecreasedStat.toLowerCase())) &&
//         (searchQuery === '' || nature.name.toLowerCase().includes(searchQuery.toLowerCase()))
//     );

//     const renderItem = ({ item }) => (
//         <View style={styles.item}>
//             <Text style={styles.title}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Text>
//             <Text style={styles.stat}>Increased Stat: {item.increased_stat}</Text>
//             <Text style={styles.stat}>Decreased Stat: {item.decreased_stat}</Text>
//             <Text style={styles.flavor}>Likes Flavor: {item.likes_flavor}</Text>
//             <Text style={styles.flavor}>Hates Flavor: {item.hates_flavor}</Text>
//         </View>
//     );

//     return (
//         <SafeAreaView style={styles.container}>
//             <SearchBar
//                 searchQuery={searchQuery}
//                 setSearchQuery={setSearchQuery}
//                 isSearchVisible={isSearchVisible}
//                 setIsSearchVisible={setIsSearchVisible}
//                 toggleFilterMenu={() => {}}
//                 handleClearSearch={handleClearSearch} // Pass the handleClearSearch function
//                 extraIcons={
//                     <View style={styles.iconContainer}>
//                         <TouchableOpacity onPress={() => setFilterIncreasedStat('')}>
//                             <Icon name="arrow-up" size={25} color="#fff" style={styles.filterIcon} />
//                         </TouchableOpacity>
//                         <TouchableOpacity onPress={() => setFilterDecreasedStat('')}>
//                             <Icon name="arrow-down" size={25} color="#fff" style={styles.filterIcon} />
//                         </TouchableOpacity>
//                     </View>
//                 }
//             />
//             <FlatList
//                 data={filteredNatures}
//                 renderItem={renderItem}
//                 keyExtractor={(item) => item.id.toString()}
//             />
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#e5343d',
//     },
//     item: {
//         padding: 16,
//         borderRadius: 12,
//         marginBottom: 12,
//         backgroundColor: '#d32f2f',
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.3,
//         shadowRadius: 4,
//         elevation: 5,
//         width: '92%',
//         alignSelf: 'center',
//     },
//     title: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: 'white',
//         marginBottom: 8,
//     },
//     stat: {
//         fontSize: 14,
//         color: 'white',
//         marginBottom: 4,
//     },
//     flavor: {
//         fontSize: 14,
//         color: '#FFD700',
//         marginBottom: 4,
//     },
//     filterIcon: {
//         marginLeft: 10, // Adjust this value to bring the icons closer together
//     },
//     iconContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
// });

// export default NaturesList;



import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Animated, Dimensions, Keyboard, TextInput } from 'react-native';
import naturesData from '../assets/naturesData.json';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '';

const NaturesList = () => {
    const [natures, setNatures] = useState([]);
    const [filterIncreasedStat, setFilterIncreasedStat] = useState('');
    const [filterDecreasedStat, setFilterDecreasedStat] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const searchBarWidth = useRef(new Animated.Value(0)).current;
    const searchBarOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const sortedNatures = naturesData.sort((a, b) => a.name.localeCompare(b.name));
        setNatures(sortedNatures);
    }, []);

    useEffect(() => {
        if (isSearchVisible) {
            Animated.parallel([
                Animated.timing(searchBarWidth, {
                    toValue: width - 96,
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
                Keyboard.dismiss();
            });
        }
    };

    const filteredNatures = natures.filter(nature =>
        (filterIncreasedStat === '' || nature.increased_stat.toLowerCase().includes(filterIncreasedStat.toLowerCase())) &&
        (filterDecreasedStat === '' || nature.decreased_stat.toLowerCase().includes(filterDecreasedStat.toLowerCase())) &&
        (searchQuery === '' || nature.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{capitalize(item.name)}</Text>
            <Text style={styles.statGold}>Increased Stat: {capitalize(item.increased_stat)}</Text>
            <Text style={styles.flavorGold}>Likes Flavor: {capitalize(item.likes_flavor)}</Text>
            <Text style={styles.stat}>Decreased Stat: {capitalize(item.decreased_stat)}</Text>
            <Text style={styles.flavor}>Hates Flavor: {capitalize(item.hates_flavor)}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.classicHeader}>Natures</Text>
                <View style={styles.searchIconContainer}>
                    <TouchableOpacity onPress={() => setIsSearchVisible(!isSearchVisible)}>
                        <Icon name="search" size={25} color="#fff" style={styles.searchIcon} />
                    </TouchableOpacity>
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
                        <TouchableOpacity onPress={() => setFilterIncreasedStat('')}>
                            <Icon name="arrow-up" size={25} color="#fff" style={styles.filterIcon} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => setFilterDecreasedStat('')}>
                            <Icon name="arrow-down" size={25} color="#fff" style={styles.filterIcon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <FlatList
                data={filteredNatures}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e5343d',
    },
    item: {
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        backgroundColor: '#d32f2f',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        width: '92%',
        alignSelf: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 8,
    },
    stat: {
        fontSize: 14,
        color: 'white',
        marginBottom: 4,
    },
    statGold: {
        fontSize: 14,
        color: '#FFD700',
        marginBottom: 4,
    },
    flavor: {
        fontSize: 14,
        color: 'white',
        marginBottom: 4,
    },
    flavorGold: {
        fontSize: 14,
        color: '#FFD700',
        marginBottom: 4,
    },
    filterIcon: {
        marginLeft: 10, // Adjust this value to bring the icons closer together
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
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
        right: 66,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    searchIcon: {
        marginRight: 5,
    },
    closeIcon: {
        marginLeft: 10,
    },
});

export default NaturesList;