const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");

const Admin = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
    },
  },
  {
    collection: "admins",
  }
);
Admin.plugin(uniqueValidator, { message: "Username already exists." });
module.exports = mongoose.model("Admin", Admin);
