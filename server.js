const express = require("express");
const mongoose = require("mongoose");
const bodyParse = require("body-parser");
const passport = require("passport");

const app = express();

//body parser middileware
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());

// db config
const db = require("./config/key").mongoURI;

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

// connect to MongoDB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("mongodb connect"))
  .catch(err => console.log(err));

// passport middleware
app.use(passport.initialize());
// passport config
require('./config/passport')(passport);



app.get("/", (req, res) => res.send("hello i am ok"));

// user Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running on port ${port}`));
