const { User } = require("../models/user");
const { SECRET } = require("../config/config");
const bcrypt = require("bcrypt");
const jsonWebToken = require("jsonwebtoken");
const util = require("util");

const jwt = {
  sign: util.promisify(jsonWebToken.sign),
  verify: util.promisify(jsonWebToken.verify),
};

async function registerUser(username, email, password, repeatPassword) {
  const user = { username, email, password };

  const userExists = await User.findOne({
    $or: [{ username }, { email }],
  }).lean();

  if (userExists) {
    throw new Error("User already exists");
  }

  if (password !== repeatPassword) {
    throw new Error("Passwords do not match");
  }

  return User.create(user);
}

async function login(username, password) {
  const user = await User.findOne({ username });

  if (!user) {
    throw new Error("Invalid Username");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Invalid Password");
  }

  const payload = {
    _id: user._id,
    email: user.email,
    username: user.username,
  };

  const token = await jwt.sign(payload, SECRET, { expiresIn: "2h" });

  return token;
}

async function authMiddleware(req, res, next) {
  const token = req.cookies["auth"];

  if (token) {
    try {
      const decodedToken = await jwt.verify(token, SECRET);

      req.user = decodedToken;
      res.locals.user = decodedToken;
      res.locals.isAuthenticated = true;

      next();
    } catch (err) {
      res.clearCookie("auth");
      res.redirect("/login");
    }
  } else {
    next();
  }
}

function isGuest(req, res, next) {
  if (!req.user) {
    return res.redirect("/login");
  }

  next();
}

function isAuth(req, res, next) {
  if (req.user) {
    return res.redirect("/");
  }

  next();
}

module.exports = { registerUser, login, authMiddleware, isGuest, isAuth };
