const projectTaskController = require('../controllers/ProjectTaskController');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');
const isInProject = require('../middlewares/isInProject');
const router = require('express').Router();

//Routes
router.post('/newProjectTask/:id', verifyToken,checkRole,isInProject, projectTaskController.create);
router.get('/tasks/:id', verifyToken,isInProject, projectTaskController.getAllTasksByProject);
router.get('/pendingTasks/:id', verifyToken,isInProject, projectTaskController.pending);
router.get('/endedTasks/:id', verifyToken,isInProject, projectTaskController.closeTasks);
router.put('/editTask/:id', verifyToken, projectTaskController.editTask);
router.put('/markascomplete/:id', verifyToken, projectTaskController.markAsComplete);
router.delete('/deleteTask/:id', verifyToken, projectTaskController.deleteTask);



module.exports = router;