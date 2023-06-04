//Server
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

//ws
const { WebSocketServer } = require("ws");
const { createServer } = require("http");

//Database
const { initDatabase } = require("./src/utils/db");

//Middleware
const cookieParser = require("cookie-parser");
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//controllers
const { homeRouter } = require("./src/controllers/homeController");
const { createRouter } = require("./src/controllers/createController");
const {
  registerRouter,
  loginRouter,
  logoutRouter,
} = require("./src/controllers/authController");
const {
  catalogRouter,
  detailsPhotoRouter,
  deletePhotoRouter,
  commentPhotoRouter,
  editPhotoRouter,
  likePhotoRouter,
} = require("./src/controllers/catalogController");
const { profileController } = require("./src/controllers/profileController");
const {
  authMiddleware,
  isGuest,
  isAuth,
} = require("./src/services/authServices");
const { getAllPhotos } = require("./src/services/photoService");
const { parse } = require("path");
app.use(authMiddleware);
app.use("/", homeRouter);
app.use("/", createRouter);
app.use("/", registerRouter);
app.use("/", loginRouter);
app.use("/", logoutRouter);
app.use("/", catalogRouter);
app.use("/", detailsPhotoRouter);
app.use("/", deletePhotoRouter);
app.use("/", commentPhotoRouter);
app.use("/", editPhotoRouter);
app.use("/", profileController);
app.use("/", likePhotoRouter);
app.get("/*", (req, res) => {
  res.render("404");
});

const server = createServer(app);

initDatabase().then(() => {
  server.listen(7777, () => {
    console.log(`Server running on port: ${7777}`);
  });
});

const wss = new WebSocketServer({
  port: 7777,
});

let connectedClients = [];

wss.on("connection", (ws, req) => {
  ws.id = req.headers["sec-websocket-key"];

  connectedClients.push(ws);
  console.log("WebSocket connection established");

  ws.on("message", async (message) => {
    const parsedMessage = JSON.parse(message);

    console.log(parsedMessage);

    if (
      parsedMessage.type === "Like_Post" ||
      parsedMessage.type === "Comment_Post" ||
      parsedMessage.type === "Delete_Post"
    ) {
      try {
        const posts = await getAllPhotos();

        connectedClients.forEach((client) =>
          client.send(`${JSON.stringify(posts)}\n`)
        );
      } catch (err) {}
    }
  });

  ws.on("close", () => {
    console.log("WebSocket connection closed");
    connectedClients = connectedClients.filter(
      (x) => x.id !== req.headers["sec-websocket-key"]
    );
  });
});
