const userRoutes = require('./users');
const productRoutes = require('./products');

const constructorMethod = (app) => {
    app.use('/v1/users', userRoutes);
    app.use('/v1/products', productRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'page not found' });
    });
};

module.exports = constructorMethod;
