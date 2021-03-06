// Dependencies
const express = require('express');
const fs = require('fs');
const path = require('path');

// sets port to listen
const PORT = process.env.PORT || 3001;

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

// should read the db.json file and return all saved notes as JSON
app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/db/db.json'));
});

//should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. 
app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    console.log(fs.readFileSync('./db/db.json', 'utf-8'));
    let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    let uniqueId = (data.length).toString();
    console.log(uniqueId);

    // creates id property based on length and assigns id to each json object
    newNote.id = uniqueId;
    data.push(newNote);

    // writes updated data into db.json
    fs.writeFileSync("./db/db.json", JSON.stringify(data), function(err) {
        if (err) throw (err);        
    }); 

    res.json(data);    
});

// should receive a query parameter that contains the id of a note to delete. 
app.delete('/api/notes/:id', (req,res) => {
    let data = JSON.parse(fs.readFileSync('./db/db.json', 'utf-8'));
    let noteId = (req.params.id).toString();

    // filters all the non matching arrays and deletes all the matching arrays  
    data = data.filter(selected => {
        return selected.id != noteId;
    })

    // writes the updated data into db.json and displays the updated note
    fs.writeFileSync("./db/db.json", JSON.stringify(data));
    res.json(data);
});

//  should return the index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// this listens to the port after deployment
app.listen(PORT, () => {
    console.log(`Note Taker app listening at http://localhost:${PORT}`);
  });
