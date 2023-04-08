//Server
const express = require("express");
const server = express();
const cors = require("cors");
const bodyParser = require("body-parser");

const path = require("path");

//Database
const { initDatabase } = require("./utils/db");

//Middleware
const cookieParser = require("cookie-parser");

server.use(cors());
server.use(cookieParser());
server.use(express.urlencoded({ extended: true }));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

//set view engine
const handlebars = require("express-handlebars");
server.engine("hbs", handlebars.engine({ extname: "hbs" }));
server.set("view engine", "hbs");
server.set("views", "./src/views");

//styles
server.use("/static", express.static(path.join(__dirname, "/public")));

//controllers
const { homeRouter } = require("./controllers/homeController");
const { createRouter } = require("./controllers/createController");
const {
  registerRouter,
  loginRouter,
  logoutRouter,
} = require("./controllers/authController");
const {
  catalogRouter,
  detailsPhotoRouter,
  deletePhotoRouter,
  buyPhotoRouter,
  editPhotoRouter,
} = require("./controllers/catalogController");
const { profileController } = require("./controllers/profileController");
const { authMiddleware, isGuest, isAuth } = require("./services/authServices");
server.use(authMiddleware);
server.use("/", homeRouter);
server.use("/create", isGuest);
server.use("/", createRouter);
// server.use("/register", isAuth);
server.use("/", registerRouter);
server.use("/login", isAuth);
server.use("/", loginRouter);
server.use("/logout", isGuest);
server.use("/", logoutRouter);
server.use("/", catalogRouter);
server.use("/", detailsPhotoRouter);
server.use("/", deletePhotoRouter);
server.use("/", buyPhotoRouter);
server.use("/", editPhotoRouter);
server.use("/profile", isGuest);
server.use("/", profileController);
server.get("/*", (req, res) => {
  res.render("404");
});

initDatabase().then(() => {
  server.listen(7777, () => {
    console.log(`Server running on port: ${7777}`);
  });
});
