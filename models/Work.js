const mongoose = require ('mongoose');
const moment = require('moment')
moment.locale("es")

const workSchema = new mongoose.Schema({
    hours:{
        type:Number,
    },
    taskId: {
        ref: "ProjectTask",
        type: mongoose.Schema.Types.ObjectId
    },
    employeeId: {
        ref: "Employee",
        type: mongoose.Schema.Types.ObjectId
    },
    startedAt: {
        type: String,
        default: () => moment().format(" DD-MM-YYYY H:mm:ss")
    },
    endedAt: {
        type: String,
        default: "Ongoing"
    }
    
})

const Work = mongoose.model('Work',workSchema );
module.exports = Work;