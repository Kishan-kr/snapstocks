const mongoose = require('mongoose');
const Image = require('./Models/Image');
require('dotenv').config()
const URI = process.env.DATABASE_URI || "mongodb://localhost:27017/snapstock";

async function rebuildIndexes() {
  await Image.collection.dropIndexes(); // Drop all indexes
  await Image.syncIndexes(); // Rebuild indexes based on schema definitions
  console.log('Indexes rebuilt');
  const indexes = await Image.collection.getIndexes();
  console.log('indexes: ', indexes);
}

const connectToMongo = () => {
  mongoose.connect(URI).then(() => {
    console.log("connected to MongoDb successfully");
  })
  // .then(rebuildIndexes())
  .catch((err) => {
    console.log(err)
  });
}
module.exports = connectToMongo;