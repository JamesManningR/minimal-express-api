/* eslint-disable node/prefer-promises/fs */
const fs = require("fs").promises;
const JsonDbSystem = require("./JsonDbSystem")


class ArrayTable extends JsonDbSystem {
  constructor(filePath) {
    super();
    this.filePath = filePath;
  }
}

module.exports = ArrayTable;
