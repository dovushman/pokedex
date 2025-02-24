
import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

export const openDatabase = async (dbName: string) => {
  const db = await SQLite.openDatabaseAsync(dbName);
  console.log(`Database ${dbName} opened successfully`);
  return db;
};

export const copyDatabaseFile = async (dbName: string) => {
  const dbPath = `${FileSystem.documentDirectory}SQLite/${dbName}`;
  await FileSystem.copyAsync({
    from: dbPath,
    to: `${FileSystem.documentDirectory}${dbName}`,
  });
  console.log(`Database file copied to: ${dbPath}`);
};