var jwt = require('jsonwebtoken');
// var config = require('../config');


/**
 * Middleware to verify token for requests
 * expects a token from header
 * passes user data saved in token to controller
 */
//https://stackabuse.com/authentication-and-authorization-with-jwts-in-express-js/
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.secret, (err, user) => {
            if (err) {
                return res.sendStatus(403).json({error: "failed to authenticate token"});
            }
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401).json({error: "No token provided"});
    }
};

module.exports = verifyToken;