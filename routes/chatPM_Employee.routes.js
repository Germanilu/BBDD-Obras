const chatController = require('../controllers/ChatPM_EmployeeController');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole')
const router = require('express').Router();

//Routes
router.post('/startNewChat/:id', verifyToken,checkRole, chatController.create);
router.get('/getchatById/:id', verifyToken, chatController.getChatById)

module.exports = router;