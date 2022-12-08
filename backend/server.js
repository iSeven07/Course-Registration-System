const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jwt-simple');
const bcrypt = require('bcrypt');

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
			resp.credits = req.body.courseCredits
			resp.save()
		})
})

// Add Course to DB
app.post('/api/course/add', function (req, res, next) {
	 course = new Course({
		name: req.body.name,
		title: req.body.title,
		credits: req.body.credits,
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

// Register
app.post('/api/signup', (req, res, next) => {
	const newUser = new User({
		name: req.body.name,
		userName: req.body.userName,
		password: bcrypt.hashSync(req.body.password, 10),
		//courses: req.body.courses, // needs added to Register Page
		isTeacher: req.body.isTeacher,
	})
	newUser.save(err => {
		if (err) {
			return res.status(400).json({
				title: 'error',
				error: 'username is use'
			})
		}
		console.log(`${req.body.userName} created successfully`)
		return res.status(200).json({
			title: 'signup success'
		})
	})
})

// Login

app.post('/api/login', function(req, res) {

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
			//res.status(401).send()
			return res.status(401).json({
				title: 'error',
				error: 'user not found'
			})
			}
			else {
				// Check if password from database matches given password
				//if (user.password != req.body.password) {
					if (!bcrypt.compareSync(req.body.password, user.password)) {
					console.log('user found with bad password')
					//console.log(req.body)
					// res.status(401).send()
					return res.status(401).json({
						title: 'login failed',
						error: 'invalid credentials'
					})
				}
				else {
					// Send back a token that contains the user's username
					console.log('user and password correct')
					console.log(req.body)
					const token = jwt.encode({ userId: user._id }, secret);
					return res.status(200).json({ title: 'login success', token: token });
			 }
		}
 });

})

// Authorization
app.get('/api/user', (req, res, next) => {
	let token = req.headers.token; //token
	try {
		const decoded = jwt.decode(token, secret);

		console.log(decoded);
		
		User.findOne({_id: decoded.userId }, (err, user) => {
			if (err) return console.log(err)
			return res.status(200).json({
				title: 'authorized',
				user: {
					name: user.name,
					username: user.userName,
					isTeacher: user.isTeacher
				}
			})
		})

	}
	catch (ex) {
		res.status(401).json({ title: 'error', 'error': "Invalid JWT"})
	}
});

// Listen
app.listen(port, () => console.log('app running'));
