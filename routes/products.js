const express = require('express');
const router = express.Router();
const data = require('../data');
const productData = data.products;
const questionData = data.questions;
const xss = require('xss');
const {
    authenticated,
    seller,
    sellerAndAdmin,
} = require('../utility/authMiddleware');

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
        let productId = xss(req.body.productId);
        let nickName = xss(req.session.AuthCookie.nickname);
        let question = xss(req.body.question);

        const sellerId = (await productData.getProductById(productId)).result
            .sellerId;
        console.log(sellerId);
        let questionCreated = await questionData.createQuestion(
            productId,
            sellerId,
            nickName,
            question
        );
        res.status(questionCreated.status).json(questionCreated.result);
    } catch (error) {
        res.status(error.status).json({ error: error.errorMessage });
    }
});

// 回答，返回被回答的问题与答案
// only seller
router.post('/answer/:questionId', authenticated, seller, async (req, res) => {
    try {
        let questionId = xss(req.params.questionId);
        let answer = xss(req.body.answer);

        let answerGiven = await questionData.giveAnswer(questionId, answer);
        res.status(answerGiven.status).json(answerGiven.result);
    } catch (error) {
        res.status(error.status).json({ error: error.errorMessage });
    }
});

// 修改价格，返回修改后的product
// only seller
router.patch('/:productId', authenticated, seller, async (req, res) => {
    try {
        let productId = xss(req.params.productId);
        let newPrice = Number(req.body.price);

        let updatedProduct = await productData.updatePrice(productId, newPrice);
        res.status(updatedProduct.status).json(updatedProduct.result);
    } catch (error) {
        res.status(error.status).json({ error: error.errorMessage });
    }
});

// 删除问题，返回被删除的问题
// seller and admin
router.delete(
    '/questions/:questionId',
    authenticated,
    sellerAndAdmin,
    async (req, res) => {
        try {
            let questionId = xss(req.params.questionId);

            let questionDeleted = await questionData.deleteOneQuestion(
                questionId
            );
            res.status(questionDeleted.status).json(questionDeleted.result);
        } catch (error) {
            res.status(error.status).json({ error: error.errorMessage });
        }
    }
);

// 删除商品（此router会同时删除该商品下所有的question），返回被删除的商品与被删除的问题
// seller and admin
router.delete(
    '/:productId',
    authenticated,
    sellerAndAdmin,
    async (req, res) => {
        try {
            let productId = xss(req.params.productId);

            let productDeleted = await productData.deleteProduct(productId);
            let questionsDeleted = await questionData.deleteAllQuestionInProduct(
                productId
            );
            res.status(productDeleted.status).json({
                products: productDeleted.result,
                questions: questionsDeleted.result,
            });
        } catch (error) {
            res.status(error.status).json({ error: error.errorMessage });
        }
    }
);

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
