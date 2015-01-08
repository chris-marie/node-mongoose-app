	var express = require('express');
var router = express.Router();

// mongoose handling
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

///// WHY IS THERE CURRENTLY ONLY A MODEL, AND NOT ALSO A SCHEMA?

// SCHEMA USED TO STORE STRUCTURE OF DOCUMENTS WITHIN A COLLECTION
var eventSchema = mongoose.schema ({ 
    title: {
	type: String,
	unique: true
    },
    timestamp: Date,
    location: String,
    description: String,
    categories: String,  // change categories to checkboxes and add and other
    sponsor: String,
    companies: String,
    maxCapacity: String,
    /// when Register is working, take number of registered attendants and get remainning spaces
    // currentAttendants: number from Register
    // remainingSpaces: maxCapacity - currentAttendants
});


// MODELS ARE USED TO CREATE INSTANCES OF DATA THAT WILL BE STORED IN DOCUMENTS
var Events = mongoose.model('Events', eventSchema});

// SAMPLE MOVIE DATA BY INATIATING AN EVENTS MODEL

var eventSample = new Events({ 
    title: 'SJU Job Fair',
    timestamp: new Date();   ///// IS THIS the time the event is created or the data of event?
    location: 'San Jose University, 1 Washington Sq, San Jose, CA 95192',
    description: 'Job fair for students looking for CS and design work',
    categories: 'UI, UX, backend, end to end, big data',
    sponsor: 'Amazon',
    commpanies: 'Amazon, Google, Walmart, Sony, Hitachi, Square', 
    maxCapacity: '300'
});

eventSample.save(function( err, eventSample) {
    if (err) return console.log('ERROR on eventSample SAVE: ' + err);
    else {
	console.log('eventSample: ' + eventSample);
	// Create a div and display on the current events sidebar
    }
});

/* GET home page.   */
///// DOES THIS COME BEFORE OR AFTER all the main page work, search result display, and form?
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
