// Using mongoose npm package to smoothly perform database operations
const mongoose = require("mongoose");

const connectDatabase = async () => {
  // Connecting to database using Mongodb URI from .env file
  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI);

    // Logs host when database is successfully connected
    console.log(`MongoDB connected: ${connect.connection.host}`);
  } catch (err) {
    // Handle errors that may occur and exit the process safely
    console.error("Error: ", err);
    process.exit(1);
  }
};

module.exports = connectDatabase;
