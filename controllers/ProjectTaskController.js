const ProjectTask = require('../models/ProjectTask')
const Project = require('../models/Project')
const ProjectManager = require('../models/Project_Manager')

const projectTaskController = {}


projectTaskController.create = async(req,res) => {
    try {
        const projectId = req.params.id
        const projectManagerId = req.user_id
        const {name, workersNumber,description} = req.body
        const searchProject = await Project.findOne({_id: projectId})
        
        //Check if PM is the owner of the project
        if(projectManagerId !== searchProject.projectManagerId.toString()){
            return res.status(500).json({
                success:false,
                message: "No tienes permisos para crear una nueva tarea en este proyecto"
            })
        }

        if(!name || name == " "){
            return res.status(500).json({
                success:false,
                message: "Tienes que dar un nombre a esta tarea"
            })
        }

        const newTask = {
            name,
            description,
            workersNumber,
            isEnd : false

        }

        await ProjectTask.create(newTask)
        return res.status(200).json({
            success:true,
            message: "Tarea creada con exito!"
        })
        

    } catch (error) {
        if (error?.message.includes('Cast to ObjectId failed')) {
            return res.status(404).json({
                    success: true,
                    messagge: "No se puede crear esta Tarea"

                });
        }
        return res.status(500).json({
            success: false,
            message: 'Unable to create new Task ',
            error: error.message
        })
    }
}

module.exports = projectTaskController;