const express = require('express');
const { sessionChecker } = require('../middleware/auth');
const Farm = require('../models/farms');


const router = express.Router();
// route for Home-Page
router.get('/', sessionChecker, (req, res) => {
  res.redirect('/dashboard');
});

router.route('/1')
  .get(async (req, res) => {
      let maleGender = await Farm.find({
          gender: 'M'
      }, {
          gender: 1,
          _id: 0
      })

      let allGender = await Farm.find()
      let malePercent = (maleGender.length * 100 / allGender.length).toFixed(2)
      let femalePercent = (100 - malePercent).toFixed(2)
    res.render('1', {malePercent, femalePercent});
  })

  router.route('/2')
  .get(async (req, res) => {

      let ageArray = await Farm.find({}, {
          age: 1,
          _id: 0
      })
  
      let ageGroups = []
      let age0to20 = [];
      let age21to30 = [];
      let age31to40 = [];
      let age41to50 = [];
      let age51to60 = [];
      let age61AndOlder = [];
  
      for (let i = 0; i < ageArray.length; i++) {
          if (ageArray[i].age <= 20) {
              age0to20.push(ageArray[i].age)
          } else if (ageArray[i].age > 20 && ageArray[i].age <= 30) {
              age21to30.push(ageArray[i].age)
          } else if (ageArray[i].age > 30 && ageArray[i].age <= 40) {
              age31to40.push(ageArray[i].age)
          } else if (ageArray[i].age > 40 && ageArray[i].age <= 50) {
              age41to50.push(ageArray[i].age)
          } else if (ageArray[i].age > 50 && ageArray[i].age <= 60) {
              age51to60.push(ageArray[i].age)
          } else if (ageArray[i].age > 60) {
              age61AndOlder.push(ageArray[i].age)
          }
      }
      ageGroups = [age0to20, age21to30, age31to40, age41to50, age51to60, age61AndOlder]
  
      for (let j = 0; j < ageGroups.length; j++) {
          ageGroups[j] = (ageGroups[j].length * 100 / ageArray.length).toFixed(2)
      }
      console.log(ageGroups)
      let firstAgeGroup = ageGroups[0];
      let secondAgeGroup = ageGroups[1];
      let thirdAgeGroup = ageGroups[2];
      let fourthAgeGroup = ageGroups[3];
      let fifthAgeGroup = ageGroups[4];
      let sixthAgeGroup = ageGroups[5];
  
    res.render('2', {firstAgeGroup, secondAgeGroup, thirdAgeGroup, fourthAgeGroup, fifthAgeGroup, sixthAgeGroup});
  })
  router.route('/3')
  .get(async (req, res) => {
    res.render('3', {});
  })

  router.route('/4')
  .get(async (req, res) => {
    res.render('4', {});
  })

  router.route('/5')
  .get(async (req, res) => {
    res.render('5', {});
  })

  

// route for user Login
router.route('/login')
  .get(sessionChecker, (req, res) => {
    res.render('login');
  })
  .post(async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const user = await User.findOne({ username });
    if (!user) {
      res.redirect('/login');
      // } else if (!user.validPassword(password)) {
    } else if (user.password !== password) {
      res.redirect('/login');
    } else {
      req.session.user = user;
      res.redirect('/dashboard');
    }

  });


// route for user's dashboard
router.get('/dashboard', (req, res) => {
    res.render('dashboard');
});


// route for user logout
router.get('/logout', async (req, res, next) => {
  if (req.session.user && req.cookies.user_sid) {
    try {
      // res.clearCookie('user_sid');
      await req.session.destroy();
      res.redirect('/');
    }
    catch (error) {
      next(error);
    }
  } else {
    res.redirect('/login');
  }
});


module.exports = router;

