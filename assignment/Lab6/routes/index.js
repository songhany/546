const bookRoutes = require('./books');
const reviewRoutes = require('./reviews');

const constructorMethod = (app) => {
    app.use('/books', bookRoutes);
    app.use('/reviews', reviewRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'Route Not Found' });
    });
};

module.exports = constructorMethod;