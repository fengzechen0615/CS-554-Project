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
    if (!sellerId || typeof sellerId !== 'string')
        throw 'you should input a string as sellerId';
    if (!productName || typeof productName !== 'string')
        throw 'you should input a string as productName';
    if (!description || typeof description !== 'string')
        throw 'you should input a string as the content';
    if (!catagoryArr || !Array.isArray(catagoryArr))
        throw 'You must provide an array of catagories';
    if (!imageUrl || typeof imageUrl !== 'string')
        throw 'you should input a string as imageUrl';
    if (!stock || typeof stock !== 'number')
        throw 'You must provide a number as stock';
    if (!price || typeof price !== 'number')
        throw 'You must provide a number as price';
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
    if (insertInfo.insertedCount === 0)
        throw 'Something wrong when creating the product';
    let newId = insertInfo.insertedId;
    let productCreated = await getProductById(newId);
    return productCreated;
}

async function getAllProduct() {
    let productCollection = await products();
    let allProducts = await productCollection.find({}).toArray();
    return allProducts;
}

async function getProductById(id) {
    if (!id || typeof id !== 'string')
        throw 'You must provide an id to search for Product';
    let productCollection = await products();
    // let objId = ObjectId.createFromHexString(id);
    let productGoal = await productCollection.findOne({ _id: id });
    if (productGoal === null) throw 'No Product with that id';
    return productGoal;
}

async function updatePrice(id, price) {
    if (!id || typeof id !== 'string')
        throw 'You must provide an id to uodate Product';
    if (!price || typeof price !== 'number')
        throw 'You must provide a number as price';
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
        throw 'Could not update the price';
    }
    return await getProductById(id);
}

async function updateStock(id, dealNumber) {
    if (!id || typeof id !== 'string')
        throw 'You must provide an id to uodate Product';
    if (!dealNumber || typeof dealNumber !== 'number')
        //dealAmout指交易量
        throw 'You must provide a number as dealNumber';
    let currentProduct = getProductById(id);
    let currentStock = currentProduct.stock;
    if (currentStock - dealNumber < 0) throw 'dealNumber > currentStock!';
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
        throw 'Could not update the stock';
    }
    return await getProductById(id);
}

async function deleteProduct(id) {
    if (!id || typeof id !== 'string')
        throw 'You must provide an id to uodate Product';
    let productCollection = await products();
    let productToDelete = await getProductById(id);
    let deletionInfo = await productCollection.removeOne({ _id: id });
    if (deletionInfo.deletedCount === 0)
        throw `Could not delete the product with this id`;
    return productToDelete;
}

module.exports = {
    createPoduct,
    getAllProduct,
    getProductById,
    updatePrice,
    updateStock,
    deleteProduct,
};
