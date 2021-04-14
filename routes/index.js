const express = require('express');
const router = express.Router();

// const VerifyToken = require('./VerifyToken');

//configure JWT
// //create,sign, and verify tokens
// const jwt = require('jsonwebtoken');
// //hash password
// const bcrypt = require('bcryptjs');
// const config = require('../config');

//DATABASE
// const db = require('../db');
const User = require('../controllers/User');
const APIManager = require('../controllers/api');
const user = new User();
const newAPI = new APIManager()



//AUTH ROUTERS
router.post('/register', user.register);
router.post('/login', user.login);
router.post('/api', newAPI.sendGetRequest);

module.exports = router;

