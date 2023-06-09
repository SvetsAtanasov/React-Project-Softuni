const catalogRouter = require("express").Router();
const detailsPhotoRouter = require("express").Router();
const deletePhotoRouter = require("express").Router();
const commentPhotoRouter = require("express").Router();
const editPhotoRouter = require("express").Router();
const likePhotoRouter = require("express").Router();
const {
  getAllPhotos,
  findOne,
  deletePhotoComment,
  commentPhoto,
  updatePhoto,
  likePhoto,
  editPhotoComment,
  deletePhoto,
} = require("../services/photoService");

catalogRouter
  .get("/catalog", async (req, res) => {
    const photos = await getAllPhotos().lean();
    res.status(200).json(photos);
  })
  .put("/catalog/:photoId/comment", async (req, res) => {
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
  })
  .delete("/catalog/:photoId/delete", async (req, res) => {
    const { postId, commentId } = req.body;

    try {
      await deletePhotoComment(postId, commentId);

      res.status(200).send("Deleted");
    } catch (err) {
      res.status(404).send("Not Found");
    }
  });

detailsPhotoRouter.get("/catalog/:photoId", async (req, res) => {
  const photo = await findOne(req.params.photoId).lean();

  res.status(200).json(photo);
});

editPhotoRouter.use((req, res, next) => {
  if (req.method === "POST") {
    req.method = "PUT";
  }

  next();
});

editPhotoRouter
  .put("/catalog/:photoId/edit", async (req, res) => {
    const { commentId, commentValue } = req.body;

    try {
      await editPhotoComment(commentId, commentValue);

      res.status(200).send("Edited Comment");
    } catch (err) {
      res.status(400).send(err.message);
    }
  })
  .delete("/catalog/delete", async (req, res) => {
    const { postId } = req.body;

    console.log(postId);

    try {
      await deletePhoto(postId);

      res.status(200).send("Deleted");
    } catch (err) {
      res.status(400).send(err.message);
    }
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
  commentPhotoRouter,
  editPhotoRouter,
  likePhotoRouter,
};
