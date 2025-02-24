import * as SQLite from 'expo-sqlite';
import * as FileSystem from 'expo-file-system';

let db: SQLite.SQLiteDatabase;

const openDatabase = async () => {
  db = await SQLite.openDatabaseAsync('moves.db');
  console.log('Moves database opened successfully');
};

export const setupMovesDatabase = async () => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS moves (
      id INTEGER PRIMARY KEY NOT NULL,
      move_name TEXT NOT NULL,
      type TEXT NOT NULL,
      power INTEGER,
      damage_class TEXT NOT NULL,
      accuracy INTEGER,
      pp INTEGER NOT NULL,
      effect_chance INTEGER,
      priority INTEGER,
      secondary_effects TEXT,
      description TEXT
    );
  `);
  console.log('Moves table created successfully');

  // Insert moves data here (you can replace this with actual data)
  const movesData = [
    {
      id: 1,
      move_name: 'Thunderbolt',
      type: 'Electric',
      power: 90,
      damage_class: 'Special',
      accuracy: 100,
      pp: 15,
      effect_chance: 10,
      priority: 0,
      secondary_effects: 'Paralyze',
      description: 'A strong electric blast crashes down on the target. This may also leave the target with paralysis.'
    },
    // Add more moves data here
  ];

  for (const move of movesData) {
    try {
      console.log('Inserting move:', move);
      await db.runAsync(
        `INSERT OR REPLACE INTO moves (id, move_name, type, power, damage_class, accuracy, pp, effect_chance, priority, secondary_effects, description) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
        move.id, move.move_name, move.type, move.power, move.damage_class, move.accuracy, move.pp, move.effect_chance, move.priority, move.secondary_effects, move.description
      );
    } catch (error) {
      console.error('Error inserting move:', move, error);
    }
  }
  console.log('Moves data inserted successfully');
};

export const clearMovesDatabase = async () => {
  await db.execAsync('DELETE FROM moves;');
  console.log('Moves database cleared successfully');
};

export const getMoves = async () => {
  const result = await db.getAllAsync('SELECT * FROM moves;');
  console.log('Moves data fetched successfully:', result);
  return result;
};

// Initialize the database
openDatabase().then(() => {
  setupMovesDatabase();
});