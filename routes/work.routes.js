const workController = require('../controllers/WorkController');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole');
const isInProject = require('../middlewares/isInProject');
const router = require('express').Router();

//Routes
router.post('/startNewTask/:id', verifyToken, workController.create);
router.put('/endTask/:id', verifyToken, workController.terminate );




module.exports = router;