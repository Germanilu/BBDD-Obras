const authController = require('../controllers/AuthController');
const router = require('express').Router();

//Routes
router.post('/auth/registerProjectManager', authController.register);

module.exports = router;