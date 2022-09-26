// app.js

require('./db.js');
const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const path = require("path");
const app = express();
const Review = mongoose.model('Review');

const sessionOptions = { 
	secret: 'secret for signing session id', 
	saveUninitialized: false, 
	resave: false 
};
app.use(session(sessionOptions));

const publicPath = path.resolve(__dirname, "public");
app.use(express.static(publicPath));

app.set('view engine', 'hbs');

// body parser (req.body)
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    if(isNaN(req.session.count)) {
        req.session.count = 0;
        req.session.myReviews = [];
    }
    req.session.count++;

    let query = {};
    if(req.query.semester !== '' && req.query.semester !== undefined && req.query.semester !== 'all') {
        query.semester = req.query.semester;
    }
    if(req.query.year !== '' && req.query.year !== undefined) {
        query.year = parseInt(req.query.year);
    }
    if(req.query.professor !== '' && req.query.professor !== undefined) {
        query.professor = {'$regex': `^${req.query.professor}$`, $options:'i'};
    }

    Review.find(query, function(err, data, count) {
        //console.log(data); // <---- variable contains found documents!
        //console.log(query);
        res.render('index', {reviews: data, visits: req.session.count});
    });
});


// TODO: require and use routes from reviewRoutes.js
// make sure to "mount" on /reviews so that the urls
// are prefixed with /reviews (example /reviews/add)
const myrouter = require("./reviewsRoutes");
app.use('/reviews', myrouter);

app.listen(process.env.PORT || 3000);
