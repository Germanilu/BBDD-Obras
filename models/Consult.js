const mongoose = require('mongoose');
const moment = require('moment')
moment.locale("es")

const consultSchema = new mongoose.Schema({
    clientId: {
        type: String,
        require: true
    },
    projectManagerId:{
        type: String,
        require: true
    },
    userName: {
        type: String,
        require: true
    },
    userSurname: {
        type: String,
        require: true
    },
    userMessage: {
        type: String,
        require: true
    },
    date:{
        type:String,
        required:true,
        default: () => moment().format("dddd, DD MMMM YYYY")
    },
});

const Consult = mongoose.model('Consult', consultSchema);
module.exports = Consult;