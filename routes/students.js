var express = require('express');
var router = express.Router();
var db = require('monk')('localhost/student-list')
var Users = db.get('users')
var Students = db.get('students')

router.get('/', function(req, res, next) {
  var username = req.session.user
  res.render('index', { title: 'Student List', user: username });
});

module.exports = router;