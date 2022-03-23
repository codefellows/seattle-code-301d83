'use strict';

// REQUIRE
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

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

app.get('/photos', async (request, response) => {
  let searchQuery = request.query.searchQuery;
  console.log(searchQuery);
  // make an api request to unsplash
  let url = `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_API_KEY}&query=${searchQuery}`;
  let dataWeGetFromUnsplash = await axios.get(url);
  let picArry = dataWeGetFromUnsplash.data.results.map(pic => new Photo(pic));
  //console.log(picArry);
  response.send(picArry);
});

// CLASSES
class Photo {
  constructor(pic) {
    this.src = pic.urls.regular;
    this.alt = pic.alt_description;
    this.artist = pic.user.name;
  }
}

// ERRORS

// LISTEN
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
