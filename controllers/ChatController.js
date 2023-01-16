const Client = require('../models/Client');
const Chat = require('../models/Chat');
const Project_Manager = require('../models/Project_Manager');

const chatController = {};

//Create new Chat 
chatController.create = async (req,res) => {
    try {
        const clientId = req.user_id
        const projectManagerId = req.params.id
        const projectManager = await Project_Manager.find({_id: projectManagerId})
        const client = await Client.find({_id: clientId})
        
        //To unable project manager to send message to client first
        if(!client[0]){
            return res.status(400).json({
                success: false,
                message: "No se puede crear la chat"
            })
        }
        if(!projectManager[0]){
            return res.status(404).json({
                success: false,
                message: "Project Manager no encontrado"
            })
        }
        //Check if chat already exist
       const checkChat = await Chat.find({projectManagerId: projectManagerId})

        if(checkChat.length > 0){
            return res.status(500).json({
                success: false,
                message: "Ya existe una chat con este project manager"
            })
        }
        //Creating new chat
        const newChat = {
            clientId,
            projectManagerId
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


//Enable user to see his owns chat's
chatController.getAllChats = async (req,res) => {
    try {
        const userId = req.user_id
        const role = req.user_role
        const Pm = "63bed8e7c36f163968800d40"
        const client = "63bed8e7c36f163968800d3f"


        // Checking user role and search chats for userId, if no chats, show error message, otherwise show chat
        if(role == Pm){
            const allChats = await Chat.find({ projectManagerId : userId })
            if(allChats.length !== 0){
                return res.status(200).json({
                    success: true,
                    message: "Aqui tus Chat's",
                    data: allChats
                })
            }else{
                return res.status(400).json({
                    success: true,
                    message: "No tienes ninguna Chat"
                })
            }
        }else if( role == client){
            const allChats = await Chat.find({ clientId : userId })
            if(allChats.length !== 0){
                return res.status(200).json({
                    success: true,
                    message: "Aqui tus Chat's",
                    data: allChats
                })        
            }else{
                return res.status(400).json({
                    success: true,
                    message: "No tienes ninguna Chat"
                })
            }
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
        const findChat = await Chat.find({_id:chatId})

        if(findChat[0].clientId == userId || findChat[0].projectManagerId == userId){
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