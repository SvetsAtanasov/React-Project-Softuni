const { Photo } = require("../models/photo");

function getAllPhotos() {
  return Photo.find().lean();
}

function getAllUserCreatedPhotos(id) {
  return Photo.find({ owner: id });
}

function createPhoto(
  name,
  age,
  description,
  location,
  image,
  userId,
  username,
  timestamp
) {
  return Photo.create({
    name,
    image,
    age,
    description,
    location,
    owner: { userId, username },
    timestamp,
  });
}

function findOne(id) {
  return Photo.findById(id);
}

async function deletePhoto(postId, commentId) {
  return Photo.updateOne(
    { _id: postId },
    { $pull: { commentList: { _id: commentId } } }
  );
}

function commentPhoto(id) {
  return Photo.findById(id).populate("commentList");
}

function updatePhoto(id, photo) {
  return Photo.findByIdAndUpdate(id, { ...photo });
}

function likePhoto(id) {
  return Photo.findById(id).populate("likes");
}

module.exports = {
  getAllPhotos,
  createPhoto,
  findOne,
  deletePhoto,
  commentPhoto,
  updatePhoto,
  getAllUserCreatedPhotos,
  likePhoto,
};
