
const { response } = require('express')
require('dotenv').config()
const knexFile = require('../knexfile')
const knex = require('knex')(knexFile[process.env.NODE_ENV])

class Locations {
  // RETURN ALL LOCATIONS
  async getAllLocations (req, res) {
    if (req.paginate.isPaginated) {
      return res.status(200).json(req.paginate.result)
    }

    // no pagination
    try {
      const allLocations = await knex('locations')
      res.status(200).json({
        locations: allLocations
      })
    } catch (err) {
      return res.status(500).json({
        message: err.message
      })
    }
  }

  // returns all location objects that match the provided zip
  async getLocationsByZip (req, res) {
    const zipcode = req.params.zipcode
    try {
      const locations = await knex('locations').where({
        zip: zipcode
      })
      res.status(200).json({
        getLocations: locations
      })
    } catch (err) {
      return res.status(500).json({
        message: err.message
      })
    }
  }

  async getLocationsByBorough (req, res) {
    const borough = req.params.borugh
    try {
      const locations = await knex('locations').where({
        city: borough
      })
      res.status(200).json({
        getLocations: locations
      })
    } catch (err) {
      return res.status(500).json({
        message: err.message
      })
    }
  }

  async getLocationByID (req, res) {
    const location_ID = req.params.id
    try {
      const location = await knex('locations').where({
        id: location_ID
      })
      res.status(200).json({
        getLocation: location
      })
    } catch (err) {
      return res.status(500).json({
        message: err.message
      })
    }
  }

  async getLocationsByRating (req, res) {

  }
}

module.exports = Locations
