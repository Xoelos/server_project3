const db = require("../models");
const isAuthenticated = require("../config/middleware/isAuthenticated");
const isNotAuthenticated = require("../config/middleware/isNotAuthenticated");

module.exports = function(app) {
  // Load index page
  app.get("/", isAuthenticated, function(req, res) {});
  app.get("/home", isNotAuthenticated, function(req, res) {});

  // Load example page and pass in an example by id
  app.get("/account/:id", isAuthenticated, function(req, res) {});

  // Route for viewing account page
  app.get("/account", isAuthenticated, function(req, res) {});

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {});
};
