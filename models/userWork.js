var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var UserWorkSchema = new Schema({
  jobTitle: {
    type: String,
    required: false
  },
  jobCompany: {
    type: String,
    required: false
  },
  jobDate: {
    type: String,
    required: false
  },
  jobSummary: {
    type: String,
    required: false
  }
});

module.exports = UserWorkSchema;
