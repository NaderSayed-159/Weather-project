// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/

const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');

app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
// make server point to website floder
app.use(express.static('website'))

const port = 3000;

function serverFunction() {

    console.log(`the server is running on localhost:${port}`);

}


// start server
const server = app.listen(port, serverFunction);



app.get('/', getHome)

function getHome(req, res) {

    res.send('Welcome to Our App');

}


// route to store request data into endpoint object  
app.post('/postDatas', (req, res) => {

    const anotherEntry = {

        Date: req.body.Date,
        Temprture: req.body.Temprture,
        Fellings: req.body.fells
    }

    // console.log(anotherEntry);

    projectData = {
        ...anotherEntry
    };

})

// route to send end point object to display it in ui 

app.get('/endPointsend', (req, res) => {

    console.log(projectData);
    res.send(projectData);

})