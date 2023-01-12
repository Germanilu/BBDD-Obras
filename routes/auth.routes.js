const authController = require('../controllers/AuthController');
const router = require('express').Router();

//Routes
router.post('/auth/projectManagerSignIn', authController.registerProjectManager);
router.post('/auth/clientSignIn', authController.registerClient);

module.exports = router;