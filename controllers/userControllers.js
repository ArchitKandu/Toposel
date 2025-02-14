const User = require("../model/userSchema");
const generateToken = require("../config/generateToken");

const registration = async (req, res) => {
  const { userName, password, fullName, gender, dateOfBirth, country } =
    req.body;
  try {
    if (
      !userName ||
      !password ||
      !fullName ||
      !gender ||
      !dateOfBirth ||
      !country
    )
      throw new Error("Please enter all required details.");

    const userExists = await User.findOne({ userName });
    if (userExists) throw new Error("User already exits with that email.");

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
    } else throw new Error("Failed to create new user.");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    if (!userName || !password)
      throw new Error("Please enter all required details.");

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
    } else throw new Error("Invalid Email or Password.");
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const search = async (req, res) => {
  const searchRegex = new RegExp(req.query.search, "i");
  try {
    const keyword = req.query.search
      ? {
          $or: [
            { userName: { $regex: searchRegex } },
            { fullName: { $regex: searchRegex } },
          ],
        }
      : {};
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.status(200).send(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { registration, login, search };
