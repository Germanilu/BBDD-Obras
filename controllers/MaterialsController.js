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
        const projectManagerId = req.user_id;

        //Checking from checkRole Middleware
        if(req.roleName !== "project_manager"){
            return res.status(500).json({
                success:false,
                message: "No tienes permisos para ver este material"
            })
        }

        //Find material and checking if exist and if requester ID is who create the material if false, throw error
        const material = await Materials.find({_id: materialId})

        if(material[0].projectManagerId.toString() !== projectManagerId){
            return res.status(500).json({
                success:false,
                message: "No tienes permisos para ver este material"
            })
        }

        if(!material){
            return res.status(500).json({
                success:false,
                message: "El material no existe"
            })
        }
    
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


//To update material name or quantity
materialsController.updateMaterial = async(req,res) => {
    try {
        const materialId = req.params.id;
        const {name, quantity} = req.body;
        const userId = req.user_id;

        //search for material and throw error if requester is not the PM material ID
        const material = await Materials.find({_id:materialId})
        if(material[0].projectManagerId.toString() !== userId){
            return res.status(500).json({
                success:false,
                message: "No tienes permisos para modificar este material"
            })
        }

        //Editing the material 
        material.map(e => {
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

    if(material[0].projectManagerId.toString() !== userId){
        return res.status(500).json({
            success:false,
            message: "No tienes permisos para modificar este material!"
        })
    }

    //Editing the material properties
    material.map(e => {
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


materialsController.delete = async(req,res) => {
    try {
        const materialId = req.params.id;
        const userId = req.user_id;

        //Find material in DB, if no material throw error
        const material = await Materials.find({_id:materialId})
        if(material.length === 0){
            return res.status(500).json({
                success:false,
                message: "Material no encontrado"
            })
        }

        //Check if userId is who created the material, if not, throw error
        if(material[0].projectManagerId.toString() !== userId){
            return res.status(500).json({
                success:false,
                message: "No tienes permisos para eliminar este material!"
            })
        }
        
        await Materials.findByIdAndDelete(material)
        return res.status(200).json({
            success:true,
            message: "Material eliminado correctamente"
        })
        
    } catch (error) {
        if (error?.message.includes('Cast to ObjectId failed')) {
            return res.status(404).json({
                    success: true,
                    messagge: "No se puede eliminar el material"
    
                });
        }
        return res.status(500).json({
            success: false,
            message: 'Unable to delete the Material ',
            error: error.message
        })
    }
}

module.exports = materialsController;