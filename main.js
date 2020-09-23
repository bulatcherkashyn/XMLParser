'use strict'
const path = require('path');
const Parser = require('./src/parser.js');
const Database  = require('./src/database.js');

(async () => {
  try {
    const pathToFile = process.argv[2];
    const db = new Database();
    const parser = new Parser(db);
    await parser.parse(path.resolve(__dirname, pathToFile));
  }
  catch(err) {
    console.log(err.message);
  }
})()
