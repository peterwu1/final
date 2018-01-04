const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  word: {
    type: String,
    index: { unique: true },
    required: true,
  },
  description: {
  	type: String,
  	required: true
  },
  email: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Card', CardSchema);
