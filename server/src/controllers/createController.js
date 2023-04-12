const createRouter = require("express").Router();
const { createPhoto } = require("../services/photoService");

createRouter
  .get("/create", (req, res) => {
    res.status(200).send();
  })
  .post("/create", async (req, res) => {
    const { name, age, description, location, image } = req.body;

    try {
      await createPhoto(name, age, description, location, image, req.user._id);

      res.status(200).json({});
    } catch (err) {
      const errorFormat = err.message.split(": ");

      res.status(400).json({ error: errorFormat[errorFormat.length - 1] });
    }
  });

module.exports = { createRouter };
