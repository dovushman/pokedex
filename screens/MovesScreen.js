import React, { useEffect, useState, useRef } from 'react';
import { Text, View, StyleSheet, FlatList, SafeAreaView, TouchableOpacity, Animated, Dimensions, Keyboard, TextInput, Image } from 'react-native';
import movesData from '../assets/movesData.json';
import Icon from 'react-native-vector-icons/FontAwesome';
import typeColors from '../utils/typeColors';

const { width } = Dimensions.get('window');
const physicalIcon = require('../assets/icons/PhysicalMoveIcon.png');
const specialIcon = require('../assets/icons/SpecialMoveIcon.png');
const statusIcon = require('../assets/icons/StatusMoveIcon.png');

const capitalize = (str) => {
    if (!str) return '-';
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
};
const MovesScreen = () => {
    const [moves, setMoves] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false);

    const searchBarWidth = useRef(new Animated.Value(0)).current;
    const searchBarOpacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const sortedMoves = movesData.sort((a, b) => a.move_name.localeCompare(b.move_name));
        setMoves(sortedMoves);
    }, []);

    useEffect(() => {
        if (isSearchVisible) {
            Animated.parallel([
                Animated.timing(searchBarWidth, {
                    toValue: width - 30,
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

    const filteredMoves = moves.filter(move =>
        searchQuery === '' || move.move_name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const renderMove = ({ item }) => (
        <View style={styles.move}>
            <View style={styles.moveDetails}>
                <Text style={styles.title}>{capitalize(item.move_name)}</Text>
                <View style={styles.typeContainer}>
                    <Text style={[styles.type, { backgroundColor: typeColors[item.type] }]}>
                        {capitalize(item.type)}
                    </Text>
                    {item.damage_class.includes('physical') && (
                        <Image source={physicalIcon} style={styles.moveIcon} />
                    )}
                    {item.damage_class.includes('special') && (
                        <Image source={specialIcon} style={styles.moveIcon} />
                    )}
                    {item.damage_class.includes('status') && (
                        <Image source={statusIcon} style={styles.moveIcon} />
                    )}
                </View>
                <View style={styles.statsContainer}>
                    <View style={styles.stat}>
                        <Text style={styles.detail}>Power</Text>
                        <Text style={styles.detail}>{item.power !== null ? item.power : '-'}</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.detail}>Accuracy</Text>
                        <Text style={styles.detail}>{item.accuracy !== null ? `${item.accuracy}%` : '-'}</Text>
                    </View>
                    <View style={styles.stat}>
                        <Text style={styles.detail}>PP</Text>
                        <Text style={styles.detail}>{item.pp !== null ? item.pp : 'N/A'}</Text>
                    </View>
                </View>
                <Text style={styles.effect}>
                    {item.flavor_text_entries ? item.flavor_text_entries.replace(/\n/g, ' ') : ''}
                </Text>
            </View>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.classicHeader}>Moves</Text>
                <View style={styles.searchIconContainer}>
                    <TouchableOpacity onPress={() => setIsSearchVisible(!isSearchVisible)}>
                        <Icon name="search" size={25} color="#fff" style={styles.searchIcon} />
                    </TouchableOpacity>
                    <Animated.View style={[styles.searchContainer, { width: searchBarWidth, opacity: searchBarOpacity }]}>
                        <TextInput
                            style={styles.searchInput}
                            placeholder="Search Moves"
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
                data={filteredMoves}
                renderItem={renderMove}
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
    move: {
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
    moveDetails: {
        flex: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    detail: {
        fontSize: 14,
        color: 'white',
    },
    effect: {
        fontSize: 14,
        color: 'white',
    },
    typeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: -8,
        marginBottom: 0,
    },
    type: {
        fontSize: 12,
        fontWeight: 'bold',
        textTransform: 'capitalize',
        color: '#fff',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 4,
        marginRight: 4,
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
        right: 0,
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
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    moveIcon: {
        width: 60,
        height: 60,
        marginLeft: 0,
        marginBottom: 0,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 0,
        marginBottom: 15,
    },
    stat: {
        flex: 1,
        alignItems: 'center',
    },
});

export default MovesScreen;