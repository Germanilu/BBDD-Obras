const projectController = require('../controllers/ProjectController');
const verifyToken = require('../middlewares/verifyToken');
const router = require('express').Router();

//Routes
router.post('/newProject/:id', verifyToken, projectController.create)


module.exports = router;