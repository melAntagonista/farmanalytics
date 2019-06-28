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
    console.log(req.body.gender)
    let patient;
    let patientCount = 0
    let male = 0
    let female = 0
    let showAll = 0
    let showMaleGraph = 0
    let showFemaleGraph = 0
    let genderAgeCount = {
      allAge: 0,
      age1: 0,
      age2: 0,
      age3: 0,
      age4: 0,
      age5: 0,
      age6: 0
    }

    if (req.body.gender === 'M' || req.body.gender === 'F') {

      if (req.body.gender === 'M') {
        showMaleGraph++
      } else {
        showFemaleGraph++
      }

      genderAgeCount.allAge = await Farm.count({
        gender: req.body.gender
      })
      genderAgeCount.age1 = await Farm.count({
        age: {
          $lte: '20'
        },
        gender: req.body.gender
      })
      genderAgeCount.age2 = await Farm.count({
        age: {
          $gte: '21',
          $lte: '30'
        },
        gender: req.body.gender
      })
      genderAgeCount.age3 = await Farm.count({
        age: {
          $gte: '31',
          $lte: '40'
        },
        gender: req.body.gender
      })
      genderAgeCount.age4 = await Farm.count({
        age: {
          $gte: '41',
          $lte: '50'
        },
        gender: req.body.gender
      })
      genderAgeCount.age5 = await Farm.count({
        age: {
          $gte: '51',
          $lte: '60'
        },
        gender: req.body.gender
      })
      genderAgeCount.age6 = await Farm.count({
        age: {
          $gte: '60'
        },
        gender: req.body.gender
      })

    } else {
      if (req.body.gender === 'allSex') {
        showAll++
        if (req.body.age === 'allAge') {
          female = await Farm.count({
            gender: 'F'
          })
          male = await Farm.count({
            gender: 'M'
          })
        } else if (req.body.age === 'age1') {
          male = await Farm.find({
            age: {
              $lte: '20'
            },
            gender: 'F'
          }).count()
          female = await Farm.find({
            age: {
              $lte: '20'
            },
            gender: 'M'
          }).count()
        } else if (req.body.age === 'age2') {
          female = await Farm.count({
            age: {
              $gte: '21',
              $lte: '30'
            },
            gender: 'F'
          })
          male = await Farm.count({
            age: {
              $gte: '21',
              $lte: '30'
            },
            gender: 'M'
          })
        } else if (req.body.age === 'age3') {
          male = await Farm.find({
            age: {
              $gte: '31',
              $lte: '40'
            },
            gender: 'F'
          }).count()
          female = await Farm.find({
            age: {
              $gte: '31',
              $lte: '40'
            },
            gender: 'M'
          }).count()
        } else if (req.body.age === 'age4') {
          male = await Farm.find({
            age: {
              $gte: '41',
              $lte: '50'
            },
            gender: 'F'
          }).count()
          female = await Farm.find({
            age: {
              $gte: '41',
              $lte: '50'
            },
            gender: 'M'
          }).count()
        } else if (req.body.age === 'age5') {
          male = await Farm.find({
            age: {
              $gte: '51',
              $lte: '60'
            },
            gender: 'F'
          }).count()
          female = await Farm.find({
            age: {
              $gt: '51',
              $lt: '60'
            },
            gender: 'M'
          }).count()
        } else if (req.body.age === 'age6') {
          male = await Farm.find({
            age: {
              $gte: '60',

            },
            gender: 'F'
          }).count()
          female = await Farm.find({
            age: {
              $gte: '60',
            },
            gender: 'M'
          }).count()
        }
      }

    }


    let gender = {
      m: male,
      f: female,
      all: 0
    }
    console.log(genderAgeCount)
    console.log(gender)
    res.render('gender.hbs', {
      gender,
      showMaleGraph,
      showFemaleGraph,
      genderAgeCount,
      showAll
    })

  })


// route for user signup
// router.route('/signup')
//   .get(sessionChecker, (req, res) => {
//     res.render('signup');

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
      console.log(malePercent, '%')
      console.log(femalePercent, '%')
    res.render('1', {malePercent, femalePercent});
//   })

//   router.route('/2')
//   .get(async (req, res) => {

//       let ageArray = await Farm.find({}, {
//           age: 1,
//           _id: 0
//       })
  
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
    console.log(genderAgeCount)
    console.log(gender)
    // console.log(patient)
    res.render('login', {
      patient,
      gender,
      age
    });
  });


// // route for user's dashboard
// router.get('/dashboard', async (req, res) => {
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
//   res.render('index.hbs')
// });


// route for user logout
// router.get('/logout', async (req, res, next) => {
//   if (req.session.user && req.cookies.user_sid) {
//     try {
//       // res.clearCookie('user_sid');
//       await req.session.destroy();
//       res.redirect('/');
//     } catch (error) {
//       next(error);
//     }
//   } else {
//     res.redirect('/login');
//   }
// });


module.exports = router;

