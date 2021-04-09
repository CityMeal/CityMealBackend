// DEPENDENCIES
require('dotenv').config()
const express = require('express');
const app = express();


//GLOBAL VARIABLES
const PORT = process.env.PORT;

//MIDDLEWARE

//parses incoming requests with JSON
app.use(express.json())



//ROUTES

app.get('/', (req,res) => {
    res.send('routes working')
})

//LISTENER
app.listen(PORT, () => {
    console.log("App is running on PORT: " + PORT);
})