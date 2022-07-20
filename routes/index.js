const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth')
router.get('/lol', (req, res) => res.render('Welcome'));
// router.route("/lol"), (req, res) => res.send("Welcome")

router.get('/dashboard', ensureAuthenticated,(req,res)=> 
res.render('dashboard',{
    name: req.user.name,
    email: req.user.email
}) )


// router.get('/welcome', ensureAuthenticated,(req,res)=> 
// res.render('welcome',{
//     name: req.user.name,
//     email: req.user.email
// }) )
module.exports = router;