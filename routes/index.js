const express = require('express');
const router = express.Router();
const {ensureAuthenticated} = require('../config/auth')
router.get('/account', (req, res) => res.render('Welcome'));
// router.route("/lol"), (req, res) => res.send("Welcome")

router.get('/dashboard', ensureAuthenticated,(req,res)=> 
res.render('dashboard',{
    name: req.user.name,
    email: req.user.email
}) )


// router.get('/search', ensureAuthenticated, async (request, response) => {
//     try {
//         console.log(globalVariable)
//         console.log(coordss)
//         handymenCollection.find({job:globalVariable}).toArray()
        
//         .then(results => {
//             console.log(results)
//             // response.write(coordss)
//             // response.render(coordss)
//             // response.render('search.ejs', {quotes: results})
//             response.render('search.ejs', {
//                 quotes: results,
//                 sendcoords: coordss               
//                            })
//         })
        
//     } catch (error) {
//         response.status(500).send({message: error.message})
//     }
 
// })

// router.get('/activejobs', ensureAuthenticated, async (request, response) => {
//     try {
       
//         postajobCollection.find({}).toArray()
        
//         .then(results => {
//             console.log(results)
//             response.render('activejobsmap.ejs', {quotes: results})
//         })
        
        
        
//     } catch (error) {
//         response.status(500).send({message: error.message})
//     }
 
// })



// router.get('/welcome', ensureAuthenticated,(req,res)=> 
// res.render('welcome',{
//     name: req.user.name,
//     email: req.user.email
// }) )
module.exports = router;