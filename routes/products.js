const express = require('express');
const router = express.Router();
const data = require('../data');
const productData = data.products;
const questionData = data.questions;
const xss = require('xss');
const { authenticated, seller, admin } = require('../utility/authMiddleware');

// seller发布一个新product
// anyone
router.post('/', authenticated, async (req, res) => {
    try {
        let sellerId = req.session.AuthCookie._id;
        let productName = xss(req.body.productName);
        let description = xss(req.body.description);
        let categoryArr = req.body.categoryArr.map((item) => xss(item));
        let imageUrl = xss(req.body.imageUrl);
        let stock = Number(xss(req.body.stock));
        let price = Number(xss(req.body.price));

        let newProduct = await productData.createPoduct(
            sellerId,
            productName,
            description,
            categoryArr,
            imageUrl,
            stock,
            price
        );
        res.status(newProduct.status).json(newProduct.result);
    } catch (error) {
        res.status(error.status).json({ error: error.errorMessage });
    }
});

// 获取全部商品
router.get('/', authenticated, async (req, res) => {
    try {
        let allProduct = await productData.getAllProduct();
        res.status(allProduct.status).json(allProduct.result);
    } catch (error) {
        res.status(error.status).json({ error: error.errorMessage });
    }
});

// 获取id对应的商品，返回此product
router.get('/:id', authenticated, async (req, res) => {
    try {
        let productGoal = await productData.getProductById(xss(req.params.id));
        res.status(productGoal.status).json(productGoal.result);
    } catch (error) {
        res.status(error.status).json({ error: error.errorMessage });
    }
});

// 提问，返回这个问题
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

// 回答，返回被回答的问题与答案
// only seller
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

// 修改价格，返回修改后的product
// only seller
router.patch('/:id', authenticated, seller, async (req, res) => {
    try {
        let productId = xss(req.params.id);
        let newPrice = Number(req.body.price);

        let updatedProduct = await productData.updatePrice(productId, newPrice);
        res.status(updatedProduct.status).json(updatedProduct.result);
    } catch (error) {
        res.status(error.status).json({ error: error.errorMessage });
    }
});

// 删除问题，返回被删除的问题
// seller and admin
router.delete('/quesitons/:id', authenticated, async (req, res) => {
    try {
        let questionId = req.params.id;

        let questionDeleted = await questionData.deleteOneQuestion(questionId);
        res.status(200).json(questionDeleted);
    } catch (error) {
        res.status(404).json(error);
    }
});

// 删除商品（此router会同时删除该商品下所有的question），返回被删除的商品与被删除的问题
// seller and admin
router.delete('/:id', authenticated, async (req, res) => {
    try {
        let productId = req.params.id;

        let productDeleted = await productData.deleteProduct(productId);
        let questionsDeleted = await questionData.deleteAllQuestionInProduct(
            productId
        );
        res.status(productDeleted.status).json({
            products: productDeleted.result,
            questions: questionsDeleted,
        });
    } catch (error) {
        res.status(404).json(error);
    }
});

// 查询此用户作为seller发布的所有product,返回一个数组
// only seller
router.get('/user/seller', authenticated, async (req, res) => {
    try {
        let sellerProducts = await productData.getProductsBySellerId(
            req.session.AuthCookie._id
        );
        res.status(sellerProducts.status).json(sellerProducts.result);
    } catch (error) {
        res.status(error.status).json({ error: error.errorMessage });
    }
});

module.exports = router;
