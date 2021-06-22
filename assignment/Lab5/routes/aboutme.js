const express = require('express');
const router = express.Router();

const data = require('../data');
const aboutmeData = data.aboutme;  // access to "../data/aboutme" by index.js of data folder


router.get('/', async (req, res) => {  //get a specific post
    try {
        const aboutme = await aboutmeData.getAboutMe();
        res.json(aboutme);
      } catch (e) {
        res.status(404).json({ message: 'Aboutme not found' });
      }
});

module.exports = router;