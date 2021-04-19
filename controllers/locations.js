
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

    //RETURN ALL LOCATIONS
    async getAllLocations(req, res){
        try{
            let allLocations = await knex('locations')
            res.status(200).json({
                locations: allLocations
            });
        }catch(err){
            return res.status(500).json({
                message: err.message
            })
        }
    }

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

async getLocationsByBorough(req,res) {
    let borough = req.params.borugh
    try {
        let locations = await knex('locations').where({
        city:borough
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

async getLocationByID(req,res) {
    let location_ID = req.params.id 
    try {
        let location = await knex('locations').where({
            id:location_ID
        });
        res.status(200).json({
            getLocation:location
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