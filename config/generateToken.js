const jwt = require("jsonwebtoken");

// Using JWT to assign token to all the created user and allow authorization
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    // Token expires in every 30 days
    expiresIn: "30d",
  });
};

module.exports = generateToken;
