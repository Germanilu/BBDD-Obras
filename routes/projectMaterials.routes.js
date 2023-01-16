const projectMaterialsController = require('../controllers/ProjectMaterialsController');
const verifyToken = require('../middlewares/verifyToken');
const router = require('express').Router();

//Routes
router.post('/addMaterial', verifyToken, projectMaterialsController.create);

module.exports = router;