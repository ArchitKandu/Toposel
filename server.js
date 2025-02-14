// Configuring dotenv to use .env files to access Database URI and other sensitive data.
const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connectDatabase = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

const app = express();
app.use(express.json());

// Connecting to MongoDB Atlas database
connectDatabase();

// Test API to check if server is running
app.get("/", (req, res) => {
  res.send("API is called !!");
});

// API routes for user related operations like register, login and search
app.use("/api", userRoutes);

// Ensuring proper middleware that responds when no such routes are found and other errors
app.use(notFound);
app.use(errorHandler);

// Mention which port is server running in local network
const server = app.listen(
  process.env.PORT,
  console.log(`Server is started on PORT ${process.env.PORT} !!`)
);
