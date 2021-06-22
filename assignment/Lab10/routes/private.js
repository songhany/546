const express = require('express');
const router = express.Router();
const userData = require('../users');  // ./users.js

router.get('/', async (req, res) => {
  // let aUserData = req.body;
  try {
    res.render('others/private', {
      Id: req.session.user.id,
      Username: req.session.user.username,
      First_Name: req.session.user.firstname,
      Last_Name: req.session.user.lastname,
      Profession: req.session.user.profession,
      Bio: req.session.user.bio,
      title: "private page",
      logoutLink: "http://localhost:3000/logout"
    });
  } catch (e) {
    res.status(403).render('pages/register', {error: true, errorInfo: "You did not provide a valid username and/or password.", title: "Login"});
    }
  }
);

module.exports = router;
