var db = require('../models');
var passport = require('../config/passport');
const isAuthenticated = require('../config/middleware/isAuthenticated');
const isNotAuthenticated = require('../config/middleware/isNotAuthenticated');
const axios = require('axios');

module.exports = function(app) {
  app.post('/api/account/add', (req, res) => {
    console.log(req.body);
    db.user.findOne({ email: req.body.email }, dbData => {
      if (dbData) {
        console.log(`E-Mail Address already in use: ${req.body.email}`);
        res.status(409).json({ err: 'Username is already taken!' });
      } else {
        db.user.findOne({ username: req.body.username }, dbData => {
          // If there's no user with the given email
          if (dbData) {
            console.log(`Username already in use: ${req.body.userName}`);
            res.status(409).json({ err: 'Username is already taken!' });
          } else {
            db.user.create(
              {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
              },
              dbData => {
                res.status(200).json({ res: dbData });
              }
            );
          }
        });
      }
    });
  });

  app.get('/api/:account', (req, res) => {
    db.user.findOne({ email: req.body.email }, function(err, dbdata) {
      if (err) throw err;
      res.json(dbdata);
    });
  });

  // Load index page
  app.get('/api/:search', function(req, res) {
    let jobSearch = req.params.search;

    // *********************************** Testing API function ****************************************
    axios
      .get(
        `https://jobs.github.com/positions.json?description=${jobSearch}&full_time=true&location=california`
      )
      .then(response => {
        let counts = {};
        let result = [];

        response.data.forEach((element, indexId) => {
          let desc = element.description;

          desc = desc
            .replace(/[^a-zA-Z ]/g, ' ')
            .split(' ')
            .filter(word => word.length > 2)
            .sort();

          for (var i = 0; i < desc.length; i++) {
            var word = desc[i].toLowerCase();
            //   word = word.charAt(0).toUpperCase() + word.slice(1);
            counts[word] = counts[word] ? counts[word] + 1 : 1;
          }
        });

        // for (var j in counts) {
        //   result.push([j, counts[j]]);
        // }

        // result.sort((a, b) => {
        //   let x = a[1];
        //   let y = b[1];
        //   return y - x;
        // });

        res.json(counts);
      });

    //   phantom.js
  });
};
