const axios = require('axios');
const fs = require('fs');
const readline = require('readline');

const url = 'https://2swdepm0wa.execute-api.us-east-1.amazonaws.com/prod/NavaInterview/measures​';
const schema = [];

const schemaReader = readline.createInterface({
  input: fs.createReadStream('./schemas/booleanmeasures.csv')
});

schemaReader.on('line', line => {
  const data = line.split(',');
  schema.push({
    // name of that column in the database table
    name: data[0],
    // characters used by the column in the data file
    width: parseInt(data[1]),
    // SQL data type that should be used to store the value in the database table.
    // Acceptable values are TEXT, INTEGER and BOOLEAN.
    datatype: data[2]
  });
});


schemaReader.on('close', () => {
  const dataReader = readline.createInterface({
    input: fs.createReadStream('./data/booleanmeasures.txt')
  });

  dataReader.on('line', line => {
    console.log(getParsedData(line));

    // axios.post(url)
    //   .then(res => {
    //     console.log(response);
    //   })
    //   .catch(err => {
    //     console.log(`Error: ${err}`);
    //   });
  });
});



/**
 * Method used to parse the csv line data into object.
 *
 * @param {String} line
 * @return {Object}
 */
function getParsedData(line) {
  const parsedData = {};
  let temp = line;

  schema.forEach(val => {
    if (val.datatype == 'TEXT')
      parsedData[val.name] = temp.slice(0, val.width).trim();

    else if (val.datatype === 'BOOLEAN')
      parsedData[val.name] = Boolean(temp.slice(0, val.width));

    else if (val.datatype === 'INTEGER')
      parsedData[val.name] = parseInt(temp.slice(0, val.width));

    temp = temp.slice(val.width);
  });

  return parsedData
}

