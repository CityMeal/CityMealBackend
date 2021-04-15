const express = require('express');
const router = express.Router();

const VerifyToken = require('../auth/VerifyToken');

//DATABASE
const User = require('../controllers/User');
const APIManager = require('../controllers/api');
const user = new User();
const newAPI = new APIManager()


//AUTH ROUTERS
router.post('/register', user.register);
router.post('/login', user.login);

//USER ROUTERS
router.delete('/user', VerifyToken, user.deleteUser);
router.put('/user', VerifyToken, user.updateUser);
router.get('/user', VerifyToken, user.getUser);

//DATABASE ROUTERS
router.post('/api', newAPI.populateDB);


module.exports = router;