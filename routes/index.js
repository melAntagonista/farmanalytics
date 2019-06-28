const express = require('express');

const {
  sessionChecker
} = require('../middleware/auth');

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
              $gte: '51',
              $lte: '60'
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

router.route('/migrane')
  .get(async (req, res) => {

    res.render('migrane.hbs', {})
  })
  .post(async (req, res) => {
    console.log(req.body.gender)
    console.log(req.body.age)
    let patientMigrane = {
      count: 0,
      high: 0,
      midHigh: 0,
      mid: 0,
      midLow: 0,
      low: 0
    }
    let patientGender = {
      male: 0,
      female: 0
    }
    let graph = {
      plain: 0,
      manGraph: 0,
      femaleGraph: 0,
      age: 0,
      manLow: 0,
      manLowMid: 0,
      manMid: 0,
      manMidHigh: 0,
      manHigh: 0,
      womanLow: 0,
      womanLowMid: 0,
      womanMid: 0,
      womanMidHigh: 0,
      womanHigh: 0
    }

    if (req.body.gender === 'M' || req.body.gender === 'F') {
      graph.plain++
      patientMigrane.high = await Farm.find({
        gender: req.body.gender,
        painIntencity: 'ВАШ 9-10 баллов'
      }).count()
      console.log()
      patientMigrane.midHigh = await Farm.find({
        painIntencity: 'ВАШ 6-8 баллов',
        gender: req.body.gender,
      }).count()
      patientMigrane.mid = await Farm.find({
        painIntencity: 'ВАШ 4-5 баллов',
        gender: req.body.gender,
      }).count()
      patientMigrane.midLow = await Farm.find({
        painIntencity: 'ВАШ 2-3 балла',
        gender: req.body.gender,
      }).count()
      patientMigrane.low = await Farm.find({
        painIntencity: 'ВАШ 0 баллов',
        gender: req.body.gender,
      }).count()
    } else {
      graph.plain++
      patientMigrane.high = await Farm.find({
        painIntencity: 'ВАШ 9-10 баллов'
      }).count()
      console.log()
      patientMigrane.midHigh = await Farm.find({
        painIntencity: 'ВАШ 6-8 баллов'
      }).count()
      patientMigrane.mid = await Farm.find({
        painIntencity: 'ВАШ 4-5 баллов'
      }).count()
      patientMigrane.midLow = await Farm.find({
        painIntencity: 'ВАШ 2-3 балла'
      }).count()
      patientMigrane.low = await Farm.find({
        painIntencity: 'ВАШ 0 баллов'
      }).count()
    }
    let ggg = req.body.age

    if (req.body.gender === 'allSex' && req.body.age === 'age1') {
      graph.plain++
      patientMigrane.low = await Farm.find({
        age: {
          // $gte: '51',
          $lte: '20'
        },

        painIntencity: 'ВАШ 0 баллов'
      }).count()
      patientMigrane.midLow = await Farm.find({
        age: {
          // $gte: '51',
          $lte: '20'
        },

        painIntencity: 'ВАШ 2-3 балла'
      }).count()
      patientMigrane.mid = await Farm.find({
        age: {
          // $gte: '51',
          $lte: '20'
        },

        painIntencity: 'ВАШ 4-5 баллов'
      }).count()
      patientMigrane.midHigh = await Farm.find({
        age: {
          // $gte: '51',
          $lte: '20'
        },

        painIntencity: 'ВАШ 6-8 баллов'
      }).count()
      patientMigrane.high = await Farm.find({
        age: {
          // $gte: '51',
          $lte: '20'
        },

        painIntencity: 'ВАШ 9-10 баллов'
      }).count()
    } else if (req.body.gender === 'allSex' && req.body.age === 'age2') {
      graph.age++
      patientMigrane.low = await Farm.find({
        age: {
          $gte: '21',
          $lte: '30'
        },
        painIntencit: 'ВАШ 0 баллов'
      }).count()
      patientMigrane.midLow = await Farm.find({
        age: {
          $gte: '21',
          $lte: '30'
        },
        painIntencity: 'ВАШ 2-3 балла'
      }).count()
      patientMigrane.mid = await Farm.find({
        age: {
          $gte: '21',
          $lte: '30'
        },
        painIntencity: 'ВАШ 4-5 баллов'
      }).count()
      patientMigrane.midHigh = await Farm.find({
        age: {
          $gte: '21',
          $lte: '30'
        },
        painIntencity: 'ВАШ 6-8 баллов'
      }).count()
      patientMigrane.high = await Farm.find({
        age: {
          $gte: '21',
          $lte: '30'
        },
        painIntencity: 'ВАШ 9-10 баллов'
      }).count()
    } else if (req.body.gender === 'allSex' && req.body.age === 'age3') {
      graph.age++
      patientMigrane.low = await Farm.find({
        age: {
          $gte: '31',
          $lte: '40'
        },
        painIntencit: 'ВАШ 0 баллов'
      }).count()
      patientMigrane.midLow = await Farm.find({
        age: {
          $gte: '31',
          $lte: '40'
        },
        painIntencity: 'ВАШ 2-3 балла'
      }).count()
      patientMigrane.mid = await Farm.find({
        age: {
          $gte: '31',
          $lte: '40'
        },
        painIntencity: 'ВАШ 4-5 баллов'
      }).count()
      patientMigrane.midHigh = await Farm.find({
        age: {
          $gte: '31',
          $lte: '40'
        },
        painIntencity: 'ВАШ 6-8 баллов'
      }).count()
      patientMigrane.high = await Farm.find({
        age: {
          $gte: '31',
          $lte: '40'
        },
        painIntencity: 'ВАШ 9-10 баллов'
      }).count()

    } else if (req.body.gender === 'allSex' && req.body.age === 'age4') {
      graph.age++
      patientMigrane.low = await Farm.find({
        age: {
          $gte: '41',
          $lte: '50'
        },
        painIntencit: 'ВАШ 0 баллов'
      }).count()
      patientMigrane.midLow = await Farm.find({
        age: {
          $gte: '41',
          $lte: '50'
        },
        painIntencity: 'ВАШ 2-3 балла'
      }).count()
      patientMigrane.mid = await Farm.find({
        age: {
          $gte: '41',
          $lte: '50'
        },
        painIntencity: 'ВАШ 4-5 баллов'
      }).count()
      patientMigrane.midHigh = await Farm.find({
        age: {
          $gte: '41',
          $lte: '50'
        },
        painIntencity: 'ВАШ 6-8 баллов'
      }).count()
      patientMigrane.high = await Farm.find({
        age: {
          $gte: '41',
          $lte: '50'
        },
        painIntencity: 'ВАШ 9-10 баллов'
      }).count()

    } else if (req.body.gender === 'allSex' && req.body.age === 'age5') {
      graph.age++
      patientMigrane.low = await Farm.find({
        age: {
          $gte: '51',
          $lte: '60'
        },
        painIntencit: 'ВАШ 0 баллов'
      }).count()
      patientMigrane.midLow = await Farm.find({
        age: {
          $gte: '51',
          $lte: '60'
        },
        painIntencity: 'ВАШ 2-3 балла'
      }).count()
      patientMigrane.mid = await Farm.find({
        age: {
          $gte: '51',
          $lte: '60'
        },
        painIntencity: 'ВАШ 4-5 баллов'
      }).count()
      patientMigrane.midHigh = await Farm.find({
        age: {
          $gte: '51',
          $lte: '60'
        },
        painIntencity: 'ВАШ 6-8 баллов'
      }).count()
      patientMigrane.high = await Farm.find({
        age: {
          $gte: '51',
          $lte: '60'
        },
        painIntencity: 'ВАШ 9-10 баллов'
      }).count()

    } else if (req.body.gender === 'allSex' && req.body.age === 'age6') {
      graph.age++
      patientMigrane.low = await Farm.find({
        age: {
          $gte: '60'
        },
        painIntencit: 'ВАШ 0 баллов'
      }).count()
      patientMigrane.midLow = await Farm.find({
        age: {
          $gte: '60'
        },
        painIntencity: 'ВАШ 2-3 балла'
      }).count()
      patientMigrane.mid = await Farm.find({
        age: {
          $gte: '60'
        },
        painIntencity: 'ВАШ 4-5 баллов'
      }).count()
      patientMigrane.midHigh = await Farm.find({
        age: {
          $gte: '60'
        },
        painIntencity: 'ВАШ 6-8 баллов'
      }).count()
      patientMigrane.high = await Farm.find({
        age: {
          $gte: '60'
        },
        painIntencity: 'ВАШ 9-10 баллов'
      }).count()

    }

    if (req.body.gender === 'M' || req.body.gender === 'F') {
      if (req.body.age === 'age1') {
        graph.plain++
        patientMigrane.low = await Farm.find({
          age: {
            // $gte: '51',
            $lte: '20'
          },
          gender: req.body.gender,
          painIntencity: 'ВАШ 0 баллов'
        }).count()
        patientMigrane.midLow = await Farm.find({
          age: {
            // $gte: '51',
            $lte: '20'
          },
          gender: req.body.gender,
          painIntencity: 'ВАШ 2-3 балла'
        }).count()
        patientMigrane.mid = await Farm.find({
          age: {
            // $gte: '51',
            $lte: '20'
          },
          gender: req.body.gender,
          painIntencity: 'ВАШ 4-5 баллов'
        }).count()
        patientMigrane.midHigh = await Farm.find({
          age: {
            // $gte: '51',
            $lte: '20'
          },
          gender: req.body.gender,
          painIntencity: 'ВАШ 6-8 баллов'
        }).count()
        patientMigrane.high = await Farm.find({
          age: {
            // $gte: '51',
            $lte: '20'
          },
          gender: req.body.gender,
          painIntencity: 'ВАШ 9-10 баллов'
        }).count()
      } else if (req.body.age === 'age2') {
        graph.age++
        patientMigrane.low = await Farm.find({
          age: {
            $gte: '21',
            $lte: '30'
          },
          painIntencit: 'ВАШ 0 баллов',
          gender: req.body.gender,
        }).count()
        patientMigrane.midLow = await Farm.find({
          age: {
            $gte: '21',
            $lte: '30'
          },
          painIntencity: 'ВАШ 2-3 балла',
          gender: req.body.gender,
        }).count()
        patientMigrane.mid = await Farm.find({
          age: {
            $gte: '21',
            $lte: '30'
          },
          painIntencity: 'ВАШ 4-5 баллов',
          gender: req.body.gender,
        }).count()
        patientMigrane.midHigh = await Farm.find({
          age: {
            $gte: '21',
            $lte: '30'
          },
          painIntencity: 'ВАШ 6-8 баллов',
          gender: req.body.gender,
        }).count()
        patientMigrane.high = await Farm.find({
          age: {
            $gte: '21',
            $lte: '30'
          },
          painIntencity: 'ВАШ 9-10 баллов',
          gender: req.body.gender,
        }).count()
      } else if (req.body.age === 'age3') {
        graph.age++
        patientMigrane.low = await Farm.find({
          age: {
            $gte: '31',
            $lte: '40'
          },
          painIntencit: 'ВАШ 0 баллов',
          gender: req.body.gender,
        }).count()
        patientMigrane.midLow = await Farm.find({
          age: {
            $gte: '31',
            $lte: '40'
          },
          painIntencity: 'ВАШ 2-3 балла',
          gender: req.body.gender,
        }).count()
        patientMigrane.mid = await Farm.find({
          age: {
            $gte: '31',
            $lte: '40'
          },
          painIntencity: 'ВАШ 4-5 баллов',
          gender: req.body.gender,
        }).count()
        patientMigrane.midHigh = await Farm.find({
          age: {
            $gte: '31',
            $lte: '40'
          },
          painIntencity: 'ВАШ 6-8 баллов',
          gender: req.body.gender,
        }).count()
        patientMigrane.high = await Farm.find({
          age: {
            $gte: '31',
            $lte: '40'
          },
          painIntencity: 'ВАШ 9-10 баллов',
          gender: req.body.gender,
        }).count()

      } else if (req.body.age === 'age4') {
        graph.age++
        patientMigrane.low = await Farm.find({
          age: {
            $gte: '41',
            $lte: '50'
          },
          painIntencit: 'ВАШ 0 баллов',
          gender: req.body.gender,
        }).count()
        patientMigrane.midLow = await Farm.find({
          age: {
            $gte: '41',
            $lte: '50'
          },
          painIntencity: 'ВАШ 2-3 балла',
          gender: req.body.gender,
        }).count()
        patientMigrane.mid = await Farm.find({
          age: {
            $gte: '41',
            $lte: '50'
          },
          painIntencity: 'ВАШ 4-5 баллов',
          gender: req.body.gender,
        }).count()
        patientMigrane.midHigh = await Farm.find({
          age: {
            $gte: '41',
            $lte: '50'
          },
          painIntencity: 'ВАШ 6-8 баллов',
          gender: req.body.gender,
        }).count()
        patientMigrane.high = await Farm.find({
          age: {
            $gte: '41',
            $lte: '50'
          },
          painIntencity: 'ВАШ 9-10 баллов',
          gender: req.body.gender,
        }).count()

      } else if (req.body.age === 'age5') {
        graph.age++
        patientMigrane.low = await Farm.find({
          age: {
            $gte: '51',
            $lte: '60'
          },
          painIntencit: 'ВАШ 0 баллов',
          gender: req.body.gender,
        }).count()
        patientMigrane.midLow = await Farm.find({
          age: {
            $gte: '51',
            $lte: '60'
          },
          painIntencity: 'ВАШ 2-3 балла',
          gender: req.body.gender,
        }).count()
        patientMigrane.mid = await Farm.find({
          age: {
            $gte: '51',
            $lte: '60'
          },
          painIntencity: 'ВАШ 4-5 баллов',
          gender: req.body.gender,
        }).count()
        patientMigrane.midHigh = await Farm.find({
          age: {
            $gte: '51',
            $lte: '60'
          },
          painIntencity: 'ВАШ 6-8 баллов',
          gender: req.body.gender,
        }).count()
        patientMigrane.high = await Farm.find({
          age: {
            $gte: '51',
            $lte: '60'
          },
          painIntencity: 'ВАШ 9-10 баллов',
          gender: req.body.gender,
        }).count()

      } else if (req.body.age === 'age6') {
        graph.age++
        patientMigrane.low = await Farm.find({
          age: {
            $gte: '60'
          },
          painIntencit: 'ВАШ 0 баллов',
          gender: req.body.gender,
        }).count()
        patientMigrane.midLow = await Farm.find({
          age: {
            $gte: '60'
          },
          painIntencity: 'ВАШ 2-3 балла',
          gender: req.body.gender,
        }).count()
        patientMigrane.mid = await Farm.find({
          age: {
            $gte: '60'
          },
          painIntencity: 'ВАШ 4-5 баллов',
          gender: req.body.gender,
        }).count()
        patientMigrane.midHigh = await Farm.find({
          age: {
            $gte: '60'
          },
          painIntencity: 'ВАШ 6-8 баллов',
          gender: req.body.gender,
        }).count()
        patientMigrane.high = await Farm.find({
          age: {
            $gte: '60'
          },
          painIntencity: 'ВАШ 9-10 баллов',
          gender: req.body.gender,
        }).count()

      }
    }










    console.log(patientMigrane)
    res.render('migrane.hbs', {
      patientMigrane,
      patientGender,
      graph,
      ggg
    })
  })




router.route('/1')
  .get(async (req, res) => {

    res.render('1', {

    });

  })
router.route('/2')
  .get(async (req, res) => {


    res.render('2', {

    });
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


// route for user's dashboard
router.get('/dashboard', async (req, res) => {

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