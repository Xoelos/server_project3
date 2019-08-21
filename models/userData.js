var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var DataSchema = new Schema({
  savedJobs: {
    type: String,
    required: true
  },
  // `title` is required and of type String
  savedTutorials: {
    type: String,
    required: true
  },
  Address: {
    type: String,
    required: true
  },
  Contact: {
    type: Array,
    required: true
  }
});

// This creates our model from the above schema, using mongoose's model method
var userData = mongoose.model("userData", DataSchema);

// Export the Note model
module.exports = userData;
