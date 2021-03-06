const data = require('../data');
const productData = data.products;
const questionData = data.questions;
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
    let sellerId = await getSellerId(req, res);

    if (sellerId === req.session.AuthCookie._id) {
        next();
    } else {
        res.status(401).json({ error: 'Request Fobidden' });
    }
}

async function sellerAndAdmin(req, res, next) {
    let sellerId = await getSellerId(req, res);

    if (
        sellerId === req.session.AuthCookie._id ||
        req.session.AuthCookie.isAdmin
    ) {
        next();
    } else {
        res.status(401).json({ error: 'Request Fobidden' });
    }
}

async function getSellerId(req, res) {
    try {
        let sellerId = null;
        if (req.params.productId) {
            sellerId = (
                await productData.getProductById(xss(req.params.productId))
            ).result.sellerId;
        } else if (req.params.questionId) {
            sellerId = (
                await questionData.getQuestionById(xss(req.params.questionId))
            ).result.sellerId;
        }
        return sellerId;
    } catch (error) {
        res.status(error.status).json({ error: error.errorMessage });
    }
}

module.exports = {
    authenticated: authenticated,
    admin: admin,
    seller: seller,
    sellerAndAdmin: sellerAndAdmin,
};
