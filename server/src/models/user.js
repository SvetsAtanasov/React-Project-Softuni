const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username field is required"],
    minLength: [2, "Username needs to be at least 2 chars long"],
  },
  email: {
    type: String,
    required: [true, "Email field is required"],
    minLength: [10, "Email needs to be at least 10 chars long"],
  },
  password: {
    type: String,
    required: [true, "Password field is required"],
    minLength: [4, "Password needs to be at least 4 chars long"],
  },
});

userSchema.pre("save", function (next) {
  bcrypt.hash(this.password, 10).then((hash) => {
    this.password = hash;

    next();
  });
});

userSchema.method("validatePassword", function (password) {
  return bcrypt.compare(password, this.password);
});

const User = mongoose.model("user", userSchema);

module.exports = { User };
