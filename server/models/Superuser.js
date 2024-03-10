const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Superuser = new Schema(
  {
    username: {
      type: String,
    },
    password: {
      type: String,
    },
  },
  {
    collection: "superusers",
  }
);
module.exports = mongoose.model("Superuser", Superuser);
