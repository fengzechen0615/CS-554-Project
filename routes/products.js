const express = require('express');
const router = express.Router();
const data = require('../data');
const productData = data.products;
const questionData = data.questions;
const userData = data.users;
const xss = require('xss');
const {
    authenticated,
    seller,
    sellerAndAdmin,
} = require('../utility/authMiddleware');
const { uploadProduct } = require('../utility/imageUpload');
const bluebird = require('bluebird');
const redis = require('redis');
const client = redis.createClient();

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

// seller发布一个新product
// anyone
router.post(
    '/',
    authenticated,
    uploadProduct.single('product'),
    async (req, res) => {
        try {
            if (!req.body) {
                res.status(400).json({
                    error: 'You must provide information to create a product',
                });
                return;
            }
            if (!req.file) {
                res.status(400).json({
                    error: 'No product image provided or invalid image type',
                });
                return;
            }
            let sellerId = req.session.AuthCookie._id;
            let sellerName = (await userData.getUserById(sellerId)).result
                .nickname;
            let productName = xss(req.body.productName);
            let description = xss(req.body.description);
            let categoryArr = xss(req.body.categoryArr).split(',');
            let imageUrl = `/images/products/${xss(req.file.filename)}`;
            let stock = Number(xss(req.body.stock));
            let price = Number(xss(req.body.price));

            let newProduct = await productData.createPoduct(
                sellerId,
                sellerName,
                productName,
                description,
                categoryArr,
                imageUrl,
                stock,
                price
            );

            // delete index cache
            client.del('indexPage');
            res.status(newProduct.status).json(newProduct.result);
        } catch (error) {
            res.status(error.status).json({ error: error.errorMessage });
        }
    }
);

// 获取全部商品
router.get('/', authenticated, async (req, res) => {
    let indexCacheExist = await client.existsAsync('indexPage');
    if (indexCacheExist) {
        let indexCache = await client.getAsync('indexPage');
        res.status(200).json(JSON.parse(indexCache).result);
        return;
    }

    try {
        let allProduct = await productData.getAllProduct();
        client.setAsync('indexPage', JSON.stringify(allProduct));
        res.status(allProduct.status).json(allProduct.result);
    } catch (error) {
        res.status(error.status).json({ error: error.errorMessage });
    }
});

// 获取id对应的商品，返回此product
router.get('/:id', authenticated, async (req, res) => {
    let productCacheExist = await client.existsAsync('product' + req.params.id);
    if (productCacheExist) {
        let productCache = await client.getAsync('product' + req.params.id);
        res.status(200).json(JSON.parse(productCache));
        return;
    }

    try {
        let productGoal = await productData.getProductById(xss(req.params.id));
        let QuestionAnswerArr = await questionData.getQuestionsByProductId(
            req.params.id
        );
        let pgResult = productGoal.result;
        let qaResult = QuestionAnswerArr.result;
        // set product cache
        client.set(
            'product' + req.params.id,
            JSON.stringify({ paResult, qaResult })
        );
        res.status(productGoal.status).json({ pgResult, qaResult });
    } catch (error) {
        res.status(error.status).json({ error: error.errorMessage });
    }
});

// 提问，返回这个问题
router.post('/questions', authenticated, async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).json({
                error: 'You must provide information to create a question',
            });
            return;
        }

        let productId = xss(req.body.productId);
        let nickName = xss(req.session.AuthCookie.nickname);
        let question = xss(req.body.question);

        const sellerId = (await productData.getProductById(productId)).result
            .sellerId;

        let questionCreated = await questionData.createQuestion(
            productId,
            sellerId,
            nickName,
            question
        );
        client.del('product' + productId);
        res.status(questionCreated.status).json(questionCreated.result);
    } catch (error) {
        res.status(error.status).json({ error: error.errorMessage });
    }
});

// 回答，返回被回答的问题与答案
// only seller
router.post('/answer/:questionId', authenticated, seller, async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).json({
                error: 'You must provide information to answer a question',
            });
            return;
        }

        let questionId = xss(req.params.questionId);
        let answer = xss(req.body.answer);

        let answerGiven = await questionData.giveAnswer(questionId, answer);
        client.del('product' + answerGiven.result.productId);
        res.status(answerGiven.status).json(answerGiven.result);
    } catch (error) {
        res.status(error.status).json({ error: error.errorMessage });
    }
});

// 修改价格，返回修改后的product
// only seller
router.patch('/:productId', authenticated, seller, async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).json({
                error: 'You must provide information to update a product',
            });
            return;
        }

        let productId = xss(req.params.productId);
        let newPrice = Number(req.body.price);

        let updatedProduct = await productData.updatePrice(productId, newPrice);

        // delete product cache
        client.del('product' + productId);
        // delete index cache
        client.del('indexPage');
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
            // delete product cache
            client.del('product' + productId);
            // delete index Cache
            client.del('indexPage');
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
