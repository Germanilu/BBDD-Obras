const mongoose = require('mongoose');
const moment = require('moment')
moment.locale("es")


const messageSchema = new mongoose.Schema({
    chatId:{
        ref: 'Chat',
        type: mongoose.Schema.Types.ObjectId
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

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;