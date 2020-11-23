const userRoutes = require('./users');
const productRoutes = require('./products');
const orderRoutes = require('./orders');

const constructorMethod = (app) => {
    app.use('/v1/users', userRoutes);
    app.use('/v1/products', productRoutes);
    app.use('/v1/orders', orderRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'page not found' });
    });
};

module.exports = constructorMethod;
