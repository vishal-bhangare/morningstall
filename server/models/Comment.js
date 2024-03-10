const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema(
  {
    bookid: { type: String },
    userid: { type: String },
    rating: { type: Number },
    likes: { type: Number },
    comment: { type: String },
    commented_on: { type: Date },
  },
  {
    collection: "comments",
  }
);
module.exports = mongoose.model("Comment", Comment);
