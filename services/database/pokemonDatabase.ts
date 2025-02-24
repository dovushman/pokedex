import { openDatabase } from './database';
import pokemonData from '../../assets/pokemonData.json';
import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase;

const initializeDatabase = async () => {
  db = await openDatabase('pokedex.db');
};

export const setupPokemonDatabase = async () => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS pokemon (
      id INTEGER PRIMARY KEY NOT NULL,
      base_id INTEGER,
      name TEXT NOT NULL,
      form TEXT,
      types TEXT NOT NULL,
      sprite TEXT NOT NULL,
      shinySprite TEXT NOT NULL
    );
  `);
  console.log('Table created successfully');

  for (const pokemon of pokemonData) {
    if (!pokemon.sprite) {
      console.warn('Skipping pokemon with null sprite:', pokemon);
      continue;
    }

    const shinySprite = pokemon.shinySprite || pokemon.sprite;

    try {
      console.log('Inserting pokemon:', pokemon);
      await db.runAsync(
        `INSERT OR REPLACE INTO pokemon (id, base_id, name, form, types, sprite, shinySprite) VALUES (?, ?, ?, ?, ?, ?, ?);`,
        pokemon.id, pokemon.base_id || null, pokemon.name, pokemon.form || null, JSON.stringify(pokemon.types), pokemon.sprite, shinySprite
      );
    } catch (error) {
      console.error('Error inserting pokemon:', pokemon, error);
    }
  }
  console.log('Data inserted successfully');
};

export const clearPokemonDatabase = async () => {
  await db.execAsync('DELETE FROM pokemon;');
  console.log('Database cleared successfully');
};

export const getPokemons = async () => {
  const result = await db.getAllAsync('SELECT * FROM pokemon;');
  console.log('Data fetched successfully:', result);
  return result;
};

// Initialize the database
initializeDatabase().then(() => {
  setupPokemonDatabase();
});