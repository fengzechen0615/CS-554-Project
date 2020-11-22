const userRoutes = require('./users');

const constructorMethod = (app) => {
    app.use('/v1/user', userRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'page not found' });
    });
};

module.exports = constructorMethod;
