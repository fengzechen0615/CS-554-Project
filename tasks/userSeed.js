const axios = require('axios');

const main = async () => {
    // Create admin
    try {
        await axios.post('http://localhost:3000/v1/users/admin/signup', {
            nickname: 'Admin',
            email: 'admin@undefined.com',
            password: 'Qq123456',
        });
    } catch (error) {
        console.log(error);
    }

    // Create seller 1
    await axios.post('http://localhost:3000/v1/users/signup', {
        nickname: 'Zechen',
        email: 'zechenfeng@gmail.com',
        password: 'zf123456',
    });

    // Create seller 2
    await axios.post('http://localhost:3000/v1/users/signup', {
        nickname: 'Mooooo',
        email: 'mosun@gmail.com',
        password: 'ms123456',
    });

    // Create seller 3
    await axios.post('http://localhost:3000/v1/users/signup', {
        nickname: 'Yuqiii',
        email: 'yuqiwang@gmail.com',
        password: 'yw123456',
    });

    // Create seller 4
    await axios.post('http://localhost:3000/v1/users/signup', {
        nickname: 'Dongling',
        email: 'donglingchen@gmail.com',
        password: 'dc123456',
    });

    // Create Normal user
    await axios.post('http://localhost:3000/v1/users/signup', {
        nickname: 'JiuDuoDuo',
        email: 'htkzmo@gmail.com',
        password: '12345678',
    });

    console.log('User seed done');
};

main();
