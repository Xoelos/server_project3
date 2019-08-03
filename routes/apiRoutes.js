var db = require("../models");
var passport = require("../config/passport");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const isNotAuthenticated = require("../config/middleware/isNotAuthenticated");
const axios = require("axios");

module.exports = function(app) {
  // Load index page
  app.get("/api/:search", isAuthenticated, function(req, res) {
    let jobSearch = req.params.search;

    // *********************************** Testing API function ****************************************
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

        res.json(result);
      });

    //   phantom.js
  });
};
