const messageController = require('../controllers/MessagePM_EmployeeController');
const verifyToken = require('../middlewares/verifyToken');
const checkRole = require('../middlewares/checkRole')
const router = require('express').Router();

//Routes
router.post('/newMessageTo/:id', verifyToken,checkRole, messageController.create);
router.get('/messagesChat/:id',verifyToken,messageController.getAllMessage);
router.delete('/deleteMessage/:id',verifyToken,messageController.delete);
router.put('/modifyMessage/:id',verifyToken,messageController.update);

module.exports = router;