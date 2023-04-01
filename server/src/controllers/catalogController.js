const catalogRouter = require("express").Router();
const detailsPhotoRouter = require("express").Router();
const deletePhotoRouter = require("express").Router();
const buyPhotoRouter = require("express").Router();
const editPhotoRouter = require("express").Router();
const {
  getAllPhotos,
  findOne,
  deletePhoto,
  commentPhoto,
  updatePhoto,
} = require("../services/photoService");

catalogRouter.get("/catalog", async (req, res) => {
  console.log(req.headers.authorization);
  const photos = await getAllPhotos().lean();
  res.json(photos);
  // res.render("catalog", { photos: photos });
});

detailsPhotoRouter.get("/catalog/:photoId", async (req, res) => {
  const photo = await findOne(req.params.photoId).lean();

  console.log(photo.image);

  let isOwner = undefined;

  if (req.user) {
    isOwner = photo.owner == req.user._id;
  }

  res.render("details", {
    photo: photo,
    isOwner: isOwner,
  });
});

deletePhotoRouter.get("/catalog/:photoId/delete", async (req, res) => {
  await deletePhoto(req.params.photoId);

  res.redirect("/catalog");
});

buyPhotoRouter.use((req, res, next) => {
  if (req.query.method == "POST") {
    req.method = "POST";
  }

  next();
});

buyPhotoRouter.post("/catalog/:photoId", async (req, res) => {
  const photo = await commentPhoto(req.params.photoId);
  const { comment } = req.body;

  console.log(photo);
  console.log(req.user._id);

  photo.commentList.push({ userId: req.user._id, comment: comment });

  await photo.save();

  res.redirect("/catalog");
});

editPhotoRouter.use((req, res, next) => {
  if (req.method === "POST") {
    req.method = "PUT";
  }

  next();
});

editPhotoRouter
  .get("/catalog/:photoId/edit", async (req, res) => {
    const photo = await findOne(req.params.photoId).lean();

    res.render("edit", { photo: photo });
  })
  .put("/catalog/:photoId/edit", async (req, res) => {
    const { name, image, age, description, location } = req.body;
    const photo = { name, image, age, description, location };

    await updatePhoto(req.params.photoId, photo);

    res.redirect("/catalog");
  });

module.exports = {
  catalogRouter,
  detailsPhotoRouter,
  deletePhotoRouter,
  buyPhotoRouter,
  editPhotoRouter,
};
