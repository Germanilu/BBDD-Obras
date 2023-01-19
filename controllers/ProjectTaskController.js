const ProjectTask = require('../models/ProjectTask')

const projectTaskController = {}

projectTaskController.create = async(req,res) => {
    try {
        const projectId = req.params.id
        const projectManagerId = req.user_id
        const {name, workersNumber,description} = req.body

        if(req.roleName !== "project_manager"){
            return res.status(500).json({
                success:false,
                message: "No puedes añadir una tarea"
            })
        }

        //Throw error if no name on task
        if(!name || name == " "){
            return res.status(500).json({
                success:false,
                message: "Tienes que dar un nombre a esta tarea"
            })
        }

        //Create new task
        const newTask = {
            name,
            projectId,
            projectManagerId,
            description,
            workersNumber,
            isEnd : false,

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

projectTaskController.getAllTasksByProject = async(req,res) => {
    try {
        const projectId = req.params.id


        const tasks = await ProjectTask.find({projectId: projectId})
        console.log(tasks) 
        return res.status(200).json({
            success:true,
            message: "Aqui todas las tareas del proyecto",
            data:tasks
        })

    } catch (error) {
        if (error?.message.includes('Cast to ObjectId failed')) {
            return res.status(404).json({
                    success: true,
                    messagge: "No se ha encontrado ninguna tarea"

                });
        }
        return res.status(500).json({
            success: false,
            message: 'Unable to find Tasks ',
            error: error.message
        })
    }
}

module.exports = projectTaskController;