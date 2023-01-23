const express = require('express')
require('dotenv').config();

//Conect to database.js
const db = require('./config/database')

const createRoles = require('./libs/initialSetup')

const app = express()
//Creating roles when starting the app
createRoles();

//Check the entry request & create body data
app.use(express.json())  

//Connect Routes
const authRoutes = require('./routes/auth.routes');
const chatRoutes = require('./routes/chat.routes');
const messageRoutes = require('./routes/message.routes');
const projectRoutes = require('./routes/project.routes')
const materialsRoutes = require('./routes/materials.routes')
const projectTaskRoutes = require('./routes/projectTask.routes')
const employeeRoutes = require('./routes/employee.routes')
const workRoutes = require('./routes/work.routes')
const chatPM_EmployeeRoutes = require('./routes/chatPM_Employee.routes')
const MessagePM_EmployeeRoutes = require('./routes/messagePM_Employee.routes')

//Routes
app.use('/api',authRoutes);
app.use('/api',chatRoutes);
app.use('/api',messageRoutes);
app.use('/api',projectRoutes);
app.use('/api',materialsRoutes);
app.use('/api',projectTaskRoutes);
app.use('/api',employeeRoutes);
app.use('/api',workRoutes);
app.use('/api',chatPM_EmployeeRoutes);
app.use('/api',MessagePM_EmployeeRoutes);


//Cors
const cors = require('cors');
let corsOptions = {    origin: "*",    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",     methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",    preflightContinue: false,     allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",    optionsSuccessStatus: 204};

//Request to app to use cors
app.use(cors(corsOptions));

//Setting port variable to .env file
const port = process.env.PORT || 4000;

//Welcome Rute
app.get('/' , (req,res) => {   
    return res.send('BBDD Obras ')
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