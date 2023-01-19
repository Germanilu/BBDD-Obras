const projectTaskController = require('../controllers/ProjectTaskController');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole')
const router = require('express').Router();

//Routes
router.post('/newProjectTask/:id', verifyToken,checkRole, projectTaskController.create);
// router.get('/tasks/:id', verifyToken,checkRole, projectTaskController.getAllTasksByProject);



module.exports = router;