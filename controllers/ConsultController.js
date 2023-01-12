const Client = require('../models/Client');
const Consult = require('../models/Consult');
const Project_Manager = require('../models/Project_Manager');

const consultController = {};

//Create new consult 
consultController.create = async (req,res) => {
    try {
        const {userMessage} = req.body;
        const clientId = req.user_id
        const userName = req.user_name
        const userSurname = req.user_surname
        const projectManagerId = req.params.id

        const projectManager = await Project_Manager.find({_id: projectManagerId})
        const client = await Client.find({_id: clientId})

        //To unable project manager to send message to client first
        if(!client[0]){
            return res.status(400).json({
                success: false,
                message: "No se puede enviar el mensaje"
            })
        }
        if(!projectManager[0]){
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        if(!userMessage){
            return res.status(401).json({
                success:false,
                message: "Tienes que escribir algo! "
            })
        }
      
        const newConsult = {
            clientId,
            userName,
            userSurname,
            userMessage,
            projectManagerId
        }

        await Consult.create(newConsult)

        return res.status(200).json({
            success: true,
            message: "Mensaje Enviado!",
            data: newConsult
        });   

    } catch (error) {
        if (error?.message.includes('Cast to ObjectId failed')) {
            return res.status(404).json({
                    success: true,
                    messagge: "No se puede enviar el mensaje"

                });
        }
        return res.status(500).json({
            success: false,
            message: 'Unable to create consult CATCH',
            error: error.message
        })
    }
}
 
module.exports = consultController;