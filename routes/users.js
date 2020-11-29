const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const firebase = require('../config/firebase');
const axios = require('axios');
const inputChecker = require('../utility/inputChecker');
const xss = require('xss');
const { authenticated, admin } = require('../utility/authMiddleware');
const { uploadAvatar } = require('../utility/imageUpload');

router.get('/userinfo', authenticated, async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).json({
                error: 'You must provide data to get user information',
            });
            return;
        }
        const authData = {
            idToken: req.body.idToken,
        };
        const url = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${firebase.key}`;

        const firebaseResult = await axios.post(url, authData);
        const user = await userData.getUserByEmail(
            firebaseResult.data.users[0].email
        );
        res.status(user.status).json(user.result);
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
        if (!userInfo) {
            res.status(400).json({
                error: 'You must provide data to create a user',
            });
            return;
        }

        let email = xss(req.body.email);
        let nickname = xss(req.body.nickname);
        let password = xss(req.body.password);

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
        if (!req.body) {
            res.status(400).json({
                error: 'You must provide information to sign in',
            });
            return;
        }

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

        const expiresTime = new Date();
        expiresTime.setHours(expiresTime.getHours() + 1);

        req.session.AuthCookie = result;
        req.session.cookie.expires = expiresTime;
        res.status(user.status).json({ ...result, expiresTime: expiresTime });
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
        if (!req.body) {
            res.status(400).json({
                error: 'You must provide information to update password',
            });
            return;
        }

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
        req.session.AuthCookie.idToken = firebaseResult.data.idToken;
        res.status(firebaseResult.status).json({
            idToken: firebaseResult.data.idToken,
        });
    } catch (error) {
        res.status(error.response.status).json({
            error: error.response.data.error.message,
        });
    }
});

router.patch('/userinfo', authenticated, async (req, res) => {
    /*
     nickname
     phoneNumber
     address
     zipCode
     */
    try {
        let userInfo = req.body;
        if (!req.body) {
            res.status(400).json({
                error: 'You must provide information to update a user',
            });
            return;
        }

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

        const nickname = xss(userInfo.nickname);
        const phoneNumber = xss(userInfo.phoneNumber);
        const address = xss(userInfo.address);
        const zipCode = xss(userInfo.zipCode);

        const updatedUser = await userData.updatedUser(
            req.session.AuthCookie._id,
            nickname,
            phoneNumber,
            address,
            zipCode
        );
        res.status(updatedUser.status).json(updatedUser.result);
    } catch (error) {
        res.status(error.status).json({ error: error.errorMessage });
    }
});

router.put(
    '/userinfo/avatar',
    authenticated,
    uploadAvatar.single('avatar'),
    async (req, res) => {
        try {
            if (!req.file) {
                res.status(400).json({
                    error: 'No avatar image provided or invalid image type',
                });
                return;
            }
            let imageUrl = xss(req.file.filename);

            const updatedAvatar = await userData.updatedAvatar(
                req.session.AuthCookie._id,
                imageUrl
            );
            res.status(updatedAvatar.status).json(updatedAvatar.result);
        } catch (error) {
            res.status(error.status).json({ error: error.errorMessage });
        }
    }
);

router.put('/userstate', authenticated, admin, async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).json({
                error: 'You must provide information to update a user',
            });
            return;
        }

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
