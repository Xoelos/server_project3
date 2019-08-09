var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var DataSchema = new Schema({
  listedSkills: {
    type: String,
    required: true
  },
  savedJobs: {
    type: String,
    required: true
  },
  // `title` is required and of type String
  savedTutorials: {
    type: String,
    required: true
  },
  // `link` is required and of type String
  education: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// This creates our model from the above schema, using mongoose's model method
var userData = mongoose.model("userData", DataSchema);

// Export the Note model
module.exports = userData;
