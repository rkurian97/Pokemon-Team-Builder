if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// Dependencies
// =============================================================
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
const bcrypt= require("bcrypt")
const passport= require("passport")
const flash= require("express-flash")
const session = require("express-session");
const { userInfo } = require("os");
const sequelize = require('./config/connection');
const Users = require('./models/Users');
const Pokemon = require('./models/Pokemon');
const isAuthenticated = require("./config/middleware/isAuthenticated");
require('./config/passport-config')(passport);

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;


// Sets Handlebars as the default template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// express.static middleware
app.use(express.static(path.join(__dirname, "/public")));

//use the session
app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false

}));
app.use(passport.initialize())
app.use(passport.session())

// Routes
// =============================================================
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/search", (req, res) => {

  res.render("search");
});

app.get("/team", (req, res) => {

  res.render("team");
});

//login
app.get("/login", (req, res) => {
  message=req.flash('error')
  res.render("login", {message} );
});

app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true
}));

//logout
app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

//register
app.get("/register", (req, res) => {
  res.render("register");
});

app.post("/register", async (req, res) =>{
  Users.create({
    firstName: req.body.first_name,
    lastName: req.body.last_name,
    email: req.body.email,
    password: req.body.pw
  })
    .then(function() {
      res.redirect("/login");
    })
    .catch(function(err) {
      console.log(err)
      res.status(401).json(err);
    });
});

//Add Pokemon to team
app.post("/catchPokemon", (req, res)=>{
  Pokemon.create({
    userId: req.user.id,
    pokemon: req.body.name
  })
    .then(function() {
      res.redirect("/search");
    })
    .catch(function(err) {
      console.log(err)
      res.status(401).json(err);
    });
})

//Get Pokemon Team
app.get("/getTeam", (req, res)=>{
  teamNames=[];
  Pokemon.findAll({
    where: {
      userId: req.user.id
    }
  })
  .then(data=> {
      data.map(result=> teamNames.push(result.dataValues.pokemon));
      res.send({teamNames});
  });
})

app.delete("/release", async (req,res)=> {
  await Pokemon.destroy({
    where: {
      userId: req.user.id,
      pokemon: req.body.name
    }
  })
});
// End Routes =============================================================


// check if the user is logged in
function checkAuthenticated(req, res, next){
  if (req.isAuthenticated()) {
    return next()
  }

  res.redirect('/login')
}

// Starts the server to begin listening
// =============================================================
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("App listening on PORT " + PORT);
  });
});