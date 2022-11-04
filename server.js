console.log("going live")
//1. Initialize npm and install dependencies  We do npm init
// express, dotenv, cors, mongodb, ejs, nodemon (--save-dev) nodemon example npm install nodemon --save-dev 
// for nodemon on package.json type "dev" : "nodemon server.js" under sripts we start by doing npm run dev
//2. Require dependencies in server.js

//3. Declare variables
const express = require("express")
const expressLayouts = require('express-ejs-layouts')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require("express-session")
const {ensureAuthenticated} = require('./config/auth')
const passport = require("passport")
const app = express();

//passport config
require('./config/passport')(passport);

//DB Config 2
const db = require('./config/keys').MongoURI



// Express body parser
app.use(express.urlencoded({extended: true}))
//express session middleware
// Express session
app.use(
    session({
      secret: 'secret',
      resave: true,
      saveUninitialized: true
    })
  );
  

  // Passport middleware
app.use(passport.initialize());
app.use(passport.session());
  //connect flash

  app.use(flash())
  //global vars
  app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });


// connect to mongo 2
mongoose.connect(db, { useNewUrlParser: true})
    .then(()=>console.log('Mongodb2 Connected...'))
    .catch(err => console.log(err));

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// added body parser
const bodyParser = require('body-parser')











// next thing
const cors = require("cors")
const { text, request, response } = require("express")
const MongoClient = require("mongodb").MongoClient
const connectionString = 'mongodb+srv://Elmega123:qyx4Ozr6LlUsU5g7@cluster0.ziids.mongodb.net/?retryWrites=true&w=majority'
require('dotenv').config() 
const PORT = process.env.PORT || 8850

// Put in a dotenv file later
MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database')
    const db = client.db('handyman_app')
    const handymenCollection = db.collection('handymen')
    const postajobCollection = db.collection('Job_posts')
    
    const jobPosts = db.collection('Job_posts')

    app.use(expressLayouts);
    app.set('view engine','ejs')
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.static('public'))
    app.use(express.json());
    app.use(bodyParser.json())
    // Might need to change later
// app.get('/', async (request, response) => {
//     try {
//         response.render("test.ejs")
//         console.log("frubfubrrf")
//     } catch (error) {
//         response.status(500).send({message: error.message})
//     }
// })

//Routes
//Routes



app.get('/', async (request, response) => {
    try {
        handymenCollection.find({job: "Electrical" }).toArray()
        .then(results => {
            console.log(results)
            response.render('test.ejs', {quotes: results})
        })      
    } catch (error) {
        response.status(500).send({message: error.message})
    }
})





app.get('/contact', async (request, response) => {
    try {
        response.sendFile("C:/Users/termi/Desktop/bootcamp/logistics-company-website-template/contact.html")
    } catch (error) {
        response.status(500).send({message: error.message})
    }
    // try {
    //     response.render('index.ejs')
    // } catch (error) {
    //     response.status(500).send({message: error.message})
    // }
})
app.get('/about', async (request, response) => {
    try {
        handymenCollection.find().toArray()
        .then(results => {
            console.log(results)
            response.render('index.ejs', {quotes: results})
        })
        
    } catch (error) {
        response.status(500).send({message: error.message})
    }
    // try {
    //     response.render('index.ejs')
    // } catch (error) {
    //     response.status(500).send({message: error.message})
    // }
})

// This will have the job posts in which Handymen will see if they want to take on the job
// will be deleted
app.get('/jobpost', ensureAuthenticated, async (request, response) => {
    try {
        jobPosts.find().toArray()
        .then(results => {
            console.log(results)
            response.render('jobs.ejs',{jobsposted: results})
        })
        
    } catch (error) {
        response.status(500).send({message: error.message})
    }
    // try {
    //     response.render('index.ejs')
    // } catch (error) {
    //     response.status(500).send({message: error.message})
    // }
})

// This is so that user can post a new job for handymen to do
app.get('/postajob', ensureAuthenticated, async (request, response) => {
    try {
        jobPosts.find().toArray()
        .then(results => {
            console.log(results)
            response.render('postajob.ejs')
        })
        
    } catch (error) {
        response.status(500).send({message: error.message})
    }
    // try {
    //     response.render('index.ejs')
    // } catch (error) {
    //     response.status(500).send({message: error.message})
    // }
})

app.get('/api2', (request,response) => {
    try {
        postajobCollection.find({}).toArray()
        .then(results => {
            response.json(results)
        })      
    } catch (error) {
        response.status(500).send({message: error.message})
    }
});



app.get('/api', (request,response) => {
    try {
        handymenCollection.find({job:globalVariable}).toArray()
        .then(results => {
            response.json(results)
        })      
    } catch (error) {
        response.status(500).send({message: error.message})
    }

    // handymenCollection.find({job: globalVariable}.toArray(), (err,data) =>{
    //     if (err) {
    //         response.end()
    //         return;
    //     }
    //     response.json(data);
    // })
});

app.get('/search',ensureAuthenticated, async (request, response) => {
    try {
        console.log(globalVariable)
        console.log(coordss)
        handymenCollection.find({job:globalVariable}).toArray()
        
        .then(results => {
            console.log(results)
            // response.write(coordss)
            // response.render(coordss)
            // response.render('search.ejs', {quotes: results})
            response.render('search.ejs', {
                quotes: results,
                sendcoords: coordss               
                           })
        })
        
    } catch (error) {
        response.status(500).send({message: error.message})
    }
 
})

app.get('/activejobs', async (request, response) => {
    try {
        console.log("new")
        console.log(globalVariable)
        console.log(typeof(globalVariable))
        postajobCollection.find({}).toArray()
        
        .then(results => {
            console.log(results)
            response.render('activejobsmap.ejs', {quotes: results})
        })
        
        
        
    } catch (error) {
        response.status(500).send({message: error.message})
    }
 
})

app.get('/offerservice', ensureAuthenticated, async (request, response) => {
    try {
        console.log("new")
        console.log(globalVariable)
        console.log(typeof(globalVariable))
        handymenCollection.find({job:globalVariable}).toArray()
        
        .then(results => {
            console.log(results)
            response.render('search1.ejs',)
        })
        
        
        
    } catch (error) {
        response.status(500).send({message: error.message})
    }
 
})
let coordss = ""
app.post('/coords',(request, responce) => {
    console.log("pro player")
    console.log(request.body);
    coordss = request.body
    responce.end()
})




var globalVariable;
app.post('/searchh',(request,responce)=>{
    console.log("I got a request")
    console.log(request.body)
    globalVariable = request.body
    const strr = JSON.stringify(globalVariable)
    let result = strr.substring(8,)
    let resultt = result.replace('}', '')
    let resulttt = resultt.replace ('"', "")
    let resultttt = resulttt.replace ('"', "")
    console.log(resultttt)
    console.log(1)
    globalVariable = resultttt

        
    // sends data back to client
    responce.json({
        status: 'sucessful',
        lol : "true",
        lel : resultttt,
    })

})
// add a job to the database
app.post('/postajob', (req, res) => {
    jobPosts.insertOne(req.body)
      .then(result => {
        console.log(result)
        res.redirect('/')
        // tell user that entry has been added
      })
      .catch(error => console.error(error))
  })
app.use("/", require('./routes/index'));
app.use('/users',require('./routes/users'))  


app.post('/quotes', (req, res) => {
    handymenCollection.insertOne(req.body)
      .then(result => {
        console.log(result)
        res.redirect('/')
        // tell user that entry has been added
      })
      .catch(error => console.error(error))
  })


  app.post('/quotes', (req, res) => {
    handymenCollection.find(req = {job: "plumbing"}
    )
    .then(result => {
        console.log(result)
        // tell user that entry has been added
      })
      .catch(error => console.error(error))
  })
//   This is to update stuff
  app.put('/quotes', (req, res) => {
    handymenCollection.findOneAndUpdate(
        // this changes yoda quotes can be used to replace other things I'm thinking that find and repace could be useful
        {name: 'Lucas'},
        {
            $set: {
                name:req.body.name,
                quote: req.body.quote
            }
        },
        {
            upsert: true
        }

    )
    .then(result => {
        console.log(result)
        res.json(`success`)
    })
    .catch(error => console.error(error))
  })

  app.delete('/quotes', (req, res) => {
    // Handle delete event here
    // variable that could be changed could be done lile this instead
    // {name: req.body.name },
    handymenCollection.deleteOne(
    {name: req.body.name }
    )
    .then(result => {
        // if something happens no more to delete then this happens
        if (result.deletedCount === 0) {
            return res.json('No quote to delete')
          }
        res.json('Deleted darth vader quote ')
    })
    .catch(error => console.error(error))
  })
  
app.listen(process.env.PORT || PORT, () => { 
    console.log(`Server on port ${PORT}`)
})
  })
  .catch(error => console.error(error))



  

// app.listen(process.env.PORT || PORT, () => {
//     console.log(`Server is running on port ${PORT}`)
// })

// Might need to change later
// app.get('/', async (request, response) => {
//     try {
//         response.sendFile("C:/Users/termi/Desktop/bootcamp/logistics-company-website-template/index.html")
//     } catch (error) {
//         response.status(500).send({message: error.message})
//     }
//     // try {
//     //     response.render('index.ejs')
//     // } catch (error) {
//     //     response.status(500).send({message: error.message})
//     // }
// })

// app.get('/contact', async (request, response) => {
//     try {
//         response.sendFile("C:/Users/termi/Desktop/bootcamp/logistics-company-website-template/contact.html")
//     } catch (error) {
//         response.status(500).send({message: error.message})
//     }
//     // try {
//     //     response.render('index.ejs')
//     // } catch (error) {
//     //     response.status(500).send({message: error.message})
//     // }
// })

// app.post('/quotes',(request,response)=>{
//     // var select = document.getElementById('service');
//     // var value = select.options[select.selectedIndex].value;
//     // console.log(value)
//     console.log(request.body)
// })

// needed to isntall body parser by doing  npm install body-parser --save

//7. Create gitignore file and push to github

//4. Connect to MongoDB - add connection string to .env file

//5. Add .env file to gitignore

//5. Create Port

//----Test Mongo and Port Connection

//6. Set middleware

//8. Create Public and Views folders - add main.js and style.css to Public and index.ejs to Views

//9. From root, init local git repo and commit

//10. Create heroku repo

// heroku login
// heroku create simple-rap-api
// echo "web: node server.js" > Procfile
// git add . 
// git commit -m "changes"
// git push heroku main

//----Test Heroku Link