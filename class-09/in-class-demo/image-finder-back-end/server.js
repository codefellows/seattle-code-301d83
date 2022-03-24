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


// ERRORS

// LISTEN
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
