const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const firebase = require('../config/firebase');
const axios = require('axios');

router.get('/:id', async (req, res) => {
    try {
        const user = await userData.getUserById(req.params.id);
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ error: error });
    }
});

router.post('/signup', async (req, res) => {
    try {
        const authData = {
            email: req.body.email,
            password: req.body.password,
            returnSecureToken: true,
        };

        const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${firebase.key}`;

        const result = await axios.post(url, authData);
        res.status(200).json({ data: result.data.idToken });
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
