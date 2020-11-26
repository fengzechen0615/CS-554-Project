import axios from './axios';

export const getUserInfo = async () => await axios.get('/users/userinfo');

export const getAllUsers = async () => await axios.get('/users/users');

export const logout = async () => await axios.get('/users/logout');

export const signIn = async (email, password) =>
    await axios.post('/users/signin', {
        email,
        password,
    });

export const signUp = async (nickname, email, password) =>
    await axios.post('users/signup', {
        email,
        password,
        nickname,
    });

export const changePassword = async (idToken, newPassword) =>
    await axios.post('users/password', {
        idToken,
        newPassword,
    });
