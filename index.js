const express = require('express')

require('dotenv').config();
//Conect to database.js
const db = require('./config/database')


const app = express()
//Check the entry request & create body data
app.use(express.json())  

//Connect Routes
const authRoutes = require('./routes/auth.routes');
//Routes
app.use('/api',authRoutes)



//Cors
const cors = require('cors');
let corsOptions = {    origin: "*",    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",     methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",    preflightContinue: false,     allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",    optionsSuccessStatus: 204};

//Request to app to use cors
app.use(cors(corsOptions));


//Setting port variable to .env file
const port = process.env.PORT || 4000;


//Welcome Rute
app.get('/' , (req,res) => {   
    return res.send('BBD Obras ')
});

//If no rute, reject with 404
app.get('*', (req,res) => {
    return res.status(404).send('404 Route not found')
})


db().then(() => {
    app.listen(port, () => {
        console.log('Server is running: ' + port);
    })
})
.catch((error) => {
    console.log("error connecting to MongoDb ", error)
})