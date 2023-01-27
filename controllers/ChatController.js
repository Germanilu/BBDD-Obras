const Client = require('../models/Client');
const Chat = require('../models/Chat');
const Project_Manager = require('../models/Project_Manager');
const ChatPM_Employee = require('../models/ChatPM_Employee');

const chatController = {};

//Create new Chat 
chatController.create = async (req,res) => {
    try {
        const clientId = req.user_id
        const projectManagerId = req.params.id

        const client = await Client.findOne({ _id: clientId})
        const projectManager = await Project_Manager.findOne({_id:projectManagerId})

        //To unable project manager to send message to client first
        if(!client){
            return res.status(400).json({
                success: false,
                message: "No se puede crear la chat"
            })
        }
        if(!projectManager){
            return res.status(404).json({
                success: false,
                message: "Project Manager no encontrado"
            })
        }
        
        //Check if chat already exist
        const checkChat = await Chat.find({projectManagerId:projectManagerId})

        if(checkChat.length > 0){
            return res.status(500).json({
                success: false,
                message: "Ya existe una chat con este project manager"
            })
        }
        
        //Creating new chat
        const newChat = {
            clientId,
            clientName:client.name + " " + client.surname,
            projectManagerId,
            projectManagerName: projectManager.name + " " + projectManager.surname
        }
        
        await Chat.create(newChat)
        return res.status(200).json({
            success: true,
            message: "Chat creada!",
            data: newChat
        });   

    } catch (error) {
        if (error?.message.includes('Cast to ObjectId failed')) {
            return res.status(404).json({
                    success: true,
                    messagge: "No se puede crear la chat",
                    error:error

                });
        }
        return res.status(500).json({
            success: false,
            message: 'Unable to create chat ',
            error: error.message
        })
    }
}


//Enable user to see his owns chat's
chatController.getAllChats = async (req,res) => {
    try {
        const userId = req.user_id
        //Request roleName from middleware
        const roleName = req.roleName
        //Switching rolename 
        switch (roleName) {
            case "project_manager":
                allChats = await Chat.find({ projectManagerId : userId })
                allChatsE = await ChatPM_Employee.find({projectManagerId: userId})
                break;
            case "client":
                allChats = await Chat.find({ clientId : userId })
                allChatsE = null
                break;
            case "employee":
                allChats = await ChatPM_Employee.find({ EmployeeId : userId })
                allChatsE = null
                break;
            
        }
        //If no chat return 
        if(allChats.length == 0){
            return res.status(200).json({
                success: false,
                message: "No tienes ninguna chat abierta"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Aqui tus Chat's",
            data: allChats,allChatsE
        })    
    
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
        const findChat = await Chat.find({_id:chatId})

        findChat.map(e => {
            if(e.clientId == userId || e.projectManagerId == userId){
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