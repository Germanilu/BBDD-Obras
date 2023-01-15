const Project = require('../models/Project');
const Client = require('../models/Client')
const projectController = {};

projectController.create = async(req,res) => {
    try {
        const {name, workersNumber} = req.body;
        const clientId = req.params.id
        const projectManagerId = req.user_id
        const role = req.user_role
        const isEnd = false;

        //Checking body Entry
        if(!name){
            return res.status(500).json({
                success: false,
                message: "Tienes que dar un nombre al Proyecto"
            })
        }
        //Checking role requester, if no PM, throw error
        if(role !== "63bed8e7c36f163968800d40"){
            return res.status(500).json({
                success:false,
                message: "Solo un Project Manager puede iniciar un nuevo Proyecto"
            })
        }
        //Find client in DB    
        const findClient = await Client.findById({_id: clientId})

        //No client throw error
        if(!findClient){
            return res.status(500).json({
                success:false,
                message: "Cliente no encontrado!"
            })
        }

        //Create new Project
        const newProject = {
            projectManagerId,
            clientId,
            name,
            workersNumber,
            isEnd
        };
      await Project.create(newProject);

      return res.status(200).json({
        success: true,
        message: "Proyecto Creado con Exito!",
        data: newProject
    })

    } catch (error) {
        if (error?.message.includes('Cast to ObjectId failed')) {
            return res.status(404).json({
                    success: true,
                    messagge: "No se puede crear el Proyecto"

                });
        }
        return res.status(500).json({
            success: false,
            message: 'Unable to create new Project ',
            error: error.message
        })
    }
}


//Get my Project 
projectController.getMyProject = async(req,res) =>{
    try {
        const userId = req.user_id
        const role = req.user_role
        //Checking user Role, if PM find by ProjectManagerId, if Client find by ClientId, If no Project throw error
        if(role == "63bed8e7c36f163968800d40"){
            const allProjects = await Project.find({projectManagerId : userId})
            if(allProjects.length !== 0){
                return res.status(200).json({
                    success:true,
                    message: "Aqui todos tus Proyectos",
                    data: allProjects
                })
            }else{
                return res.status(400).json({
                    success: true,
                    message: "No tienes ninguna Proyecto al momento"
                })
            }
        }else if(role == "63bed8e7c36f163968800d3f"){
            const allProjects = await Project.find({clientId : userId})
            if(allProjects.length !== 0){
                return res.status(200).json({
                    success:true,
                    message: "Aqui todos tus Proyectos",
                    data: allProjects
                })
            }else{
                return res.status(400).json({
                    success: true,
                    message: "No tienes ninguna Proyecto al momento"
                })
            }
        }

    } catch (error) {
        if (error?.message.includes('Cast to ObjectId failed')) {
            return res.status(404).json({
                    success: true,
                    messagge: "No se puede crear el Proyecto"

                });
        }
        return res.status(500).json({
            success: false,
            message: 'Unable to create new Project ',
            error: error.message
        })
    }
}

module.exports = projectController;