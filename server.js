const express = require("express");
const mongoose = require("mongoose");
const bodyParse = require("body-parser");
const passport = require("passport");
const path = require("path");
const url  = require('url');
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
require("./config/passport")(passport);

//app.get("/", (req, res) => res.send("hello i am ok"));

// user Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

// Server static assets if in production
console.log(process.env.NODE_ENV);




i
// Set static folder
app.use(express.static("client/build"));
app.get("*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});


const port = process.env.PORT || 6030;
app.listen(port,'192.168.1.30', function() {
  console.log(`server running on port ${port}`);
});