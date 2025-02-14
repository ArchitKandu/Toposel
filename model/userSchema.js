const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Defining how the users will be saved in database along with there types and pattern if any
const userSchema = mongoose.Schema(
  {
    // Username is unique and is email
    userName: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email format",
      ],
    },
    // Password should be ensured to be strong
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          // Regex ensures:
          // - At least 8 characters
          // - One lowercase letter
          // - One uppercase letter
          // - One digit
          // - One special character from !@#$%*?&
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%*?&])[A-Za-z\d@#$!%*?&]{8,}$/.test(
            value
          );
        },
        message:
          "Password must be at least 8 characters long and include an uppercase letter, a lowercase letter, a number, and a special character.",
      },
    },
    fullName: {
      type: String,
      required: true,
    },
    // Genders should be Male, Female or Other
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

// Instance method to compare passwords
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Pre-save hook to hash the password if it's new or modified
userSchema.pre("save", async function (next) {
  if (!this.isModified) {
    next();
  }
  // bcrypt package is use for salt creation and hashing of password to encrypt it when stored in database
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
