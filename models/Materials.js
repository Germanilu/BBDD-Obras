const mongoose = require ('mongoose');

const MaterialsSchema = new mongoose.Schema({
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

const Materials = mongoose.model('Materials',MaterialsSchema);
module.exports = Materials;