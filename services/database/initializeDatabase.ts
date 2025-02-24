// import { openDB } from './database';  // Import the openDB function
// import pokemonData from '../../assets/pokemonData.json';  // Import your JSON data

// // Initialize the database and insert data
// export const initializeDatabase = async () => {
//     const db = await openDB();  // Open the database
  
//     if (db) {
//       // Create tables
//       await db.withTransactionAsync(async () => {
//         // Create Pokémon table
//         await db.execAsync(`
//           CREATE TABLE IF NOT EXISTS pokemon (
//             id INTEGER PRIMARY KEY NOT NULL,
//             name TEXT,
//             sprite TEXT,
//             shinySprite TEXT
//           )
//         `);
  
//         // Create types table
//         await db.execAsync(`
//           CREATE TABLE IF NOT EXISTS types (
//             id INTEGER PRIMARY KEY NOT NULL,
//             typeName TEXT
//           )
//         `);
  
//         // Create pokemon_types join table
//         await db.execAsync(`
//           CREATE TABLE IF NOT EXISTS pokemon_types (
//             pokemon_id INTEGER,
//             type_id INTEGER,
//             FOREIGN KEY (pokemon_id) REFERENCES pokemon(id),
//             FOREIGN KEY (type_id) REFERENCES types(id)
//           )
//         `);
//       });
  
//       // Insert Pokémon data and types asynchronously
//       await db.withTransactionAsync(async () => {
//         for (const pokemon of pokemonData) {
//           // Insert the Pokémon into the pokemon table
//           await db.execAsync({
//             sql: 'INSERT INTO pokemon (id, name, sprite, shinySprite) VALUES (?, ?, ?, ?)',
//             params: [pokemon.id, pokemon.name, pokemon.sprite, pokemon.shinySprite]
//           });
      
//           // Insert the types into the types table and relate them to Pokémon
//           for (const type of pokemon.types) {
//             // Insert the type if not already in the types table
//             await db.execAsync({
//               sql: 'INSERT OR IGNORE INTO types (typeName) VALUES (?)',
//               params: [type]
//             });
      
//             // Get the type_id of the inserted type
//             const result = await db.getFirstAsync<{ id: number }>({
//               sql: 'SELECT id FROM types WHERE typeName = ?',
//               params: [type]
//             });
//             if (result?.id) {
//               // Insert the Pokémon's type into pokemon_types table
//               await db.execAsync({
//                 sql: 'INSERT INTO pokemon_types (pokemon_id, type_id) VALUES (?, ?)',
//                 params: [pokemon.id, result.id]
//               });
//             }
//           }
//         }
//       });
  
//       console.log('Database initialized with Pokémon data.');
//     }
//   };