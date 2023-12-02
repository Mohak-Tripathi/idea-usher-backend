// post.model.js
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    image: String, // store image URL or S3 bucket key
    tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tag" }],
    createdAt: {
      type: Date,
      default: Date.now,
    }
  },
  { versionKey: false }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
