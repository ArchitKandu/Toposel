const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const connectDatabase = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(express.json());

connectDatabase();

app.get("/", (req, res) => {
  res.send("API is called !!");
});

app.use("/api", userRoutes);

const server = app.listen(
  process.env.PORT,
  console.log(`Server is started on PORT ${process.env.PORT} !!`)
);
