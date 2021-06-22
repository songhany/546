const postRoutes = require('./posts');
const userRoutes = require('./users');
const path = require('path');

const constructorMethod = (app) => {
  app.use('/posts', postRoutes);
  app.use('/users', userRoutes);
  app.get('/about', (req, res) => {
    res.sendFile(path.resolve('static/about.html'));  // send /static/about.html
  });

  app.use('*', (req, res) => {
    res.redirect('/posts');  // any url will redirect to /posts
  });
};

module.exports = constructorMethod;
