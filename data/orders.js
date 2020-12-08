const mongoCollections = require('../config/mongoCollection');
const orders = mongoCollections.orders;
const uuid = require('uuid');

async function createOrder(
    productId,
    sellerId,
    buyerId,
    address,
    price,
    dealNumber,
    productName,
    description,
    imgUrl
) {
    if (!productId || typeof productId !== 'string') {
        throw {
            status: 400,
            errorMessage: 'you should input a string as productId',
        };
    }
    if (!sellerId || typeof sellerId !== 'string') {
        throw {
            status: 400,
            errorMessage: 'you should input a string as sellerId',
        };
    }
    if (!buyerId || typeof buyerId !== 'string') {
        throw {
            status: 400,
            errorMessage: 'you should input a string as buyerId',
        };
    }
    if (!address || typeof address !== 'string') {
        throw {
            status: 400,
            errorMessage: 'you should input a string as address',
        };
    }
    if (!price || typeof price !== 'number') {
        throw {
            status: 400,
            errorMessage: 'you should input a number as the price',
        };
    }
    if (!dealNumber || typeof dealNumber !== 'number') {
        throw {
            status: 400,
            errorMessage: 'you should input a number as the dealNumber',
        };
    }
    if (!description || typeof description !== 'string') {
        throw {
            status: 400,
            errorMessage: 'you should input a string as description',
        };
    }
    if (!imgUrl || typeof imgUrl !== 'string') {
        throw {
            status: 400,
            errorMessage: 'you should input a string as imgUrl',
        };
    }

    let orderCollection = await orders();

    let newOrder = {
        _id: uuid.v4(),
        productId: productId,
        sellerId: sellerId,
        buyerId: buyerId,
        address: address,
        orderTime: new Date(),
        isCompleted: false,
        price: price,
        dealNumber: dealNumber,
        productName: productName,
        description: description,
        imgUrl: imgUrl,
    };

    let insertInfo = await orderCollection.insertOne(newOrder);
    if (insertInfo.insertedCount === 0) {
        throw {
            status: 500,
            errorMessage: 'Something wrong when creating the Order',
        };
    }
    let newId = insertInfo.insertedId;
    return { status: 200, result: (await getOrderById(newId)).result };
}

async function getAllOrder() {
    let orderCollection = await orders();
    let allOrder = await orderCollection.find({}).toArray();
    return { status: 400, result: allOrder };
}

async function getOrderById(id) {
    if (!id || typeof id !== 'string') {
        throw {
            status: 400,
            errorMessage: 'You must provide an order id to search for an order',
        };
    }

    let orderCollection = await orders();

    let orderGoal = await orderCollection.findOne({ _id: id });
    if (orderGoal === null) {
        throw { status: 404, errorMessage: `No order with that ${id}` };
    }
    return { status: 200, result: orderGoal };
}

async function getOrderBySellerId(sellerId) {
    if (!sellerId || typeof sellerId !== 'string') {
        throw {
            status: 400,
            errorMessage:
                'You must provide an seller id to search his selling history',
        };
    }

    let orderCollection = await orders();

    let orderArr = await orderCollection.find({ sellerId: sellerId }).toArray();

    return { status: 200, result: orderArr };
}

async function getOrderByBuyerId(buyerId) {
    if (!buyerId || typeof buyerId !== 'string') {
        throw {
            status: 400,
            errorMessage:
                'You must provide an buyerId to search his buyer history',
        };
    }

    let orderCollection = await orders();

    let orderArr = await orderCollection.find({ buyerId: buyerId }).toArray();
    return { status: 200, result: orderArr };
}

async function setOrderIsCompeleted(id, isCompleted) {
    if (!id || typeof id !== 'string') {
        throw {
            status: 400,
            errorMessage: 'You must provide an order id to search for an order',
        };
    }
    if (!isCompleted || typeof isCompleted !== 'boolean') {
        throw {
            status: 400,
            errorMessage: 'You must set isCompleted true or false',
        };
    }

    let orderCollection = await orders();

    let updateInfo = await orderCollection.updateOne(
        { _id: id },
        {
            $set: {
                isCompleted: isCompleted,
            },
        }
    );

    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
        throw { status: 500, errorMessage: 'Could not set isCompleted' };
    }
    return { status: 200, result: (await getOrderById(id)).result };
}

module.exports = {
    createOrder,
    getAllOrder,
    getOrderById,
    getOrderBySellerId,
    getOrderByBuyerId,
    setOrderIsCompeleted,
};
