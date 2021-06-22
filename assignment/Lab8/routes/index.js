const showRoutes = require('./shows');
const searchRoutes = require('./search');


const constructorMethod = (app) => {
  app.use('/shows', showRoutes);
  app.use('/search', searchRoutes);
  app.use('/', searchRoutes);

  app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route Not Found' });  // All other URLS should return a 404
  });
};

module.exports = constructorMethod;
