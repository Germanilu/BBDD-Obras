const materialsController = require('../controllers/MaterialsController');
const verifyToken = require('../middlewares/verifyToken');
const router = require('express').Router();

//Routes
router.post('/addMaterial/:id', verifyToken, materialsController.create);
router.get('/projectMaterial/:id', verifyToken, materialsController.getAllMaterialInProject);

module.exports = router;