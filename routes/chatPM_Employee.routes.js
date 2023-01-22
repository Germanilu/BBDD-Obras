const chatController = require('../controllers/ChatPM_EmployeeController');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole')
const router = require('express').Router();

//Routes
router.post('/startNewChat/:id', verifyToken, chatController.create);
router.get('/getallExistingchats', verifyToken,checkRole, chatController.getAllChats)
router.get('/getchatById/:id', verifyToken, chatController.getChatById)

module.exports = router;