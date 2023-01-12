const authController = require('../controllers/AuthController');
const verifyToken = require('../middlewares/verifyToken')
const router = require('express').Router();

//Routes
router.post('/auth/projectManagerSignIn', authController.registerProjectManager);
router.post('/auth/clientSignIn', authController.registerClient);
router.post('/auth/login', authController.login);
router.get('/auth/profile', verifyToken, authController.profile);


module.exports = router;