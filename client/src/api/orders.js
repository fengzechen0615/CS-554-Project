import axios from './axios';

export const getUserPurchasedProducts = async () => {
    return (await axios.get('/orders/buyer')).data;
};
