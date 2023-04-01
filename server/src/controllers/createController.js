const createRouter = require("express").Router();
const { createPhoto } = require("../services/photoService");

createRouter
  .get("/create", (req, res) => {
    res.render("create");
  })
  .post("/create", async (req, res) => {
    const { name, age, description, location, image } = req.body;

    try {
      await createPhoto(name, age, description, location, image, req.user._id);

      res.redirect("/catalog");
    } catch (err) {
      const errorFormat = err.message.split(": ");

      res.render("create", { error: errorFormat[errorFormat.length - 1] });
    }
  });

module.exports = { createRouter };
