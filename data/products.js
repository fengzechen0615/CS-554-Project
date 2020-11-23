const mongoCollections = require('../config/mongoCollection');
const products = mongoCollections.products;
const uuid = require('uuid');

async function createPoduct(
    sellerId,
    productName,
    description,
    catagoryArr,
    imageUrl,
    stock,
    price
) {
    if (!sellerId || typeof sellerId !== 'string') {
        throw {
            status: 400,
            errorMessage: 'you should input a string as sellerId',
        };
    }
    if (!productName || typeof productName !== 'string') {
        throw {
            status: 400,
            errorMessage: 'you should input a string as productName',
        };
    }
    if (!description || typeof description !== 'string') {
        throw {
            status: 400,
            errorMessage: 'you should input a string as the content',
        };
    }
    if (!catagoryArr || !Array.isArray(catagoryArr)) {
        throw {
            status: 400,
            errorMessage: 'You must provide an array of catagories',
        };
    }
    if (!imageUrl || typeof imageUrl !== 'string') {
        throw {
            status: 400,
            errorMessage: 'you should input a string as imageUrl',
        };
    }
    if (!stock || typeof stock !== 'number') {
        throw {
            status: 400,
            errorMessage: 'You must provide a number as stock',
        };
    }
    if (!price || typeof price !== 'number') {
        throw {
            status: 400,
            errorMessage: 'You must provide a number as price',
        };
    }

    if (stock <= 0) {
        throw { status: 400, errorMessage: 'stock should > 0' };
    }
    if (price <= 0) {
        throw { status: 400, errorMessage: 'price should > 0' };
    }

    let productCollection = await products();

    let newProduct = {
        _id: uuid.v4(),
        sellerId: sellerId,
        productName: productName,
        description: description,
        catagoryArr: catagoryArr,
        imageUrl: imageUrl,
        stock: stock,
        price: price,
        date: new Date(),
    };

    let insertInfo = await productCollection.insertOne(newProduct);
    if (insertInfo.insertedCount === 0) {
        throw {
            status: 400,
            errorMessage: 'Something wrong when creating the product',
        };
    }
    let newId = insertInfo.insertedId;
    return { status: 200, result: (await getProductById(newId)).result };
}

async function getAllProduct() {
    let productCollection = await products();
    let allProducts = await productCollection.find({}).toArray();
    return { status: 200, reuslt: allProducts };
}

async function getProductById(id) {
    if (!id || typeof id !== 'string') {
        throw {
            status: 400,
            errorMessage: 'You must provide an id to search for Product',
        };
    }

    let productCollection = await products();

    let productGoal = await productCollection.findOne({ _id: id });
    if (productGoal === null) {
        throw { status: 404, errorMessage: `No Product with that ${id}` };
    }
    return { status: 200, result: productGoal };
}

async function getProductsBySellerId(sellerId) {
    if (!sellerId || typeof sellerId !== 'string') {
        throw {
            error: 400,
            errorMessage:
                'You must provide an sellerId to search for his Products',
        };
    }

    let productCollection = await products();

    let productArr = await productCollection
        .find({ sellerId: sellerId })
        .toArray();
    return { status: 200, reuslt: productArr };
}

async function updatePrice(id, price) {
    if (!id || typeof id !== 'string')
        throw {
            status: 400,
            errorMessage: 'You must provide an id to uodate Product',
        };
    if (!price || typeof price !== 'number') {
        throw {
            status: 400,
            errorMessage: 'You must provide a number as price',
        };
    }
    let productCollection = await products();
    let updateInfo = await productCollection.updateOne(
        { _id: id },
        {
            $set: {
                price: price,
            },
        }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
        throw { error: 500, errorMessage: 'Could not update the price' };
    }
    return { status: 200, result: (await getProductById(id)).result };
}

async function updateStock(id, dealNumber) {
    if (!id || typeof id !== 'string') {
        throw {
            status: 400,
            errorMessage: 'You must provide an id to uodate Product',
        };
    }
    if (!dealNumber || typeof dealNumber !== 'number') {
        throw {
            status: 400,
            errorMessage: 'You must provide a number as dealNumber',
        };
    }

    let currentProduct = (await getProductById(id)).result;
    let currentStock = currentProduct.stock;
    if (currentStock - dealNumber < 0) {
        throw { status: 500, errorMessage: 'dealNumber > currentStock!' };
    }

    let productCollection = await products();

    let updateInfo = await productCollection.updateOne(
        { _id: id },
        {
            $set: {
                stock: currentStock - dealNumber,
            },
        }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
        throw { status: 500, errorMessage: 'Could not update the stock' };
    }
    return { status: 200, result: (await getProductById(id)).reuslt };
}

async function deleteProduct(id) {
    if (!id || typeof id !== 'string') {
        throw {
            status: 400,
            errorMessage: 'You must provide an id to uodate Product',
        };
    }

    let productCollection = await products();

    let productToDelete = (await getProductById(id)).result;
    let deletionInfo = await productCollection.removeOne({ _id: id });
    if (deletionInfo.deletedCount === 0) {
        throw {
            status: 500,
            errorMessage: `Could not delete the product with this ${id}`,
        };
    }
    return { status: 200, result: productToDelete };
}

module.exports = {
    createPoduct,
    getAllProduct,
    getProductById,
    updatePrice,
    updateStock,
    deleteProduct,
    getProductsBySellerId,
};
