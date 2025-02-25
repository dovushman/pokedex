import { openDatabase } from './database';
import * as SQLite from 'expo-sqlite';
import naturesData from '../../assets/naturesData.json';

let db: SQLite.SQLiteDatabase;

const initializeDatabase = async () => {
  db = await openDatabase('pokedex.db');
};

export const setupNaturesDatabase = async () => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS natures (
      id INTEGER PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      increased_stat TEXT,
      decreased_stat TEXT,
      likes_flavor TEXT,
      hates_flavor TEXT
    );
  `);
  console.log('Table created successfully');

  for (const nature of naturesData) {
    try {
      // console.log('Inserting nature:', nature);
      await db.runAsync(
        `INSERT OR REPLACE INTO natures (id, name, increased_stat, decreased_stat, likes_flavor, hates_flavor) VALUES (?, ?, ?, ?, ?, ?);`,
        [nature.id, nature.name, nature.increased_stat || null, nature.decreased_stat || null, nature.likes_flavor || null, nature.hates_flavor || null]
      );
      // console.log('Nature inserted successfully');
    } catch (error) {
      console.error('Error inserting nature:', nature, error);
    }
  }
  console.log('Data inserted successfully');
};

export const clearNaturesDatabase = async () => {
  await db.execAsync('DELETE FROM natures;');
  console.log('Database cleared successfully');
};

export const getNatures = async () => {
  const natures = await db.getAllAsync('SELECT * FROM natures;');
  console.log('Data fetched successfully:', natures);
  return natures;
};

// Initialize the database
initializeDatabase().then(() => {
  setupNaturesDatabase();
});