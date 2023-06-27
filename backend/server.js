const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const crypto = require("crypto");
const { scryptSync, randomBytes, timingSafeEqual } = require("crypto");
const uri =
  process.env.URI ||
  "mongodb+srv://vishal:Vishal2108@cluster0.uvjuwun.mongodb.net/YourPROJECT_ID";

mongoose
  .connect(uri)
  .then((res) => {
    console.log(`Connected to Database : "${res.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err.reason);
  });

const app = express();

const booksRoute = require("./routes/books.route");
const superusersRoute = require("./routes/superusers.route");
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use("/api/books", booksRoute);
app.use("/api/superuser", superusersRoute);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log("Server is live on port " + port);
});

app.use((req, res, next) => {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;

  res.status(err.statusCode).send(err.message);
});

function genHash(password) {
  const salt = randomBytes(16).toString("hex");
  const hashedPassword = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hashedPassword}`;
}

function verify(hash, password) {
  const [salt, key] = hash.split(":");
  const hashedBuffer = scryptSync(password, salt, 64);
  const keyBuffer = Buffer.from(key, "hex");
  const match = timingSafeEqual(hashedBuffer, keyBuffer);

  if (match) {
    return "login success!";
  } else {
    return "login fail!";
  }
}

// var hashedPass = genHash("superuser");
// console.log("\n", hashedPass, "\n");

// console.log(verify(tempHash, "superuser"));
