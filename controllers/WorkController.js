const Employee = require('../models/Employee');
const Project = require('../models/Project');
const ProjectTask = require('../models/ProjectTask');
const Work = require('../models/Work');
const moment = require('moment')
moment.locale("es")


workController = {};

workController.create = async(req,res) => {
    try {
        const workerId = req.user_id;
        const taskId = req.params.id

        //Find task and employee in models
        const task = await ProjectTask.findOne({_id: taskId})
        const employee = await Employee.findOne({_id:workerId})
      

        //Check if employee is assigned to project id by checking in task model
        if(task.projectId.toString() !== employee.projectId.toString()){
            return res.status(500).json({
                success: false,
                message: 'No estas asignado a este proyecto ',
                
            })
        }
        //Create new work
        const newWork = {
            taskId,
            employeeId:workerId
        }

        await Work.create(newWork)

        return res.status(200).json({
            success:true,
            message: "Has empezado a trabajar en esta tarea!",
            data: newWork
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Unable to create new Task ',
            error: error.message
        })
    }
}


// workController.terminate = async(req,res) => {
//     try {
//         const workerId = req.user_id;
//         const workId = req.params.id

//         const work = await Work.findOne({_id: workId,employeeId:workerId})
//         // console.log(work)


//         const hour = moment().format(" DD MM YYYY H:mm:ss")

    
//         //Saving task and return 
//         work.endedAt = hour
//         await work.save()


//         let fechainicio = work.startedAt    
//         let fechafinal = work.endedAt

//         console.log(fechainicio)
//         console.log(fechafinal)

//         const x = moment(fechainicio).fromNow()

//         console.log(x)

//         return res.status(200).json({
//             success:true,
//             message:"Trabajo terminado correctamente"
//         })


//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             message: 'Unable to terminate Task ',
//             error: error.message
//         })
//     }
// }

module.exports = workController