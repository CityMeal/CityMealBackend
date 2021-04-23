const axios = require('axios');
const { response } = require('express');
require('dotenv').config()
const knexFile = require('../knexfile')
const knex = require('knex')(knexFile[process.env.NODE_ENV]);

class APIManager {
    
    
    async populateDB() { //req, res) {
      
        const checkLocations = await  knex('locations').select('*').limit(10)


        if (checkLocations.length > 0) {
          console.log('DB Has Already Been Populated')
          return
        }
        try {
            // Gets data from cityofnewyork API 
            const resp = await axios.get('https://data.cityofnewyork.us/resource/sp4a-vevi.json?$$app_token=zQ0LKGccVEwlZVxzizhZQHacj')


            if (resp.data.length < 1) {
                console.log("No Data Received From API")
                return
            }
            //Maps the array of location objects retrieved by the get request
            resp.data.map(async (location) => {
let latitude = parseFloat(location.latitude)
let longitude = parseFloat(location.longitude)
if (isNaN(latitude) || isNaN(longitude)) {
    console.log(`Location: ${location.schoolname} does not have a lat/long`)
} else  {
               //Inserts the data from each location object into the 'locations' table inside the citymeal database
                let locationData = await knex('locations').insert({
                    api: 'https://data.cityofnewyork.us/Education/COVID-19-Free-Meals-Locations/sp4a-vevi/data',
                    name: location.schoolname,
                    city: location.city,
                    siteAddress: location.siteaddress,
                    zip: location.zip,
                    longitude: longitude,
                    latitude: latitude
                });
            }
            })
            console.log("DB Has Been Populated")
            return
        } catch (err) {
            console.log(err)
            return
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