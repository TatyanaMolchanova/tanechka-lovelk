// This file we have to connect to index.js
const express = require('express');
// const router = express.Router();
// const User = require('../models/user')
const Post = require('../models/post')
// const passport = require('passport');
// const jwt = require('jsonwebtoken');
// const config = require('../config/db-keys');


// URL of user's cabinet
// disallow access to dashboard page until session is not false - only when user will authorize he'll get access to it
// router.get('/dashboard', passport.authenticate('jwt', {session: false}), (req, res) => {
// work only if user is authorized
// router.post('/dashboard', passport.authenticate('jwt', { session: false }),

module.exports.post = async function(req, res) {
// router.get('/dashboard', (req, res) => {
        // message in browser on main page
        // res.send('Dashboard page!')

    let newPost = new Post({
        category: req.body.category,
        title: req.body.title,
        photo: req.body.photo,
        text: req.body.text,
        author: req.body.author,
        date: req.body.date
    });

    Post.addPost(newPost, (err, user) => {
        if (err) {
            res.json({success: false, msg: 'Post has not been added.'})
        } else {
            res.json({success: true, msg: 'Post was added.'})
        }
    })
}

// module.exports = router;
