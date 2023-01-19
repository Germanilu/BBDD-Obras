
//This middleware check if the requester(ProjectManager) is inside the project 
const Project = require('../models/Project')
const isInProject = async (req,res,next) => {
    try {
        const userId = req.user_id
        const projectId = req.params.id
        
        //Checking params ID inside Project 
        const project = await Project.findOne({_id: projectId})
        if(!project){
            return res.status(500).json({
                success:false,
                message: "No tienes permisos para interactuar con este proyecto"
            })
        }
        
        //If user is not in the project, throw error
        if(userId == project.projectManagerId.toString() || userId == project.clientId.toString()){
            next();
        }else{
            return res.status(500).json({
                success:false,
                message: "No tienes permisos para interactuar con este proyecto"
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error",
            error: error.message
        })
    }
}

module.exports = isInProject;