const Project = require('../models/Project')
const Materials = require('../models/Materials')

const materialsController = {};

//Create new material
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

//Get all materials use in the project
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

//Get one material by his ID

materialsController.getMaterialByID = async(req,res) => {
    try {
        const materialId = req.params.id;
        const userId = req.user_id;

        //Search the material by ID in DB and check if requester is the actual project manager, if not, throw error
        const material = await Materials.find({_id: materialId})
        console.log(material)

        material.map(e => {
            const ProjectManagerID = e.projectManagerId.toString();
            if(userId !== ProjectManagerID){
                return res.status(500).json({
                    success: false,
                    message: "No tienes permisos para acceder a este material"
                })
            }
        })

        return res.status(200).json({
            success:true,
            message: "Aqui tienes el material que buscabas",
            data: material
        })


    } catch (error) {
        if (error?.message.includes('Cast to ObjectId failed')) {
            return res.status(404).json({
                    success: true,
                    messagge: "No se pueden encontrar el material en este proyecto"

                });
        }
        return res.status(500).json({
            success: false,
            message: 'Unable to search for Material ',
            error: error.message
        })
    }
}


materialsController.updateMaterial = async(req,res) => {
    try {
        const materialId = req.params.id;
        const userId = req.user_id;
        const {name, quantity} = req.body;

        //search for material and throw error if requester is not the PM material ID
        const material = await Materials.find({_id:materialId})
        material.map(e => {
            const ProjectManagerID = e.projectManagerId.toString();
            if(userId !== ProjectManagerID){
                return res.status(500).json({
                    success: false,
                    message: "No tienes permisos para modificar este material"
                })
            }
            //Editing the material properties
            e.name = name || e.name;
            e.quantity = quantity || e.quantity;
        })
        //Saving new material and resolve
        await material[0].save()
        return res.status(200).json({
            success: true,
            message: "Material actualizado con exito",
            data: material
        })

    } catch (error) {
        if (error?.message.includes('Cast to ObjectId failed')) {
            return res.status(404).json({
                    success: true,
                    messagge: "No se puede actualizar los datos del material"

                });
        }
        return res.status(500).json({
            success: false,
            message: 'Unable to update the Material ',
            error: error.message
        })
    }
}


// Mark the material as terminated.
materialsController.updateMaterialStatus = async (req,res) => {
try {
    const materialId = req.params.id;
    const userId = req.user_id;

    //Find material by ID, check if requester is PM if not throw error
    const material = await Materials.find({_id:materialId})
    material.map(e => {
        const ProjectManagerID = e.projectManagerId.toString();
        if(userId !== ProjectManagerID){
            return res.status(500).json({
                success: false,
                message: "No tienes permisos para modificar este material"
            })
        }
        //Editing the material properties
        e.isEnd = true;
    })
    //Saving material
    await material[0].save()
    return res.status(200).json({
        success: true,
        message: "Estado del material actualizado con exito!",
        data: material
    })


} catch (error) {
    if (error?.message.includes('Cast to ObjectId failed')) {
        return res.status(404).json({
                success: true,
                messagge: "No se puede modificar el estado del material"

            });
    }
    return res.status(500).json({
        success: false,
        message: 'Unable to update the Material state ',
        error: error.message
    })
}
}


module.exports = materialsController;