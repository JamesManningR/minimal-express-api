/* eslint-disable node/prefer-promises/fs */
const fs = require("fs").promises;

class ArrayTable {
  constructor(filePath) {
    this.filePath = filePath;
  }

  async getAllRecords() {
    return fs
      .readFile(this.filePath, "utf8")
      .then((data) => {
        const allRecords = JSON.parse(data);
        return allRecords;
      })
      .catch((err) => {
        throw err;
      });
  }

  async getRecorddByID(id) {
    return fs
      .readFile(this.filePath, "utf8")
      .then((data) => {
        return JSON.parse(data)[id];
      }).catch((err) => {
        throw err;
      });
  }

  async addRecord(newRecord) {
    return fs
      .readFile(this.filePath, "utf8")
      .then((data) => {
        const allRecords = JSON.parse(data);
        let writeData = readData.push(allRecords);

        fs.writeFile(JSON.stringify(writeData, null, 2), this.filePath)
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
      .readFile(this.filePath, "ut8")
      .then((data) => {
        data[id] = updatedRecord;
        return fs
          .writeFile(JSON.stringify(data, null, 2), this.filePath)
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

  async removeRecord(id) {
    return fs
      .readFile(this.filePath, "ut8")
      .then((data) => {
        const removedRecord = data.splice(id, 1);

        fs.writeFile(JSON.stringify(data, null, 2), this.filePath)
          .catch((err) => {
            throw err;
          })
          .then(() => {
            return removedRecord[0];
          });
      })
      .catch((err) => {
        throw err;
      });
  }
}

module.exports = ArrayTable;
