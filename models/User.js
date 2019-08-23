var mongoose = require('mongoose');
var UserProjectSchema = require('./userProject');
const UserSchoolSchema = require('./userSchool');
const UserWorkSchema = require('./userWork');
// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var UserSchema = new Schema({
  fullName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  addressStreet: {
    type: String,
    required: false,
    default: 'Somewhere Lane'
  },
  addressCity: {
    type: String,
    required: false,
    default: 'Denver, CO 80231'
  },
  phone: {
    type: String,
    required: false
  },
  portfolioURL: {
    type: String,
    required: false
  },
  summary: {
    type: String,
    required: false
  },
  skills: {
    type: Array,
    required: false,
    default: ['1', '2', '3', '4', '5', '6', '7', '8', '9']
  },
  userSchool: [UserSchoolSchema],
  userProject: [UserProjectSchema],
  userWork: [UserWorkSchema]
});

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model('User', UserSchema);

// Export the Article model
module.exports = User;
