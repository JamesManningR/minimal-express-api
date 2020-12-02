/* eslint-disable node/prefer-promises/fs */
const fs = require("fs").promises;
const JsonDbSystem = require("./JsonDbSystem");

const { v4: uuidv4 } = require('uuid');

class ObjectBasedTable extends JsonDbSystem {
  constructor(filePath) {
    super();
    this.filePath = filePath;
  }

  async addRecord(newRecord) {
    return fs
      .readFile(this.filePath, "utf8")
      .then((data) => {
        let records = JSON.parse(data);

        let id = uuidv4();
        while (records[id] != undefined) {
          id = uuidv4;
        }

        records[id] = newRecord;

        fs.writeFile(JSON.stringify(records, null, 2), this.filePath)
          .then(() => {
            return newRecord;
          })
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = ObjectBasedTable;
