var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var UserWorkSchema = new Schema({
  jobTitle: {
    type: String,
    required: false,
    default: 'Full Stack Developer'
  },
  jobCompany: {
    type: String,
    required: false,
    default: 'Google'
  },
  jobDate: {
    type: String,
    required: false,
    default: '1900 - 2052'
  },
  jobSummary: {
    type: String,
    required: false,
    default: 'Handled full stack web development for Google. Worked backend and frontend.'
  }
});

module.exports = UserWorkSchema;
