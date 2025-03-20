import fs from 'fs';
import fetch from 'node-fetch';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert __dirname to work with ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SPRITES_URL = 'https://play.pokemonshowdown.com/sprites/dex/';
const SPRITES_DATA_FILE = path.join(__dirname, '../../assets/pokemonSprites.json');

const fetchAndSaveShowdownSprites = async () => {
  try {
    const response = await fetch(SPRITES_URL);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

    const spriteList = await response.text();
    const spriteUrls = spriteList.match(/href="([^"]+\.png)"/g).map(href => href.replace(/href="|"/g, ''));

    const spriteData = spriteUrls.map(spriteUrl => ({
      name: spriteUrl.replace('.png', ''),
      url: `${SPRITES_URL}${spriteUrl}`
    }));

    // Ensure the assets directory exists
    const assetsDir = path.dirname(SPRITES_DATA_FILE);
    if (!fs.existsSync(assetsDir)) {
      console.log("Creating assets directory:", assetsDir);
      fs.mkdirSync(assetsDir, { recursive: true });
    }

    // Save to file
    console.log("Saving Showdown sprites data to:", SPRITES_DATA_FILE);
    fs.writeFileSync(SPRITES_DATA_FILE, JSON.stringify(spriteData, null, 2));
    console.log("Showdown sprites data saved successfully!");

  } catch (error) {
    console.error('Error fetching and saving Showdown sprites data:', error);
  }
};

fetchAndSaveShowdownSprites();