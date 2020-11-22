const express = require('express');
const router = express.Router();
const data = require('../data');
const productData = data.products;
const questionData = data.questions;
const { authenticated } = require('../utility/authMiddleware');

//seller发布一个新product
router.post('/', authenticated, async (req, res) => {
    try {
        let sellerId = req.body.sellerId;
        let productName = req.body.productName;
        let description = req.body.description;
        let categoryArr = req.body.categoryArr;
        let imageUrl = req.body.imageUrl;
        let stock = Number(req.body.stock);
        let price = Number(req.body.price);

        if (stock <= 0) throw 'stock should > 0';
        if (price <= 0) throw 'price should > 0';

        let newProduct = await productData.createPoduct(
            sellerId,
            productName,
            description,
            categoryArr,
            imageUrl,
            stock,
            price
        );
        res.status(200).json(newProduct);
    } catch (error) {
        res.status(404).json(error);
    }
});

//获取全部商品
router.get('/', authenticated, async (req, res) => {
    try {
        let allProduct = await productData.getAllProduct();
        res.status(200).json(allProduct);
    } catch (error) {
        res.status(404).json(error);
    }
});

//获取id对应的商品，返回此product
router.get('/:id', authenticated, async (req, res) => {
    try {
        let productGoal = await productData.getProductById(req.params.id);
        res.status(200).json(productGoal);
    } catch (error) {
        res.status(404).json(error);
    }
});

//提问，返回这个问题
router.post('/questions', authenticated, async (req, res) => {
    try {
        let productId = req.body.productId;
        let nickName = req.body.nickName;
        let question = req.body.question;

        let questionCreated = await questionData.createQuestion(
            productId,
            nickName,
            question
        );
        res.status(200).json(questionCreated);
    } catch (error) {
        res.status(404).json(error);
    }
});

//回答，返回被回答的问题与答案
router.post('/answer', authenticated, async (req, res) => {
    try {
        let questionId = req.body.questionId;
        let answer = req.body.answer;

        let answerGiven = await questionData.giveAnswer(questionId, answer);
        res.status(200).json(answerGiven);
    } catch (error) {
        res.status(404).json(error);
    }
});

//修改价格，返回修改后的product
router.patch('/:id', authenticated, async (req, res) => {
    try {
        let productId = req.params.id;
        let newPrice = Number(req.body.price);

        let updatedProduct = await productData.updatePrice(productId, newPrice);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(404).json(error);
    }
});

//删除问题，返回被删除的问题
router.delete('/quesitons/:id', authenticated, async (req, res) => {
    try {
        let questionId = req.params.id;

        let questionDeleted = await questionData.deleteOneQuestion(questionId);
        res.status(200).json(questionDeleted);
    } catch (error) {
        res.status(404).json(error);
    }
});

//删除商品（此router会同时删除该商品下所有的question），返回被删除的商品与被删除的问题
router.delete('/:id', authenticated, async (req, res) => {
    try {
        let productId = req.params.id;

        let productDeleted = await productData.deleteProduct(productId);
        let questionsDeleted = await questionData.deleteAllQuestionInProduct(
            productId
        );
        res.status(200).json({ productDeleted, questionsDeleted });
    } catch (error) {
        res.status(404).json(error);
    }
});

//查询此用户作为seller发布的所有product,返回一个数组
router.get('/user/:id', authenticated, async (req, res) => {
    try {
        let sellerId = req.params.id;

        let sellerProducts = await productData.getProductsBySellerId(sellerId);
        res.status(200).json(sellerProducts);
    } catch (error) {
        res.status(404).json(error);
    }
});

module.exports = router;
