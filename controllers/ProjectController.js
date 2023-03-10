const Project = require('../models/Project');
const Client = require('../models/Client')
const projectController = {};


projectController.create = async(req,res) => {
    try {
        const {name, workersNumber} = req.body;
        const clientId = req.params.id
        const projectManagerId = req.user_id
        const roleName = req.roleName
        const isEnd = false;

        //Checking body Entry
        if(!name){
            return res.status(500).json({
                success: false,
                message: "Tienes que dar un nombre al Proyecto"
            })
        }
        //Checking role requester, if no PM, throw error
        if(roleName !== "project_manager"){
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
            clientId,
            name,
            projectManagerId,
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
        const roleName = req.roleName

        //Switch rolename and find in model the user
        switch(roleName) {
            case "project_manager":
                allProjects = await Project.find({projectManagerId : userId})
            break;
            case "client":
                allProjects = await Project.find({clientId : userId})
            break;
        }
        //If no project return message
        if(allProjects.length == 0){
            return res.status(500).json({
                success: false,
                message: "No tienes ningun proyecto"
            })
        }

        return res.status(200).json({
            success:true,
            message: "Aqui todos tus Proyectos",
            data: allProjects
        })

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
        const roleName = req.roleName

        switch(roleName) {
            case "project_manager":
                allProjects = await Project.find({projectManagerId : userId, isEnd:false})
            break;
            case "client":
                allProjects = await Project.find({clientId : userId, isEnd:false})
            break;
        }

        if(allProjects.length == 0){
            return res.status(500).json({
                success: true,
                message: "No tienes ningun proyecto pendiente"
            })
        }

        return res.status(500).json({
            success: true,
            message: 'Aqui tus proyectos pendientes',
            data: allProjects
        })

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
        const roleName = req.roleName

        switch(roleName) {
            case "project_manager":
                allProjects = await Project.find({projectManagerId : userId, isEnd:true})
            break;
            case "client":
                allProjects = await Project.find({clientId : userId, isEnd:true})
            break;
        }

        if(allProjects.length == 0){
            return res.status(500).json({
                success: true,
                message: "No tienes ningun proyecto Terminado"
            })
        }

        return res.status(500).json({
            success: true,
            message: 'Aqui tus proyectos Terminados',
            data: allProjects
        })

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
        const userId = req.user_id

        //Get the project and convert the client objectID into string
        const project = await Project.findOne({_id: projectId})
        const clientId = project.clientId.toString()
        //If requerster is not the same as clientID on project throw error
        if(userId !== clientId){
            return res.status(500).json({
                success: false,
                message: "No tienes permisos para editar el proyecto!"
            })
        }

        //Throw error if project already complete
       if(project.isEnd === true){
        return res.status(500).json({
            success:false,
            message: "El proyecto ya esta Completado"
        })
       }
       //Editing project.isEnd to true and saving the project
       project.isEnd = true
       await project.save()

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
        const userId = req.user_id
        //Get the project and convert the client objectID into string
        const project = await Project.findOne({_id: projectId})
        const clientId = project.clientId.toString()
        //If requerster is not the same as clientID on project throw error
        if(userId !== clientId){
            return res.status(500).json({
                success: false,
                message: "No tienes permisos para eliminar el proyecto!"
            })
        }

        //Get project and delete
        await Project.findOneAndDelete({_id: projectId})
        return res.status(200).json({
            success: true,
            message: "Proyecto eliminado con exito!"
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