const express = require('express');
const router = express.Router();

const VerifyToken = require('../auth/VerifyToken');

//DATABASE
const User = require('../controllers/User');
const user = new User();


//AUTH ROUTERS
router.post('/register', user.register);
router.post('/login', user.login);

//USER ROUTERS
router.delete('/user', VerifyToken, user.deleteUser);
router.put('/user', VerifyToken, user.updateUser);
router.get('/user', VerifyToken, user.getUser);


module.exports = router;