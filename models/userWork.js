var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var userWork = new Schema({
  companyTitle: {
    type: String,
    required: false
  },
  jobTitle: {
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

// This creates our model from the above schema, using mongoose's model method
var userWork = mongoose.model("userWork", userWork);

module.exports = userWork;
