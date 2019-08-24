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

  // Route for logging user out
  app.get('/logout', (req, res) => {
    req.logout();
    res.status(200).json({ mes: 'You have successfully logged out!' });
  });

  // This route is called when react loads pages that require authentication
  app.get('/api/checkauthentication', isAuthenticated, (req, res) => {
    db.user.findById(req.user._id, (err, dbUser) => {
      res.status(200).json({ res: dbUser });
    });
  });

  // ************************* Routes to update account details ************************
  app.put('/api/account/details', (req, res) => {
    console.log('req: ');
    console.log(req.body);
    let user = req.body;
    let where = { _id: user.id };
    let update = {
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,
      portfolioURL: user.portfolioURL,
      addressStreet: user.addressStreet,
      addressCity: user.addressCity,
      summary: user.summary,
      $set: {
        'skills.skill1': user.skills.skill1,
        'skills.skill2': user.skills.skill2,
        'skills.skill3': user.skills.skill3,
        'skills.skill4': user.skills.skill4,
        'skills.skill5': user.skills.skill5,
        'skills.skill6': user.skills.skill6,
        'skills.skill7': user.skills.skill7,
        'skills.skill8': user.skills.skill8,
        'skills.skill9': user.skills.skill9
      }
    };
    db.user.findOneAndUpdate(where, update, (err, dbRes) => {
      console.log(dbRes);
      res.status(200).json(dbRes);
    });
  });

  app.put('/api/account/school', (req, res) => {
    console.log(req.body);
    let user = req.body;
    let where = { _id: user.id };
    update = {
      $push: {
        userSchool: {
          schoolName: user.schoolName,
          schoolDegree: user.schoolDegree,
          schoolYearFrom: user.schoolYearFrom,
          schoolYearTo: user.schoolYearTo
        }
      }
    };
    db.user.findOneAndUpdate(where, update, (err, dbRes) => {
      console.log(dbRes);
      res.status(200).json(dbRes);
    });
  });

  app.put('/api/account/job', (req, res) => {
    console.log(req.body);
    let user = req.body;
    let where = { _id: user.id };
    update = {
      $push: {
        userWork: {
          jobTitle: user.jobTitle,
          jobCompany: user.jobCompany,
          jobDate: user.jobDate,
          jobSummary: user.jobSummary
        }
      }
    };
    db.user.findOneAndUpdate(where, update, (err, dbRes) => {
      console.log(dbRes);
      res.status(200).json(dbRes);
    });
  });

  app.put('/api/account/projects', (req, res) => {
    console.log(req.body);
    let user = req.body;
    let where = { _id: user.id };
    update = {
      $push: {
        userProjects: {
          projectName: user.projectName,
          projectURL: user.projectURL,
          projectDesc: user.projectDesc
        }
      }
    };
    db.user.findOneAndUpdate(where, update, (err, dbRes) => {
      console.log(dbRes);
      res.status(200).json(dbRes);
    });
  });

  // ******************* Delete user Data ************************

  app.delete('/api/account/delete', (req, res) => {
    console.log('req: ');
    console.log(req.body);

    db.user.findOneAndUpdate(
      { _id: req.body._id },
      { $pull: { [req.body.data]: { _id: req.body.itemID } } },
      (err, dbRes) => {
        console.log(err);
        console.log(dbRes);
        res.status(200).json(dbRes);
      }
    );
  });

  // ****************** Search for Jobs **************************
  app.get('/api/:search/:location/:skill?', (req, res) => {
    if (!req.params.search || !req.params.location || req.params.hours) {
      res.status(400).json({ err: 'Incorrect search' });
    }
    let jobSearch = `description=${req.params.search.trim()}`;
    let jobLocation = `&location=${req.params.location.trim()}`;

    let url = `https://jobs.github.com/positions.json?` + jobSearch + jobLocation;

    console.log(url);

    axios.get(url).then(response => {
      let jobs = response.data;
      let skillSearch = decodeURI(req.params.skill).split('~');
      skillSearch = skillSearch
        .join('|')
        .toLowerCase()
        .split('|');

      if (skillSearch) {
        jobs.map(job => {
          let jobDesc = job.description
            .replace(/[^a-zA-Z ]/g, ' ')
            .toLowerCase()
            .split(' ')
            .filter(word => word.length > 2);

          jobDesc = [...new Set(jobDesc)];
          console.log(jobDesc);
          console.log(skillSearch);

          job.descriptionArr = jobDesc.filter(desc => skillSearch.indexOf(desc) !== -1);
        });
      }
      console.log(jobs);

      res.status(200).json({ res: jobs });
    });
  });
};
