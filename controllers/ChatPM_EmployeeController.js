const Employee = require('../models/Employee');
const Project_Manager = require('../models/Project_Manager');
const ChatPM_Employee = require('../models/ChatPM_Employee');

const chatController = {};

//Create new Chat 
chatController.create = async (req,res) => {
    try {
        const requester = req.user_id
        const user2 = req.params.id
        const roleName = req.roleName

        if(roleName == "project_manager"){

            const projectManager = await Project_Manager.findOne({_id: requester})
            const employee = await Employee.findOne({_id: user2})

             //Check if chat already exist
        const checkChat = await ChatPM_Employee.find({projectManagerId: requester, EmployeeId : user2})
        if(checkChat.length !== 0){
            return res.status(500).json({
                success: false,
                message: "Ya existe una chat con este Trabajador"
            })
        }


        //Creating new chat
        const newChat = {
            EmployeeId: user2,
            employeeName: employee.name + " " + employee.surname,
            projectManagerId:requester,
            projectManagerName:projectManager.name + " " + projectManager.surname
        }

        
        await ChatPM_Employee.create(newChat)

        return res.status(200).json({
            success: true,
            message: "Chat creada!",
            data: newChat
        });   
        }else if(roleName == "employee"){
            const employee = await Employee.findOne({_id:requester})
            const projectManager = await Project_Manager.findOne({_id:user2})
            //Check if chat already exist
            const checkChat = await ChatPM_Employee.find({projectManagerId: user2, EmployeeId : requester})
            if(checkChat.length !== 0){
                return res.status(500).json({
                    success: false,
                    message: "Ya existe una chat con este project manager"
                })
            }


            //Creating new chat
            const newChat = {
                EmployeeId: requester,
                employeeName: employee.name + " " + employee.surname,
                projectManagerId:user2,
                projectManagerName:projectManager.name + " " + projectManager.surname
            }
            
            await ChatPM_Employee.create(newChat)

            return res.status(200).json({
                success: true,
                message: "Chat creada!",
                data: newChat
            });   
        }      
       

    } catch (error) {
        if (error?.message.includes('Cast to ObjectId failed')) {
            return res.status(404).json({
                    success: true,
                    messagge: "No se puede crear la chat"

                });
        }
        return res.status(500).json({
            success: false,
            message: 'Unable to create chat ',
            error: error.message
        })
    }
}



//Get chat by ID
chatController.getChatById = async(req,res) => {
    try {
        const chatId = req.params.id;
        const userId = req.user_id;

        //Find chat and compare userId with client/PM id in chat if user is in chat, show chat, otherwise do not allow it
        const findChat = await ChatPM_Employee.find({_id:chatId})
        if(findChat.length == 0){
            return res.status(500).json({
                success:false,
                message: "No existe la chat"
            })
        }
        findChat.map(e => {
            if(e.EmployeeId == userId || e.projectManagerId == userId){
                return res.status(200).json({
                    success: true,
                    message: "Aqui la chat",
                    data: findChat
                })
            }else{
                return res.status(400).json({
                    success: true,
                    message: "No tienes permisos para ver este chat",
                })
            }
        })

    } catch (error) {
        if (error?.message.includes('Cast to ObjectId failed')) {
            return res.status(404).json({
                    success: true,
                    messagge: "No se recuperar la chat"

                });
        }
        return res.status(500).json({
            success: false,
            message: 'No se puede recuperar la chat ',
            error: error.message
        })
    }
}

module.exports = chatController;