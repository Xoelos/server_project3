require('dotenv').config();

const express = require('express');
const session = require('express-session');
const app = express();
const PORT = process.env.PORT || 8080;

const mongoose = require('mongoose');
const uristring = process.env.MONGODB_URI || 'mongodb://localhost/project3';

const cors = require('cors');
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://project3du.s3-website.us-east-2.amazonaws.com'
    ],
    credentials: true,
    allowedHeaders:
      'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept'
  })
);

// Requiring passport as we've configured it
const passport = require('./config/passport');

// Creating express app and configuring middleware needed for authentication
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('public'));
// We need to use sessions to keep track of our user's login status
app.use(
  session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
// Routes
require('./routes/apiRoutes')(app);
require('./routes/htmlRoutes')(app);

var syncOptions = { force: true };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === 'test') {
  syncOptions.force = true;
}

// Connect to the Mongo DB
mongoose.connect(uristring, function(err, res) {
  if (err) {
    console.log('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log('Succeeded connected to: ' + uristring);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log('App running on port ' + PORT + '!');
});

module.exports = app;
