import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Animated, Dimensions, Keyboard, TextInput, Image } from 'react-native';
import itemsData from '../assets/itemsData.json';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '-';

const ItemScreen = () => {
    const [items, setItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const searchBarWidth = useRef(new Animated.Value(0)).current;
    const searchBarOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const sortedItems = itemsData.sort((a, b) => a.name.localeCompare(b.name));
        setItems(sortedItems);
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

    const filteredItems = items.filter(item =>
        searchQuery === '' || item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Image source={{ uri: item.sprite }} style={styles.sprite} />
            <View style={styles.itemDetails}>
                <Text style={styles.title}>{capitalize(item.name)}</Text>
                <Text style={styles.effect}>{item.effect}</Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.classicHeader}>Items</Text>
                <View style={styles.searchIconContainer}>
                    <TouchableOpacity onPress={() => setIsSearchVisible(!isSearchVisible)}>
                        <Icon name="search" size={25} color="#fff" style={styles.searchIcon} />
                    </TouchableOpacity>
                    <Animated.View style={[styles.searchContainer, { width: searchBarWidth, opacity: searchBarOpacity }]}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search Items"
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
            <FlatList
                data={filteredItems}
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
        flexDirection: 'row',
        alignItems: 'center',
    },
    sprite: {
        width: 50,
        height: 50,
        marginRight: 16,
    },
    itemDetails: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    effect: {
        fontSize: 14,
        color: 'white',
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
});

export default ItemScreen;