const materialsController = require('../controllers/MaterialsController');
const verifyToken = require('../middlewares/verifyToken');
const isInProject = require('../middlewares/isInProject');
const checkRole = require('../middlewares/checkRole')
const router = require('express').Router();

//Routes
router.post('/addMaterial/:id', verifyToken,isInProject, materialsController.create);
router.get('/projectMaterial/:id', verifyToken,isInProject, materialsController.getAllMaterialInProject);
router.get('/material/:id', verifyToken,checkRole, materialsController.getMaterialByID);
router.put('/updateMaterial/:id', verifyToken, materialsController.updateMaterial);
router.put('/updateMaterialStatus/:id', verifyToken, materialsController.updateMaterialStatus);
router.delete('/material/:id', verifyToken, materialsController.delete);

module.exports = router;