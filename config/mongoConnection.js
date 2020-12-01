const MongoClient = require('mongodb').MongoClient;
const { password } = require('./mongodb');

const mongoConfig = {
    serverUrl: `mongodb+srv://undefined:${password}@undefined.ex623.mongodb.net?retryWrites=true&w=majority`,
    database: 'undefined',
};

let _connection = undefined;
let _db = undefined;

module.exports = async () => {
    if (!_connection) {
        _connection = await MongoClient.connect(mongoConfig.serverUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        _db = await _connection.db(mongoConfig.database);
    }

    return _db;
};
