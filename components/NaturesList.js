import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Animated, TextInput } from 'react-native';
import naturesData from '../assets/naturesData.json';
import Icon from 'react-native-vector-icons/FontAwesome';

const NaturesList = () => {
    const [natures, setNatures] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);
    const [filterIncreasedStat, setFilterIncreasedStat] = useState('');
    const [filterDecreasedStat, setFilterDecreasedStat] = useState('');
    const searchBarWidth = useRef(new Animated.Value(0)).current;
    const searchBarOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        setNatures(naturesData);
    }, []);

    useEffect(() => {
        if (isSearchVisible) {
            Animated.parallel([
                Animated.timing(searchBarWidth, {
                    toValue: 293, // Increase this value to extend the search bar further left
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

    const filteredNatures = natures.filter(nature =>
        nature.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (filterIncreasedStat === '' || nature.increased_stat.toLowerCase().includes(filterIncreasedStat.toLowerCase())) &&
        (filterDecreasedStat === '' || nature.decreased_stat.toLowerCase().includes(filterDecreasedStat.toLowerCase()))
    );

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</Text>
            <Text style={styles.stat}>Increased Stat: {item.increased_stat}</Text>
            <Text style={styles.stat}>Decreased Stat: {item.decreased_stat}</Text>
            <Text style={styles.flavor}>Likes Flavor: {item.likes_flavor}</Text>
            <Text style={styles.flavor}>Hates Flavor: {item.hates_flavor}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.header}>Natures</Text>
                <Animated.View style={[styles.searchContainer, { width: searchBarWidth, opacity: searchBarOpacity }]}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search Natures"
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                    <TouchableOpacity onPress={() => setIsSearchVisible(false)}>
                        <Icon name="times" size={20} color="#333" style={styles.closeIcon} />
                    </TouchableOpacity>
                </Animated.View>
                <TouchableOpacity onPress={() => setIsSearchVisible(!isSearchVisible)}>
                    <Icon
                        name="search"
                        size={25}
                        color="#fff"
                        style={[styles.searchIcon, isSearchVisible && styles.transparentSearchIcon]}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilterIncreasedStat('')}>
                    <Icon name="arrow-up" size={25} color="#fff" style={styles.filterIcon} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilterDecreasedStat('')}>
                    <Icon name="arrow-down" size={25} color="#fff" style={styles.filterIcon} />
                </TouchableOpacity>
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
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 0, // Adjust padding to raise the header
        marginBottom: 16, // Add margin to match HomeScreen
        backgroundColor: '#e5343d',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'left',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginRight: 10,
        position: 'absolute',
        right: 75,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    searchIcon: {
        marginLeft: 160,
        opacity: 1, // Default opacity
    },
    transparentSearchIcon: {
        opacity: 0, // Transparent opacity
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
    flavor: {
        fontSize: 14,
        color: '#FFD700',
        marginBottom: 4,
    },
});

export default NaturesList;