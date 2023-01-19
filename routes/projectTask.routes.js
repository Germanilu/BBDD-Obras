const projectTaskController = require('../controllers/ProjectTaskController');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');
const isInProject = require('../middlewares/isInProject');
const router = require('express').Router();

//Routes
router.post('/newProjectTask/:id', verifyToken,checkRole,isInProject, projectTaskController.create);
router.get('/tasks/:id', verifyToken,isInProject, projectTaskController.getAllTasksByProject);
router.get('/ongoingTasks/:id', verifyToken,isInProject, projectTaskController.openTasks);
router.get('/endedTasks/:id', verifyToken,isInProject, projectTaskController.closeTasks);



module.exports = router;