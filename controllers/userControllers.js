const User = require("../model/userSchema");
const generateToken = require("../config/generateToken");

const registration = async (req, res) => {
  const { userName, password, fullName, gender, dateOfBirth, country } =
    req.body;

  if (
    !userName ||
    !password ||
    !fullName ||
    !gender ||
    !dateOfBirth ||
    !country
  ) {
    res.status(400);
    throw new Error("Please enter all required details.");
  }

  const userExists = await User.findOne({ userName });
  if (userExists) {
    res.status(400);
    throw new Error("User already exits with that email.");
  }

  const newUser = await User.create({
    userName,
    password,
    fullName,
    gender,
    dateOfBirth,
    country,
  });
  if (newUser) {
    res.status(200).json({
      _id: newUser._id,
      userName: newUser.userName,
      password: newUser.password,
      fullName: newUser.fullName,
      gender: newUser.gender,
      dateOfBirth: newUser.dateOfBirth,
      country: newUser.country,
      token: generateToken(newUser._id),
    });
  } else {
    res.status(400);
    throw new Error("Failed to create new user.");
  }
};

const login = async (req, res) => {
  const { userName, password } = req.body;

  if (!userName || !password) {
    res.status(400);
    throw new Error("Please enter all required details.");
  }

  const user = await User.findOne({ userName });
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
  } else {
    res.status(400);
    throw new Error("Invalid Email or Password.");
  }
};

module.exports = { registration, login };
