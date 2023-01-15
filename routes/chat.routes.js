const chatController = require('../controllers/ChatController');
const verifyToken = require('../middlewares/verifyToken');

const router = require('express').Router();

//Routes

router.post('/newChat/:id', verifyToken, chatController.create);
router.get('/getallchats', verifyToken, chatController.getAllChats)
router.get('/getchat/:id', verifyToken, chatController.getChatById)



module.exports = router;