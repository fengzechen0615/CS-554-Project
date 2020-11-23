const data = require('../data');
const productData = data.products;
const xss = require('xss');

function authenticated(req, res, next) {
    if (req.session.AuthCookie) {
        next();
    } else {
        res.status(401).json({ error: 'Please Login' });
    }
}

function admin(req, res, next) {
    if (req.session.AuthCookie.isAdmin) {
        next();
    } else {
        res.status(401).json({ error: 'Request Fobidden' });
    }
}

async function seller(req, res, next) {
    try {
        const sellerId = (await productData.getProductById(xss(req.params.id)))
            .result.sellerId;
        if (sellerId === req.session.AuthCookie._id) {
            next();
        } else {
            res.status(401).json({ error: 'Request Fobidden' });
        }
    } catch (error) {
        res.status(error.status).json({ error: error.errorMessage });
    }
}

module.exports = {
    authenticated: authenticated,
    admin: admin,
    seller: seller,
};
