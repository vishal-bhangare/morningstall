const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const User = new Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: { type: String },
    profile_pic: { type: String },
    favorites: { type: [String] },
    likes: { type: [String] },
    readings: { type: [{ bookId: String, pageno: Number }] },
  },
  {
    collection: "users",
  }
);
User.plugin(uniqueValidator, { message: "Email already in use." });
module.exports = mongoose.model("User", User);
