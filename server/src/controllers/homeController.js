const homeRouter = require("express").Router();

homeRouter.get("/", (req, res) => {
  res.status(200).send("Ok");
});

module.exports = { homeRouter };
