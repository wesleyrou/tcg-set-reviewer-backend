// First need to download bulk card data from scryfall
// https://scryfall.com/docs/api/bulk-data

// 'src/utilities/small-cards.json'
require('dotenv').config();

let filePath = process.env.bulk_data_location || '../data/all-cards-large.json'; // set filePath to where the downloaded bulk data is located
const StreamArray = require('stream-json/streamers/StreamArray');
const fs = require('fs');

const CardsService = require('../src/cards/cards-service');
const SetsService = require('../src/sets/set-service');

const knex = require('knex');
const { DATABASE_URL } = require('../src/config');

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
});

const jsonStream = StreamArray.withParser();

// internal Node readable stream option, pipe to stream-json to convert it for us
fs.createReadStream(filePath).pipe(jsonStream.input);

let allSetIdsAndCodes = {};
let chunk = [];
const chunkSize = 1000; // may need to lower

SetsService.getAllSets(db)
  .then(allSets => {
    allSets.forEach(set => {
      allSetIdsAndCodes[set.code] = set.id;
    });
    startStreamManager();
  })
  .catch(error => {
    console.error(error);
  });

const startStreamManager = () => {
  jsonStream.on('data', cardData => {
    let cardDataWithID = {
      ...cardData.value,
      set_id: allSetIdsAndCodes[cardData.value.set]
    };

    chunk.push(cardDataWithID);

    if (chunk.length === chunkSize) {
      formatAndInsertToDB(chunk);
      chunk = []; // clear array
    }
  });

  jsonStream.on('end', () => {
    formatAndInsertToDB(chunk); // format and insert remaining chunk
    console.log('card seed complete');
  });
};

const formatAndInsertToDB = (cards) => {
  // format cards
  let chunkToExport = CardsService.formatCards(cards);

  // insert into db
  CardsService.postCards(db, chunkToExport)
    .catch(error => {
      console.error(error);
    });
};