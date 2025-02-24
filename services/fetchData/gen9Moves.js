const fs = require('fs');
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');

const GEN9_MOVES_URL = 'https://pokemondb.net/move/generation/9';
const OUTPUT_FILE = path.join(__dirname, '../../assets/pokemondatabaseGen9MoveInfo.json');

const fetchMoveDetails = async (url) => {
    try {
        const response = await axios.get(url);
        const $ = cheerio.load(response.data);

        const effect = $('h2:contains("Effect")').next('p').text().trim() || null;

        // Debug: Print the full HTML of the game descriptions table
        console.log(`\nFetching: ${url}`);
        console.log("Game Descriptions Table HTML:");
        console.log($('h2#move-descr').next('table').html());

        // Debug: Print all headers in the table to check for formatting issues
        $('h2#move-descr').next('table').find('tr').each((_, el) => {
            console.log("Found Header:", $(el).find('th').text().trim());
        });

        const description = $('h2#move-descr').next('table').find('tr').filter((_, el) => {
            const headerText = $(el).find('th').text().trim();
            return headerText.includes("Scarlet") || headerText.includes("Violet");
        }).find('td').text().trim() || null;

        // Debug: Print the extracted description
        console.log("Extracted Description:", description);

        return { effect, description };
    } catch (error) {
        console.error(`Error fetching move details from ${url}:`, error);
        return { effect: null, description: null };
    }
};

const fetchGen9MovesData = async () => {
    try {
        const response = await axios.get(GEN9_MOVES_URL);
        const $ = cheerio.load(response.data);

        const movesData = {};

        const movePromises = $('table.data-table tbody tr').map(async (index, element) => {
            const moveName = $(element).find('td.cell-name a').text().toLowerCase().replace(/ /g, '-');
            const moveUrl = `https://pokemondb.net${$(element).find('td.cell-name a').attr('href')}`;

            const { effect, description } = await fetchMoveDetails(moveUrl);

            movesData[moveName] = {
                effect: effect || null,
                description: description || null
            };
        }).get();

        await Promise.all(movePromises);

        return movesData;
    } catch (error) {
        console.error('Error fetching Gen 9 moves data:', error);
        return {};
    }
};

const saveGen9MovesData = async () => {
    try {
        const gen9MovesData = await fetchGen9MovesData();
        fs.writeFileSync(OUTPUT_FILE, JSON.stringify(gen9MovesData, null, 2));
        console.log('Gen 9 moves data saved to', OUTPUT_FILE);
    } catch (error) {
        console.error('Error saving Gen 9 moves data:', error);
    }
};

saveGen9MovesData();


// const fs = require('fs');
// const path = require('path');
// const axios = require('axios');
// const cheerio = require('cheerio');

// const GEN9_MOVES_URL = 'https://bulbapedia.bulbagarden.net/wiki/Category:Generation_IX_moves';
// const OUTPUT_FILE = path.join(__dirname, '../../assets/pokemondatabaseGen9MoveInfo.json');

// const fetchMoveDetails = async (url) => {
//   try {
//     const response = await axios.get(url);
//     const $ = cheerio.load(response.data);

//     const effect = $('h2:contains("Effect")').next('p').text().trim() || null;
//     const description = $('h2:contains("Description")').next('table').find('tr:contains("SV") td').last().text().trim() || null;

//     return { effect, description };
//   } catch (error) {
//     console.error(`Error fetching move details from ${url}:`, error);
//     return { effect: null, description: null };
//   }
// };

// const fetchGen9MovesData = async () => {
//   try {
//     const response = await axios.get(GEN9_MOVES_URL);
//     const $ = cheerio.load(response.data);

//     const movesData = {};

//     const movePromises = $('div#mw-pages div.mw-category-group ul li a').map(async (index, element) => {
//       const moveName = $(element).text().toLowerCase().replace(/ /g, '-').replace(/[()]/g, '');
//       const moveUrl = `https://bulbapedia.bulbagarden.net${$(element).attr('href')}`;

//       const { effect, description } = await fetchMoveDetails(moveUrl);

//       movesData[moveName] = {
//         effect: effect || null,
//         description: description || null
//       };
//     }).get();

//     await Promise.all(movePromises);

//     return movesData;
//   } catch (error) {
//     console.error('Error fetching Gen 9 moves data:', error);
//     return {};
//   }
// };

// const saveGen9MovesData = async () => {
//   try {
//     const gen9MovesData = await fetchGen9MovesData();
//     fs.writeFileSync(OUTPUT_FILE, JSON.stringify(gen9MovesData, null, 2));
//     console.log('Gen 9 moves data saved to', OUTPUT_FILE);
//   } catch (error) {
//     console.error('Error saving Gen 9 moves data:', error);
//   }
// };

// saveGen9MovesData();