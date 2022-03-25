'use strict';

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const getPhotos = require('./photos.js');

// instanciate express server by calling express
const app = express();

// USE
app.use(cors());

// define port and prove that our .env file works
const PORT = process.env.PORT || 3002;

// ROUTES
app.get('/', (request, response) => {
  response.send('Hello this works!');
})

app.get('/photos', getPhotos);


app.get('*', (request, response) => {
  response.send('Not sure what you are looking for. but it doesn\'t exist.');
})

// ERRORS
app.use((error, request, response, next) => {
  response.status(500).send(error.message);
})

// LISTEN
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
