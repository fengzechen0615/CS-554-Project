function authenticated(req, res, next) {
    if (req.session.AuthCookie) {
        next();
    } else {
        res.status(401).json({ error: 'Please Login' });
    }
}

function isAdmin(req, res, next) {
    if (req.session.AuthCookie.isAdmin) {
        next();
    } else {
        res.status(401).json({ error: 'Request Fobidden' });
    }
}

module.exports = {
    authenticated: authenticated,
    admin: isAdmin,
};
