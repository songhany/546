const express = require('express');
const router = express.Router();
const data = require('../data');
const searchData = data.search;
const showData = data.shows;


router.get('/:id', async (req, res) => {  //get a specific show
  try {
    const show = await showData.getShowById(req.params.id);
    // console.log(show);
    // console.log(typeof show.summary);

    //use a regex expression to strip any HTML tags out of the Summary before displaying it on the page. 
    if (show.summary) {
      const regex = /<[/a-zA-Z]*>/g;
      show.summary = show.summary.replace(regex, '');
    }

    res.render('posts/single', { show: show, title: show.name })  // ❤ pass in 'title' to realize different <title>{{title}}</title>
  } catch (e) {
    res.status(404).render('posts/error', { errorDescription: "There is no show found for the given ID, please type in existing ID.", title: "Cannot find show with this ID" });
  }
});

module.exports = router;