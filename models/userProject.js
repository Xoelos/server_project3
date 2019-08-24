var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var UserProjectSchema = new Schema({
  projectName: {
    type: String,
    required: false
  },
  projectURL: {
    type: String,
    required: false
  },
  projectDesc: {
    type: String,
    required: false
  }
});
module.exports = UserProjectSchema;
