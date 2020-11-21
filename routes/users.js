const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;

router.get('/:id', async (req, res) => {
    try {
        const user = await userData.getUserById(req.params.id);
        res.json(user);
    } catch (error) {
        res.status(404).json({ error: error });
    }
});

module.exports = router;
