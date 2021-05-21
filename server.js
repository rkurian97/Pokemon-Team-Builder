// Dependencies
// =============================================================
const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");
// Require the 'express-session' module
const session = require("express-session");

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;

// Sets Handlebars as the default template engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Routes
// =============================================================
app.get('/', (req, res) => {
    res.render('index');
});

app.get('/search', (req, res) => {
    res.render('search');
});

app.get('/team', (req, res) => {
    res.render('team');
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// express.static middleware

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static("images"));

// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => {
    console.log('App listening on PORT ' + PORT);
});
