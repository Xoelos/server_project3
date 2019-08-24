var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var UserSchoolSchema = new Schema({
  schoolName: {
    type: String,
    required: false
  },
  schoolDegree: {
    type: String,
    required: false
  },
  schoolYearFrom: {
    type: String,
    required: false
  },
  schoolYearTo: {
    type: String,
    required: false
  }
});

module.exports = UserSchoolSchema;
