const axios = require('axios');
const fs = require('fs');
const readline = require('readline');

const url = 'https://2swdepm0wa.execute-api.us-east-1.amazonaws.com/prod/NavaInterview/measures​';
const schema = [];

const lineReader = readline.createInterface({
  input: fs.createReadStream('./schemas/booleanmeasures.csv')
});

lineReader.on('line', line => {
  const data = line.split(',');
  schema.push({
    // name of that column in the database table
    name: data[0],
    // characters used by the column in the data file
    width: data[1],
    // SQL data type that should be used to store the value in the database table.
    // Acceptable values are TEXT, INTEGER and BOOLEAN.
    datatype: data[2]
  });
});

lineReader.on('close', () => {
  console.log(schema);
});

// axios.get(url)
//   .then(res => {
//     console.log(response);
//   })
//   .catch(err => {
//     console.log(`Error: ${err}`);
//   });
