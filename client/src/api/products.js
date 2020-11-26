import axios from './axios';

export const createProduct = async (
    sellId,
    productName,
    description,
    categoryArr,
    imageUrl,
    stock,
    price
) =>
    await axios.post('/products', {
        sellId,
        productName,
        description,
        categoryArr,
        imageUrl,
        stock,
        price,
    });
