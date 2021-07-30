// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();


/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'))

//Routes
app.get('/all', (req, res) => {
    res.send(projectData);
})

app.post('/add', (req, res) => {
    let newData = req.body;
    projectData['latitude'] = newData.latitude
    projectData['longitude'] = newData.longitude
    projectData['country'] = newData.country
    projectData['countdown'] = newData.countdown
    projectData['temperature'] = newData.temperature
    projectData['weather'] = newData.weather

    
    console.log("Data added: ")
    console.log(projectData)
    res.send({message: 'data added'})
})

module.exports = app;
