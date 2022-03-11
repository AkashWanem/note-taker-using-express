// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');

// sets port to listen
const PORT = 3001;

// sets up the app
const app = express();

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));


// should return the notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});


// this listens to the port after deployment
app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
  });
  