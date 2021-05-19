// Dependencies
// =============================================================
const express = require('express');
const exphbs = require('express-handlebars');
// Require the 'express-session' module
const session = require('express-session')

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3001;

// Sets Handlebars as the default template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

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
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, () => {
    console.log('App listening on PORT ' + PORT);
});
