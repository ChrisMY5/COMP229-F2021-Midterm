// COMP229-005-F2021-MidTerm/ ManYoung Oh/ 301161472

let mongoose = require('mongoose');

// create a model class
// declare model as Book with data type of variables
// set the variables to ready for getting data collection from MongoDB
let Book = mongoose.Schema({
    Title: String,
    Price: Number,
    Author: String,
    Genre: String
},
{
  collection: "books"
});

module.exports = mongoose.model('Book', Book);

