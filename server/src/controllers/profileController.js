const profileController = require("express").Router();
const { getAllUserCreatedPhotos } = require("../services/photoService");

profileController.get("/profile", async (req, res) => {
  const photos = await getAllUserCreatedPhotos(req.user._id).lean();

  res.render("profile", { photos: photos, user: req.user });
});

module.exports = { profileController };
