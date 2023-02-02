const authController = require('../controllers/AuthController');
const verifyToken = require('../middlewares/verifyToken')
const checkRole = require('../middlewares/checkRole')
const router = require('express').Router();

//Routes
router.post('/auth/projectManagerSignIn', authController.registerProjectManager);
router.post('/auth/clientSignIn', authController.registerClient);
router.post('/auth/employeeSignIn',verifyToken,checkRole, authController.registerNewEmployee);
router.post('/auth/login', authController.login);
router.get('/auth/profile', verifyToken,checkRole, authController.profile);
router.get('/auth/getAllUsers', verifyToken,checkRole, authController.getAllUsers);
router.put('/auth/editProfileData', verifyToken,checkRole, authController.editProfileData);

module.exports = router;