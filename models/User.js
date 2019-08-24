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
    default: '0000 Default Drive'
  },
  addressCity: {
    type: String,
    required: false,
    default: 'Default, ST 00000'
  },
  phone: {
    type: Number,
    required: false,
    default: 123456789
  },
  portfolioURL: {
    type: String,
    required: false,
    default: 'www.google.com'
  },
  summary: {
    type: String,
    required: false,
    default:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
  },
  skills: {
    skill1: {
      type: String,
      required: false,
      default: 'Skill 1'
    },
    skill2: {
      type: String,
      required: false,
      default: 'Skill 2'
    },
    skill3: {
      type: String,
      required: false,
      default: 'Skill 3'
    },
    skill4: {
      type: String,
      required: false,
      default: 'Skill 4'
    },
    skill5: {
      type: String,
      required: false,
      default: 'Skill 5'
    },
    skill6: {
      type: String,
      required: false,
      default: 'Skill 6'
    },
    skill7: {
      type: String,
      required: false,
      default: 'Skill 7'
    },
    skill8: {
      type: String,
      required: false,
      default: 'Skill 8'
    },
    skill9: {
      type: String,
      required: false,
      default: 'Skill 9'
    }
  },
  userSchool: [UserSchoolSchema],
  userProjects: [UserProjectSchema],
  userWork: [UserWorkSchema]
});

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model('User', UserSchema);

// Export the Article model
module.exports = User;
