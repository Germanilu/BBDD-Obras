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

        //Find all task inside the project 
        const tasks = await ProjectTask.find({projectId: projectId})
        
        //If no task throw error
        if(!tasks){
            return res.status(404).json({
                success: true,
                messagge: "No se ha encontrado ninguna tarea"
            });
        }

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

projectTaskController.openTasks = async(req,res) => {
    try {
        const projectId = req.params.id 

        //Find openTasks inside the model projectTasks
        const openTasks = await ProjectTask.find({projectId:projectId,isEnd: false})
        return res.status(200).json({
            success:true,
            message: "Aqui tienes las tareas pendientes",
            data:openTasks
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


projectTaskController.closeTasks = async(req,res) => {
    try {
        const projectId = req.params.id 

        //Find endedTasks inside the model projectTasks
        const closeTasks = await ProjectTask.find({projectId:projectId,isEnd: true})

        return res.status(200).json({
            success:true,
            message: "Aqui tienes las tareas pendientes",
            data:closeTasks
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



projectTaskController.editTask = async(req,res) => {
    try {
        const taskId = req.params.id;
        const projectManagerId = req.user_id
        const {name,description} = req.body

        //Find task in Model
        const task = await ProjectTask.findOne({_id:taskId})
        //If no task, throw error
        if(!task){
            return res.status(404).json({
                success: false,
                messagge: "No se puede encontrar la tarea"

            });
        }

        //If found task but already completed, throw error
        if(task.isEnd == true){
            return res.status(404).json({
                success: true,
                messagge: "No se puede modificar la tarea, ya esta completada",
                data:task
            });
        }
        //If requester is not PM, throw error
        if(task.projectManagerId.toString() !== projectManagerId){
            return res.status(404).json({
                success: true,
                messagge: "No tienes permisos para modificar esta tarea",
            });
        }

        //Edit task and save it
        task.name = name || task.name,
        task.description = description || task.description
        await task.save()

        return res.status(200).json({
            success:true,
            message:"Tarea modificada con exito",
            data:task
        })


    } catch (error) {
        if (error?.message.includes('Cast to ObjectId failed')) {
            return res.status(404).json({
                    success: true,
                    messagge: "No se puede editar la tarea"

                });
        }
        return res.status(500).json({
            success: false,
            message: 'Unable to edit Tasks ',
            error: error.message
        })
    }
}
module.exports = projectTaskController;