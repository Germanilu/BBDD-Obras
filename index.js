const express = require('express')

require('dotenv').config();
//Conect to database.js
const db = require('./config/database')

const app = express()
//Setting port variable to .env file
const port = process.env.PORT || 4000;




db().then(() => {
    app.listen(port, () => {
        console.log('Server is running: ' + port);
    })
})
.catch((error) => {
    console.log("error connecting to MongoDb ", error)
})