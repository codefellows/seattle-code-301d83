'use strict';

const axios = require('axios');

let cache = {};

async function getPhotos(request, response) {
  try {
    let searchQuery = request.query.searchQuery;

    // create a key for what the user has searched for
    let key = searchQuery + 'Data';

    if (cache[key] && (Date.now() - cache[key].timestamp < 1000 * 60 * 60 * 24 * 7)) {
      // use the the cache
      console.log('It is in the cache');
      response.status(200).send(cache[key].data);
    } else {
      // make a new API request
      console.log('It is not in the cache');
      // make an api request to unsplash
      let url = `https://api.unsplash.com/search/photos/?client_id=${process.env.UNSPLASH_API_KEY}&query=${searchQuery}`;
      let dataWeGetFromUnsplash = await axios.get(url);

      let picArry = dataWeGetFromUnsplash.data.results.map(pic => new Photo(pic));
      cache[key] = {
        data: picArry,
        timestamp: Date.now()
      }

      response.status(200).send(picArry);
    }
   
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
