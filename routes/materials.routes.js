const materialsController = require('../controllers/MaterialsController');
const verifyToken = require('../middlewares/verifyToken');
const router = require('express').Router();

//Routes
router.post('/addMaterial/:id', verifyToken, materialsController.create);
router.get('/projectMaterial/:id', verifyToken, materialsController.getAllMaterialInProject);
router.get('/material/:id', verifyToken, materialsController.getMaterialByID);
router.put('/updateMaterial/:id', verifyToken, materialsController.updateMaterial);

module.exports = router;