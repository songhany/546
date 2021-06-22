const mongoCollections = require('../config/mongoCollections');
const books = mongoCollections.books;
let booksJS = require('./books');  // we need use async method of books

let ObjectID = require('mongodb').ObjectID;  // MongoDB Node check if objectid is valid. https://stackoverflow.com/questions/11985228/mongodb-node-check-if-objectid-is-valid
let { ObjectId } = require('mongodb');

module.exports = {

  getAllReviewsOfBook: async function(bookId) {
    if (!bookId) throw 'You must provide an bookId to get';
    if (typeof bookId !== 'string' || bookId.length === 0) throw "bookId must be string type and not an empty string";
    if (!ObjectID.isValid(bookId)) throw "bookId provided is not a valid ObjectId";  //MongoDB Node check if objectid is valid. https://stackoverflow.com/questions/11985228/mongodb-node-check-if-objectid-is-valid
    let parsedBookId = ObjectId(bookId);
    const bookCollection = await books();

    const currentBook = await bookCollection.findOne({ _id: parsedBookId });
    return currentBook.reviews;
  },

  createReview: async function(bookId, title, reviewer, rating, dateOfReview, review) {  //bookId is string
    if (title == " " || reviewer == " " || dateOfReview == " " || review == " ") throw "Strings with empty spaces are NOT valid strings";
    if (!bookId || !title || !reviewer || !rating || !dateOfReview || !review) throw "All fields must have valid values"
    if (typeof title !== 'string' || typeof reviewer !== 'string' || typeof dateOfReview !== 'string' || typeof review !== 'string') throw 'The title, reviewer, dateOfReview, review must be string type';
    if (typeof rating !== 'number') throw "rating must be number type";
    if (rating < 1 || rating > 5) throw "rating must be in the range 1 to 5"
    if (title.length === 0 || reviewer.length === 0 || dateOfReview === 0 || review === 0) throw "The title, reviewer, dateOfReview, review cannot be empty strings";
    let parsedBookId = ObjectId(bookId); 
    const bookCollection = await books();

    const newReview = {
      _id: ObjectId(),
      title: title,
      reviewer: reviewer,
      rating: rating,
      dateOfReview: dateOfReview,
      review: review,
    };
    const currentBook = await bookCollection.updateOne({ _id: parsedBookId }, { $addToSet: { reviews: newReview}});  //add review to book

    // console.log(currentBook);
    // console.log(booksJS.getBookByBookId(bookId));
    return booksJS.getBookByBookId(bookId);
  },

  getReviewByReviewId: async function(reviewId) {
    if (!reviewId) throw 'You must provide an reviewId to get';
    if (typeof reviewId !== 'string' || reviewId.length === 0) throw "the reviewId must be string type and not an empty string";
    if (!ObjectID.isValid(reviewId)) throw "the reviewId provided is not a valid ObjectId";  //MongoDB Node check if objectid is valid. https://stackoverflow.com/questions/11985228/mongodb-node-check-if-objectid-is-valid
    const bookCollection = await books();

    let retReview =  {};
    let tarBookObj = await bookCollection.findOne({ 'reviews._id': ObjectId(reviewId)});  // https://stackoverflow.com/questions/14040562/how-to-search-in-array-of-object-in-mongodb
    let reviewList = tarBookObj['reviews'];
    
    for (let review of reviewList) {
      if (review['_id'].toString() === ObjectId(reviewId).toString())
        retReview = review;
    }
    if (!retReview) throw "Cannot find review with that reviewId"

    return retReview;  // https://stackoverflow.com/questions/49508700/convert-mongodb-object-to-javascript-object
  },

  deleteReview: async function(reviewId) {
    if (!reviewId) throw 'You must provide an reviewId for removing';
    if (typeof reviewId !== 'string' || reviewId.length === 0) throw "The reviewId must be string type and not an empty string";
    if (!ObjectID.isValid(reviewId)) throw "The reviewId provided is not a valid ObjectId";
    const bookCollection = await books();

    // find target Book Obj, get bookId
    let tarBookObj = await bookCollection.findOne({ 'reviews._id':ObjectID(reviewId) });
    bookId = tarBookObj._id;  // bookId is ObjectId

    let delBookObj = await bookCollection.updateOne({ '_id': bookId }, { $pull: { reviews: {_id : ObjectID(reviewId) }}})

    return delBookObj;
  },
};