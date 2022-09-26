// reviewRoutes.js

require('./db.js');
const express = require('express');
const session = require('express-session');
const router = express.Router();
const mongoose = require('mongoose');
const Review = mongoose.model('Review');

let invalid = "";

router.get('/add', (req, res) => {
    if(isNaN(req.session.count)) {
        req.session.count = 0;
        req.session.myReviews = [];
    }
    req.session.count++;

    // first check if user inputs are valid. if not, do not add anything & instead return an error message.
    let temp = '';
    if(invalid !== '') {
        temp = invalid;
        invalid = '';
    }
    res.render('add', {invalid: temp, visits: req.session.count});
});

router.post('/add', (req, res) => {
    invalid = "";
    let userReview = {};
    if(req.body.courseNumber === '' || req.body.courseName === '' || req.body.year === '' || req.body.professor === '' || req.body.review === '') {
        invalid = "Invalid input(s). Please make sure all fields are filled out."
        res.redirect('./add');
    } else {
        userReview.courseNumber = req.body.courseNumber;
        userReview.courseName = req.body.courseName;
        userReview.semester = req.body.semester;
        userReview.year = parseInt(req.body.year);
        userReview.professor = req.body.professor;
        userReview.review = req.body.review;
        req.session.myReviews.push(userReview);

        new Review(userReview).save(function(err, review, count) {
            res.redirect('/');
        });
    }
});

router.get('/mine', (req, res) => {
    if(isNaN(req.session.count)) {
        req.session.count = 0;
    }
    req.session.count++;

    res.render('mine', {reviews: req.session.myReviews, visits: req.session.count});
});

module.exports = router;
