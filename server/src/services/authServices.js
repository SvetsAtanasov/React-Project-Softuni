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

  const returnToken = {
    token: token,
    username: user.username,
  };

  return returnToken;
}

async function authMiddleware(req, res, next) {
  //Rework authMiddleware
  if (req.headers.authorization) {
    const token = JSON.parse(req.headers.authorization).token;

    try {
      const decodedToken = await jwt.verify(token, SECRET);
      req.user = decodedToken;

      next();
    } catch (err) {
      res.status(401).send("Invalid Token!");
    }
  } else {
    next();
  }
}

function isGuest(req, res, next) {
  if (!req.user) {
    res.status(401).send("Unauthorized");
  }

  next();
}

function isAuth(req, res, next) {
  next();
}

module.exports = { registerUser, login, authMiddleware, isGuest, isAuth };
