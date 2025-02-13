const express = require("express");
const { registration } = require("../controllers/userControllers");

const router = express.Router();

router.post("/register", registration);

module.exports = router;
