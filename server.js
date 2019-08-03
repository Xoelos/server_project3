require("dotenv").config();

const express = require("express");
const session = require("express-session");
const app = express();

var mongoose = require("mongoose");
const db = require("./models");

const PORT = process.env.PORT || 3000;

// Requiring passport as we've configured it
var passport = require("./config/passport");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// We need to use sessions to keep track of our user's login status
app.use(
  session({ secret: "keyboard cat", resave: true, saveUninitialized: true })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Connect to the Mongo DB
mongoose.connect("mongodb://localhost/unit18Populater", {
  useNewUrlParser: true
});

// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});

module.exports = app;

// *********************************** Testing API function ****************************************
const axios = require("axios");

let jobSearch = "front end";

axios
  .get(
    `https://jobs.github.com/positions.json?description=${jobSearch}&full_time=true&location=california`
  )
  .then(response => {
    let counts = {};
    let result = [];

    response.data.forEach((element, indexId) => {
      let desc = element.description;

      desc = desc
        .replace(/[^a-zA-Z ]/g, " ")
        .split(" ")
        .filter(word => word.length > 2)
        .sort();

      for (var i = 0; i < desc.length; i++) {
        var word = desc[i].toLowerCase();
        //   word = word.charAt(0).toUpperCase() + word.slice(1);
        counts[word] = counts[word] ? counts[word] + 1 : 1;
      }
    });

    for (var j in counts) {
      result.push([j, counts[j]]);
    }

    result.sort((a, b) => {
      let x = a[1];
      let y = b[1];
      return y - x;
    });

    console.table(result);
  });

//   phantom.js
