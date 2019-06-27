const express = require('express');
const {
  sessionChecker
} = require('../middleware/auth');
const User = require('../models/users');
const Farm = require('../models/farms');


const router = express.Router();
// route for Home-Page
router.get('/', (req, res) => {
  res.redirect('/home');
});

router.get('/home', (req, res) => {
  res.render('home.hbs')
});

router.route('/gender')
  .get((req, res) => {
    res.render('gender.hbs')
  })
  .post(async (req, res) => {
    let patient = await Farm.find({})

    let patientCount = 0
    let male = 0
    let female = 0

    if (req.body.age === 'allAge') {
      for (let i = 0; i < patient.length; i++) {
        if (patient[i].gender === 'F') {
          female++
        } else {
          male++
        }
        patientCount++
      }
    } else if (req.body.age === 'age1') {
      for (let i = 0; i < patient.length; i++) {
        if (patient[i].age <= 20) {
          if (patient[i].gender === 'F') {
            female++
          } else {
            male++
          }
          patientCount++
        }
      }
    } else if (req.body.age === 'age2') {
      for (let i = 0; i < patient.length; i++) {
        if (patient[i].age > 20 && patient[i].age <= 30) {
          if (patient[i].gender === 'F') {
            female++
          } else {
            male++
          }
          patientCount++
        }
      }
    } else if (req.body.age === 'age3') {
      for (let i = 0; i < patient.length; i++) {
        if (patient[i].age > 30 && patient[i].age <= 40) {
          if (patient[i].gender === 'F') {
            female++
          } else {
            male++
          }
          patientCount++
        }
      }
    } else if (req.body.age === 'age4') {
      for (let i = 0; i < patient.length; i++) {
        if (patient[i].age > 40 && patient[i].age <= 50) {
          if (patient[i].gender === 'F') {
            female++
          } else {
            male++
          }
          patientCount++
        }
      }
    } else if (req.body.age === 'age5') {
      for (let i = 0; i < patient.length; i++) {
        if (patient[i].age > 50 && patient[i].age <= 60) {
          if (patient[i].gender === 'F') {
            female++
          } else {
            male++
          }
          patientCount++
        }
      }
    } else if (req.body.age === 'age6') {
      for (let i = 0; i < patient.length; i++) {
        if (patient[i].age > 60) {
          if (patient[i].gender === 'F') {
            female++
          } else {
            male++
          }
          patientCount++
        }
      }
    }

    let gender = {
      m: male,
      f: female,
      all: patientCount
    }

    res.render('gender.hbs', {
      gender
    })
  })


// route for user signup
router.route('/signup')
  .get(sessionChecker, (req, res) => {
    res.render('signup');
  })
  .post(async (req, res) => {
    try {
      const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      })
      await user.save();
      req.session.user = user;
      res.redirect('/dashboard');
    } catch (error) {
      res.redirect('/signup');
    };
  });


// route for user Login
router.route('/login')
  .get((req, res) => {

    res.render('login');
  })
  .post(async (req, res) => {
    // console.log(req.body.gender)
    let patient = await Farm.find({})
    let patientCount = 0
    let male = 0
    let female = 0

    for (let i = 0; i < patient.length; i++) {
      if (patient[i].gender === 'F') {
        female++
      } else {
        male++
      }
      patientCount++
    }


    let age0to20 = 0;
    let age21to30 = 0;
    let age31to40 = 0;
    let age41to50 = 0;
    let age51to60 = 0;
    let age61AndOlder = 0;

    for (let i = 0; i < patient.length; i++) {
      if (patient[i].age <= 20) {
        age0to20++
      } else if (patient[i].age > 20 && patient[i].age <= 30) {
        age21to30++
      } else if (patient[i].age > 30 && patient[i].age <= 40) {
        age31to40++
      } else if (patient[i].age > 40 && patient[i].age <= 50) {
        age41to50++
      } else if (patient[i].age > 50 && patient[i].age <= 60) {
        age51to60++
      } else if (patient[i].age > 60) {
        age61AndOlder++
      }
    }
    let age = {
      age1: age0to20,
      age2: age21to30,
      age3: age31to40,
      age4: age41to50,
      age5: age51to60,
      age6: age61AndOlder
    }
    let gender = {
      m: male,
      f: female,
      all: patientCount
    }

    // console.log(patient)
    res.render('login', {
      patient,
      gender,
      age
    });
  });


// route for user's dashboard
router.get('/dashboard', async (req, res) => {
  // let patient = await Farm.find({})
  // let patientCount = 0
  // let male = 0
  // let female = 0

  // for (let i = 0; i < patient.length; i++) {
  //   if (patient[i].gender === 'F') {
  //     female++
  //   } else {
  //     male++
  //   }
  //   patientCount++
  // }


  // let age0to20 = 0;
  // let age21to30 = 0;
  // let age31to40 = 0;
  // let age41to50 = 0;
  // let age51to60 = 0;
  // let age61AndOlder = 0;

  // for (let i = 0; i < patient.length; i++) {
  //   if (patient[i].age <= 20) {
  //     age0to20++
  //   } else if (patient[i].age > 20 && patient[i].age <= 30) {
  //     age21to30++
  //   } else if (patient[i].age > 30 && patient[i].age <= 40) {
  //     age31to40++
  //   } else if (patient[i].age > 40 && patient[i].age <= 50) {
  //     age41to50++
  //   } else if (patient[i].age > 50 && patient[i].age <= 60) {
  //     age51to60++
  //   } else if (patient[i].age > 60) {
  //     age61AndOlder++
  //   }
  // }
  // let age = {
  //   age1: age0to20,
  //   age2: age21to30,
  //   age3: age31to40,
  //   age4: age41to50,
  //   age5: age51to60,
  //   age6: age61AndOlder
  // }
  // let gender = {
  //   m: male,
  //   f: female,
  //   all: patientCount
  // }

  // console.log(patient)
  res.render('index.hbs')
});


// route for user logout
router.get('/logout', async (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    try {
      // res.clearCookie('user_sid');
      await req.session.destroy();
      res.redirect('/');
    } catch (error) {
      next(error);
    }
  } else {
    res.redirect('/login');
  }
});


module.exports = router;