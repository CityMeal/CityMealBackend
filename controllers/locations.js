
const { response } = require('express');
const db = require('../db');
const knex = require('knex')({
    client: 'pg',
    connection: {
        database: 'citymeal',
        user: process.env.PGUSERNAME,
        password: process.env.PGPASSWORD
    }
});

class Locations {

//returns all location objects that match the provided zip
async getLocationsByZip(req,res) {
    let zipcode = req.params.zipcode
    try {
        let locations = await knex('locations').where({
        zip:zipcode
        });
        res.status(200).json({
            getLocations:locations
        });
        } catch (err) {
            return res.status(500).json({
                message: err.message
            })
        } 
        
}

async getLocationsByRating(req,res) {

}

}

module.exports = Locations