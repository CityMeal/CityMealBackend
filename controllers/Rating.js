// env vars
require('dotenv').config()
const knexFile = require('../knexfile')
const knex = require('knex')(knexFile[process.env.NODE_ENV])

class Rating {
  /**
     * Expects a rating value from 1 to 5
     * @returns rating
     */
  async createRating (req, res) {
    try {
      const locationId = Number.parseInt(req.params.location_id)

      // if location doesn't exist
      if (locationId === undefined) {
        return res.status(400).json('no location specified')
      }

      // get location
      let location = await knex('locations').where({ id: locationId })
      location = location[0]
      // make sure location exists in db
      if (location === undefined) {
        return res.status(404).json('location does not exist')
      }

      // make sure rating is between 1 and 5
      if (req.body.rating < 1 || req.body.rating > 5) {
        return res.status(400).json('rating is not between 1 and 5')
      }

      // if rating has already been created
      const existingRating = await knex('ratings').where({ user_id: req.user.id, location_id: locationId })
      if (existingRating.length !== 0) {
        return res.status(401).json('rating already exists')
      }

      const newRating = {
        user_id: req.user.id,
        location_id: locationId,
        rating: req.body.rating
      }

      // create rating
      const rating = await knex('ratings').insert(newRating).returning(['id', 'user_id', 'location_id', 'rating'])

      // return rating obj
      return res.status(200).json(rating)
    } catch (err) {
      return res.status(500).json({ error: err })
    }
  };

  /**
     * //updated a rating based on location. Expects a rating from 1 to 5
     * @returns updated rating
     */
  async updateRating (req, res) {
    try {
      // get Rating
      const updatedRating = await knex('ratings').where({ id: req.params.rating_id }).update({ rating: req.body.rating }).returning(['id', 'user_id', 'location_id', 'rating'])

      if (updatedRating.length === 0) {
        return res.status(404).json({ message: 'rating does not exist' })
      }

      return res.status(200).json(updatedRating)
    } catch (err) {
      return res.status(500).json({ error: err })
    }
  }

  /**
     * Updates a rating based on location. Expects a rating from 1 to 5
     * @returns updated rating
     */
  async deleteRating (req, res) {
    try {
      const deleteRating = await knex('ratings').where({ id: req.params.rating_id }).del()
      return res.status(200).json({ message: 'rating has been deleted', rating_id: req.params.rating_id })
    } catch (err) {
      return res.status(500).json({ error: err })
    }
  }

  /**
     * @returns all ratings user has created
     */
  async getUserRatings (req, res) {
    try {
      const userRatings = await knex('ratings').where({ user_id: req.user.id })
      return res.status(200).json(userRatings)
    } catch (err) {
      return res.status(500).json({ error: err })
    }
  }

  /**
     * @returns all ratings for a location
     */
  async getLocationRatings (req, res) {
    try {
      const locationRatings = await knex('ratings').where({ location_id: req.params.location_id })
      return res.status(200).json(locationRatings)
    } catch (err) {
      return res.status(500).json({ error: err })
    }
  }
};

module.exports = Rating
