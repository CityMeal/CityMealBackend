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
const user = new User();


//AUTH ROUTERS
router.post('/register', user.register);
router.post('/login', user.login);


module.exports = router;