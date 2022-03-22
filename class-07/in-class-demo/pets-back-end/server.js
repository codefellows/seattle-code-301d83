'use strict';

console.log('Our first server');

// REQUIRE
// In our servers, we have to use 'require' instead of import. Here we will list the requirements for server
const express = require('express');
require('dotenv').config();
let data = require('./data/pets.json');

// we must include cors if we want to share reessourcess over the web
const cors = require('cors');

// USE
// Once we have required something, we have to use it. This is where we assigne the required field a variable. React does this in one step with "import." express takes 2 steps: 'require" and 'use.'
const app = express();
app.use(cors());

// define PORT and validate that my .env file is working
const PORT = process.env.PORT || 3002;
// if my server is running on 3002, I know ssomething is wrong with my .env file or how I'm importing the values from it.

// ROUTES
// We will write our endpoints here
// app.get() correlates to axios.get
app.get('/', (request, response) => {
  response.send('hello, from our server!');
});

app.get('/bananas', (req, res) => {
  res.send('baaaaa NA NA!!!');
});

app.get('/sayHello', (req, res) => {
  console.log(req.query);
  let name = req.query.name;
  let lastName = req.query.lastName;
  res.send(`Hello ${name} ${lastName}`);
})

app.get('/pet', (req, res) => {
  try {
  let species = req.query.species;
  let petObject = data.find(pet => pet.species === species);
  let selectedPet = new Pet(petObject);
  res.send(selectedPet);
  } catch(error) {
    next(error);
  }
});

app.get('*', (request, response) => {
  response.send('What you are looking for doesn\'t exist.');
});

// ERRORS
// handle errors
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
}) 

// CLASSES
class Pet {
  constructor(petObject) {
    this.name = petObject.name;
    this.species = petObject.species;
  }
}

// LISTEN
// start the server
// listen is an Express method that takes in a port value and a callback function
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
