'use strict';

const axios = require('axios');

async function getPhotos(request, response) {
  try {
  let searchQuery = request.query.searchQuery;
  console.log(searchQuery);

  /* 
  // othere way to write axios.getwith a URL
  let params = {
    client_id: process.env.UNSPLASH_API_KEY,
    query: searchQuery
  }
  let url = 'https://api.unsplash.com/search/photos/';

  let dataWeGetFromUnsplash = await axios.get(url, { params });
  */

  

  // make an api request to unsplash
  let url = `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_API_KEY}&query=${searchQuery}`;
  let dataWeGetFromUnsplash = await axios.get(url);

  let picArry = dataWeGetFromUnsplash.data.results.map(pic => new Photo(pic));
  //console.log(picArry);
  response.send(picArry);
  } catch (error) {
    Promise.resolve().then(() => {
      throw new Error(error.message);
    })
  }
}

// CLASSES
class Photo {
  constructor(pic) {
    this.src = pic.urls.regular;
    this.alt = pic.alt_description;
    this.artist = pic.user.name;
  }
}

module.exports = getPhotos;



// Another way of writing error handling

function getPhotosUsingChaining(req, res) {
  let searchQuery = req.query.searchQuery;

  let params = {
    client_id: process.env.UNSPLASH_API_KEY,
    query: searchQuery
  }
  let url = 'https://api.unsplash.com/search/photos';

  axios.get(url, { params })
    .then(photoResults => photoResults.data.results.map(pic => new Photo(pic)))
    .then(groomedPhotos => res.status(200).send(groomedPhotos))
    .catch(err => console.error(err));

}
