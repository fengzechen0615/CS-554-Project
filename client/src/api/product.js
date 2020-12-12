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

export const answerQuestion = async (questionId, answer) => {
    return await axios.post(`/products/answer/${questionId}`, {
        answer,
    });
};

export const updateProduct = async (
    productId,
    productName,
    description,
    stock,
    price
) => {
    return await axios.patch(`/products/${productId}`, {
        productName,
        description,
        stock,
        price,
    });
};
