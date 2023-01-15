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
        

        //Check if chat exist in DB
        const foundChat = await Chat.find({_id:chatId})
        //IF no chat reject, otherwise add message
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


messageController.getAllMessage = async(req,res) => {
    try {
        const chatId = req.params.id
        // const foundConsult = await Consult.find({_id: chatId})
        const message = await Message.find({chatId: chatId})
        // message.sort('-_id')
        return res.status(200).json(
            {
                success: true,
                message: "Mensajes Chat",
                data: message
            }
        )
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