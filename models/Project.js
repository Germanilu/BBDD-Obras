const mongoose = require ('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    workersNumber:{
        type: String,
    },
    clientId: {
        type: String,
        require: true
    },
    projectManagerId:{
        ref: "Project_manager",
        type: mongoose.Schema.Types.ObjectId
    },
    
})

const Project = mongoose.model('Project',projectSchema);
module.exports = Project;