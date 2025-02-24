const fs = require('fs');
const path = require('path');

const MOVES_DATA_FILE = path.join(__dirname, '../../assets/movesData.json');
const GEN9_MOVE_INFO_FILE = path.join(__dirname, '../../assets/pokemondatabaseGen9MoveInfo.json');

const combineMoveData = async () => {
  try {
    const movesData = JSON.parse(fs.readFileSync(MOVES_DATA_FILE, 'utf8'));
    const gen9MoveInfo = JSON.parse(fs.readFileSync(GEN9_MOVE_INFO_FILE, 'utf8'));

    const updatedMovesData = movesData.map(move => {
      const moveName = move.move_name.toLowerCase().replace(/ /g, '-');
      if (gen9MoveInfo[moveName]) {
        move.effect = gen9MoveInfo[moveName].effect || move.effect;
        if (gen9MoveInfo[moveName].description) {
          move.flavor_text_entries.push({
            flavor_text: gen9MoveInfo[moveName].description
          });
        }
      }
      return move;
    });

    fs.writeFileSync(MOVES_DATA_FILE, JSON.stringify(updatedMovesData, null, 2));
    console.log('Moves data updated successfully');
  } catch (error) {
    console.error('Error combining move data:', error);
  }
};

combineMoveData();