const Chat = require('../models/Chat');
const Message = require('../models/Message')

const messageController = {}

messageController.create = async(req,res) => {

    try {
        const chatId = req.params.id
        const userName = req.user_name
        const userSurname = req.user_surname
        const {message} = req.body
        const userRole = req.user_role
        const userId = req.user_id

        //Check if chat exist in DB
        const foundChat = await Chat.find({_id:chatId})
        
        //IF no chat reject
        if(foundChat.length<1){
            return res.status(500).json({
                success: false,
                message: "No existe esta chat! "
            })
        }

        //If sender is ProjectManager and no message inside chat, unable PM to send first message
        const existMessage = await Message.find({chatId: chatId})
        if(userRole == "63bed8e7c36f163968800d40" && existMessage.length == 0 ){
            return res.status(500).json({
                success: false,
                message: "No puedes enviar mensajes"
            })
        }

        //If the user sending the message below to the chat, is finally able to send the message
        if(foundChat[0].projectManagerId == userId || foundChat[0].clientId == userId){

            const newMessage = {
                chatId,
                userName,
                userSurname,
                message
            }
    
            await Message.create(newMessage)
    
            return res.status(200).json({
                success: true,
                message: "Mensaje Enviado!"
            })
        }else{
            return res.status(200).json({
                success: false,
                message: "No tienes permisos para escribir en este chat"
            })
        }
        
      

    } catch (error) {
        if (error?.message.includes('Cast to ObjectId failed')) {
            return res.status(404).json({
                    success: true,
                    messagge: "No se puede enviar el mensaje"

                });
        }
        return res.status(500).json({
            success: false,
            message: 'No se puede enviar el mensaje ',
            error: error.message
        })
    }
}

//Get message inside chat
messageController.getAllMessage = async(req,res) => {
    try {
        const chatId = req.params.id
        const userId = req.user_id

        //Check if chat exist in DB
        const foundChat = await Chat.find({_id:chatId})

         //IF no chat reject
         if(foundChat.length<1){
            return res.status(500).json({
                success: false,
                message: "No existe esta chat! "
            })
        }

        //If the user requesting to check the chat message is in the chat group he can send the message, otherwise throw error
        if(foundChat[0].projectManagerId == userId || foundChat[0].clientId == userId){

            const message = await Message.find({chatId: chatId})
            return res.status(200).json(
                {
                    success: true,
                    message: "Mensajes Chat",
                    data: message
                }
            )

        }else{
            return res.status(500).json({
                success: true,
                message: "No tienes permisos para ver los mensajes de este chat"
            })
        }

    } catch (error) {
        if (error?.message.includes('Cast to ObjectId failed')) {
            return res.status(404).json({
                    success: true,
                    messagge: "Hubo un error al cargar los mensajes"

                });
        }
        return res.status(500).json({
            success: false,
            message: 'Hubo un error al cargar los mensajes',
            error: error.message
        })
    }
}

module.exports = messageController;