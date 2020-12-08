import axios from './axios';

export const postQuestion = async (question, productId) =>
    await axios.post('/products/questions', {
        productId,
        question,
    });
