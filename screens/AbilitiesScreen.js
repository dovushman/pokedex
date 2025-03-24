import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Animated, Dimensions, Keyboard, TextInput } from 'react-native';
import abilitiesData from '../assets/abilitiesData.json';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

const capitalize = (str) => str ? str.charAt(0).toUpperCase() + str.slice(1) : '-';

const AbilitiesScreen = () => {
    const [abilities, setAbilities] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const searchBarWidth = useRef(new Animated.Value(0)).current;
    const searchBarOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const sortedAbilities = abilitiesData.sort((a, b) => a.name.localeCompare(b.name));
        setAbilities(sortedAbilities);
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

    const filteredAbilities = abilities.filter(ability =>
        searchQuery === '' || ability.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{capitalize(item.name)}</Text>
            <Text style={styles.detail}>{item.effect_entries.length > 0 ? item.effect_entries[0].short_effect : 'No effect available'}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.classicHeader}>Abilities</Text>
                <View style={styles.searchIconContainer}>
                    <TouchableOpacity onPress={() => setIsSearchVisible(!isSearchVisible)}>
                        <Icon name="search" size={25} color="#fff" style={styles.searchIcon} />
                    </TouchableOpacity>
                    <Animated.View style={[styles.searchContainer, { width: searchBarWidth, opacity: searchBarOpacity }]}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search Abilities"
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
                data={filteredAbilities}
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
    detail: {
        fontSize: 14,
        color: 'white',
        marginBottom: 4,
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

export default AbilitiesScreen;