const Project_Manager = require ("../models/Project_Manager");
const bcrypt = require ('bcrypt');
const Role = require("../models/Role");

const authController = {};

authController.register = async ( req, res) => {
    try {
        //Get body input
        const { name, surname, nif, mobile, address,businessName, email, password,role } = req.body;

        //Encrypt Password
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        

        //Checking password length
        if(password.length < 6 || password.length >10){
            return res.status(500).json({
                success: false,
                message: 'La contraseña tiene que ser de entre 6 y 10 caracteres'
            })
        }

        //Checking if already exist
        const existProjectManager = await Project_Manager.find({email:email})
        if(existProjectManager.length >0){
            return res.status(500).json({
                success: false,
                message: 'Ya existe un Project Manager con este email'
            })
        }
        
        const newProjectManager = {
            name,
            surname,
            nif,
            mobile,
            address,
            businessName,
            email,
            password: encryptedPassword
        }
        
        //Connecting projectmanager role to roleId in DB
        const foundRoles = await Role.find({name: {$in: role}})
        newProjectManager.roles = foundRoles.map(role=> role._id)


        //Creating new project manager
        await Project_Manager.create(newProjectManager)
        console.log(newProjectManager)
        
        return res.status(200).json({
            success: true,
            message: 'Project Manager creado exitosamente!'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "No se puede registrar el ProjectManager",
            error: error?.message || RangeError
        })
    }
}


module.exports = authController