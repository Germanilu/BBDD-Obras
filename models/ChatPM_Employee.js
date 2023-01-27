const mongoose = require('mongoose');
const moment = require('moment')
moment.locale("es")

const chatPM_EmployeeSchema = new mongoose.Schema({
    EmployeeId: {
        ref: "Employee",
        type: mongoose.Schema.Types.ObjectId
    },
    employeeName:{
        type: String,
        require:true
    },
    projectManagerId:{
        ref: "Project_Manager",
        type: mongoose.Schema.Types.ObjectId
    },
    projectManagerName:{
        type: String,
        require:true
    },
    date:{
        type:String,
        required:true,
        default: () => moment().format("dddd, DD MMMM YYYY")
    },
});

const ChatPM_Employee = mongoose.model('ChatPM_Employee', chatPM_EmployeeSchema);
module.exports = ChatPM_Employee;