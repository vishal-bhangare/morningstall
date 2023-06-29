const express = require("express");
const superusersRoute = express.Router();
const Superuser = require("../models/Superuser");
const Admin = require("../models/Admin");
const jwt = require("jsonwebtoken");
const authorize = require("../middlewares/auth");
const { verifyHash, genHash } = require("../common/passwordHash");
const { check, validationResult } = require("express-validator");

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

superusersRoute.route("/new/admin").post(authorize, (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).jsonp(errors.array());
  } else {
    Admin.create({
      username: req.body.username,
      password: genHash(req.body.confirmPassword),
    })
      .then((response) => {
        return res.status(200).json({ message: "User created." });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  }
});

module.exports = superusersRoute;
