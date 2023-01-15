const mongoose = require ('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    workersNumber:{
        type: Number,
    },
    clientId: {
        ref: "Client",
        type: mongoose.Schema.Types.ObjectId
    },
    projectManagerId:{
        ref: "Project_manager",
        type: mongoose.Schema.Types.ObjectId
    },
    isEnd: {
        type: Boolean,
        require: true
    }
    
})

const Project = mongoose.model('Project',projectSchema);
module.exports = Project;