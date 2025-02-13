const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const { connectDatabase } = require("./config/db");

const app = express();
app.use(express.json());

connectDatabase().catch(console.dir);

app.get("/", (req, res) => {
  res.send("API is called !!");
});

const server = app.listen(
  process.env.PORT,
  console.log(`Server is started on PORT ${process.env.PORT} !!`)
);
