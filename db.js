// db.js

const mongoose = require('mongoose');

// create schema and register models
const Review = new mongoose.Schema({
    courseNumber: String,
	courseName: String,
    semester: String,
    year: Number,
    professor: String,
    review: String
});

// "register" it so that mongoose knows about it
mongoose.model('Review', Review);

// OPTIONAL: modify the connection code below if
// using mongodb authentication
const mongooseOpts = {
    useNewUrlParser: true,  
    useUnifiedTopology: true
};

mongoose.connect('mongodb://localhost/hw05', mongooseOpts, (err) => {
    if (err) {
        console.log(err);
    } else {
      console.log('connected to database'); 
    }
});
