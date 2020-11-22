// First need to download bulk card data from scryfall
// https://scryfall.com/docs/api/bulk-data

// let filePath = '../../../data/all-cards-large.json';
let filePath = './small-cards.json'; // set filePath to where the downloaded bulk data is located
const StreamArray = require('stream-json/streamers/StreamArray');
const fs = require('fs');

const CardsService = require('../cards/cards-service');
const SetsService = require('../sets/set-service');

const knex = require('knex');
const { DATABASE_URL } = require('../config');

const jsonStream = StreamArray.withParser();

const db = knex({
  client: 'pg',
  connection: DATABASE_URL,
});

// internal Node readable stream option, pipe to stream-json to convert it for us
fs.createReadStream(filePath).pipe(jsonStream.input);

SetsService.getAllSets(db)
  .then(allSets => {
    console.log(allSets);
  })
  .catch(error => {
    console.error(error);
  });

let chunk = [];
const chunkSize = 3;

jsonStream.on('data', cardData => {
  chunk.push(cardData.value);

  if (chunk.length === chunkSize) {
    formatAndInsertToDB(chunk);
    chunk = []; // clear array
  }
});

jsonStream.on('end', () => {
  formatAndInsertToDB(chunk); // format and insert remaining chunk
});

const formatAndInsertToDB = (cards) => {
  // format cards
  console.log(CardsService.formatCards(cards));

  // insert into db

};