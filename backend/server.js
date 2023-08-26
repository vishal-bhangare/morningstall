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
const adminsRoute = require("./routes/admins.route");
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.get("/", (req, res) => {
  res.send("Express on Vercel");
});
app.use("/api/books", booksRoute);
app.use("/api/superuser", superusersRoute);
app.use("/api/admin", adminsRoute);

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
