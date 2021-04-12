// DEPENDENCIES
require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes/index.js');



//GLOBAL VARIABLES
const PORT = process.env.PORT;

//MIDDLEWARE

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
});