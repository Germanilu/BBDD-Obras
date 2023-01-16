const Project = require('../models/Project');
const Client = require('../models/Client')
const projectController = {};
const Pm = "63bed8e7c36f163968800d40"
const client = "63bed8e7c36f163968800d3f"

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
        if(role !== Pm){
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
        if(role == Pm){
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
        }else if(role == client){
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
                    messagge: "No se puede recuperar el Proyecto"

                });
        }
        return res.status(500).json({
            success: false,
            message: 'Unable to retrieve Project ',
            error: error.message
        })
    }
}


//Get Ongoing Project
projectController.ongoingProject = async(req,res) => {
    try { 
        const userId = req.user_id
        const role = req.user_role

        //Check role of the requester, if he have project and project status is ongoing show project, otherwise throw error
        if(role == Pm){
            const allProjects = await Project.find({projectManagerId : userId, isEnd:false})
            if(allProjects.length == 0){
                return res.status(500).json({
                    success: true,
                    message: 'No tienes ningun Proyecto',
                })
            }else{
                return res.status(500).json({
                    success: true,
                    message: 'Aqui tus proyectos pendientes',
                    data: allProjects
                })
            }
        }else if( role == client){
            const allProjects = await Project.find({clientId : userId, isEnd:false})
            if(allProjects.length == 0){
                return res.status(500).json({
                    success: true,
                    message: 'No tienes ningun Proyecto',
                })
            }else{
                return res.status(500).json({
                    success: true,
                    message: 'Aqui tus proyectos pendientes',
                    data: allProjects
                })
            }
        }

    } catch (error) {
        if (error?.message.includes('Cast to ObjectId failed')) {
            return res.status(404).json({
                    success: true,
                    messagge: "No se pueden ver tus Proyectos"

                });
        }
        return res.status(500).json({
            success: false,
            message: 'Unable to retrieve new Project  ',
            error: error.message
        })
    }
}

//Check ended projects
projectController.endedProjects = async(req,res) => {
    try { 
        const userId = req.user_id
        const role = req.user_role

        //Check role of the requester, if he have project and project status is ended show project, otherwise throw error
        if(role == Pm){
            const allProjects = await Project.find({projectManagerId : userId, isEnd:true})
            if(allProjects.length == 0){
                return res.status(500).json({
                    success: true,
                    message: 'No tienes ningun Proyecto',
                })
            }else{
                return res.status(500).json({
                    success: true,
                    message: 'Aqui tus proyectos terminados',
                    data: allProjects
                })
            }
        }else if( role == client){
            const allProjects = await Project.find({clientId : userId, isEnd:true})
            if(allProjects.length == 0){
                return res.status(500).json({
                    success: true,
                    message: 'No tienes ningun Proyecto',
                })
            }else{
                return res.status(500).json({
                    success: true,
                    message: 'Aqui tus proyectos terminados',
                    data: allProjects
                })
            }
        }

    } catch (error) {
        if (error?.message.includes('Cast to ObjectId failed')) {
            return res.status(404).json({
                    success: true,
                    messagge: "No se pueden ver tus Proyectos"

                });
        }
        return res.status(500).json({
            success: false,
            message: 'Unable to retrieve new Project ',
            error: error.message
        })
    }
}

projectController.completeProject = async(req,res) => {
    try {
        const projectId = req.params.id
        const role = req.user_role

        //Avoid other than client to complete the project
        if(role !== client){
            return res.status(500).json({
                success:false,
                message: "No tienes permisos para completar el proyecto"
            })
        }

        //Find project by ID
       const project = await Project.find({_id: projectId})

        //Throw error if project already complete
       if(project[0].isEnd === true){
        return res.status(500).json({
            success:false,
            message: "El proyecto ya esta Completado"
        })
       }
       //Editing project.isEnd to true and saving the project
       project[0].isEnd = true
       await project[0].save()

       return res.status(500).json({
        success: true,
        message: "El proyecto se ha completado con exito!"
       })

    } catch (error) {
        if (error?.message.includes('Cast to ObjectId failed')) {
            return res.status(404).json({
                    success: true,
                    messagge: "No se puede completar el proyecto"

                });
        }
        return res.status(500).json({
            success: false,
            message: 'Unable to complete new Project ',
            error: error.message
        })
    }
}

projectController.delete = async(req,res) => {
    try {
        const projectId = req.params.id
        const role = req.user_role
        
        //Avoid other than client to delete the project
        if(role !== client){
            return res.status(500).json({
                success:false,
                message: "No tienes permisos para eliminar el proyecto"
            })
        }
        await Project.findOneAndDelete({_id: projectId})

        return res.status(500).json({
            success: true,
            message: "El proyecto se ha Eliminado con exito!"
           })

    } catch (error) {
        if (error?.message.includes('Cast to ObjectId failed')) {
            return res.status(404).json({
                    success: true,
                    messagge: "No se puede eliminar el proyecto"

                });
        }
        return res.status(500).json({
            success: false,
            message: 'Unable to delete new Project ',
            error: error.message
        })
    }
}

module.exports = projectController;