const express = require('express');
const router = express.Router();
const data = require('../data');
const bookData = data.books;  // "../data/books" through ../data/index.js


router.get('/', async (req, res) => {
  try {
      const bookList = await bookData.getAllBooks();
      res.json(bookList);
  } catch (e) {
      res.status(500).json({ error: e });
  }
});


router.post('/', async (req, res) => {
  let aBookData = req.body;  //get data that need to be Booked
  
  if (!aBookData.title || typeof aBookData.title != 'string') {
    res.status(400).json({ error: 'You must provide book title in string' });
    return;
  }
  if (!aBookData.author || !aBookData.author.authorFirstName || !aBookData.author.authorLastName || typeof aBookData.author.authorFirstName != 'string' || typeof aBookData.author.authorLastName != 'string') {
    res.status(400).json({ error: 'You must provide book author name, both authorFirstName and authorLastName should be string type' });
    return;
  }
  if (!aBookData.genre || aBookData.genre.length < 1 || aBookData.genre.every(e => (typeof e !== "string"))) {
    res.status(400).json({ error: 'You must provide book genre' });
    return;
  }
  if (!aBookData.datePublished || typeof aBookData.datePublished != 'string') {
    res.status(400).json({ error: 'You must provide datePublished in string' });
    return;
  }
  if (!aBookData.summary || typeof aBookData.summary != 'string') {
    res.status(400).json({ error: 'You must provide summary in string' });
    return;
  }

  try {
    const { title, author, genre, datePublished, summary } = aBookData; 
    const newBook = await bookData.createBook(title, author, genre, datePublished, summary);
    res.status(200).json(newBook);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});


router.get('/:id', async (req, res) => {  //get a specific book with _id
  try {
    const book = await bookData.getBookByBookId(req.params.id);
    res.status(200).json(book);
  } catch (e) {
    res.status(404).json({ message: 'Book not found' });
    return;
  }
});


router.put('/:id', async (req, res) => {  //put method need provide /:id after /Books
  const replacedData = req.body;  //get data that need to be updated by put method

  if (!replacedData.title || !replacedData.author.authorFirstName || !replacedData.author.authorLastName || !replacedData.genre || !replacedData.datePublished || !replacedData.summary) {
    res.status(400).json({ error: 'You must Supply All fields' });
    return;
  }
  if (typeof replacedData.title != 'string') {
    res.status(400).json({ error: 'You must provide book title in string type' });
    return;
  }
  if (typeof replacedData.author.authorFirstName != 'string' || typeof replacedData.author.authorLastName != 'string') {
    res.status(400).json({ error: 'You must provide book author name' });
    return;
  }
  if (replacedData.genre.every(e => (typeof e !== "string"))) {
    res.status(400).json({ error: 'You must provide book genre and its every element should be string type' });
    return;
  }
  if (typeof replacedData.datePublished != 'string') {
    res.status(400).json({ error: 'You must provide datePublished in string' });
    return;
  }
  if (typeof replacedData.summary != 'string') {
    res.status(400).json({ error: 'You must provide summary in string' });
    return;
  }

  try {  //check whether the book with that Id is exist
    const book = await bookData.getBookByBookId(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Book not found' });
    return;
  }
  //after we have already found that book
  try {
    const updatedBook = await bookData.replaceBook(req.params.id, replacedData);
    res.status(200).json(updatedBook);
  } catch (e) {
    console.log(e);
    res.status(500).json({ error: e });
  }
});


router.patch('/:id', async (req, res) => {
  const updatedData = req.body;
  if (!(updatedData.title || updatedData.author || updatedData.genre || updatedData.datePublished || updatedData.summary)) {
    res.status(400).json({ error: 'You must supply at least one field' });
    return; 
  }

  let updatedObject = {};
  try {
    const currentBook = await bookData.getBookByBookId(req.params.id);
    // compare patchBook data with currentBook data.Take different part into updatedObject
    if (updatedData.title && updatedData.title !== currentBook.title)
      updatedObject.title = updatedData.title;
    if (updatedData.author && (updatedData.author.authorFirstName !== currentBook.author.authorFirstName) || (updatedData.author.authorLastName !== currentBook.author.authorLastName))
      updatedObject.author = updatedData.author;
    if (updatedData.genre) {  //if genre are supplied in the request.body for this route
      updatedObject.genre = currentBook.genre;
      for (let newGenre of updatedData.genre) {  //append the genres in the request.body to the array already stored in the collection in the database
        if (updatedObject.genre.indexOf(newGenre) == -1)  //check whether a genre already exists in the genres array in the DB
          updatedObject.genre.push(newGenre);
      } 
    }
    if (updatedData.datePublished && updatedData.datePublished !== currentBook.datePublished)
      updatedObject.datePublished= updatedData.datePublished;
    if (updatedData.summary && updatedData.summary !== currentBook.summary)
      updatedObject.summary = updatedData.summary;
  } catch (e) {
    console.log(e);
    res.status(404).json({ error: 'Patch failed' });
    return;
  }

  if (Object.keys(updatedObject).length !== 0) {  //there is updated info
    try {
      const updatedBook = await bookData.updateBook(req.params.id, updatedObject);
      res.status(200).json(updatedBook);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  } else {
    res.status(400).json({error: 'No fields have been changed from their inital values, so no update has occurred'});
  }
});


router.delete('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ error: 'You must supply an bookId to delete' });
    return;
  }

  try {
    await bookData.getBookByBookId(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Book not found with this id' });
    return;
  }

  try {
    await bookData.deleteBook(req.params.id);
    res.status(200).json({ "bookId": req.params.id, "deleted": true});
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
