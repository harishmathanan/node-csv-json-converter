const fs = require('fs');
const path = require('path');

const csvToJSON = (fileName) => {
  console.log('file conversion in progress...');

  // get file content
  fs.readFile(path.join(__dirname, fileName), 'utf8', (err, data) => {
    if (err) {
      console.log(`ERROR reading the input CSV file. \n ${err.message}`);
    }

    // break content into data rows
    const lines = data.split('\n');
    // first row is headers for JSON properties
    const headers = lines[0].split(',');

    const jsonContent = createJSON(lines, headers);
    const jsonFilename = path.parse(fileName).name + '.json';

    fs.writeFile(path.join(__dirname, jsonFilename), jsonContent, (err) => {
      if (err) {
        console.log(`ERROR writing the output JSON file. \n ${err.message}`);
      }

      console.log('file conversion completed');
    });
  });
}

const createJSON = (dataRows, dataHeaders) => {
  let results = [];

  for (let i = 1, ilen = dataRows.length; i < ilen; i += 1) { // ignore the first header line
    let item = {};
    let dataColumns = dataRows[i].split(','); // break line (row) into columns

    for (let x = 1, xlen = dataHeaders.length; x < xlen; x += 1) {
      item[dataHeaders[x]] = dataColumns[x];
    }

    results.push(item);
  }

  return JSON.stringify(results);
}

csvToJSON(process.argv[2]);
