const ArrayTable = require("./ArrayTable");

const posts = new ArrayTable("db/data/data.json");

module.exports = { posts }