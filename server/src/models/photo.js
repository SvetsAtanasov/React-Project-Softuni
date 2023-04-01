const mongoose = require("mongoose");

let photoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name field is required"],
    minLength: [2, "Name needs to be at least 2 chars long"],
  },
  image: {
    type: String,
    required: [true, "Image field is required"],
    validate: [/https?:\/\//, "Does not match format"],
  },
  age: {
    type: Number,
    required: [true, "Age field is required"],
    minLength: [1, "Age needs to be at least 1 chars long"],
    maxLength: [100, "Age should not exceed 100 chars"],
  },
  description: {
    type: String,
    required: [true, "Description field is required"],
    minLength: [5, "Description needs to be at least 5 chars long"],
    maxLength: [50, "Description should not exceed 50 chars"],
  },
  location: {
    type: String,
    required: [true, "Location field is required"],
    minLength: [5, "Location needs to be at least 5 chars long"],
    maxLength: [50, "Location should not exceed 50 chars"],
  },
  commentList: [
    {
      userId: { type: mongoose.Types.ObjectId, ref: "user" },
      comment: String,
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "user",
  },
});

const Photo = mongoose.model("photo", photoSchema);

module.exports = { Photo };
