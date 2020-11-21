const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;

const main = async () => {
    const db = await dbConnection();
    await db.dropDatabase();

    // add user
    await users.addUser('Zechen', 'feng@gmail.com');

    await users.addUser('MoSun', 'sunmo@gmail.com');

    await users.addUser('Yuqi', 'wangyuqi@gmail.com');

    await users.addUser('Dongling', 'dongling@gmail.com');

    console.log('Done seeding database');

    await db.serverConfig.close();
};

main();
