const express = require('express');
const router = express.Router();

const data = require('../data');
const showData = data.shows;  // access to "../data/shows" by index.js of data folder


router.get('/', async (req, res) => {
    try {
        const showList = await showData.getAllShow();
        res.json(showList);
    } catch (e) {
        console.log(e);
        res.status(500).send();
    }
});

router.get('/:id', async (req, res) => {  //get a specific post
    try {
        const show = await showData.getShowById(req.params.id);
        res.json(show);
      } catch (e) {
        console.log(e);
        res.status(404).json({ message: 'Show not found' });
      }
});

module.exports = router;
