const mongoose = require('mongoose');
const moment = require('moment')
moment.locale("es")

const chatSchema = new mongoose.Schema({
    clientId: {
        ref: "Client",
        type: mongoose.Schema.Types.ObjectId
    },
    clientName:{
        type: String,
        required:true
    },
    projectManagerId:{
        ref: "Project_Manager",
        type: mongoose.Schema.Types.ObjectId
    },
    projectManagerName:{
        type: String,
        required:true
    },
    date:{
        type:String,
        required:true,
        default: () => moment().format("dddd, DD MMMM YYYY")
    },
});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;