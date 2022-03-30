'use strict';

require('dotenv').config();
const mongoose = require('mongoose');
const Cat= require('./models/cat');
mongoose.connect(process.env.DB_URL);

async function seed() {
  // same structure as our Cat Schema
  // name: { type: String, required: true },
  // color: { type: String, required: true },
  // spayNeuter: { type: Boolean, required: true },
  // location: { type: String, required: true }
  await Cat.create({
    name: 'Axel',
    color: 'yellow',
    spayNeuter: true,
    location: 'Seattle'
  });
  console.log('Axel was added');

  await Cat.create({
    name: 'Grey',
    color: 'black and white',
    spayNeuter: true,
    location: 'Augusta'
  });
  console.log('Grey was added');
  // remember to hang up the connection with mongoose
  mongoose.disconnect();
}

seed();
