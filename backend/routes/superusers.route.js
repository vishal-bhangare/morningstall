const express = require("express");
const superusersRoute = express.Router();
const Superuser = require("../models/Superuser");
const { scryptSync, randomBytes, timingSafeEqual } = require("crypto");
const jwt = require("jsonwebtoken");

superusersRoute.route("/login").post((req, res, next) => {
  Superuser.findOne({ username: req.body.username })
    .then((user) => {
      passwordHash = user.password;
      const match = verifyHash(passwordHash, req.body.password);
      if (match) {
        let jwtToken = jwt.sign(
          {
            username: user.username,
            password: user.password,
          },
          "VishalIndubhauBhangare",
          { expiresIn: "1h" }
        );
        res.status(200).json({
          token: jwtToken,
          expiresIn: 3600,
          _id: user._id,
        });
      } else {
        res.status(401).json({ result: "Unauthorized User." });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(400);
    });
});

function verifyHash(hash, password) {
  const [salt, key] = hash.split(":");
  const hashedBuffer = scryptSync(password, salt, 64);
  const keyBuffer = Buffer.from(key, "hex");
  const match = timingSafeEqual(hashedBuffer, keyBuffer);

  return match ? true : false;
}

module.exports = superusersRoute;
