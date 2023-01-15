const projectController = require('../controllers/ProjectController');
const verifyToken = require('../middlewares/verifyToken');
const router = require('express').Router();

//Routes
router.post('/newProject/:id', verifyToken, projectController.create);
router.get('/myProjects', verifyToken, projectController.getMyProject);


module.exports = router;