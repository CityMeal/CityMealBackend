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
            const resp = await axios.get('https://data.cityofnewyork.us/resource/sp4a-vevi.json?$$app_token=zQ0LKGccVEwlZVxzizhZQHacj')
            

            if(resp.data.length < 1) {
                return res.status(400).json({
                    message: "No data returned"
                })
            }
resp.data.map(async (location) => {
    let locationData = await knex('locations').insert({
        location_id:location.sfcode,
        api:'cityofnewyork',
        name:location.schoolname,
        city:location.city,
        siteAddress:location.siteaddress,
        zip:location.zip,
        longitude:location.longitude,
        latitude:location.latitude
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