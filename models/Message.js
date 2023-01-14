const mongoose = require('mongoose');
const moment = require('moment')
moment.locale("es")

const messageSchema = new mongoose.Schema({
    consultId:{
        ref: 'Consult',
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
        default: () => moment().format("dddd, DD MMMM YYYY")
    },
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;