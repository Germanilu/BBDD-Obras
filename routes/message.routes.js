const messageController = require('../controllers/MessageController');
const verifyToken = require('../middlewares/verifyToken');

const router = require('express').Router();

//Routes

router.post('/newMessage/:id', verifyToken, messageController.create);
router.get('/consultMessages/:id',verifyToken,messageController.getAllMessage);



module.exports = router;