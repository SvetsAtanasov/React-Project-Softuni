const mongoose = require("mongoose");

async function initDatabase(URL) {
  mongoose.set("strictQuery", false);

  await mongoose.connect(URL);
}

module.exports = { initDatabase };
