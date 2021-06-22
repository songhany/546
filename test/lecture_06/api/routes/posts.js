const express = require('express');
const router = express.Router();
const data = require('../data');
const postData = data.posts;  //async method  of posts

router.get('/:id', async (req, res) => {
  try {
    const post = await postData.getPostById(req.params.id);
    res.json(post);
  } catch (e) {
    res.status(404).json({ error: 'Post not found' });
  }
});

router.get('/tag/:tag', async (req, res) => {  //get post info according to keyword in tags array 
  const postList = await postData.getPostsByTag(req.params.tag);
  res.json(postList);
});


router.get('/', async (req, res) => {
  try {
    const postList = await postData.getAllPosts();
    res.json(postList);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.post('/', async (req, res) => {
  const blogPostData = req.body;  //get data that need to be posted
  if (!blogPostData.title) {
    res.status(400).json({ error: 'You must provide blog post title' });
    return;
  }
  if (!blogPostData.body) {
    res.status(400).json({ error: 'You must provide blog post body' });
    return;
  }
  if (!blogPostData.posterId) {
    res.status(400).json({ error: 'You must provide poster ID' });
    return;
  }
  try {
    const { title, body, tags, posterId } = blogPostData;
    const newPost = await postData.addPost(title, body, tags, posterId);
    res.json(newPost);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.put('/:id', async (req, res) => {  //put method update whole field, all field need to be supplied
  const updatedData = req.body;  //get data that need to be updated by put method
  if (!updatedData.title || !updatedData.body || !updatedData.posterId) {
    res.status(400).json({ error: 'You must Supply All fields' });
    return;
  }
  try {
    await postData.getPostById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }

  try {
    const updatedPost = await postData.updatePost(req.params.id, updatedData);
    res.json(updatedPost);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.patch('/:id', async (req, res) => {  //patch method update parts of field
  const requestBody = req.body;
  let updatedObject = {};  //create an object for parts of field that need to be upated
  try {
    const oldPost = await postData.getPostById(req.params.id);
    if (requestBody.title && requestBody.title !== oldPost.title)
      updatedObject.title = requestBody.title;
    if (requestBody.body && requestBody.body !== oldPost.body)
      updatedObject.body = requestBody.body;
    if (requestBody.tags && requestBody.tags !== oldPost.tags)
      updatedObject.tags = requestBody.tags;
    if (requestBody.posterId && requestBody.posterId !== oldPost.posterId)
      updatedObject.posterId = requestBody.posterId;
  } catch (e) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }

  if (Object.keys(updatedObject).length !== 0) {  //if Object.keys(updatedObject).length === 0, then there is noting change for post
    try {
      const updatedPost = await postData.updatePost(req.params.id, updatedObject);
      res.json(updatedPost);
    } catch (e) {
      res.status(500).json({ error: e });
    }
  } else {
    res.status(400).json({error: 'No fields have been changed from their inital values, so no update has occurred'});
  }
});

router.delete('/:id', async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ error: 'You must Supply an postID to delete' });
    return;
  }

  try {
    await postData.getPostById(req.params.id);
  } catch (e) {
    res.status(404).json({ error: 'Post not found' });
    return;
  }

  try {
    await postData.removePost(req.params.id);
    res.sendStatus(200);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

module.exports = router;
