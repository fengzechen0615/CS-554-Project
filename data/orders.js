const mongoCollections = require('../config/mongoCollection');
const orders = mongoCollections.orders;
const uuid = require('uuid');

async function createOrder(
    productId,
    sellerId,
    buyerId,
    adress,
    price,
    dealNumber,
    productName,
    description,
    imgUrl
) {
    if (!productId || typeof productId !== 'string')
        throw 'you should input a string as productId';
    if (!sellerId || typeof sellerId !== 'string')
        throw 'you should input a string as sellerId';
    if (!buyerId || typeof buyerId !== 'string')
        throw 'you should input a string as buyerId';
    if (!adress || typeof adress !== 'string')
        throw 'you should input a string as adress';
    if (!price || typeof price !== 'number')
        throw 'you should input a numer as the price';
    if (!dealNumber || typeof dealNumber !== 'number')
        throw 'you should input a numer as the dealNumber';
    if (!description || typeof description !== 'string')
        throw 'you should input a string as description';
    if (!imgUrl || typeof imgUrl !== 'string')
        throw 'you should input a string as imgUrl';
    let orderCollection = await orders();
    let newOrder = {
        _id: uuid.v4(),
        productId: productId,
        sellerId: sellerId,
        buyerId: buyerId,
        adress: adress,
        orderTime: new Date(),
        isCompleted: false,
        price: price,
        dealNumber: dealNumber,
        productName:productName,
        description: description,
        imgUrl: imgUrl,
    };
    let insertInfo = await orderCollection.insertOne(newOrder);
    if (insertInfo.insertedCount === 0)
        throw 'Something wrong when creating the Order';
    let newId = insertInfo.insertedId;
    let orderCreated = await getOrderById(newId);
    return orderCreated;
}

async function getAllOrder() {
    let orderCollection = await orders();
    let allOrder = await orderCollection.find({}).toArray();
    return allOrder;
}

async function getOrderById(id) {
    if (!id || typeof id !== 'string')
        throw 'You must provide an order id to search for an order';
    let orderCollection = await orders();
    let orderGoal = await orderCollection.findOne({ _id: id });
    if (orderGoal === null) throw 'No order with that id';
    return orderGoal;
}

async function getOrderBySellerId(sellerId) {
    if (!sellerId || typeof sellerId !== 'string')
        throw 'You must provide an seller id to search his selling history';
    let orderCollection = await orders();
    let orderArr = await orderCollection.find({ sellerId: sellerId }).toArray();
    return orderArr;
}

async function getOrderByBuyerId(buyerId) {
    if (!buyerId || typeof buyerId !== 'string')
        throw 'You must provide an buyerId to search his buyer history';
    let orderCollection = await orders();
    let orderArr = await orderCollection.find({ buyerId: buyerId }).toArray();
    return orderArr;
}

async function setOrderIsCompeleted(id,isCompleted) {
    if (!id || typeof id !== 'string')
        throw 'You must provide an order id to search for an order';
    if (!isCompleted || typeof isCompleted !== 'boolean')
        throw 'You must set isCompleted true or false';
    let orderCollection = await orders();
    let updateInfo = await orderCollection.updateOne(
        { _id: id },
        {
            $set: {
                isCompleted:isCompleted
            },
        }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
        throw 'Could not set isCompleted';
    }
    return await getOrderById(id);
}

module.exports = {
    createOrder,
    getAllOrder,
    getOrderById,
    getOrderBySellerId,
    getOrderByBuyerId,
    setOrderIsCompeleted
};

