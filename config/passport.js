var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require('bcryptjs');

var db = require('../models');

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(
  new LocalStrategy(
    // Our user will sign in using an email, rather than a "username"
    {
      usernameField: 'email'
    },
    function(email, password, done) {
      db.user.findOne({ email: email }, function(err, dbUser) {
        if (err) throw err;
        // If there's no user with the given email
        console.log(dbUser);
        if (!dbUser) {
          console.log(`An incorrect email address was attempted: ${email}`);
          return done(null, false, {
            message: 'Invalid login, please try again!'
          });
        } else if (!bcrypt.compareSync(password, dbUser.password)) {
          console.log('An incorrect password was attempted');
          return done(null, false, {
            message: 'Invalid login, please try again!'
          });
        }
        // If none of the above, return the user
        return done(null, dbUser);
      });
    }
  )
);

// In order to help keep authentication state across HTTP requests,
// Sequelize needs to serialize and deserialize the user
// Just consider this part boilerplate needed to make it all work
passport.serializeUser(function(user, cb) {
  console.log('serialized!');
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  console.log('deserialized!');
  cb(null, obj);
});

// Exporting our configured passport
module.exports = passport;
