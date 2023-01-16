const materialsController = require('../controllers/MaterialsController');
const verifyToken = require('../middlewares/verifyToken');
const router = require('express').Router();

//Routes
router.post('/addMaterial', verifyToken, materialsController.create);

module.exports = router;