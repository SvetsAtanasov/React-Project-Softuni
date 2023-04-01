const registerRouter = require("express").Router();
const loginRouter = require("express").Router();
const logoutRouter = require("express").Router();
const { registerUser, login, isAuth } = require("../services/authServices");

registerRouter
  .get("/register", (req, res) => {
    res.render("register");
  })
  .post("/register", async (req, res) => {
    const { username, email, password, repeatPassword } = req.body;

    if (password !== repeatPassword) {
      res.locals.error = "Passwords do not match!";
      res.render("register");
    } else {
      try {
        await registerUser(username, email, password);
        const token = await login(username, password, res);
        res.cookie("auth", token);

        res.redirect("/");
      } catch (err) {
        const error = err.message.split(": ");

        res.render("register", { error: error[error.length - 1] });
      }
    }
  });

loginRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const token = await login(username, password, res);
    res.status(200).send({ token });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

logoutRouter.get("/logout", (req, res) => {
  res.clearCookie("auth");
  res.redirect("/");
});

module.exports = { registerRouter, loginRouter, logoutRouter };
