const express = require('express');
const configRoutes = require('./routes');
const cors = require('cors');
const session = require('express-session');

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: 'http://localhost:3123',
        credentials: true,
    })
);
app.use(
    session({
        name: 'AuthCookie',
        secret: 'No one can hack it',
        resave: false,
        saveUninitialized: true,
    })
);

configRoutes(app);

app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log('Your routes will be running on http://localhost:3000');
});
