
//This middleware check if the requester is inside the project 
const Project = require('../models/Project')
const isInProject = async (req,res,next) => {
    try {
        const userId = req.user_id
        const projectId = req.params.id
        
        const project = await Project.findOne({_id: projectId})
        //Convert the projectManager ID into string
        const ProjectManagerID = project.projectManagerId.toString()
       
        //Checking if requester is the projectManager of the project
        if(ProjectManagerID !== userId){
            return res.status(500).json({
                success:false,
                message: "No tienes permisos para interactuar con este proyecto"
            })
        }

        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error"
        })
    }
}

module.exports = isInProject;