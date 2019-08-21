var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new NoteSchema object
// This is similar to a Sequelize model
var DataSchema = new Schema({
  savedJobs: {
    type: Array,
    required: false
  },
  // `title` is required and of type String
  savedTutorials: {
    type: Array,
    required: false
  },
  addressStreet: {
    type: String,
    required: true
  },
  addressCity: {
    type: String,
    required: true
  },
  contactEmail: {
    type: String,
    required: false
  },
  contactPhone: {
    type: String,
    required: true
  },
  portfolioURL: {
    type: String,
    required: false
  },
  summary: {
    type: String,
    required: true
  },
  educationHistory: {
    type: Schema.Types.ObjectId,
    ref: "userSchool"
  },
  workHistory: {
    type: Schema.Types.ObjectId,
    ref: "userWork"
  },
  projectHistory: {
    type: Schema.Types.ObjectId,
    ref: "userProject"
  }
});

// This creates our model from the above schema, using mongoose's model method
var userData = mongoose.model("userData", DataSchema);

// Export the Note model
module.exports = userData;
