var mongoose = require("mongoose");
var userData = require("./userData");
var userProject = require("./userProject");
const userSchool = require("./userSchool");
const userWork = require("./userWork");
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
  userData: { userData },
  userProject: [userProject],
  userSchool: [userSchool],
  userWork: [userWork]

  // usersData: {
  //   type: Schema.Types.ObjectId,
  //   ref: "userData"
  // }
});

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", UserSchema);

// Export the Article model
module.exports = User;
