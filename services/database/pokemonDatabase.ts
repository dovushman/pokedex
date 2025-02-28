import { openDatabase } from './database';
import * as SQLite from 'expo-sqlite';
import pokemonData from '../../assets/pokemonData.json';

interface Pokemon {
  id: number;
  base_id: number | null;
  name: string;
  form: string | null;
  types: string[];
  sprite: string;
  shinySprite: string;
  height: number;
  weight: number;
  pokedexEntries: { version: string; text: string }[];
  abilities: { id: number; name: string; is_hidden: boolean; slot: number }[];
}

let db: SQLite.SQLiteDatabase;

const initializeDatabase = async () => {
  db = await SQLite.openDatabaseAsync('pokedex.db');
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
      shinySprite TEXT NOT NULL,
      height INTEGER,
      weight INTEGER,
      pokedexEntries TEXT,
      abilities TEXT
    );
  `);
  console.log('Table created successfully');

  const existingData = await db.getAllAsync('SELECT * FROM pokemon;');
  if (existingData.length === 0) {
    for (const pokemon of pokemonData as Pokemon[]) {
      if (!pokemon.sprite) {
        console.warn('Skipping pokemon with null sprite:', pokemon);
        continue;
      }

      const shinySprite = pokemon.shinySprite || pokemon.sprite;

      try {
        // Insert Pokémon data into the database
        await db.runAsync(
          `INSERT OR REPLACE INTO pokemon (id, base_id, name, form, types, sprite, shinySprite, height, weight, pokedexEntries, abilities) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
          [
            pokemon.id,
            pokemon.base_id || null,
            pokemon.name,
            pokemon.form || null,
            JSON.stringify(pokemon.types),
            pokemon.sprite,
            shinySprite,
            pokemon.height,
            pokemon.weight,
            JSON.stringify(pokemon.pokedexEntries),
            JSON.stringify(pokemon.abilities)
          ]
        );
      } catch (error) {
        console.error('Error inserting pokemon:', pokemon, error);
      }
    }
    console.log('Data inserted successfully');
  } else {
    console.log('Data already exists, skipping insertion');
  }
};

export const clearPokemonDatabase = async () => {
  await db.execAsync('DELETE FROM pokemon;');
  console.log('Database cleared successfully');
};

export const getPokemons = async () => {
  const result = await db.getAllAsync('SELECT * FROM pokemon;');
  // console.log('Data fetched successfully:', result);
  return result;
};

export const getPokemonFormsByBaseId = async (baseId: number) => {
  const result = await db.getAllAsync('SELECT * FROM pokemon WHERE base_id = ? OR id = ?;', [baseId, baseId]);
  // console.log('Forms fetched successfully:', result);
  return result;
};

// Initialize the database
initializeDatabase().then(() => {
  setupPokemonDatabase();
});