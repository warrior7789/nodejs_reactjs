const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const keys = require("../../config/key");

// load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// load user model
const User = require("../../models/User");

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "users Works" }));

// @route   GET api/users/register
// @desc    Registration
// @access  Public
router.post("/register", (req, res) => {
  // validation
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      errors.email = "Email already Exists";
      return res.status(400).json(errors);
    } else {
      const avtar = gravatar.url(req.body.email, {
        s: "200", // size
        r: "pg", //Rating
        d: "mm" // default
      });
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avtar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => Console.log(err));
        });
      });
    }
  });
});

// @route   GET api/users/login
// @desc    login user /return JWT Token
// @access  Public
router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  // find user by email

  // validation
  const { errors, isValid } = validateLoginInput(req.body);
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email }).then(user => {
    // check for user
    if (!user) {
      errors.email = "User Not Found";
      return res.status(400).json(errors);
    }
    // check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // user match
        const payload = { id: user.id, name: user.name, avtar: user.avtar,is_admin: user.is_admin };
        jwt.sign(
          payload,
          keys.secretOrKey,
          { expiresIn: 3600 },
          (err, token) => {
            res.json({
              msg: "Success login",
              token: "Bearer " + token
            });
          }
        );
      } else {
        errors.passport = "Password not match";
        return res.status(400).json(errors);
      }
    });
  });
});

// @route   GET api/users/curent user
// @desc    return curent user
// @access  private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      id: req.user.id,
      name: req.user.name,
      avtar: req.user.avtar,
      email: req.user.email
    });
  }
);
module.exports = router;
