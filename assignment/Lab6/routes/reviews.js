const express = require('express');
const router = express.Router();
const data = require('../data');
const bookData = data.books;  // ../data/books
const reviewData = data.reviews;  // ../data/reviews


router.get('/:id', async (req, res) => {  // :id is bookId. return an array of all reviews for this bookId
  try {
      const reviewBook = await reviewData.getAllReviewsOfBook(req.params.id);  // req.params.id is bookId
      res.status(200).json(reviewBook);
    } catch (e) {
      // console.log(e);
      res.status(404).json({ message: 'Reviews with bookId not found' });
      return;
    }
});


router.post('/:id', async (req, res) => {  // :id is bookId
  const aReviewData = req.body;  // get data that need to be posted
  
  if (!aReviewData.title || typeof aReviewData.title != 'string' ) {
    res.status(400).json({ error: 'You must provide review title in string type' });
    return;
  }
  if (!aReviewData.reviewer || typeof aReviewData.reviewer != 'string' ) {
    res.status(400).json({ error: 'You must provide reviewer in string type' });
    return;
  }
  if (!aReviewData.rating || typeof aReviewData.rating != 'number' || aReviewData.rating < 0 || aReviewData.rating > 5 ) {
    res.status(400).json({ error: 'rating should be a range from 1-5' });
    return;
  }
  if (!aReviewData.dateOfReview || typeof aReviewData.dateOfReview != 'string' ) {
    res.status(400).json({ error: 'You must provide dateOfReview in string type' });
    return;
  }
  if (!aReviewData.review || typeof aReviewData.title != 'string' ) {
    res.status(400).json({ error: 'You must provide review in string type' });
    return;
  }

  try {  // check bookId is valid
    const book = await bookData.getBookByBookId(req.params.id);
  } catch (e) {
    res.status(400).json({ error: 'Book not found' });
    return;
  }
  
  // Json is valid and reviw can be created successful
  try {
    const { title, reviewer, rating, dateOfReview, review } = aReviewData;  //Creates a review sub-document with the supplied data in the request body
    const bookThatReview = await reviewData.createReview(req.params.id, title, reviewer, rating, dateOfReview, review)  //❤req.params.id is "bookId", bookId is a string, thus we can add reviews to correspnding book  
    res.status(200).json(bookThatReview);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});


router.get('/review/:id', async (req, res) => {  // :id is reviewId
  try {
      const aReview = await reviewData.getReviewByReviewId(req.params.id);
      res.json(aReview);
    } catch (e) {
      // console.log(e);
      res.status(404).json({ error: 'Review not found' });
    }
});


router.delete('/review/:id', async (req, res) => {  // :id is reviewId
  if (!req.params.id) throw 'You must specify an reviewId to delete';
  try {
    const aReview = await reviewData.getReviewByReviewId(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Review not found' });
    return;
  }

  try {
    const deleteReview = await reviewData.deleteReview(req.params.id);
    res.json({"reviewId": req.params.id, "deleted": true});
  } catch (e) {
    // console.log(e);
    res.status(500).json( {error: e });
  }
});

module.exports = router;
