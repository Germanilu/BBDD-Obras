const ChatPM_Employee = require('../models/ChatPM_Employee');
const MessagePM_Employee = require('../models/MessagePM_Employee')

const messageController = {}

messageController.create = async(req,res) => {
    try {
        const chatId = req.params.id
        const userName = req.user_name
        const userSurname = req.user_surname
        const {message} = req.body
        const userId = req.user_id
        

        //Check if chat exist in DB
        const foundChat = await ChatPM_Employee.find({_id:chatId})
        
        //IF no chat reject
        if(foundChat.length<1){
            return res.status(500).json({
                success: false,
                message: "No existe esta chat! "
            })
        }
      
        //If the user sending the message below to the chat, is finally able to send the message
        if(foundChat[0].projectManagerId == userId || foundChat[0].EmployeeId == userId){
            const newMessage = {
                chatId,
                userId,
                userName,
                userSurname,
                message
            }
    
            await MessagePM_Employee.create(newMessage)
    
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
        const foundChat = await ChatPM_Employee.find({_id:chatId})

         //IF no chat reject
         if(foundChat.length<1){
            return res.status(500).json({
                success: false,
                message: "No existe esta chat! "
            })
        }

        //If the user requesting to check the chat message is in the chat group he can see the message, otherwise throw error
        if(foundChat[0].projectManagerId == userId || foundChat[0].EmployeeId == userId){

            const message = await MessagePM_Employee.find({chatId: chatId})
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


messageController.update = async(req,res) => {
    try {
        const userId = req.user_id
        const messageId = req.params.id
        const {message} = req.body

        //Find message by ID and check if user who write message is the same requesting to update
        const newMessage = await MessagePM_Employee.findById(messageId)   

        if(userId != newMessage.userId){
            return res.status(400).json({
                success:true,
                message: "No se puede modificar este mensaje"
            })
        }
        //Updating existing message on chat
        newMessage.message = message
        await newMessage.save()

        return res.status(200).json({
            success: true,
            message: "Mensaje modificado con exito!",
            data:newMessage
        })

    } catch (error) {
        return res.status(500).json(
            {
                success: false,
                message: "Imposible modificar el mensaje",
                error: error?.message || error
            }
        )
    }
}


//Deleting message in chat
messageController.delete = async(req,res) => {
    try {
        const messageId = req.params.id
        const userId = req.user_id
        //Find message by his ID
        const message = await MessagePM_Employee.findById(messageId)

        //Check if who request to eliminate the message is the same who post the message
        if(message.userId !== userId){
            return res.status(400).json({
                success: true,
                message: "Este mensaje no es tuyo, no lo puedes eliminar!"
            })
        }

        await MessagePM_Employee.findByIdAndDelete(message);

        return res.status(200).json({
            success: true,
            message: "Mensaje eliminado"
        })
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error, no se puede borrar el mensaje",
            data: error?.message || error
        })
    }
}

module.exports = messageController;