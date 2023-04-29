const createRouter = require("express").Router();
const { createPhoto } = require("../services/photoService");

createRouter.post("/create", async (req, res) => {
  const { name, age, description, location, image } = req.body;

  const date = new Date();
  const timestamp = (date.getTime() / 1000).toFixed(0);

  try {
    await createPhoto(
      name,
      age,
      description,
      location,
      image,
      req.user._id,
      req.user.username,
      timestamp
    );

    res.status(200).send("Creation successfull");
  } catch (err) {
    const errorFormat = err.message.split(": ");
    console.log(err.message);
    res.status(400).json({ error: errorFormat[errorFormat.length - 1] });
  }
});

module.exports = { createRouter };
