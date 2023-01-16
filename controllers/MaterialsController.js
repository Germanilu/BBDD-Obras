const Project = require('../models/Project')
const Materials = require('../models/Materials')

const materialsController = {};


materialsController.create = async(req,res) => {
    try {
        const projectId = req.params.id
        const projectManagerId = req.user_id
        const {name, quantity} = req.body;
        const isEnd = false;

        //Get the project 
        const project = await Project.findOne({_id: projectId})
        //Convert the projectManager ID into string
        const ProjectManagerID = project.projectManagerId.toString()
       
        //Checking if requester is the projectManager of the project
        if(ProjectManagerID !== projectManagerId){
            return res.status(500).json({
                success:false,
                message: "No Tienes permisos para añadir el material a este proyecto!"
            })
        }

        //Create Material & add to project
        const newMaterial = {
            name,
            quantity,
            isEnd,
            projectId,
            projectManagerId
        }
        await Materials.create(newMaterial);
        return res.status(200).json({
            success: true,
            message: "Material añadido",
            data: newMaterial
        })
        

    } catch (error) {
        if (error?.message.includes('Cast to ObjectId failed')) {
            return res.status(404).json({
                    success: true,
                    messagge: "No se añadir el material al proyecto"

                });
        }
        return res.status(500).json({
            success: false,
            message: 'Unable to add Material ',
            error: error.message
        })
    }
}

module.exports = materialsController;