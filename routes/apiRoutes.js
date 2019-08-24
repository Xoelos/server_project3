var db = require('../models');
var passport = require('../config/passport');
const isAuthenticated = require('../config/middleware/isAuthenticated');
const isNotAuthenticated = require('../config/middleware/isNotAuthenticated');
const axios = require('axios');
var bcrypt = require('bcryptjs');

module.exports = app => {
  // creates account with encrypted password
  app.post('/api/add/account', (req, res) => {
    db.user.findOne({ email: req.body.email }, (err, dbData) => {
      if (err) throw err;
      if (dbData) {
        console.log(`E-Mail Address already in use: ${req.body.email}`);
        res.status(409).json({ err: 'Email is already taken!' });
      } else {
        let pswrd = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null);
        db.user.create(
          {
            fullName: req.body.fullName,
            email: req.body.email,
            password: pswrd
          },
          (err, dbData) => {
            console.log('Account has been created in the database!');
            res.status(200).json({ email: req.body.email, password: req.body.password });
          }
        );
      }
    });
  });

  // Initiates session with passport
  app.post('/api/login', passport.authenticate('local'), (req, res) => {
    console.log('A login has been attempted!');
    let user = req.user;
    res.status(200).json({ user });
  });

  app.put('/api/account/details', passport.authenticate('local'), (req, res) => {
    console.log(req.body);
    let user = req.body;
    let where = { _id: user.id };
    update = {
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      portfolioURL: user.portfolioURL,
      addressStreet: user.addressStreet,
      addressCity: user.addressCity,
      summary: user.summary
    };
    db.user.findOneAndUpdate(where, update, dbRes => {
      console.log(dbRes);
      res.status(200).json(dbRes);
    });
  });
  // Route for logging user out
  app.get('/logout', (req, res) => {
    req.logout();
    res.status(200).json({ mes: 'You have successfully logged out!' });
  });

  // This route is called when react loads pages that require authentication
  app.get('/api/checkauthentication', isAuthenticated, (req, res) => {
    console.log('is there a user?', req.user);
    res.status(200).json({ res: req.user });
  });

  app.get('/api/:account', (req, res) => {
    db.user.findOne({ email: req.body.email }, (err, dbdata) => {
      if (err) throw err;
      res.json(dbdata);
    });
  });

  // Search for Jobs
  app.get('/api/:search/:location/:hours?', (req, res) => {
    if (!req.params.search || !req.params.location) {
      res.status(400).json({ err: 'Incorrect search' });
    }
    let jobSearch = `description=${req.params.search.trim()}`;
    let jobLocation = `&location=${req.params.location.trim()}`;
    let jobHours;
    if (req.params.hours) {
      jobHours = `&full_time=${req.params.hours.trim()}`;
    } else {
      jobHours = ``;
    }
    let url = `https://jobs.github.com/positions.json?` + jobSearch + jobLocation + jobHours;

    console.log(url);

    // *********************************** Testing API function ****************************************
    axios.get(url).then(response => {
      res.status(200).json({ res: response.data });
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
