const mongoCollections = require('../config/mongoCollections');
const books = mongoCollections.books;  //create and get the bookCollection

let ObjectID = require('mongodb').ObjectID;  // MongoDB Node check if objectid is valid. https://stackoverflow.com/questions/11985228/mongodb-node-check-if-objectid-is-valid
let { ObjectId } = require('mongodb');

module.exports = {

  getAllBooks: async function () {
    const bookCollection = await books();
    const arrOfBooks = await bookCollection.find({}).toArray();
    //build array of objBook that fulfill requirement
    let arrRet = [];
    let objBook = {};
    for (let i=0; i<arrOfBooks.length; i++) {
      objBook = {};
      objBook._id = arrOfBooks[i]._id.toString();  //convert ObjectId to String
      objBook.title = arrOfBooks[i].title;
      arrRet.push(objBook);
    }
    return arrRet;  //an array of DIY book object
  },

  createBook: async function(title, bookAuthor, genre, datePublished, summary, reviews) {
    if (title == " " || bookAuthor.authorFirstName == " " || bookAuthor.authorLastName == " " || datePublished == " " || summary == " ") throw "Strings with empty spaces are NOT valid strings";
    if (!title || !bookAuthor || !genre || !datePublished || !summary) throw "All fields need to have valid values";
    if (typeof title !== 'string' || typeof bookAuthor.authorFirstName !== 'string' || typeof bookAuthor.authorLastName !== 'string' || typeof datePublished !== 'string' || typeof summary !== 'string') throw "The title, authorFirstName, authorLastName, summary must be string type";
    if (title.length === 0 || bookAuthor.authorFirstName.length === 0 || bookAuthor.authorLastName.length === 0 || datePublished.length === 0 || summary === 0) throw "The title, authorFirstName, authorLastName, summary cannot be empty strings";
    if (!Array.isArray(genre) || genre.length === 0 || genre.every(e => (typeof e !== "string"))) throw "The genre is not an array, or genre must have at least one element that is a valid string";
    
    if (bookAuthor.constructor !== Object) throw "bookAuthor parameter must be an object";
    if (typeof bookAuthor.authorFirstName !== 'string' || !bookAuthor.authorFirstName || bookAuthor.authorFirstName.length === 0) throw "bookAuthor.authorFirstName not a valid string type, or is not provided, or is an empty string";
    if (typeof bookAuthor.authorLastName !== 'string' || !bookAuthor.authorLastName || bookAuthor.authorLastName.length === 0) throw "bookAuthor.authorLastName not a valid string type, or is not provided, or is an empty string";

    if (!Array.isArray(reviews)) {  //reviews don't supply, initialize it to an empty array
        reviews = [];
    }

    const bookCollection = await books();  // bookCollection is reference to bookCollection

    const newBook = {
      title: title,
      author: { 
        authorFirstName: bookAuthor.authorFirstName,
        authorLastName: bookAuthor.authorLastName
      },
      genre: genre,
      datePublished: datePublished,
      summary: summary,
      reviews: reviews,
    }

    const insertBook = await bookCollection.insertOne(newBook);
    if (insertBook.insertedCount === 0) throw "Cannot add Book into bookCollection of DB";

    let bookId = insertBook.insertedId;  //bookId is an ObjectId, which was generated by MongoDB
    bookId = bookId.toString();

    return await this.getBookByBookId(bookId);
  },

  getBookByBookId: async function (bookId) {  //pass in bookId is string
    if (!bookId) throw 'You must provide an bookId to get';
    if (typeof bookId !== 'string' || bookId.length === 0) throw "for getBookByBookId(bookId), the bookId must be string type and not an empty string";
    if (!ObjectID.isValid(bookId)) throw "the bookId provided is not a valid ObjectId";  //MongoDB Node check if objectid is valid. https://stackoverflow.com/questions/11985228/mongodb-node-check-if-objectid-is-valid
    let parsedId = ObjectId(bookId);

    const bookCollection = await books();
    let book = await bookCollection.findOne({ _id: parsedId});  //return a document
    if (book=== null) throw "No book with that bookId";
    book._id = book._id.toString();
    return book;  //book object
  },

  replaceBook: async function (bookId, newBook) {  //bookId is string
    if (!bookId) throw 'You must provide an bookId for removing';
    if (typeof bookId !== 'string' || bookId.length === 0) throw "the bookId must be string type and not an empty string";
    if (!ObjectID.isValid(bookId)) throw "the bookId provided is not a valid ObjectId";
    if (!newBook) throw 'You must provide an newBook';
    if (newBook.constructor !== Object) throw "the newBook must be an object";
    if (Object.entries(newBook).length === 0 && newBook.constructor === Object) throw "newbook Object cannot be an empty object";
    const updatedBookData = {};
    if (newBook.title)
      updatedBookData.title = newBook.title;
    if (newBook.author) {
      updatedBookData.author = newBook.author;
    }
    if (newBook.genre)
      updatedBookData.genre = newBook.genre;
    if (newBook.datePublished)
      updatedBookData.datePublished = newBook.datePublished;
    if (newBook.summary)
      updatedBookData.summary = newBook.summary;

    let parsedId = ObjectId(bookId); 
    const bookCollection = await books();  // bookCollection is reference to bookCollection
    const currentBook = await bookCollection.findOne({ _id: parsedId });  // copy the old array of review ids from the existing book and then insert them into the updated document so they are retained and not overwritten
    updatedBookData.reviews = currentBook.reviews;  //insert original reviews for preventing overwritten
    
    return await bookCollection.replaceOne({ _id: parsedId }, updatedBookData )
      .then(function () {
        return module.exports.getBookByBookId(bookId);
      });
  },

  updateBook: async function (bookId, newBook) {  //bookId is string
    if (!bookId) throw 'You must provide an bookId for removing';
    if (typeof bookId !== 'string' || bookId.length === 0) throw "the bookId must be string type and not an empty string";
    if (!ObjectID.isValid(bookId)) throw "the bookId provided is not a valid ObjectId";
    if (!newBook) throw 'You must provide an newBook';
    if (newBook.constructor !== Object) throw "the newBook must be an object";
    if (Object.entries(newBook).length === 0 && newBook.constructor === Object) throw "newbook Object cannot be an empty object";
    const updatedBookData = {};
    if (newBook.title)
      updatedBookData.title = newBook.title;
    if (newBook.author) {
      updatedBookData.author = newBook.author;
    }
    if (newBook.datePublished)
      updatedBookData.datePublished = newBook.datePublished;
    if (newBook.summary)
      updatedBookData.summary = newBook.summary;

    let parsedId = ObjectId(bookId); 
    const bookCollection = await books();  // bookCollection is reference to bookCollection
    const currentBook = await bookCollection.findOne({ _id: parsedId });  //store original book before updating
    if (newBook.genre) {  //append the genres in the request.body (if they are supplied in the request.body for this route) to the array already stored in the collection
      updatedBookData.genre = currentBook.genre;
      for (let newGenre of newBook.genre) {
        if (!updatedBookData.genre.includes(newGenre))  // if a genre already exists in the genres array in the DB, you will just ignore it 
          updatedBookData.genre.push(newGenre);
      }
    }
    updatedBookData.reviews = currentBook.reviews;  //insert original reviews for preventing overwritten
    
    return await bookCollection.updateOne({ _id: parsedId }, { $set: updatedBookData } )
      .then(function () {
        return module.exports.getBookByBookId(bookId);
      });
  },

  deleteBook: async function (bookId) {
    if (!bookId) throw 'You must provide an bookId for removing';
    if (typeof bookId !== 'string' || bookId.length === 0) throw "the bookId must be string type and not an empty string";
    if (!ObjectID.isValid(bookId)) throw "the bookId provided is not a valid ObjectId";
    let parsedId = ObjectId(bookId);

    const bookCollection = await books();
    const deleteBook = await bookCollection.deleteOne({ _id: parsedId });
    if (deleteBook.deletedCount === 0) {
      throw 'Cannot delete book with bookId';
    }
    return {"bookId": bookId, "deleted": true};
  },
};
