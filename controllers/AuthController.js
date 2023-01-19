const Project_Manager = require("../models/Project_Manager");
const Client = require("../models/Client");
const Role = require("../models/Role");

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Employee = require("../models/Employee");

const authController = {};

authController.registerProjectManager = async (req, res) => {
    try {
        //Get body input
        const { name, surname, nif, mobile, address, businessName, email, password } = req.body;

        //Encrypt Password
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        //Checking password length
        if (password.length < 6 || password.length > 10) {
            return res.status(500).json({
                success: false,
                message: 'La contraseña tiene que ser de entre 6 y 10 caracteres'
            })
        }

        //Checking if already exist
        const existProjectManager = await Project_Manager.find({ email: email })
        if (existProjectManager.length > 0) {
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
            password: encryptedPassword,
            role: "project_manager"
        }

        //Checking if role send in frontend exist in BBDD
        const foundRoles = await Role.find({ name: { $in: newProjectManager.role } })
        //Mapping the object role and assign the id of the role to the object newProjectManager
        newProjectManager.role = foundRoles.map(role => role._id)

        //Creating new project manager
        await Project_Manager.create(newProjectManager)

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


//Post Client
authController.registerClient = async (req, res) => {
    try {
        //Get body input
        const { name, surname, nif, mobile, address, email, password } = req.body;

        //Encrypt Password
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        //Checking password length
        if (password.length < 6 || password.length > 10) {
            return res.status(500).json({
                success: false,
                message: 'La contraseña tiene que ser de entre 6 y 10 caracteres'
            })
        }

        //Checking if already exist
        const existClient = await Client.find({ email: email })
        if (existClient.length > 0) {
            return res.status(500).json({
                success: false,
                message: 'Ya existe un Cliente con este email'
            })
        }

        const newClient = {
            name,
            surname,
            nif,
            mobile,
            address,
            email,
            password: encryptedPassword,
            role: "client"
        }

        //Checking if role send in frontend exist in BBDD
        const foundRoles = await Role.find({ name: { $in: newClient.role } })
        //Mapping the object role and assign the id of the role to the object newClient
        newClient.role = foundRoles.map(role => role._id)

        //Creating new project manager
        await Client.create(newClient)

        return res.status(200).json({
            success: true,
            message: 'Cliente creado exitosamente!'
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "No se puede registrar el Cliente",
            error: error?.message || RangeError
        })
    }
}

//Register new Employee
authController.registerNewEmployee = async(req,res) => {
    try {
        const {name,surname,nif,mobile,address,email,password} = req.body;
        
        if(req.roleName !== "project_manager"){
            return res.status(500).json({
                success:false,
                message:"No se puede registrar el trabajador"
            })
        }
        //Encrypt Password
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);

        //Checking password length
        if (password.length < 6 || password.length > 10) {
            return res.status(500).json({
                success: false,
                message: 'La contraseña tiene que ser de entre 6 y 10 caracteres'
            })
        }

        //Checking if already exist
        const existEmployee = await Employee.find({ email: email })
        if (existEmployee.length > 0) {
            return res.status(500).json({
                success: false,
                message: 'Ya existe un Trabajador con este email'
            })
        }

        const newEmployee = {
            name,
            surname,
            nif,
            mobile,
            address,
            email,
            password: encryptedPassword,
            role: "employee"
        }

         //Checking if role send in frontend exist in BBDD
         const foundRoles = await Role.find({ name: { $in: newEmployee.role } })
         //Mapping the object role and assign the id of the role to the object newEmployee
         newEmployee.role = foundRoles.map(role => role._id)

         //Create the new employee
         await Employee.create(newEmployee)
         return res.status(200).json({
            success: true,
            message: 'Cliente creado exitosamente!'
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "No se puede registrar el Empleado",
            error: error?.message || RangeError
        })
    }
    }



//Login
authController.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Insertar Email y Contraseña'
            })
        }

        //Checking whoIs connecting 
        let userConnecting = await Promise.all([
            Client.findOne({ email: email }),
            Project_Manager.findOne({ email: email })
        ])
        //Assign to userconnecting the object !null
        userConnecting[0] !== null ? userConnecting = userConnecting[0] : userConnecting = userConnecting[1]

        if (!userConnecting) {
            return res.status(400).json({
                success: false,
                message: "Credenciales Erradas"
            })
        }

        const isValidPassword = bcrypt.compareSync(password, userConnecting.password)
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: "Email o Contraseña incorrecta"
            })
        }

        const token = await jwt.sign({
            user_id: userConnecting._id,
            user_name: userConnecting.name,
            user_surname: userConnecting.surname,
            user_nif: userConnecting.nif,
            user_email: userConnecting.email,
            user_address: userConnecting.address,
            user_mobile: userConnecting.mobile,
            user_role: userConnecting.role[0]
        }, process.env.JWT_SECRET, { expiresIn: '5h' })

        return res.status(200).json({
            success: true,
            message: 'Bienvenido!',
            token: token
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al hacer login",
            error: error?.message || RangeError
        })
    }
}


//Check Profile User
authController.profile = async (req, res) => {

    try {
        //Get the return of the promise in the middleware checkRole
        const roleName = req.roleName
        const userId = req.user_id

        switch (roleName) {
            case "project_manager":
                user = await Project_Manager.findOne({ _id: userId }).select(["-password", "-__v"])
                break;
            case "client":
                user = await Client.findOne({ _id: userId }).select(["-password", "-__v"])
                break;
        }

        if (user) {
            return res.status(200).json({
                success: true,
                message: "Aqui ti Perfil",
                data: user
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Error al recuperar el Perfil",
            error: error?.message || RangeError
        })
    }

}

module.exports = authController