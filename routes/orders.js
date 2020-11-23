const express = require('express');
const router = express.Router();
const data = require('../data');
// const userData = data.users;
// const productData = data.products;
// const questionData = data.questions;
const orderData = data.orders;
// const firebase = require('../config/firebase');
// const axios = require('axios');
// const inputChecker = require('../utility/inputChecker');

// Create a new Order (default isCompleted is false), return the order information
router.post('/', async (req, res) => {
    try {
        let productId = req.body.productId;
        let sellerId = req.body.sellerId;
        let buyerId = req.body.buyerId;
        let adress = req.body.adress;
        let price = req.body.price;
        let dealNumber = req.body.dealNumber;
        let productName = req.body.productName;
        let discription = req.body.discription;
        let imgUrl = req.body.imgUrl;
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
        res.status(200).json(newOrder);
    } catch (error) {
        res.status(404).json(error);
    }
});

// Set isCompleted status to true (it means the order is completed), return the order information
router.patch('/:id', async (req, res) => {
    try {
        let orderId = req.params.id;
        let orderCreated = await orderData.setOrderIsCompeleted(orderId, true);
        res.status(200).json(orderCreated);
    } catch (error) {
        res.status(404).json(error);
    }
});

// Get a user's all the orders as the buyer
router.get('/buyer/:id', async (req, res) => {
    try {
        let buyerId = req.params.id;
        let buyerOrders = await orderData.getOrderByBuyerId(buyerId);
        res.status(200).json(buyerOrders);
    } catch (error) {
        res.status(404).json(error);
    }
});

// Get a user's all the orders as the seller
router.get('/seller/:id', async (req, res) => {
    try {
        let sellerId = req.params.id;
        let sellerOrders = await orderData.getOrderBySellerId(sellerId);
        res.status(200).json(sellerOrders);
    } catch (error) {
        res.status(404).json(error);
    }
});

module.exports = router;
