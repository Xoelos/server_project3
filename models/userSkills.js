var mongoose = require('mongoose');

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var UserSkillsSchema = new Schema({
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
});

module.exports = UserSkillsSchema;
