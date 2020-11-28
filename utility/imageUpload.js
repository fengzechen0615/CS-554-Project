const express = require('express');
const multer = require('multer');
// const { authenticated } = require('../utility/authMiddleware');

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

module.exports = { uploadProduct: uploadProduct };
