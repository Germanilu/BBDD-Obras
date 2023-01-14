const mongoose = require('mongoose');
const moment = require('moment')
moment.locale("es")

const chatSchema = new mongoose.Schema({
    clientId: {
        type: String,
        require: true
    },
    projectManagerId:{
        type: String,
        require: true
    },
    date:{
        type:String,
        required:true,
        default: () => moment().format("dddd, DD MMMM YYYY")
    },
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;