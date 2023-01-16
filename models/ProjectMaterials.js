const mongoose = require ('mongoose');

const projectMaterialsSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    quantity: {
        type: String,
        require: true
    },
    isEnd: {
        type: Boolean,
        require: true
    },
    projectManagerId:{
        ref: "Project_manager",
        type: mongoose.Schema.Types.ObjectId
    },
    projectId: {
        ref: "Project",
        type: mongoose.Schema.Types.ObjectId
    }
    
})

const ProjectMaterials = mongoose.model('projectMaterials',projectMaterialsSchema);
module.exports = ProjectMaterials;