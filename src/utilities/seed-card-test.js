// let filePath = '../../../data/all-cards-large.json';
let filePath = './small-cards.json';
const StreamArray = require('stream-json/streamers/StreamArray');
const fs = require('fs');

const jsonStream = StreamArray.withParser();

//internal Node readable stream option, pipe to stream-json to convert it for us
fs.createReadStream(filePath).pipe(jsonStream.input);

let chunk = [];
const chunkSize = 3;

//You'll get json objects here
//Key is the array-index here
jsonStream.on('data', data => {
  // add new d to array
  chunk.push(data);

  // when array length == chunkSize
  if (chunk.length === chunkSize) {
    // console log and clear array
    console.log(chunk); // need to change console log to insert to db
    chunk = [];
  }
});

jsonStream.on('end', () => {
  // console log remaining chunk
  console.log(chunk); // need to change console log to insert to db
});
