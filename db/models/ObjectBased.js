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

        fs.writeFile(this.filePath, JSON.stringify(records))
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

  async updateRecord(id, updatedRecord) {
    return fs
      .readFile(this.filePath, "utf-8")
      .then((data) => {
        let parsedData = JSON.parse(data);
        parsedData[id] = updatedRecord;
        return fs
          .writeFile(this.filePath, JSON.stringify(parsedData))
          .catch((err) => {
            throw err;
          })
          .then(() => {
            return updatedRecord;
          });
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = ObjectBasedTable;
