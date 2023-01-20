const Employee = require('../models/Employee');
const Project = require('../models/Project');
const ProjectTask = require('../models/ProjectTask');
const Work = require('../models/Work');

workController = {};

workController.create = async(req,res) => {
    try {
        const workerId = req.user_id;
        const taskId = req.params.id

        // console.log(taskId)
        // console.log(workerId)

        const task = await ProjectTask.findOne({_id: taskId})
        const employee = await Employee.findOne({_id:workerId})
      

        //Check if employee is assigned to project id by checking in task model
        if(task.projectId.toString() !== employee.projectId.toString()){
            return res.status(500).json({
                success: false,
                message: 'No estas asignado a este proyecto ',
                
            })
        }

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

module.exports = workController