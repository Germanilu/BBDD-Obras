const Client = require('../models/Client');
const Chat = require('../models/Chat');
const Project_Manager = require('../models/Project_Manager');

const chatController = {};

//Create new consult 
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

       const checkChat = await Chat.find({projectManagerId: projectManagerId})
        console.log(checkChat)

        if(checkChat.length > 0){
            return res.status(500).json({
                success: false,
                message: "Ya existe una chat con este project manager"
            })
        }

      
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

module.exports = chatController;