'use strict';

// bring in mongoose
const mongoose = require('mongoose');

// extract schema property from the mongoose object
const { Schema } = mongoose;

// create a cat schema, define how our object will be structured

const catSchema = new Schema({
  name: {type: String, required: true},
  color: {type: String, required: true},
  spayNeuter: {type: Boolean, required: true},
  location: {type: String, required: true}
});

const CatModel = mongoose.model('Cat', catSchema);

module.exports = CatModel;
