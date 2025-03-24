import fs from 'fs';
import path from 'path';
import movesWithDashes from '../utils/movesWithDashes.js';

const movesDataPath = path.join(path.dirname(new URL(import.meta.url).pathname), '../assets/movesData.json');
const movesData = JSON.parse(fs.readFileSync(movesDataPath, 'utf-8'));

// Create a map for faster lookup of moves that should include dashes
const movesWithDashesMap = new Map(
    movesWithDashes.map(move => [move.toLowerCase().replace(/-/g, ' '), move])
);

// List of moves that should have both physical and special damage classes
const specialMoves = [
    "breakneck blitz",
    "all out pummeling",
    "supersonic skystrike",
    "acid downpour",
    "tectonic rage",
    "continental crush",
    "savage spin out",
    "never ending nightmare",
    "corkscrew crash",
    "inferno overdrive",
    "hydro vortex",
    "bloom doom",
    "gigavolt havoc",
    "shattered psyche",
    "subzero slammer",
    "devastating drake",
    "black hole eclipse",
    "twinkle tackle"
];

// Temporary storage to merge duplicates
const moveMap = new Map();

movesData.forEach(move => {
    let moveName = move.move_name.trim(); // Trim to remove accidental spaces

    // Normalize move names (replace dashes unless they should be kept)
    if (moveName.includes('-')) {
        const lowerCaseMove = moveName.toLowerCase().replace(/-/g, ' ');
        if (movesWithDashesMap.has(lowerCaseMove)) {
            move.move_name = movesWithDashesMap.get(lowerCaseMove);
        } else {
            move.move_name = moveName.replace(/-/g, ' ');
        }
    }

    // Extract base move name by removing " physical" or " special"
    const baseMoveName = moveName.replace(/\s(physical|special)$/, '').trim();

    if (!moveMap.has(baseMoveName)) {
        // First time seeing this move, store it in the map
        move.move_name = baseMoveName;
        move.damage_class = [move.damage_class]; // Convert to array
        moveMap.set(baseMoveName, move);
    } else {
        const existingMove = moveMap.get(baseMoveName);

        if (move.flavor_text_entries === "Dummy Data") {
            // Skip this move, keeping the existing one
            return;
        } else if (existingMove.flavor_text_entries === "Dummy Data") {
            // Replace the existing one with the new one
            move.move_name = baseMoveName;
            move.damage_class = [move.damage_class]; // Convert to array
            moveMap.set(baseMoveName, move);
        } else {
            // Ensure `damage_class` is an array
            if (typeof existingMove.damage_class === "string") {
                existingMove.damage_class = [existingMove.damage_class];
            }

            // Ensure both physical and special exist in the array
            if (move.damage_class && !existingMove.damage_class.includes(move.damage_class)) {
                existingMove.damage_class.push(move.damage_class);
            }
        }
    }
});

// Convert map back to array
const updatedMovesData = Array.from(moveMap.values()).map(move => {
    // Ensure damage_class has only unique values and is an array
    move.damage_class = [...new Set(move.damage_class)];

    // Manually combine damage classes for special moves
    if (specialMoves.includes(move.move_name.toLowerCase())) {
        move.damage_class = ["physical", "special"];
    }

    return move;
});

fs.writeFileSync(movesDataPath, JSON.stringify(updatedMovesData, null, 2), 'utf-8');

console.log('Moves data updated successfully.');