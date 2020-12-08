import axios from './axios';

export const getUserPurchasedProducts = async () => {
    return (await axios.get('/orders/buyer')).data;
};

export const getUserSoldProducts = async () => {
    return (await axios.get('/orders/seller')).data;
};
