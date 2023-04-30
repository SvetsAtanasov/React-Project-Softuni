//Server
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

//ws
const { WebSocketServer } = require("ws");
const { createServer } = require("http");

//Database
const { initDatabase } = require("./utils/db");

//Middleware
const cookieParser = require("cookie-parser");
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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
  likePhotoRouter,
} = require("./controllers/catalogController");
const { profileController } = require("./controllers/profileController");
const { authMiddleware, isGuest, isAuth } = require("./services/authServices");
const { getAllPhotos } = require("./services/photoService");
app.use(authMiddleware);
app.use("/", homeRouter);
app.use("/", createRouter);
app.use("/", registerRouter);
app.use("/", loginRouter);
app.use("/", logoutRouter);
app.use("/", catalogRouter);
app.use("/", detailsPhotoRouter);
app.use("/", deletePhotoRouter);
app.use("/", buyPhotoRouter);
app.use("/", editPhotoRouter);
app.use("/", profileController);
app.use("/", likePhotoRouter);
app.get("/*", (req, res) => {
  res.render("404");
});

const server = createServer(app);

const wss = new WebSocketServer({
  server: server,
  path: "/catalog",
});

const connectedClients = [];

wss.on("connection", (ws) => {
  connectedClients.push(ws);
  console.log("WebSocket connection established");

  ws.on("message", async () => {
    try {
      const posts = await getAllPhotos();

      connectedClients.forEach((client) =>
        client.send(`${JSON.stringify(posts)}\n`)
      );
    } catch (err) {}
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
  });
});

initDatabase().then(() => {
  server.listen(7777, () => {
    console.log(`Server running on port: ${7777}`);
  });
});
