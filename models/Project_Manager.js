const mongoose = require ('mongoose');

const Project_ManagerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    surname: {
        type: String,
        required: true,
    },
    nif: {
        type: String,
        required: true,
    },
    mobile: {
        type: Number,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    businessName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    role: {
        type: String,
        enum: ['client','project_manager','worker','super_admin'],
        default: 'project_manager'
    }
},
    {
        timestamps: true
    }
);

const Project_Manager = mongoose.model('Project_Manager',Project_ManagerSchema);
module.exports = Project_Manager;