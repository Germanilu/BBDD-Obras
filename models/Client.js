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
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    role:[
        {
        ref: "Role",
        type: mongoose.Schema.Types.ObjectId
        },
    ],
},
    {
        timestamps: true
    }
);

const Client = mongoose.model('Client',ClientSchema);
module.exports = Client;