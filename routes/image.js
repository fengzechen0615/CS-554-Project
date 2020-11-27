const express = require('express');
const router = express.Router();
const multer = require('multer');
const { authenticated } = require('../utility/authMiddleware');

const getFileExtension = (file) => {
    const index = file.indexOf('/');
    return '.' + file.substring(index + 1);
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'client/public/images/products');
    },
    filename: function (req, file, cb) {
        const extension = getFileExtension(file.mimetype);
        cb(null, `product-${new Date().getTime()}` + extension);
    },
});

const uploadProduct = multer({ storage: storage });

router.post(
    '/product',
    authenticated,
    uploadProduct.single('product'),
    async (req, res) => {
        try {
            console.log(req.file.filename);
            res.json({ file: req.file.filename });
        } catch (error) {
            res.status(error.status).json({ error: error.errorMessage });
        }
    }
);

module.exports = router;
