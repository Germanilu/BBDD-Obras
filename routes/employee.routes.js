const employeeController = require('../controllers/EmployeeController');
const verifyToken = require('../middlewares/verifyToken')
const checkRole = require('../middlewares/checkRole')
const isInProject = require('../middlewares/isInProject');
const router = require('express').Router();

//Routes
router.put('/assignToProject/:id',verifyToken,isInProject, employeeController.assignToProject);
router.put('/removeFromProject/:id',verifyToken,isInProject, employeeController.removeFromProject);

module.exports = router;