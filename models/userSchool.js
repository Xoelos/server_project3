var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var UserSchoolSchema = new Schema({
  schoolName: {
    type: String,
    required: false,
    default: 'Fake University'
  },
  schoolDegree: {
    type: String,
    required: false,
    default: 'PhD'
  },
  schoolYearFrom: {
    type: Number,
    required: false,
    default: 1970
  },
  schoolYearTo: {
    type: Number,
    required: false,
    default: 1974
  }
});

module.exports = UserSchoolSchema;
