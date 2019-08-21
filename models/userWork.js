var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var userWork = new Schema({
  jobTitle: {
    type: String,
    required: true
  },
  jobDate: {
    type: String,
    required: false
  },
  jobSummary: {
    type: String,
    required: true
  }
});

// This creates our model from the above schema, using mongoose's model method
var userWork = mongoose.model("userWork", userWork);

module.exports = userWork;
