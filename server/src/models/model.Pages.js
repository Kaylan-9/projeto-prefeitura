const mongoose = require('mongoose');
const {model, Schema} = mongoose;


module.exports = model('pages', new Schema({
  name : {
    type: String,
    required: true
  },
  pages : {
    type: Map,
    of: String,
    required: true
  },
  color : {
    type: String,
    required: true
  }
}));