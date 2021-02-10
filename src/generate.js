const { display } = require('./display')
const fs = require('fs');

const TARGET = './logs';
const JS_REF_FILE = './public/refs.js';

function generate () {
  const files = fs.readdirSync(TARGET);
  const jsonFilePaths = files
    .filter((name) => /\.json$/i.test(name));
  const results = jsonFilePaths
    .map((file) => fs.readFileSync(`${TARGET}/${file}`));

  fs.writeFileSync(JS_REF_FILE, `var records = [${results.join(',')}];`);
}

generate();
