const userRoutes = require('./users');
const productRoutes = require('./products');
const orderRoutes = require('./orders');
const imageRoutes = require('./image');

const constructorMethod = (app) => {
    app.use('/v1/users', userRoutes);
    app.use('/v1/products', productRoutes);
    app.use('/v1/orders', orderRoutes);
    app.use('/v1/images', imageRoutes);

    app.use('*', (req, res) => {
        res.status(404).json({ error: 'page not found' });
    });
};

module.exports = constructorMethod;
