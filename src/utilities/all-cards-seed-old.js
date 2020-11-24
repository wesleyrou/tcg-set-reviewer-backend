const fs = require('fs');

// let filePath = '../../../data/all-cards-large.json';
let filePath = './cards-small.json';
let stream = fs.createReadStream(filePath, { flags: 'r', encoding: 'utf-8' });
let buffer = '';

stream.on('data', function (d) {
  buffer += d.toString(); // when data is read, stash it in a string buffer
  pump(); // then process the buffer
});

function pump() {
  let pos;

  while ((pos = buffer.indexOf('\n')) >= 0) { // keep going while there's a newline somewhere in the buffer

    if (pos === 0) { // if there's more than one newline in a row, the buffer will now start with a newline
      buffer = buffer.slice(1); // discard it
      continue; // so that the next iteration will start with the data
    }

    processLine(buffer.slice(0, pos)); // hand off the line
    buffer = buffer.slice(pos + 1); // and slice the processed data off the buffer
  }
}

function processLine(line) { // here is where we do something with a line
  // console.log(line);

  if (line[line.length - 1] === '\r')
    line = line.substr(0, line.length - 1); // discard CR (0x0D)

  if (line.length > 0) { // ignore empty lines
    let cardObject = JSON.parse(line); // parse the JSON
    console.log('cardObject: ', cardObject); // do something with the data here!
  }
}
