const fs = require('fs');
const path = require('path');

const csvToJSON = (fileName) => {
  console.log('file conversion in progress...');

  // get file content
  fs.readFile(path.join(__dirname, fileName), 'utf8', (err, data) => {
    if (err) {
      console.log('ERROR reading the input CSV file.');
      console.log(err.message);
    }

    // break file data into lines
    const lines = data.split('\n');
    // first line is headers for JSON properties
    const headers = lines[0].split(',');

    // begin building JSON
    let results = [];

    for (let i = 1, ilen = lines.length; i < ilen; i += 1) { // ignore the first header line
      let item = {};
      let currentLine = lines[i].split(','); // break line (row) into columns

      for (let x = 1, xlen = headers.length; x < xlen; x += 1) {
        item[headers[x]] = currentLine[x];
      }

      results.push(item);
    }


    const jsonFileName = path.parse(fileName).name + '.json';

    // ensure JSON results are stringified
    fs.writeFile(path.join(__dirname, jsonFileName), JSON.stringify(results), (err) => {
      if (err) {
        console.log('ERROR writing the output JSON file.');
        console.log(err.message);
      }

      console.log('file conversion completed');
    });
  });
}

csvToJSON(process.argv[2]);
