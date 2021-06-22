const express = require('express');
const router = express.Router();
const data = require('../data');
const searchData = data.search;
const showData = data.shows;


router.get('/', async (req, res) => {  // GET http://localhost:3000/
  let input = req.body;
  res.render('posts/form', { post: input, title: "Show Finder" });  // pass inputted searchTerm into form
});


router.post('/search', async (req, res) => {  // POST http://localhost:3000/search
  let input = req.body;  //read the searchTerm from form

  if (!input.searchTerm || input.searchTerm == ' ') {  //give a response status code of 400 on the page, and render an HTML page with a paragraph class called error
    res.status(400).render('posts/error', { errorDescription: "You should input text into form for searching and the text cannot just be spaces.", title: "Error" });
    return;
  }

  let showsList;
  try {
    showsList = await searchData.getShowBySearchTerm(input.searchTerm);
  } catch (e) {
    res.render('posts/search', {
      searchTerm: input.searchTerm,
      shows: showsList,
      hasErrors: true,   // trigger #if hasErrors
      error: e,  // pass in error message, catched with await searchData.getShowBySearchTerm(aSearchTerm)
      title: "Error"  // ❤ realize different <title>{{title}}</title>
    });
  }

  res.render('posts/search', {
    searchTerm: input.searchTerm,
    shows: showsList,
    title: "Shows Found"  // ❤ realize different <title>{{title}}</title>
  });
});

module.exports = router;


