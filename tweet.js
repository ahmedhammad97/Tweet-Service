const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create a Schema and a Model
const Tweet = mongoose.model('tweet', new Schema({
  body: String
}));

module.exports = Tweet;
