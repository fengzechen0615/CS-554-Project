const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const firebase = require('../config/firebase');
const axios = require('axios');
const inputChecker = require('../utility/inputChecker');
const xss = require('xss');
const { authenticated, admin } = require('../utility/authMiddleware');

router.get('/userinfo/:id', authenticated, async (req, res) => {
    try {
        const user = await userData.getUserById(req.params.id);
        res.status(user.status).json(user.reuslt);
    } catch (error) {
        res.status(error.status).json({ error: error.errorMessage });
    }
});

router.get('/users', authenticated, admin, async (req, res) => {
    try {
        const users = await userData.getAllUsers();
        res.status(users.status).json(users.result);
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
        if (!user.result.state) {
            res.status(403).json({ error: 'Your account has been locked' });
            return;
        }
        const result = {
            ...user.result,
            idToken: firebaseResult.data.idToken,
        };
        req.session.AuthCookie = result;
        res.status(user.status).json(result);
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

router.post('/password', authenticated, async (req, res) => {
    try {
        let idToken = xss(req.body.idToken);
        let password = xss(req.body.password);

        if (!idToken) {
            res.status(400).json({
                error: 'No idToken provided',
            });
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
            idToken: idToken,
            password: password,
            returnSecureToken: true,
        };
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${firebase.key}`;

        const firebaseResult = await axios.post(url, authData);
        res.status(firebaseResult.status).json({
            idToken: firebaseResult.data.idToken,
        });
    } catch (error) {
        console.log(error);
        res.status(error.response.status).json({
            error: error.response.data.error.message,
        });
    }
});

router.patch('/userinfo/:id', authenticated, async (req, res) => {
    /*
     nickname
     phoneNumber
     address
     zipCode
     */
    try {
        let userInfo = req.body;

        if (userInfo.length) {
            res.status(400).json({
                error: 'You must provide data to update a user information',
            });
            return;
        }

        // check nickname field
        if (userInfo.nickname) {
            if (!inputChecker.checkNickname(userInfo.nickname)) {
                res.status(400).json({ error: 'Not valid nickname' });
                return;
            }
        }

        // check phoneNumber field
        if (userInfo.phoneNumber) {
            if (!inputChecker.checkPhoneNumber(userInfo.phoneNumber)) {
                res.status(400).json({ error: 'Not valid phone number' });
                return;
            }
        }

        // check address field
        if (userInfo.address) {
            if (!inputChecker.checkAddress(userInfo.address)) {
                res.status(400).json({ error: 'Not valid address' });
                return;
            }
        }

        // check zipCode field
        if (userInfo.zipCode) {
            if (!inputChecker.checkZipCode(userInfo.zipCode)) {
                res.status(400).json({ error: 'Not valid zip code' });
                return;
            }
        }

        const user = await userData.getUserById(req.params.id);

        const nickname = userInfo.nickname
            ? xss(userInfo.nickname)
            : user.reuslt.nickname;
        const phoneNumber = userInfo.phoneNumber
            ? xss(userInfo.phoneNumber)
            : user.reuslt.phoneNumber;
        const address = userInfo.address
            ? xss(userInfo.address)
            : user.reuslt.address;
        const zipCode = userInfo.zipCode
            ? xss(userInfo.zipCode)
            : user.reuslt.zipCode;

        const updatedUser = await userData.updatedUser(
            xss(req.params.id),
            nickname,
            phoneNumber,
            address,
            zipCode
        );
        res.status(updatedUser.status).json(updatedUser.result);
    } catch (error) {
        console.log(error);
        res.status(error.status).json({ error: error.errorMessage });
    }
});

router.put('/userstate', admin, async (req, res) => {
    try {
        let userId = xss(req.body.userId);

        if (!userId) {
            res.status(400).json({
                error: 'No userId provided',
            });
            return;
        }

        const updatedUser = await userData.updatedUserState(userId);
        res.status(updatedUser.status).json(updatedUser.result);
    } catch (error) {
        res.status(error.status).json({ error: error.errorMessage });
    }
});

router.get('/logout', authenticated, async (req, res) => {
    req.session.AuthCookie = undefined;
    res.status(200).json({ result: 'Logout successful' });
});

module.exports = router;
