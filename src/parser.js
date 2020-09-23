'use strict'
const fs = require('fs');
const XMLStream = require('xml-stream');

class Parser {
  constructor(db) {
    this.db = db;
  }
  async parse(filePath) {
    try {
      fs.accessSync(filePath, fs.constants.R_OK | fs.constants.F_OK);
      const stream = fs.createReadStream(filePath);
      const xml = new XMLStream(stream)
      await new Promise((res, rej) => {
        xml.on('end', data => {
          res();
        })

        xml.on('endElement: FileDump > Message', messageItem => {
          if (messageItem.Message.hasOwnProperty('script')) {
            messageItem.Message = messageItem.Message['$text']
          }
          this.db.save(JSON.stringify(messageItem));
        })
      })
    }
    catch(err) {
      console.log(err.message);
    }

  }
}
module.exports = Parser;
