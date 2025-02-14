const User = require("../model/userSchema");
const generateToken = require("../config/generateToken");

// Creating a new user and saving it in the database
const registration = async (req, res) => {
  // Accepting all required data to be used for creating user from body
  const { userName, password, fullName, gender, dateOfBirth, country } =
    req.body;
  try {
    // If any required field is missing throw error
    if (
      !userName ||
      !password ||
      !fullName ||
      !gender ||
      !dateOfBirth ||
      !country
    )
      throw new Error("Please enter all required details.");

    // Check if user already exists for particular username and throw error if so
    const userExists = await User.findOne({ userName });
    if (userExists) throw new Error("User already exits with that email.");

    // Create a new user using the data gained from body
    const newUser = await User.create({
      userName,
      password,
      fullName,
      gender,
      dateOfBirth,
      country,
    });

    // If user created, respond with the data of the user
    if (newUser) {
      res.status(200).json({
        _id: newUser._id,
        userName: newUser.userName,
        password: newUser.password,
        fullName: newUser.fullName,
        gender: newUser.gender,
        dateOfBirth: newUser.dateOfBirth,
        country: newUser.country,
        // Generate token to authorize user to do other task
        token: generateToken(newUser._id),
      });
      // When user is not created, throw error
    } else throw new Error("Failed to create new user.");
  } catch (err) {
    // Catch any unexpected errors and display response along with it
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    // If any field is missing, throw error
    if (!userName || !password)
      throw new Error("Please enter all required details.");

    // Check if user exist for particular username
    const user = await User.findOne({ userName });

    // If user exists and password matches using model method for encrypted password saved in database and display the user details
    if (user && (await user.matchPassword(password))) {
      res.status(200).json({
        _id: user._id,
        userName: user.userName,
        fullName: user.fullName,
        gender: user.gender,
        dateOfBirth: user.dateOfBirth,
        country: user.country,
        token: user.token,
      });
    }
    // When either email or password is wrong, throw error
    else throw new Error("Invalid Email or Password.");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const search = async (req, res) => {
  // Create a regular expression from search query in API ignoring case
  const searchRegex = new RegExp(req.query.search, "i");
  try {
    // Check for regular expression in username and full name of user
    const keyword = req.query.search
      ? {
          $or: [
            { userName: { $regex: searchRegex } },
            { fullName: { $regex: searchRegex } },
          ],
        }
      : {};

    // Find all users using the keyword and ignore current user if result contains it
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    // Respond with array containing all users that match the search category
    res.status(200).send(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { registration, login, search };
