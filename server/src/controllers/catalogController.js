const catalogRouter = require("express").Router();
const detailsPhotoRouter = require("express").Router();
const deletePhotoRouter = require("express").Router();
const buyPhotoRouter = require("express").Router();
const editPhotoRouter = require("express").Router();
const likePhotoRouter = require("express").Router();
const {
  getAllPhotos,
  findOne,
  deletePhoto,
  commentPhoto,
  updatePhoto,
  likePhoto,
} = require("../services/photoService");

catalogRouter.get("/catalog", async (req, res) => {
  const photos = await getAllPhotos().lean();
  res.status(200).json(photos);
});

detailsPhotoRouter.get("/catalog/:photoId", async (req, res) => {
  const photo = await findOne(req.params.photoId).lean();

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

// buyPhotoRouter.use((req, res, next) => {
//   req.method = "PUT";

//   next();
// });

buyPhotoRouter.put("/catalog/:photoId/comment", async (req, res) => {
  try {
    const { id, commentObj } = req.body;
    const photo = await commentPhoto(id);

    photo.commentList.push({
      userId: commentObj.userId,
      username: commentObj.username,
      comment: commentObj.comment,
    });

    await photo.save();

    res.status(200).send("Updated");
  } catch (err) {
    res.status(404).send(err.message);
  }
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

likePhotoRouter.put("/catalog/:photoId/like", async (req, res) => {
  const { id, likeObj } = req.body;
  const photo = await likePhoto(id);

  if (photo.likes.some((x) => x.username === likeObj.username)) {
    const idx = photo.likes.findIndex((x) => x.username === likeObj.username);
    photo.likes.splice(idx, 1);
  } else {
    photo.likes.push({ ...likeObj });
  }

  await photo.save();

  res.status(200).send(likeObj.like);
});

module.exports = {
  catalogRouter,
  detailsPhotoRouter,
  deletePhotoRouter,
  buyPhotoRouter,
  editPhotoRouter,
  likePhotoRouter,
};
