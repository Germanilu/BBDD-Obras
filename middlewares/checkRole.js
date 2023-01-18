const Role = require('../models/Role')
const Project_Manager = require('../models/Project_Manager');
const Client = require('../models/Client');


const checkRole = async (req, res, next) => {

    const userId = req.user_id;
    const userRole = req.user_role;

    //Start new Promise and check if role exist in DB and resolve with the name of the role
    new Promise(async (resolve, reject) => {
        try {
            const roles = await Role.find()
            roles.map(e => {
                if (userRole === e._id.toString()) {
                    const name = e.name;
                    resolve(name)
                }
            })
        } catch (error) {
            reject(error)
        }
    })

        //Switch the roleName and check in DB then, resolve with user Profile
        .then((roleName) => {
            return new Promise(async (resolve, reject) => {
                try {
                    switch (roleName) {
                        case "project_manager":
                            user = await Project_Manager.findOne({ _id: userId }).select(["-password", "-__v"])
                            resolve(user)
                            break;
                        case "client":
                            user = await Client.findOne({ _id: userId }).select(["-password", "-__v"])
                            resolve(user)
                            break;

                    }
                } catch (error) {
                    reject(error)
                }
                //This allow to send the resolution of the middleware to the controller.
                req.userProfile = user;
                next()
            })
        })
}

module.exports = checkRole;

