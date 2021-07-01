const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
  title: String,
  author: String,
  date: String,
  text: String,
  images: String,
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
