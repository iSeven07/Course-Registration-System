const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

// Model Imports
const Course = require('./models/course');

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

app.listen(port, () => console.log('app running'));
