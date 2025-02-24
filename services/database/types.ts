import * as SQLite from 'expo-sqlite';
import { openDB } from './database';  // Import the openDB function from the main database file

// Insert a type into the types table
export const insertType = async (name: string) => {
  const database = await openDB();
  await database.runAsync(
    `INSERT INTO types (name) VALUES (?);`,
    [name]
  );
  console.log('Type inserted successfully');
};

// Fetch all types from the types table
export const getTypes = async () => {
  const database = await openDB();
  const results = await database.getAllAsync('SELECT * FROM types;');
  return results;
};
