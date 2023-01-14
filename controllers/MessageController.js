const Chat = require('../models/Chat');
const Message = require('../models/Message')

const messageController = {}

messageController.create = async(req,res) => {
    try {
        const chatId = req.params.id
        const userName = req.user_name
        const userSurname = req.user_surname
        const {message} = req.body

        const foundChat = await Chat.find({_id:chatId})

        if(foundChat.length<1){
            return res.status(500).json({
                success: false,
                message: "No existe esta chat! "
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
                    messagge: "No se puede crear la consulta"

                });
        }
        return res.status(500).json({
            success: false,
            message: 'Unable to create consult CATCH',
            error: error.message
        })
    }
}


messageController.getAllMessage = async(req,res) => {
    try {
        const chatId = req.params.id
        // const foundConsult = await Consult.find({_id: chatId})
        const message = await Message.find({chatId: chatId})
        return res.status(200).json(
            {
                success: true,
                message: "Here all your consults",
                data: message
            }
        )

    } catch (error) {
        
    }
}


module.exports = messageController;