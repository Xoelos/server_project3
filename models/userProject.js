var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var userProject = new Schema({
  projectTitle: {
    type: String,
    required: false
  },
  projectURL: {
    type: String,
    required: false
  },
  projectSummary: {
    type: String,
    required: false
  }
});

// This creates our model from the above schema, using mongoose's model method
var userProject = mongoose.model("userProject", userProject);

module.exports = userProject;
