var express = require('express');
var router = express.Router();

// mongoose handling
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var Event = mongoose.model('Event', {
    title: {
	type: String,
	unique: true
    },
    timestamp: Date,
    location: String,
    description: String,
    categories: String,
    companies: String,
    sponsor: String,
    openSpaces: String
});


/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Events by Hiring Boost' });
});

router.get('/events', function (req, res) {
  Event.find(function (err, results) {
    if (err) {
      res.status(500).json({ 'message': err });
    } else {
      res.status(200).json(results);
    }
  });
});

router.post('/events', function(req, res) {
  var event = new Event(req.body);
  event.save(function (err, result) {
    if (err) {
      console.log('Error encountered in creating the event ... ');
      res.status(500).json({ 'message': err });
    }
    else {
      console.log('Event created', result);
      res.status(200).json(result);
    }
  });
});




module.exports = router;
