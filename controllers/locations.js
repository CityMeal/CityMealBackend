
const { response } = require('express');
const db = require('../db');
require('dotenv').config()
const knexFile = require('../knexfile')
const knex = require('knex')(knexFile[process.env.NODE_ENV]);

class Locations {

    //RETURN ALL LOCATIONS
    async getAllLocations(req, res){ 
    
        if(req.paginate.isPaginated) {
        return res.status(200).json(req.paginate.result);
    }

    //no pagination
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

    //returns all location objects that match the provided borough
async getLocationsByBorough(req,res) {
    let borough = req.params.borough
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

    //returns all location objects that match the provided location ID
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

async getLocationsByRadius(req,res) {
    
   let locationBounds = this.handleRadiusRequest(req)
   let maxLat = locationBounds[0][0]
   let minLat = locationBounds[1][0]
   let maxLong = locationBounds[0][1]
   let minLong = locationBounds[1][1]
try {
   let locations = await db.any(`SELECT * FROM locations WHERE locations.latitude <= ${maxLat} 
   AND locations.latitude >= ${minLat} 
   AND locations.longitude <= ${maxLong} 
    AND locations.longitude >= ${minLong}`)

    res.status(200).json({
        getLocations:locations
    });
} catch (err) {
    return res.status(500).json({
        message: err.message
    })
}

}

 

handleRadiusRequest(req) {
    let loc = req.params.position.split('+')
    let mile = req.params.mile
    let lat = loc[0]
    let long = loc[1]
    let dLat = mile/69
    let dLong = dLat/Math.cos(latitude)
    
    return [[lat + dLat,long + dLong],[lat - dLat,long - dLong]]
    }
    
}

module.exports = Locations