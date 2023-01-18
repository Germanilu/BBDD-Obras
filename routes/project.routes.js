const projectController = require('../controllers/ProjectController');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole')
const router = require('express').Router();

//Routes
router.post('/newProject/:id', verifyToken,checkRole, projectController.create);
router.get('/myProjects', verifyToken,checkRole, projectController.getMyProject);
router.get('/ongoingProject', verifyToken,checkRole, projectController.ongoingProject);
router.get('/endedProject', verifyToken,checkRole, projectController.endedProjects);
router.put('/completeProject/:id', verifyToken, projectController.completeProject)
router.delete('/deleteProject/:id', verifyToken, projectController.delete)
module.exports = router;