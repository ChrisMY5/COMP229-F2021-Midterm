// COMP229-005-F2021-MidTerm/ ManYoung Oh/ 301161472

// modules required for routing
let express = require('express');
const { isEmptyObject } = require('jquery');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {title: 'Books', books: books});
    }
  });

});

//  GET the Book Details page in order to add a new Book
// when '/add' requested, it respond to route to details.ejs for adding collection
router.get('/add', (req, res, next) => {
  let initialPage = book();
  res.render('books/details', {title: 'Add Book', books: initialPage});
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // initicalize new book collection by data input following variables
    // issuing error, then display error and session end. Otherwise, return to '/books' page
    let newBook = book({
      "Title": req.body.title,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
    });

    book.create(newBook, (err, book) => {
      if(err)
      {
        console.log(err);
        res.end(err)
      }
      else
      {
        //refresh the book list
        res.redirect('/books');
      }
    })


});

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // recognize selected ID, then route to 'books/details' for editting
    let id = req.params.id;
    book.findById(id, (err, bookToEdit) =>{
    if(err)
    {
      console.log(err);
      res.end(err);
    }
    else
    {
      //show the edit view
      res.render('books/details', {title: 'Edit Book', books: bookToEdit})  
    }
  });
});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // based on the existing Id with variables, it allows to edit the value of variables.
    // issuing error, then display error and session end. Otherwise, return to '/books' page
    let id = req.params.id;

    let updatedBook = book({
      "_id": id,
      "Title": req.body.title,
      "Price": req.body.price,
      "Author": req.body.author,
      "Genre": req.body.genre
    });

    book.updateOne({_id: id}, updatedBook, (err) => {
      if(err)
      {
        console.log(err);
        res.end(err);
      }
      else
      {
        // refresh the book list
        res.redirect('/books');
      }
    });
});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    // it removes the selectd collection by its Id
    let id = req.params.id;

    book.remove({_id: id}, (err) => {
      if(err)
      {
        console.log(err);
        res.end(err);
      }
      else
      {
        // refresh the book list
        res.redirect('/books');
      }
    })
});


module.exports = router;
