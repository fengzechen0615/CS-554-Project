const express = require('express');
const router = express.Router();
const data = require('../data');
const orderData = data.orders;
const productData = data.products;
const xss = require('xss');
const { authenticated } = require('../utility/authMiddleware');
const bluebird = require('bluebird');
const redis = require('redis');
const client = redis.createClient();
bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

// Create a new Order (default isCompleted is false), return the order information
router.post('/', authenticated, async (req, res) => {
    console.log(123);
    try {
        if (!req.body) {
            res.status(400).json({
                error: 'You must provide data to create an order',
            });
            return;
        }

        let productId = xss(req.body.productId);
        let sellerId = xss(req.body.sellerId);
        let buyerId = xss(req.session.AuthCookie._id);
        let address = xss(req.body.address);
        let price = Number(xss(req.body.price));
        let dealNumber = Number(xss(req.body.dealNumber));
        let productName = xss(req.body.productName);
        let description = xss(req.body.description);
        let imgUrl = xss(req.body.imgUrl);

        productToBuy = await productData.getProductById(productId);
        if (productToBuy.result.stock < dealNumber) {
            res.status(400).json({
                error: 'dealNumber > stock!',
            });
            return;
        }

        await productData.updateStock(productId, dealNumber); //stock - dealNumber

        let newOrder = await orderData.createOrder(
            productId,
            sellerId,
            buyerId,
            address,
            price,
            dealNumber,
            productName,
            description,
            imgUrl
        );
        // delete product cache
        client.delAsync('product' + productId);
        // delete index Cache
        client.delAsync('indexPage');
        res.status(newOrder.status).json(newOrder.result);
    } catch (error) {
        // console.log(error);
        res.status(error.status).json({ error: error.errorMessage });
    }
});

// Set isCompleted status to true (it means the order is completed), return the order information
router.patch('/:id', authenticated, async (req, res) => {
    try {
        let orderId = xss(req.params.id);

        let orderCreated = await orderData.setOrderIsCompeleted(orderId, true);
        res.status(orderCreated.status).json(orderCreated.result);
    } catch (error) {
        res.status(error.status).json({ error: error.errorMessage });
    }
});

// Get a user's all the orders as the buyer
router.get('/buyer', authenticated, async (req, res) => {
    try {
        let buyerId = xss(req.session.AuthCookie._id);

        let buyerOrders = await orderData.getOrderByBuyerId(buyerId);
        res.status(buyerOrders.status).json(buyerOrders.result);
    } catch (error) {
        res.status(error.status).json({ error: error.errorMessage });
    }
});

// Get a user's all the orders as the seller
router.get('/seller', authenticated, async (req, res) => {
    try {
        let sellerId = xss(req.session.AuthCookie._id);

        let sellerOrders = await orderData.getOrderBySellerId(sellerId);
        res.status(sellerOrders.status).json(sellerOrders.result);
    } catch (error) {
        res.status(error.status).json({ error: error.errorMessage });
    }
});

module.exports = router;
