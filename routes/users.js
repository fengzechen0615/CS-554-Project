const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const firebase = require('../config/firebase');
const axios = require('axios');
const inputChecker = require('../utility/inputChecker');
const xss = require('xss');

router.get('/:id', async (req, res) => {
    try {
        const user = await userData.getUserById(req.params.id);
        res.status(user.status).json(user.reuslt);
    } catch (error) {
        res.status(error.status).json({ error: error.errorMessage });
    }
});

router.post('/signup', async (req, res) => {
    try {
        let userInfo = req.body;
        let email = xss(req.body.email);
        let nickname = xss(req.body.nickname);
        let password = xss(req.body.password);

        if (!userInfo) {
            res.status(400).json({
                error: 'You must provide data to create a user',
            });
            return;
        }

        if (!nickname) {
            res.status(400).json({
                error: 'No nickname provided',
            });
            return;
        }

        // check nickname
        if (!inputChecker.checkNickname(nickname)) {
            res.status(400).json({
                error:
                    'Nickname must 3-16 characters, only contains lower case word, upper case word or number',
            });
            return;
        }

        if (!email) {
            res.status(400).json({
                error: 'No email address provided',
            });
            return;
        }

        // check email
        if (!inputChecker.checkEmail(email)) {
            res.status(400).json({ error: 'Not valid e-mail address' });
            return;
        }

        if (!password) {
            res.status(400).json({
                error: 'No password provided',
            });
            return;
        }

        // check password
        if (!inputChecker.checkPassword(password)) {
            res.status(400).json({
                error:
                    'Password must 8-16 characters. Only should contain lower case word, upper case word or number',
            });
            return;
        }

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebase.key}`;

        await axios.post(url, authData);

        const newUser = await userData.addUser(nickname, email);
        res.status(newUser.status).json(newUser.result);
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({
                error: error.response.data.error.message,
            });
        } else {
            res.status(error.status).json({ error: error.errorMessage });
        }
    }
});

router.post('/signin', async (req, res) => {
    try {
        let email = xss(req.body.email);
        let password = xss(req.body.password);

        if (!email) {
            res.status(400).json({
                error: 'No email provided',
            });
            return;
        }

        if (!password) {
            res.status(400).json({
                error: 'No password provided',
            });
            return;
        }

        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebase.key}`;

        const firebaseResult = await axios.post(url, authData);

        const user = await userData.getUserByEmail(email);
        res.status(user.status).json({
            ...user.result,
            idToken: firebaseResult.data.idToken,
        });
    } catch (error) {
        if (error.response) {
            res.status(error.response.status).json({
                error: error.response.data.error.message,
            });
        } else {
            res.status(error.status).json({ error: error.errorMessage });
        }
    }
});

module.exports = router;
