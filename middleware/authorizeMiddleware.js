const jwt = require("jsonwebtoken");
const User = require("../model/userSchema");

// Middleware method to ensure that current user is authorized to perform the requested action i.e. search
const protect = async (req, res, next) => {
  let token;
  // Check is Bearer token is available in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Authorization token appears in 2nd index while 1st index contains information which type i.e. Bearer here
      token = req.headers.authorization.split(" ")[1];
      // Verify that the user token is matching with JWT secret in .env
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Find user by decoded id (excluding password)
      req.user = await User.findById(decoded.id).select("-password");

      // If user not found with the id of current user, respond with error
      if (!req.user) {
        return res.status(401).json({ error: "User not found" });
      }

      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({ error: "Not authorized, token failed" });
    }
  }
  // When token is not found, respond with appropriate error message
  if (!token) {
    return res.status(401).json({ error: "Not authorized, no token" });
  }
};

module.exports = { protect };
