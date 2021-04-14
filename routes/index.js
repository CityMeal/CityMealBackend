const express = require('express');
const router = express.Router();

const VerifyToken = require('../auth/VerifyToken');

//DATABASE
const User = require('../controllers/User');
const user = new User();


//AUTH ROUTERS
router.post('/register', user.register);
router.post('/login', user.login);

//test token authentication
// router.get('/verifyToken',VerifyToken, user.testVerifyToken);


module.exports = router;