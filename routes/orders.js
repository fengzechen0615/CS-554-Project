const express = require('express');
const router = express.Router();
const data = require('../data');
const orderData = data.orders;
const xss = require('xss');
const {
    authenticated,
    seller,
    sellerAndAdmin,
} = require('../utility/authMiddleware');

// Create a new Order (default isCompleted is false), return the order information
router.post('/', authenticated, async (req, res) => {
    try {
        let productId = xss(req.body.productId);
        let sellerId = xss(req.body.sellerId);
        let buyerId = xss(req.body.buyerId);
        let adress = xss(req.body.adress);
        let price = xss(req.body.price);
        let dealNumber = xss(req.body.dealNumber);
        let productName = xss(req.body.productName);
        let discription = xss(req.body.discription);
        let imgUrl = xss(req.body.imgUrl);

        let newOrder = await orderData.createOrder(
            productId,
            sellerId,
            buyerId,
            adress,
            price,
            dealNumber,
            productName,
            discription,
            imgUrl
        );
        res.status(newOrder.status).json(newOrder.result);
    } catch (error) {
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
router.get('/buyer/:id', authenticated, async (req, res) => {
    try {
        let buyerId = xss(req.params.id);

        let buyerOrders = await orderData.getOrderByBuyerId(buyerId);
        res.status(buyerOrders.status).json(buyerOrders.result);
    } catch (error) {
        res.status(error.status).json({ error: error.errorMessage });
    }
});

// Get a user's all the orders as the seller
router.get('/seller/:id', authenticated, async (req, res) => {
    try {
        let sellerId = xss(req.params.id);

        let sellerOrders = await orderData.getOrderBySellerId(sellerId);
        res.status(sellerOrders.status).json(sellerOrders.result);
    } catch (error) {
        res.status(error.status).json({ error: error.errorMessage });
    }
});

module.exports = router;
