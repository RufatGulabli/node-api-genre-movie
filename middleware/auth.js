const config = require('config');
const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next){
    const token = req.header('x-auth-token');
    if(!token) return res.status(401).json('Access Denied. No token provided.');
    try{
        const decoded = jwt.verify(token, config.get('JWT'));
        req.user = decoded;
        next();
    } catch (exc){
        return res.status(400).json('Invalid token.');
    }
}