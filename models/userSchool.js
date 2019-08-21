var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var userSchool = new Schema({
  schoolName: {
    type: String,
    required: true
  },
  schoolLocation: {
    type: String,
    required: false
  },
  schoolDegree: {
    type: String,
    required: true
  },
  schoolCourse: {
    type: String,
    required: false
  },
  schoolYearFrom: {
    type: String,
    required: true
  },
  schoolYearTo: {
    type: String,
    required: true
  }
});

// This creates our model from the above schema, using mongoose's model method
var userSchool = mongoose.model("userSchool", userSchool);

module.exports = userSchool;
