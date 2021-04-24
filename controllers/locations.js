
// const { response } = require('express')
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
    // returns all location objects that match the provided borough

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
    const borough = req.params.borough
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

  // returns all location objects that match the provided location ID
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

  async getLocationsByRadius (req, res) {
    const locationBounds = this.handleRadiusRequest(req)
    const maxLat = locationBounds[0][0]
    const minLat = locationBounds[1][0]
    const maxLong = locationBounds[0][1]
    const minLong = locationBounds[1][1]
    try {
      //     const locations = await db.any(`SELECT * FROM locations WHERE locations.latitude <= ${maxLat}
      //  AND locations.latitude >= ${minLat}
      //  AND locations.longitude <= ${maxLong}
      //   AND locations.longitude >= ${minLong}`)

      // TODO: test route!
      const locations = await knex('locations').select('*').where('locations.latitude', '<=', maxLat)
        .andWhere('locations.latitude', '>=', minLat)
        .andWhere('locations.longitude', '<=', maxLong)
        .andWhere('locations.longitude', '<=', minLong)

      console.log('locations', locations)

      res.status(200).json({
        getLocations: locations
      })
    } catch (err) {
      return res.status(500).json({
        message: err.message
      })
    }
  }

  handleRadiusRequest (req) {
    const loc = req.params.position.split('+')
    const mile = req.params.mile
    const lat = loc[0]
    const long = loc[1]
    const dLat = mile / 69
    const dLong = dLat / Math.cos(latitude)

    return [[lat + dLat, long + dLong], [lat - dLat, long - dLong]]
  }
}

module.exports = Locations
