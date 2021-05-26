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
const isAuthenticated = require("./config/middleware/isAuthenticated");
require('./config/passport-config')(passport);

// const initializePassport= require(".config/passport-config")
// initializePassport(
//   passport,
//   email=> users.find(user=> user.email === email),
//   id=> users.find(user=> user.id === id)
// );


// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;

const users= [];

// Sets Handlebars as the default template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// express.static middleware
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static("images"));

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

app.get("/search", isAuthenticated,  (req, res) => {
  res.render("search", {email: req.user.email});
});

app.get("/team", isAuthenticated, (req, res) => {
  res.render("team");
});

//login
app.get("/login", (req, res) => {
  res.render("login");
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