const mongoose = require('mongoose');

const userschema = mongoose.Schema({
     name: {
          type: String,
          required: true
     },
     email: {
          type: String,
          required: true,
          unique: true
     },
     location: {
          type: String,
          required: true
     },
     password: {
          type: String,
          required: true
     },
     createdOn :{
          type: Number,
          default: Date.now()
     }
});

module.exports = mongoose.model('User', userschema);