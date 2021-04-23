
const { response } = require('express')
require('dotenv').config()
const knexFile = require('../knexfile')
const knex = require('knex')(knexFile[process.env.NODE_ENV])

class Favorites {
  async saveFavorite (req, res) {
    const { user_id } = req.params
    const { location_id } = req.body

    const checkFavorite = await knex('favorites').where({
      location_id: location_id,
      user_id: user_id
    })

    if (checkFavorite.length > 0) {
      return res.status(500).json('Already Favorited')
    }
    try {
      const savedFavorite = await knex('favorites').insert({
        location_id: location_id,
        user_id: user_id
      }).returning(['id','location_id','user_id'])
      res.status(200).json({
        favorite: savedFavorite
      })
    } catch (err) {
      return res.status(500).json({
        message: err.message
      })
    }
  }

  async getFavorites (req, res) {
    const userID = parseInt(req.params.user_id)
    try {
      const favorites = await knex('favorites').join('locations', function() {
        this.on('favorites.location_id', '=', 'locations.id').andOn('favorites.user_id', '=', userID)
      }).select('*')
      res.status(200).json({
        favorites: favorites
      })
    } catch (err) {
      return res.status(500).json({
        message: err.message
      })
    }
<<<<<<< HEAD
  }
=======
    async deleteFavorite(req, res) {
        const { user_id } = req.params
        const { location_id } = req.params
        try {
            const deletedFavorite = await knex('favorites').where({
                location_id: location_id,
                user_id: user_id
            }).del();
            res.status(200).json({
                message: `favorite with location ID ${location_id} has been deleted`, location_id: location_id,
                user_id: user_id
            });
>>>>>>> 501b54984497da7a3cac98a221403f302f961e9e

  //TODO: walk with frontent on how they are deleting Favorite. 
  //TODO: noticed incorrect location_id is being passed into locaiton_id
  //TODO: should probably delete favorites based on favorite id
  async deleteFavorite (req, res) {
    const { user_id } = req.params
    const { location_id } = req.body
    try {
      const deletedFavorite = await knex('favorites').where({
        location_id: location_id,
        user_id: user_id
      }).del()
      res.status(200).json({
        message: `favorite with location ID ${location_id} has been deleted`,
        location_id: location_id,
        user_id: user_id
      })
    } catch (err) {
      return res.status(500).json({
        message: err.message
      })
    }
  }
}

module.exports = Favorites
