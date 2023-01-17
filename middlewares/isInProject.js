
//This middleware check if the requester(ProjectManager) is inside the project 
const Materials = require('../models/Materials')
const Project = require('../models/Project')
const isInProject = async (req,res,next) => {
    try {
        const userId = req.user_id
        const paramsId = req.params.id
        let ProjectManagerID;

        //Checking params ID inside Project / Material Model
        const project = await Project.findOne({_id: paramsId})
        if(project){
            //Convert the projectManager ID into string
            ProjectManagerID = project.projectManagerId.toString()
            
        }else{
            const material = await Materials.findOne({_id: paramsId})
            ProjectManagerID = material.projectManagerId.toString()
        }
   
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