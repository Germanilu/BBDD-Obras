const mongoose = require ('mongoose');

const ClientSchema = new mongoose.Schema({
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
    email: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['client','project_manager','worker','super_admin'],
        default: 'client'
    }
},
    {
        timestamps: true
    }
);

const Client = mongoose.model('Client',ClientSchema);
module.exports = Client;