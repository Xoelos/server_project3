var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var UserProjectSchema = new Schema({
  projectName: {
    type: String,
    required: false,
    default: 'Sample Project'
  },
  projectURL: {
    type: String,
    required: false,
    default: 'www.google.com'
  },
  projectDesc: {
    type: String,
    required: false,
    default: 'A sample project that does something'
  }
});

module.exports = UserProjectSchema;
