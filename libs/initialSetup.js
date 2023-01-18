//Initial setup to create Roles on the DB
const Role = require("../models/Role");

 const createRoles = async () => {
    try {
        const count = await Role.estimatedDocumentCount();

        if( count > 0) return;

        const values = await Promise.all([
            new Role ({ name: "client"}).save(),
            new Role ({ name: "project_manager"}).save(),
            new Role ({ name: "employee"}).save(),
            new Role ({ name: "admin"}).save(),
        ]);
        console.log(values);
    } catch (error) {
        console.error(error)
    }
};

module.exports = createRoles

