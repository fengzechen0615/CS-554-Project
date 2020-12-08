import axios from './axios';

export const postQuestion = async (question, productId) =>
    await axios.post('/products/questions', {
        productId,
        question,
    });

export const buyProduct = async (
    productId,
    sellerId,
    buyerId,
    address,
    price,
    dealNumber,
    productName,
    description,
    imgUrl
) =>
    await axios.post('/orders', {
        productId,
        sellerId,
        buyerId,
        address,
        price,
        dealNumber,
        productName,
        description,
        imgUrl,
    });
