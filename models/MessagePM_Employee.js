const mongoose = require('mongoose');
const moment = require('moment')
moment.locale("es")

const messagePM_EmployeeSchema = new mongoose.Schema({
    chatId:{
        ref: 'Chat',
        type: mongoose.Schema.Types.ObjectId
    },
    userId: {
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
    message: {
        type: String,
        require: true
    },
    date:{
        type:String,
        required:true,
        default: () => moment().format("dddd, DD MMMM YYYY H:mm:ss")
    },
});

const MessagePM_Employee = mongoose.model('MessagePM_Employee', messagePM_EmployeeSchema);
module.exports = MessagePM_Employee;