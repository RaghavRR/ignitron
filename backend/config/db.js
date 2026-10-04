const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(
      process.env.MONGO_URI,
      {
        serverSelectionTimeoutMS: 10000,
      }
    );

    console.log(
      `MongoDB connected: ${connection.connection.host}`
    );

    return connection;
  } catch (err) {
    console.error(
      'MongoDB connection error:',
      err.message
    );

    throw err;
  }
};

module.exports = connectDB;