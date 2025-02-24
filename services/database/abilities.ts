// import * as SQLite from 'expo-sqlite';
// import { openDB } from './database';

// export const createPokemonTable = async () => {
//   const db = await openDB();
//   await db.execAsync(`
//     CREATE TABLE IF NOT EXISTS pokemon (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       name TEXT NOT NULL,
//       type TEXT NOT NULL,
//       base_stat INTEGER NOT NULL
//     );
//   `);
// };

// export const insertPokemon = async (name: string, type: string, base_stat: number) => {
//   const db = await openDB();
//   await db.runAsync(
//     `INSERT INTO pokemon (name, type, base_stat) VALUES (?, ?, ?);`,
//     [name, type, base_stat]
//   );
// };

// export const getPokemon = async () => {
//   const db = await openDB();
//   const results = await db.getAllAsync('SELECT * FROM pokemon;');
//   return results;
// };
