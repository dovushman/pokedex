import * as SQLite from 'expo-sqlite';
import { openDB } from './database';  // Import the openDB function from the main database file

// Define an interface for the types table result
interface TypeResult {
  id: number;
  name: string;
}

// Insert a type matchup between two types with effectiveness value
export const insertTypeMatchup = async (type_name: string, matchup_type_name: string, effectiveness: number) => {
  const database = await openDB();

  const [typeResults, matchupTypeResults] = await Promise.all([
    database.getAllAsync(`SELECT id FROM types WHERE name = ?`, [type_name]),
    database.getAllAsync(`SELECT id FROM types WHERE name = ?`, [matchup_type_name])
  ]);

  const type = typeResults[0] as TypeResult;  // Assert the result to TypeResult
  const matchupType = matchupTypeResults[0] as TypeResult;  // Assert the result to TypeResult

  if (type && matchupType) {
    await database.runAsync(
      `INSERT INTO type_matchups (type_id, matchup_type_id, effectiveness) VALUES (?, ?, ?);`,
      [type.id, matchupType.id, effectiveness]
    );
    console.log(`Type matchup inserted between ${type_name} and ${matchup_type_name}`);
  }
};

// Fetch all type matchups from the type_matchups table
export const getTypeMatchups = async () => {
  const database = await openDB();
  const results = await database.getAllAsync('SELECT * FROM type_matchups;');
  return results;
};

// Fetch type matchups for a specific type (i.e., its effectiveness against other types)
export const getTypeEffectiveness = async (type_name: string) => {
  const database = await openDB();

  const typeResults = await database.getAllAsync(`SELECT id FROM types WHERE name = ?`, [type_name]);

  const type = typeResults[0] as TypeResult;  // Assert the result to TypeResult

  if (type) {
    const matchups = await database.getAllAsync(
      `SELECT t1.name AS type, t2.name AS matchup_type, tm.effectiveness
       FROM type_matchups tm
       JOIN types t1 ON tm.type_id = t1.id
       JOIN types t2 ON tm.matchup_type_id = t2.id
       WHERE t1.id = ?`,
      [type.id]
    );
    return matchups;
  }

  return [];
};
