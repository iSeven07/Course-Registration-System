const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jwt-simple');

// For encoding/decoding JWT
const secret = 'supersecret';


// Model Imports
const Course = require('./models/course');
const User = require('./models/user')

const port = 3000;
const uri =
	'mongodb+srv://admin-sdev255:admin-password@sdev255-fp-db.9zv6wry.mongodb.net/faux-school?retryWrites=true&w=majority';

const app = express();

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use((req, res, next) => {
	res.locals.path = req.path;
	next();
});

// Connect to the MongoDB cluster
try {
	mongoose.connect(
		uri,
		{ useNewUrlParser: true, useUnifiedTopology: true },
		() => console.log(' Mongoose is connected')
	);
} catch (e) {
	console.log('could not connect');
}

// routes

// Get all Courses
app.get('/api/courses', (req, res) => {
	Course.find()
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

// Get a single Course
app.post('/api/course', (req, res) => {
	console.log('req.body ' + req.body.data);
	console.log('courseName ' + req.body.courseName);
	Course.findById(req.body.courseID)
		.then((result) => {
			res.send(result);
		})
		.catch((err) => {
			console.log(err);
		});
});

// Edit Course in DB

app.patch('/api/course/edit', (req, res) => {
	Course.findById(req.body.courseID)
		.then((resp) => {
			resp.name = req.body.courseName
			resp.title = req.body.courseTitle
			resp.save()
		})
})

// Add Course to DB
app.post('/api/course/add', function (req, res, next) {
	 course = new Course({
		name: req.body.name,
		title: req.body.title,
	});
  console.log(course);
	course.save(function (err, course) {
		if (err) {
			return next(err);
		}
		res.status(201).json(course);
	});
});

// Deletes Course from DB

app.post('/api/course/delete', function (req, res) {
	Course.findByIdAndDelete(req.body.courseID, function (err) {
		if (err) console.log(err);
		console.log('Successful deletion');
	});
});


// Auth User

app.post('/api/user/auth', function(req, res) {

	console.log('login requested...')

	if (!req.body.username || !req.body.password) {
		console.log('no user and/or password')
		res.status(401).json({ error: "Missing username and/or password"});
		return;
 }

 // Get user from the database
 User.findOne({ userName: req.body.username }, function(err, user) {
		if (err) {
			 res.status(400).send(err);
		}
		else if (!user) {
			 // Username not in the database
			console.log('user not found')
			res.status(401).send()
			}
			else {
				// Check if password from database matches given password
				if (user.password != req.body.password) {
					console.log('user found with bad password')
					console.log(req.body)
					res.status(401).send()
				}
				else {
					// Send back a token that contains the user's username
					console.log('user and password correct')
					console.log(req.body)
					const token = jwt.encode({ username: user.username }, secret);
					res.json({ token: token });
			 }
		}
 });

})

// Listen
app.listen(port, () => console.log('app running'));
