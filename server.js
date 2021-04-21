// DEPENDENCIES
require('dotenv').config();
const express = require('express');
const APIManager = require('./controllers/api');
const app = express();
const cors = require('cors')
const routes = require('./routes/index.js');
const { json } = require('express');


//GLOBAL VARIABLES
const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const nycAPI = new APIManager()

//CORS SECURITY CONFIGURATIONS
const whitelist = ["http://localhost:3000/", "https://citymeal.herokuapp.com/"]; // will add deployed links to array
const corsOptions = {
  origin: function (origin, callback) {
    console.log("origin", origin)
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(
        new Error("Not allowed by CORS, domain needs to be added to whitelist")
      );
    }
  },
};


//MIDDLEWARE
NODE_ENV === "development" ? app.use(cors()) : app.use(cors(corsOptions));
//parses incoming requests with JSON
app.use(express.json());
//process form data
app.use(express.urlencoded({extended:true}));


//ROUTES
app.use('/', routes);

app.get('/', (req,res) => {
    res.send('routes working')
});

//LISTENER
app.listen(PORT, () => {
    console.log("App is running on PORT: " + PORT);
    nycAPI.populateDB();
});