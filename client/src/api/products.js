import axios from './axios';

export const createProduct = async (product) =>
    await axios.post('/products', product);

export const uploadProductImage = async (formData) => {
    return await axios.post('/images/product', formData);
};

export const getUserProducts = async () => {
    return (await axios.get('/products/user/seller')).data;
};

export const getProducts = async () => {
    return (await axios.get('/products/')).data;
};
