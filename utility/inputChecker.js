/*
userName: 3-16 characters, only contains lower case word, upper case word & number
email: basic email format
password:
    8-16 characters
    Should only contains lower case word, upper case word & number
*/
let exportedMethods = {
    checkNickname(userName) {
        const re = /^[0-9a-zA-Z]*$/;
        if (!re.test(userName)) {
            return false;
        }
        if (userName.length > 16 || userName.length < 3) {
            return false;
        }
        return true;
    },

    checkEmail(email) {
        const re = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        if (!re.test(email)) {
            return false;
        }
        return true;
    },

    checkPassword(password) {
        const re = /^[0-9a-zA-Z]*$/;
        if (!re.test(password)) {
            return false;
        }
        if (password.length > 16 || password.length < 8) {
            return false;
        }
        return true;
    },

    checkZipCode(zipCode) {
        const re = /^\d{5}$/;
        if (!re.test(zipCode)) {
            return false;
        }
        return true;
    },

    checkPhoneNumber(phoneNumber) {
        const re = /^\d{10}$/;
        if (!re.test(phoneNumber)) {
            return false;
        }
        return true;
    },

    checkAddress(address) {
        return typeof address === 'string';
    },

    checkImage(image) {
        const re = /\.(png|jpe?g|gif|svg|webp)(\?.*)?$/;
        if (!re.test(image)) {
            return false;
        }
        return true;
    },
};

module.exports = exportedMethods;
