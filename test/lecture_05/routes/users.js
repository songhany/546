const express = require('express');
const router = express.Router();
const data = require('../data');  //include data folder
const userData = data.users;

router.get('/', async (req, res) => {  //get a list of all posts
  try {
    const userList = await userData.getAllUsers();
    res.json(userList);  //Sends a JSON response. Converted parameter to a JSON string using JSON.stringify(). https://expressjs.com/zh-cn/api.html
  } catch (e) {
    res.status(500).send();  // Something went wrong with the server!
  }
});

router.get('/:id', async (req, res) => {  //get a specific post
  try {
    const user = await userData.getUserById(req.params.id);
    res.json(user);
  } catch (e) {
    res.status(404).json({ message: 'User not found!' });
  }
});

router.post('/', async (req, res) => {  //create a new post
  // Not implemented
  // try {
    res.json ({message: 'In POST route'});
  // } catch (e) {
  //   res.status(501).send();
  // }
});

router.delete('/', async (req, res) => {
  // Not implemented
  // try {
    res.json ({message: 'In DELETE route'});
  // } catch (e) {
  // res.status(501).send();
  // }
});

module.exports = router;  //don't forget this line!
