const Employee = require('../models/Employee');
const Project = require('../models/Project');
const Work = require('../models/Work')
const ProjectTask = require('../models/ProjectTask')
const employeeController = {}

employeeController.assignToProject = async(req,res) => {
    try {
        const projectId = req.params.id
        const {employeeId} = req.body

        //Find employee and add to project if found or if does not belongs to other proyect
        const employee = await Employee.findOne({_id:employeeId})

        if(!employee){
            return res.status(500).json({
                success:false,
                message:"Empleado no encontrado"
            })
        }

        if(employee.projectId !== null){
            return res.status(500).json({
                success:false,
                message:"El empleado ya pertenece a este u otro proyecto"
            })
        }
        
        employee.projectId = projectId
        await employee.save()

        return res.status(200).json({
            success:true,
            message:"Empleado añadido correctamente al proyecto"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al asignar a un proyecto",
            error: error?.message || RangeError
        })
    }
}

employeeController.removeFromProject = async(req,res) => {
    try {
        const {employeeId} = req.body

        //Find employee and remove from current project
        const employee = await Employee.findOne({_id:employeeId})

        if(!employee){
            return res.status(500).json({
                success:false,
                message:"Empleado no encontrado"
            })
        }

        employee.projectId = null
        await employee.save()
        return res.status(200).json({
            success:true,
            message:"Empleado removido correctamente al proyecto"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al asignar a un proyecto",
            error: error?.message || RangeError
        })
    }
}

employeeController.getAllEmployeeInProject = async(req,res) => {
    try {
        const projectId = req.params.id
        const employeeInProject = await Employee.findOne({projectId:projectId}) 
        //If no employee return 
        if(employeeInProject == null){
            return res.status(500).json({
                success:false,
                message: "No hay empleados asignados a este proyecto"
            })
        }
        //return employee in project
        return res.status(200).json({
            success:true,
            message:"Aqui los empleados de este proyecto",
            data: employeeInProject
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al asignar a un proyecto",
            error: error?.message || RangeError
        })
    }
}

//Get the worked hour by employee ID passing ProjectID via Body
employeeController.getWorkedHourById = async(req,res) => {
    try {

        const employeeId = req.params.id;
        const {projectId} = req.body
        let totalHourWorkedByProject = 0;

        //Checking inside Work model the data with the below criteria
        const works = await Work.find({employeeId:employeeId, isEnd:true, projectId:projectId})
        //Mapping the result and calculate the ammount of hours worket by project
        works.map(work => {
            totalHourWorkedByProject += work.hours
        })

        return res.status(200).json({
            success:true,
            message:"Aqui las horas trabajadas",
            data:works, totalHourWorkedByProject
        })
        


        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al asignar a un proyecto",
            error: error?.message || RangeError
        })
    }
}

module.exports = employeeController