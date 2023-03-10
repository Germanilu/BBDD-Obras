const Employee = require('../models/Employee');
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

        //Get all works ongoing by task id, if there is work ongoing with that task id, return error
        const works = await Work.find({taskId:taskId,isEnd:false})
            if(works.length !== 0){
                return res.status(500).json({
                success:false,
                message:"Ya estas trabajando en esta Tarea!"
                })
            }

        //Create new work 
        const newWork = {
            taskId,
            employeeId:workerId,
            isEnd:false,
            projectId:task.projectId
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


workController.getAllMyWorks = async(req,res) => {
    try {
        const employeeId = req.user_id

        const works = await Work.find({employeeId:employeeId})
        //If employee do not have any work started
        if(works.length == 0){
            return res.status(500).json({
                success:true,
                message: "No tienes ningun trabajo "
            })
        }
        //Return all employee work
        return res.status(200).json({
            success:true,
            message: "Aqui todos tus trabajos",
            data:works
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Unable to create new Task ',
            error: error.message
        })
    }
}

//To end the work 
workController.terminate = async(req,res) => {
    try {
        const workerId = req.user_id;
        const workId = req.params.id

        //Find the work that the employee is working at in work table
        const work = await Work.findOne({_id: workId,employeeId:workerId})

        if(work.isEnd == true){
            return res.status(500).json({
                success:false,
                message: "El trabajo ya ha sido marcado como completado, no es posible completarlo de nuevo"
            })
        }
        
        //Create an endedHour with moment
        const endedHour = moment().format(" DD-MM-YYYY H:mm:ss")
        
        //This moment function calculate the difference between endedHour and started hour and return HH:mm:ss format
        const diff = moment.utc(moment(endedHour,"DD-MM-YYYY HH:mm:ss").diff(moment(work.startedAt,"DD-MM-YYYY HH:mm:ss"))).format("HH:mm:ss")

        //This function convert the hour into minute multiply * 60, then adding the result to the minutes and multiply by 60 then adding second
        let hourWorked = diff.split(':').reduce((acc,time) => (60 * acc) + +time)/60
        //Then hourWorked it's convert into hours with 2 decimal positions
        hourWorked = (hourWorked /60).toFixed(2)

        //Saving task and return 
        work.endedAt = endedHour
        work.hours = hourWorked
        work.isEnd = true
        await work.save()

        return res.status(200).json({
            success:true,
            message:"Trabajo terminado correctamente"
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Unable to terminate Task ',
            error: error.message
        })
    }
}

module.exports = workController