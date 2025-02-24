//pokemon database
/*
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, Button } from 'react-native';
import { setupPokemonDatabase, getPokemons, clearPokemonDatabase } from '../services/database/pokemonDatabase';
import { copyDatabaseFile } from '../services/database/database';

const DetailsScreen = () => {
  const [pokemonList, setPokemonList] = useState([]);

  useEffect(() => {
    const initializeDatabase = async () => {
      await setupPokemonDatabase();
      const data = await getPokemons();
      console.log('Fetched data:', data);
      setPokemonList(data);
    };

    initializeDatabase();
  }, []);

  const handleCopyDatabase = async () => {
    await copyDatabaseFile('pokedex.db');
  };

  const handleClearAndRefillDatabase = async () => {
    await clearPokemonDatabase();
    await setupPokemonDatabase();
    const data = await getPokemons();
    setPokemonList(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pokédex</Text>
      <Button title="Copy Database" onPress={handleCopyDatabase} />
      <Button title="Clear and Refill Database" onPress={handleClearAndRefillDatabase} />
      <FlatList
        data={pokemonList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.sprite }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name} {item.form ? `(${item.form})` : ''}</Text>
              <Text style={styles.types}>{item.types.join(', ')}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text>No Pokémon found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  types: {
    fontSize: 16,
    color: '#555',
  },
});

export default DetailsScreen;
*/

//moves database
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button } from 'react-native';
import { setupMovesDatabase, getMoves, clearMovesDatabase } from '../services/database/movesDatabase';
import { copyDatabaseFile } from '../services/database/database';

const DetailsScreen = () => {
  const [movesList, setMovesList] = useState([]);

  useEffect(() => {
    const initializeDatabase = async () => {
      await setupMovesDatabase();
      const data = await getMoves();
      console.log('Fetched moves data:', data);
      setMovesList(data);
    };

    initializeDatabase();
  }, []);

  const handleCopyDatabase = async () => {
    await copyDatabaseFile('moves.db');
  };

  const handleClearAndRefillDatabase = async () => {
    await clearMovesDatabase();
    await setupMovesDatabase();
    const data = await getMoves();
    setMovesList(data);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Pokémon Moves</Text>
      <Button title="Copy Moves Database" onPress={handleCopyDatabase} />
      <Button title="Clear and Refill Moves Database" onPress={handleClearAndRefillDatabase} />
      <FlatList
        data={movesList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.name}>{item.move_name}</Text>
            <Text style={styles.details}>Type: {item.type}</Text>
            <Text style={styles.details}>Power: {item.power}</Text>
            <Text style={styles.details}>Damage Class: {item.damage_class}</Text>
            <Text style={styles.details}>Accuracy: {item.accuracy}</Text>
            <Text style={styles.details}>PP: {item.pp}</Text>
            <Text style={styles.details}>Effect Chance: {item.effect_chance}</Text>
            <Text style={styles.details}>Priority: {item.priority}</Text>
            <Text style={styles.details}>Secondary Effects: {item.secondary_effects}</Text>
            <Text style={styles.details}>Description: {item.description}</Text>
          </View>
        )}
        ListEmptyComponent={<Text>No moves found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 16,
    color: '#555',
  },
});

export default DetailsScreen;