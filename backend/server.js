const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient
const mongoose = require('mongoose');
const Course = require('./models/course');

const port = 3000;
const uri = "mongodb+srv://admin-sdev255:admin-password@sdev255-fp-db.9zv6wry.mongodb.net/faux-school?retryWrites=true&w=majority";
// const uri = "mongodb://admin-sdev255:admin-password@sdev255-fp-db.9zv6wry.mongodb.net/faux-school?retryWrites=true&w=majority";
const dbName = 'faux-school'

const app = express();
app.use(cors());

// connect to mongoDB

try {
  // Connect to the MongoDB cluster
   mongoose.connect(
    uri,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => console.log(" Mongoose is connected")
  );

} catch (e) {
  console.log("could not connect");
}

// middleware
// app.use(express.static('public'));
// app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/api/courses', (req, res) => {

  // OLD - mongodb pkg
  // const client = await MongoClient.connect(uri, {
	// 	useNewUrlParser: true,
	// 	useUnifiedTopology: true,
	// });
  // const db = client.db(dbName);
  // const courses = await db.collection('courses').find({}).toArray()

	// res.status(200).json(courses);
  // client.close()

  // NEW - mongoose pkg
  Course.find()
  .then(result => {
    res.send(result);
  })
  .catch(err => {
    console.log(err);
  });
});

// CREATES STATIC COURSE

// app.get('/api/course/create', function(req, res) {
//   const course = new Course({
//      name: "ITSP-135",
//      title: "Hardware & Software Support"
//   });

//   course.save(function(err, cour) {
//     console.log(`Course ${cour.name} with id ${cour._id} was added to the DB.`)
//   })

// });

// DELETES STATIC COURSE
//    must pull course id from mongodb website or mongodb compass

app.get('/api/course/delete', function(req, res) {

  Course.findByIdAndDelete('6386ee9230f3f47c41b0a1a3', function (err) {
    if(err) console.log(err);
    console.log("Successful deletion");
  });
});

// app.get('/api/course/create', async (req, res) => {
//   const cour = new Course({
//     name: "ITSP-135",
//     title: "Hardware & Software Support"
//  });

// cour.save(function(err, cour) {
//   re
//  console.log(`Course ${cour.name} with id ${cour._id} was added to the DB.`)
// })


// });

// app.get('/api/students', async (req, res) => {

//   const client = await MongoClient.connect(uri, {
// 		useNewUrlParser: true,
// 		useUnifiedTopology: true,
// 	});
//   const db = client.db(dbName);
//   const students = await db.collection('students').find({}).toArray()

// 	res.status(200).json(students);
//   client.close()

// });

app.listen(port, () => console.log('app running'));
