const express = require("express");
const adminsRoute = express.Router();
const jwt = require("jsonwebtoken");
const authorize = require("../middlewares/auth");
const { verifyHash } = require("../common/passwordHash");
const Admin = require("../models/Admin");

adminsRoute.route("/login").post((req, res, next) => {
  if (!req.body.password || !req.body.username)
    return res
      .status(500)
      .json({ message: "Username or Password is not provided." });

  Admin.findOne({ username: req.body.username })
    .then((user) => {
      passwordHash = user.password;
      const match = verifyHash(passwordHash, req.body.password);
      if (match) {
        let jwtToken = jwt.sign(
          {
            username: user.username,
            password: user.password,
          },
          process.env.TOKEN_SECRET,
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

module.exports = adminsRoute;
