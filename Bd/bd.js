const mongoose = require('mongoose');
const { mongodbUrl } = require('../Config/config.js');

async function connectDB() {
  try {
    await mongoose.connect(mongodbUrl, {
      //useNewUrlParser: true,
      //useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout for server selection
      socketTimeoutMS: 45000, // 45 seconds timeout for socket connection
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

module.exports = connectDB;
