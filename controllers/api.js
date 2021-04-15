const axios = require('axios');
const { response } = require('express');
const db = require('../db');
let apiData = []
const knex = require('knex')({
    client: 'pg',
    connection: {
        database: 'citymeal',
        user: process.env.PGUSERNAME,
        password: process.env.PGPASSWORD
    }
});

class APIManager {
    
    
    async populateDB(req, res) {
        try {
            // Gets data from cityofnewyork API 
            const resp = await axios.get('https://data.cityofnewyork.us/resource/sp4a-vevi.json?$$app_token=zQ0LKGccVEwlZVxzizhZQHacj')


            if (resp.data.length < 1) {
                return res.status(400).json({
                    message: "No data returned"
                })
            }
            //Maps the array of location objects retrieved by the get request
            resp.data.map(async (location) => {

                //Inserts the data from each location object into the 'locations' table inside the citymeal database
                let locationData = await knex('locations').insert({
                    location_id: location.sfcode,
                    api: 'https://data.cityofnewyork.us/Education/COVID-19-Free-Meals-Locations/sp4a-vevi/data',
                    name: location.schoolname,
                    city: location.city,
                    siteAddress: location.siteaddress,
                    zip: location.zip,
                    longitude: location.longitude,
                    latitude: location.latitude
                });
            })
            return res.status(200).json({
                data: resp.data
            })
        } catch (err) {
            console.log(err)
            return res.status(500).json({
                message: err.message
            })
        }
    }
}

module.exports = APIManager;


/*
  table.integer('location_id').notNullable()
      table.string('api').notNullable()
      table.string('name').notNullable()
      table.string('city').notNullable()
      table.string('siteAddress').notNullable()
      table.string('zip').notNullable()
      table.string('longitude')
      table.string('latitude')
      table.string('accessibility')
      table.string('kosher')
*/