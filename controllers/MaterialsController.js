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

materialsController.getAllMaterialInProject = async(req,res) => {
    try {
        const projectId = req.params.id
        const userId = req.user_id

        //Search the project by ID in DB and check if requester is the actual project manager, if not, throw error
        const project = await Project.find({_id: projectId})
        project.map(e => {
            const ProjectManagerID = e.projectManagerId.toString()
 
            if(userId !== ProjectManagerID){
                return res.status(500).json({
                    success: false,
                    message: "No tienes permisos para acceder a los materiales de este proyecto"
                })
            }
        })

        //Find material by projectId
        const materiales = await Materials.find({projectId : projectId})
        return res.status(200).json({
            success: true,
            message: "Estos son los materiales para este proyecto!",
            data: materiales
        })

    } catch (error) {
        if (error?.message.includes('Cast to ObjectId failed')) {
            return res.status(404).json({
                    success: true,
                    messagge: "No se pueden encontrar materiales en este proyecto"

                });
        }
        return res.status(500).json({
            success: false,
            message: 'Unable to search for Material ',
            error: error.message
        })
    }
}

module.exports = materialsController;