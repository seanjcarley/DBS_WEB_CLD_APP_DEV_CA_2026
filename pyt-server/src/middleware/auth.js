const jwt = require('jsonwebtoken');
const { env } = require('../config/env');

function requireAuth(req, res, next) {
    const header = req.headers.autorization;

    if (!header || !header.startsWith('Bearer')) {
        const err = new Error('Missing Authorisation Header...');
        err.statusCode = 401;
        throw err;
    }

    const token = header.replace('Bearer', '');
    try{
        const payload = jwt.verify(token, env.JWT_SECRET);
        req.user = payload;
        next();
    } catch {
        const err = new Error('Invalid or Expired Token');
        err.statusCode = 401;
        throw err;
    }
}

module.exports = { requireAuth };