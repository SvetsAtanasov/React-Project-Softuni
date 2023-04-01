const mongoose = require("mongoose");
const { DB_URL } = require("../config/config");

async function initDatabase() {
  mongoose.set("strictQuery", false);

  await mongoose.connect(DB_URL);

  console.log(DB_URL + " Connected");
}

module.exports = { initDatabase };
