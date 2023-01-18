//This middleware is used to check the role of the user getting the role ID of the user and returning the name of the role
const Role = require('../models/Role')
const checkRole = async (req, res, next) => {
    const userRole = req.user_role;
    try {
        const roles = await Role.find()
        roles.map(e => {
            if (userRole === e._id.toString()) {
                //This allow to send the resolution of the middleware to the controller.
                req.roleName = e.name;
                next()
            }
        })
    } catch (error) {
        reject(error)
    }
}

module.exports = checkRole;

