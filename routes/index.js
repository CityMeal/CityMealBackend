const express = require('express');
const router = express.Router();

const VerifyToken = require('../auth/VerifyToken');

//DATABASE
const User = require('../controllers/User');
const APIManager = require('../controllers/api');
const Locations = require('../controllers/locations')
const Favorites = require('../controllers/favorites')
const user = new User();
const nycAPI = new APIManager()
const locationController = new Locations()
const favoritesController = new Favorites()

//AUTH ROUTERS
router.post('/register', user.register);
router.post('/login', user.login);

//USER ROUTERS
router.delete('/user', VerifyToken, user.deleteUser);
router.put('/user', VerifyToken, user.updateUser);
router.get('/user', VerifyToken, user.getUser);

//DATABASE ROUTERS
  //LOCATIONS
router.post('/api', nytAPI.populateDB);

 //FAVORITES
 router.get('/user/:user_id/getfavorites',favoritesController.getFavorites)
 router.post('/user/:user_id/savefavorite',favoritesController.saveFavorite)
 router.delete('/user/:user_id/deletefavorite',favoritesController.deleteFavorite)
router.get('/getLocations/:zipcode')


module.exports = router;