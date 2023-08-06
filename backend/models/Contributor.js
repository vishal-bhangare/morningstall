const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const Contributor = new Schema(
  {
    name: { type: String },
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: { type: String },
    profile_pic: { type: String },
    favorites: { type: [String] },
    readings: { type: [{ bookId: String, pageno: Number }] },
    contributions: { type: [String] },
  },
  {
    collection: "contributors",
  }
);
Contributor.plugin(uniqueValidator, { message: "Email already in use." });
module.exports = mongoose.model("contributor", Contributor);
