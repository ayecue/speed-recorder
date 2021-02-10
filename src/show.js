const { display } = require('./display')
const fs = require('fs');

const TARGET = './logs';

function show () {
  const files = fs.readdirSync(TARGET);
  const jsonFilePaths = files
    .filter((name) => /\.json$/i.test(name));
  const results = jsonFilePaths
    .map((file) => fs.readFileSync(`${TARGET}/${file}`))
    .map((content) => JSON.parse(content));

  display(results);
}

module.exports = show;
