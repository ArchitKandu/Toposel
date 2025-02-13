const mongoose = require("mongoose");

const connectDatabase = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (err) {
    console.error("Error: ", err);
    process.exit(1);
  }
};

module.exports = connectDatabase;
