const mongoose = require ('mongoose');
const moment = require('moment')
moment.locale("es")


const projectTaskSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description:{
        type: String
    },
    workersNumber:{
        type: Number,
    },
    projectId: {
        ref: "Project",
        type: mongoose.Schema.Types.ObjectId
    },
    projectManagerId: {
        ref: "Project_manager",
        type: mongoose.Schema.Types.ObjectId
    },
    createdAt: {
        type: String,
        default: () => moment().format("dddd, DD MMMM YYYY H:mm:ss")
    },
    isEnd: {
        type: Boolean,
        require: true
    },
    
})

const ProjectTask = mongoose.model('ProjectTask',projectTaskSchema);
module.exports = ProjectTask;