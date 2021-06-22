const privateRoutes = require('./private');
const userRoutes = require('./users');

const constructorMethod = (app) => {
  app.use('/', userRoutes);
  app.use('/private', privateRoutes);

  app.use('*', (req, res) => {
    res.redirect('/')
  });
};

module.exports = constructorMethod;