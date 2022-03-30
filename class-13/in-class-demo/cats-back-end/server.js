'use strict'

// requirements for server
require('dotenv').config();
const express = require('express');
const cors = require('cors');

// bring in mongoose
const mongoose = require('mongoose');

// must bring in a scheme if we want to interact with that model
const Cat = require('./models/cat.js');

// connect Mongoose to our MongoDB
mongoose.connect(process.env.DB_URL);

// add validation to confirm we are wired up to our mongo DB
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Mongoose is connected');
});

// implement express
const app = express();

// middleware
app.use(cors());

// must have thiss to recieve json from a request
app.use(express.json());

// define PORT validate env is working
const PORT = process.env.PORT || 3002;

// routes
app.get('/', (request, response) => {
  response.status(200).send('Welcome!');
})

app.get('/cats', getCats);
app.post('/cats', postCat);
app.delete('/cats/:id', deleteCat);
app.put('/cats/:id', putCat);

async function getCats(req, res, next) {
  // REST verb: GET // Mongoose Model.find()
  try {
    // maybe for your lab today
    // let results = await Cat.find({ email: req.query.email })
    let queryObject = {};
    if (req.query.location) {
      queryObject.location = req.query.location;
    }
    let results = await Cat.find(queryObject);
    res.status(200).send(results);
  } catch(error) {
    next(error);
  }
}

async function postCat(req, res, next) {
  // REST verb POST // Mongoose Model.create()
  // console.log(req.body);
  try {
    let createdCat = await Cat.create(req.body);
    res.status(200).send(createdCat);
  } catch(error) {
    next(error);
  }
}

async function deleteCat(req, res, next) {
  // REST verb DELETE // Mongoose Model.findByIdAndDelete()
  let id = req.params.id;
  try {
    // console.log(id);
    await Cat.findByIdAndDelete(id);
    res.send('cat deleted');
  } catch(error) {
    next(error);
  }
}

async function putCat(req, res, next) {
  // REST verb PUT // Mongoose Model.findByIdAndUpdate
  try {
    let id = req.params.id;
    // data about the updated cat is in the req.body

    // findByIdAndUpdate — this method takes 3 arguments:
    // - 1.  ID of the thing in the database that we want to update
    // - 2.  Update data object
    // - 3.  options object
    let updatedCat = await Cat.findByIdAndUpdate(id, req.body, { new: true, overwrite: true});
    res.status(200).send(updatedCat);
  } catch(error) {
    next(error);
  }
}


app.get('*', (request, response) => {
  response.status(404).send('Not availabe');
})

// error
app.use((error, req, res, next) => {
  res.status(500).send(error.message);
});

app.listen(PORT, () => console.log(`listening on Port ${PORT}`));
