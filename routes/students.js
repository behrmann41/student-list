var express = require('express');
var router = express.Router();
var db = require('monk')(process.env.MONGOLAB_URI || 'localhost/student-list')
var Users = db.get('users')
var Students = db.get('students')

router.get('/', function(req, res, next) {
  var username = req.session.user
  Students.find({}, function (err, students){
    res.render('students/home', { title: 'Student List', user: username, allStudents: students });
  })
});

router.get('/new', function (req, res, next){
  var username = req.session.user
  res.render('students/new', {  title: "Add a Student", user: username})
})

router.post('/new', function (req, res, next){
  var errors = []
  if (!req.body.firstname.trim()){
    errors.push('Must include a first name')
  }
  if (!req.body.lastname.trim()){
    errors.push('Must include a last name')
  }
  if (!req.body.phonenumber.match(/\d/g).length===10){
    errors.push('Not a valid phone number')
  }
  if (errors.length){
    res.render('students/new', {  title: 'Add a Student', errors: errors})
  } else {
    Students.insert({ firstname: req.body.firstname,
                      lastname: req.body.lastname,
                      phone: req.body.phonenumber
                      })
    res.redirect('/students')
  }
})

router.get('/:id', function (req, res, next){
  Students.findOne({_id: req.params.id}, function (err, student){
    res.render('students/show', { title: "Student", 
                                  firstname: student.firstname,
                                  lastname: student.lastname,
                                  phone: student.phone
                                })
  })
})

module.exports = router;