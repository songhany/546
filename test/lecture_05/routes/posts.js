const express = require('express');
const router = express.Router();  //express routes
const data = require('../data');  //include data folder
const postData = data.posts;

router.get('/', async (req, res) => {  //get a list of all posts
  try {
    const postList = await postData.getAllPosts();
    res.json(postList);  //Sends a JSON response. Converted parameter to a JSON string using JSON.stringify(). https://expressjs.com/zh-cn/api.html
  } catch (e) {
    res.status(500).send();
  }
});

router.get('/:id', async (req, res) => {  //get a specific post
  try {
    const post = await postData.getPostById(req.params.id);
    res.json(post);
  } catch (e) {
    res.status(404).json({ message: 'Post not found' });
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
    res.status(404).json ({message: 'In DELETE route'});
  // } catch (e) {
  // res.status(501).send();
  // }
});

module.exports = router;  //don't forget this line!
