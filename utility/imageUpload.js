const multer = require('multer');
// const inputChecker = require('../utility/inputChecker');

const getFileExtension = (file) => {
    const index = file.indexOf('/');
    return '.' + file.substring(index + 1);
};

const productStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'client/public/images/products');
    },
    filename: function (req, file, cb) {
        const extension = getFileExtension(file.mimetype);
        cb(null, `product-${new Date().getTime()}` + extension);
    },
});

const avatarStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'client/public/images/avatars');
    },
    filename: function (req, file, cb) {
        const extension = getFileExtension(file.mimetype);
        cb(null, `avatar-${new Date().getTime()}` + extension);
    },
});

const uploadProduct = multer({ storage: productStorage });
const uploadAvatar = multer({ storage: avatarStorage });

module.exports = { uploadProduct: uploadProduct, uploadAvatar: uploadAvatar };
