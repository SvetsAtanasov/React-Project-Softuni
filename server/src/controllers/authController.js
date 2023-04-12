const registerRouter = require("express").Router();
const loginRouter = require("express").Router();
const logoutRouter = require("express").Router();
const { registerUser, login, isAuth } = require("../services/authServices");

registerRouter.post("/register", async (req, res) => {
  const { username, email, password, repeatPassword } = req.body;

  try {
    await registerUser(username, email, password, repeatPassword);
    const token = await login(username, password);

    res.status(200).json(token);
  } catch (err) {
    let error = err.message;

    if (err.errors) {
      if (err.errors.username) {
        error = err.errors.username.message;
      } else if (err.errors.email) {
        error = err.errors.email.message;
      } else if (err.errors.password) {
        error = err.errors.password.message;
      }
    }

    res.status(400).json(error);
  }
});

loginRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await login(username, password, res);
    res.status(200).json(token);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

logoutRouter.get("/logout", (req, res) => {
  res.status(200).json({ token: undefined });
});

module.exports = { registerRouter, loginRouter, logoutRouter };
