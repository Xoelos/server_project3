var db = require('../models');
var passport = require('../config/passport');
const isAuthenticated = require('../config/middleware/isAuthenticated');
const isNotAuthenticated = require('../config/middleware/isNotAuthenticated');
const axios = require('axios');
var bcrypt = require('bcryptjs');

module.exports = function(app) {
  app.post('/api/account/add', (req, res) => {
    db.user.findOne({ email: req.body.email }, dbData => {
      if (dbData) {
        console.log(`E-Mail Address already in use: ${req.body.email}`);
        res.status(409).json({ err: 'Email is already taken!' });
      } else {
        let pswrd = bcrypt.hashSync(
          req.body.password,
          bcrypt.genSaltSync(10),
          null
        );
        console.log(pswrd);
        db.user.create(
          {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: pswrd
          },
          dbData => {
            console.log('Account has been created in the database!');
            res.status(200).json({ email: req.body.email, password: pswrd });
          }
        );
      }
    });
  });

  app.post('/api/login', passport.authenticate('local'), function(req, res) {
    console.log('A login has been attempted!');
    res.json(req.user);
  });

  app.get('/api/:account', (req, res) => {
    db.user.findOne({ email: req.body.email }, function(err, dbdata) {
      if (err) throw err;
      res.json(dbdata);
    });
  });

  // Load index page
  app.get('/api/:search/:hours?/:location', isAuthenticated, function(
    req,
    res
  ) {
    if (!req.params.search || !req.params.location) {
      res.status(200).json({ err: 'Incorrect search' });
    }
    let jobSearch = `description=${req.params.search}`;
    let jobHours;
    if (req.params.hours) {
      jobHours = `&full_time=${req.params.hours}`;
    } else {
      jobHours = ``;
    }
    let jobLocation = `&location=${req.params.location}`;
    let url =
      `https://jobs.github.com/positions.json?` +
      jobSearch +
      jobHours +
      jobLocation;

    // *********************************** Testing API function ****************************************
    axios.get(url).then(response => {
      res.json(response);
      // let counts = {};
      // let result = [];

      // response.data.forEach((element, indexId) => {
      //   let desc = element.description;

      //   desc = desc
      //     .replace(/[^a-zA-Z ]/g, ' ')
      //     .split(' ')
      //     .filter(word => word.length > 2)
      //     .sort();

      //   for (var i = 0; i < desc.length; i++) {
      //     var word = desc[i].toLowerCase();
      //     //   word = word.charAt(0).toUpperCase() + word.slice(1);
      //     counts[word] = counts[word] ? counts[word] + 1 : 1;
      //   }
      // });

      /*for (var j in counts) {
        result.push([j, counts[j]]);
      }

      result.sort((a, b) => {
        let x = a[1];
        let y = b[1];
        return y - x;
      });*/

      // res.json(counts);
    });

    //   phantom.js
  });
};
