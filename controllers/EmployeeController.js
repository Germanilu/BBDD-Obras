const Employee = require('../models/Employee');
const Project = require('../models/Project');

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

module.exports = employeeController