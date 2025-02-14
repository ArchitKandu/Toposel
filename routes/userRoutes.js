const express = require("express");
const {
  registration,
  login,
  search,
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authorizeMiddleware");

const router = express.Router();

// API routes for registration, login and search user respectively
router.post("/register", registration);
router.post("/login", login);
router.get("/user", protect, search);

module.exports = router;
