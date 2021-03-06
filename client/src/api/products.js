import axios from './axios';

export const createProduct = async (product) =>
    await axios.post('/products', product);

export const getUserProducts = async () => {
    return (await axios.get('/products/user/seller')).data;
};

export const getProducts = async () => {
    return (await axios.get('/products/')).data;
};

export const getProduct = async (id) => {
    return (await axios.get(`/products/${id}`)).data;
};

export const deleteProduct = async (id) => {
    await axios.delete(`/products/${id}`);
};
