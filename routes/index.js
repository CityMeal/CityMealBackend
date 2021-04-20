//DEPENDENCIES
const express = require('express');
const router = express.Router();

//AUTHENTICATION MIDDLEWARE
const VerifyToken = require('../auth/VerifyToken');

const paginate = require('../middleware/paginate')

//CONTROLLERS
const User = require('../controllers/User');
const Rating = require('../controllers/Rating')
const Locations = require('../controllers/locations')
const Favorites = require('../controllers/favorites')

const user = new User();
const rating = new Rating();
const locationController = new Locations()
const favoritesController = new Favorites()

//AUTH ROUTERS
router.post('/register', user.register);
router.post('/login', user.login);

//USER ROUTERS
router.delete('/user', VerifyToken, user.deleteUser);
router.put('/user', VerifyToken, user.updateUser);
router.get('/user', VerifyToken, user.getUser);

//LOCATIONS ROUTERS
router.get('/locations', paginate, locationController.getAllLocations )
router.get('/getLocations/:zipcode', locationController.getLocationsByZip)
//FAVORITES ROUTERS
router.get('/user/:user_id/getfavorites',favoritesController.getFavorites)
router.post('/user/:user_id/savefavorite',favoritesController.saveFavorite)
router.delete('/user/:user_id/deletefavorite',favoritesController.deleteFavorite)
 
//RATINGS ROUTERS
router.post('/users/:user_id/locations/:location_id/ratings', VerifyToken, rating.createRating);
router.put('/users/:user_id/locations/:location_id/ratings/:rating_id', VerifyToken, rating.updateRating);
router.delete('/users/:user_id/locations/:location_id/ratings/:rating_id', VerifyToken, rating.deleteRating)
router.get('/users/:user_id/ratings', VerifyToken, rating.getUserRatings )
router.get('/locations/:location_id/ratings', VerifyToken, rating.getLocationRatings)

module.exports = router;
