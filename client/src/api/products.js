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

export const uploadProductImage = async (formData) => {
    return await axios.post('/images/product', formData);
};

export const getUserProducts = async () => {
    return (await axios.get('/products/user/seller')).data;
};
