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

    if (req.body.gender === 'M') {
      patient = await Farm.find({
        gender: 'M'
      })
      showMaleGraph++
      // console.log(patient[343].age)
      for (let i = 0; i < patient.length; i++) {
        genderAgeCount.allAge++
        patientCount++

        if (parseInt(patient[i].age, 10) <= 20) {
          genderAgeCount.age1++
          patientCount++
        } else if (parseInt(patient[i].age, 10) > 20 && parseInt(patient[i].age, 10) <= 30) {
          genderAgeCount.age2++
          patientCount++
        } else if (parseInt(patient[i].age, 10) > 31 && parseInt(patient[i].age, 10) <= 40) {
          genderAgeCount.age3++
          patientCount++
        } else if (parseInt(patient[i].age, 10) > 41 && parseInt(patient[i].age, 10) <= 50) {
          genderAgeCount.age4++
          patientCount++
        } else if (parseInt(patient[i].age, 10) && parseInt(patient[i].age, 10) <= 60) {
          genderAgeCount.age5++
          patientCount++
        } else if (parseInt(patient[i].age, 10) > 61) {
          genderAgeCount.age6++
          patientCount++
        }
      }
    } else if (req.body.gender === 'F') {
      patient = await Farm.find({
        gender: 'F'
      })
      showFemaleGraph++
      for (let i = 0; i < patient.length; i++) {
        genderAgeCount.allAge++
        patientCount++

        if (parseInt(patient[i].age, 10) <= 20) {
          genderAgeCount.age1++
          patientCount++
        } else if (parseInt(patient[i].age, 10) > 20 && parseInt(patient[i].age, 10) <= 30) {
          genderAgeCount.age2++
          patientCount++
        } else if (parseInt(patient[i].age, 10) > 31 && parseInt(patient[i].age, 10) <= 40) {
          genderAgeCount.age3++
          patientCount++
        } else if (parseInt(patient[i].age, 10) > 41 && parseInt(patient[i].age, 10) <= 50) {
          genderAgeCount.age4++
          patientCount++
        } else if (parseInt(patient[i].age, 10) && parseInt(patient[i].age, 10) <= 60) {
          genderAgeCount.age5++
          patientCount++
        } else if (parseInt(patient[i].age, 10) > 61) {
          genderAgeCount.age6++
          patientCount++
        }
      }
    } else {
      if (req.body.gender === 'allSex') {
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
              $lt: '20'
            },
            gender: 'F'
          }).count()
          female = await Farm.find({
            age: {
              $lt: '20'
            },
            gender: 'M'
          }).count()
        } else if (req.body.age === 'age2') {
          female = await Farm.count({
            age: {
              $gt: '21',
              $lt: '30'
            },
            gender: 'F'
          })
          male = await Farm.count({
            age: {
              $gt: '21',
              $lt: '30'
            },
            gender: 'M'
          })
        } else if (req.body.age === 'age3') {
          male = await Farm.find({
            age: {
              $gt: '31',
              $lt: '40'
            },
            gender: 'F'
          }).count()
          female = await Farm.find({
            age: {
              $gt: '31',
              $lt: '40'
            },
            gender: 'M'
          }).count()
        } else if (req.body.age === 'age4') {
          male = await Farm.find({
            age: {
              $gt: '31',
              $lt: '40'
            },
            gender: 'F'
          }).count()
          female = await Farm.find({
            age: {
              $gt: '31',
              $lt: '40'
            },
            gender: 'M'
          }).count()
        } else if (req.body.age === 'age3') {
          male = await Farm.find({
            age: {
              $gt: '31',
              $lt: '40'
            },
            gender: 'F'
          }).count()
          female = await Farm.find({
            age: {
              $gt: '31',
              $lt: '40'
            },
            gender: 'M'
          }).count()
        } else if (req.body.age === 'age3') {
          male = await Farm.find({
            age: {
              $gt: '31',
              $lt: '40'
            },
            gender: 'F'
          }).count()
          female = await Farm.find({
            age: {
              $gt: '31',
              $lt: '40'
            },
            gender: 'M'
          }).count()
        }

        // else if (req.body.age === 'age1') {
        //   for (let i = 0; i < patient.length; i++) {
        //     if (patient[i].age <= 20) {
        //       if (patient[i].gender === 'F') {
        //         female++
        //       } else {
        //         male++
        //       }
        //       patientCount++
        //     }
        //   }
        // } else if (req.body.age === 'age2') {
        //   for (let i = 0; i < patient.length; i++) {
        //     if (patient[i].age > 20 && patient[i].age <= 30) {
        //       if (patient[i].gender === 'F') {
        //         female++
        //       } else {
        //         male++
        //       }
        //       patientCount++
        //     }
        //   }
        // } else if (req.body.age === 'age3') {
        //   for (let i = 0; i < patient.length; i++) {
        //     if (patient[i].age > 30 && patient[i].age <= 40) {
        //       if (patient[i].gender === 'F') {
        //         female++
        //       } else {
        //         male++
        //       }
        //       patientCount++
        //     }
        //   }
        // } else if (req.body.age === 'age4') {
        //   for (let i = 0; i < patient.length; i++) {
        //     if (patient[i].age > 40 && patient[i].age <= 50) {
        //       if (patient[i].gender === 'F') {
        //         female++
        //       } else {
        //         male++
        //       }
        //       patientCount++
        //     }
        //   }
        // } else if (req.body.age === 'age5') {
        //   for (let i = 0; i < patient.length; i++) {
        //     if (patient[i].age > 50 && patient[i].age <= 60) {
        //       if (patient[i].gender === 'F') {
        //         female++
        //       } else {
        //         male++
        //       }
        //       patientCount++
        //     }
        //   }
        // } else if (req.body.age === 'age6') {
        //   for (let i = 0; i < patient.length; i++) {
        //     if (patient[i].age > 60) {
        //       if (patient[i].gender === 'F') {
        //         female++
        //       } else {
        //         male++
        //       }
        //       patientCount++
        //     }
        //   }
        // }
      }

    }
    // console.log('!!!')
    console.log(female, male)
    let gender = {
      m: male,
      f: female,
      all: 0
    }
    console.log(gender)
    res.render('gender.hbs', {
      gender,
      showMaleGraph,
      showFemaleGraph,
      genderAgeCount
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
    console.log(genderAgeCount)
    console.log(gender)
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